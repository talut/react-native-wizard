// Type definitions for react-native-wizard 1.0.1
// Project: https://github.com/talut/react-native-wizard
// Definitions by: Talut TASGIRAN <https://github.com/talut>
// TypeScript Version: 2.8

declare module "react-native-wizard" {
    import React from 'react';

    interface WizardProps {
        /*
        Set active step with index of step.
         */
        activeStep?: number,
        /*
        Set step with props.
         */
        steps: any,
        /*
        Set transition animation duration.
         */
        duration?: number,
        /*
        Get nextButton showable status from step
         */
        showNextButton?: () => void,
        /*
        Get prevButton showable status from step
        */
        showPrevButton?: () => void,
        /*
        Callback function run after prev()
        */
        onPrev?: () => void,
        /*
        Callback function run after next()
        */
        onNext?: () => void,
        /*
        Callback function run after last step next()
        */
        onFinish?: () => void,
        /*
        Callback function run step change.
        */
        currentStep: (activeStep: number, isFirstStep: boolean, isLastStep: boolean) => void,
    }

    const Wizard: (props: WizardProps) => React.Component<WizardProps>
    export default Wizard;
}