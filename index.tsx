import React, {Component} from 'react';
import {Animated} from 'react-native';

type Props = {
    activeStep?: number | undefined,
    steps: any,
    duration: number,
    showNextButton: boolean,
    showPrevButton: boolean,
    onPrev: () => void,
    onNext: () => void,
    onFinish: () => void,
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

        const isFirstStep = props.activeStep === 0;
        const isLastStep = props.steps.length - 1 === props.activeStep;
        props.currentStep(!props.activeStep ? 0 : props.activeStep, isFirstStep, isLastStep);
    }

    transition(show: boolean) {
        return Animated.timing(                  // Animate over time
            this.state.transition,            // The animated value to drive
            {
                toValue: show ? 1 : 0,                   // Animate to opacity: 1 (opaque)
                duration: this.props.duration / 2,              // Make it take a while
            }
        )
    }

    // func. for next step
    next() {
        const activeStep = this.state.activeStep;
        const totalStep = this.props.steps.length;

        if (activeStep < totalStep - 1) {
            this.props.onNext();
            this.props.currentStep(activeStep + 1, false, (activeStep + 1) === (totalStep - 1));
            this.transition(false).start(() => {
                this.setState({
                    activeStep: activeStep + 1,
                }, () => {
                    this.transition(true).start();
                });
            })
        } else {
            this.props.onFinish();
        }
    }

    // func. for prev. step
    prev() {
        const activeStep = this.state.activeStep;
        if (activeStep > 0) {
            this.props.currentStep(activeStep - 1, (activeStep - 1) === 0, false);
            this.transition(false).start(() => {
                this.props.onPrev();
                this.setState({
                    activeStep: activeStep - 1,
                }, () => {
                    this.transition(true).start();
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
            this.props.currentStep(index, index === 0, index === (totalStep - 1));
            this.transition(false).start(() => {
                this.setState({
                    activeStep: index,
                }, () => {
                    this.transition(true).start()
                });
            });
        } else {
            throw new Error("Gitmek istediğiniz adım bulunamadı!")
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