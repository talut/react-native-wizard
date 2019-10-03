import React, {Component} from 'react';
import {Animated} from 'react-native';

type Props = {
    activeStep?: number,
    steps: any,
    duration: number,
    showNextButton: () => void,
    showPrevButton: () => void,
    onPrev(): () => void | undefined,
    onNext(): () => void | undefined,
    onFinish(): () => void | undefined,
    currentStep: (activeStep: number, isFirstStep: boolean, isLastStep: boolean) => void,
}

type States = {
    activeStep: number,
    duration: number,
    transition: Animated.Value | Animated.ValueXY,
    showNextButton: boolean,
    showPrevButton: boolean,
};

class Wizard extends Component<Props, States> {

    constructor(props: Props, state: States) {
        super(props);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
        this.goToStep = this.goToStep.bind(this);
        this.state = {
            activeStep: !props.activeStep ? 0 : props.activeStep,
            showNextButton: true,
            showPrevButton: true,
            duration: !props.duration ? 500 : props.duration,
            transition: new Animated.Value(1),
        };
        const isFirstStep = !props.activeStep ? true : props.activeStep === 0;
        const isLastStep = props.steps.length - 1 === props.activeStep;
        props.currentStep((!props.activeStep ? 0 : props.activeStep), isFirstStep, isLastStep);
    }

    async transition(show: boolean) {
        try {
            await Animated.timing(                  // Animate over time
                this.state.transition,            // The animated value to drive
                {
                    toValue: show ? 1 : 0,                   // Animate to opacity: 1 (opaque)
                    duration: this.props.duration / 2,              // Make it take a while
                }
            )
        } catch (e) {
            console.log(e)
        }
    }

    // func. for next step
    next() {
        const activeStep = this.state.activeStep;
        const totalStep = this.props.steps.length;

        if (activeStep < totalStep - 1) {
            if (this.props.onNext !== undefined) {
                this.props.onNext()
            }
            this.transition(false).then(() => {
                this.setState({
                    activeStep: activeStep + 1,
                }, () => {
                    this.transition(true).then(()=>{
                        this.props.currentStep(activeStep + 1, false, (activeStep + 1) === (totalStep - 1));
                    });
                });
            })
        } else {
            if (this.props.onFinish !== undefined) {
                this.props.onFinish()
            }
        }
    }

    // func. for prev. step
    prev() {
        const activeStep = this.state.activeStep;
        if (activeStep > 0) {
            this.transition(false).then(() => {
                if (this.props.onPrev !== undefined) {
                    this.props.onPrev()
                }
                this.setState({
                    activeStep: activeStep - 1,
                }, () => {
                    this.transition(true).then(()=>{
                        this.props.currentStep(activeStep - 1, (activeStep - 1) === 0, false);
                    });
                });
            })
        } else {
            console.error("This is first step")
        }
    }

    // func. for setting current step
    goToStep(index: number) {
        const totalStep = this.props.steps.length;
        if (index < totalStep) {
            this.transition(false).then(() => {
                this.setState({
                    activeStep: index,
                }, () => {
                    this.transition(true).then(()=>{
                        this.props.currentStep(index, index === 0, index === (totalStep - 1));
                    })
                });
            });
        } else {
            throw new Error("Could not find the step you want to go!")
        }
    }

    render() {
        const Step = this.props.steps[this.state.activeStep].component;
        return (
            <Animated.View style={{flex: 1, opacity: this.state.transition}}>
                <Step
                    {...this.props.steps[this.state.activeStep].props}
                    goToStep={this.goToStep}
                    goNext={this.next}
                    goBack={this.prev}
                    showNextButton={this.props.showNextButton}
                    showPrevButton={this.props.showPrevButton}/>
            </Animated.View>
        )
    }
}

export default Wizard
