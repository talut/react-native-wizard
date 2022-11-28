// Type definitions for react-native-wizard 2.1.1
// Project: https://github.com/talut/react-native-wizard
// Definitions by: Talut TASGIRAN <https://github.com/talut>
// TypeScript Version: 2.8

declare module "react-native-wizard" {
  import { RefObject, FunctionComponent } from "react"

  export interface WizardRef {
    /**
     * Go to next step
     */
    next: () => void,

    /**
     * Go to previous step
     */
    prev: () => void,

    /**
     * Go to step with index
     * @param index Step index
     */
    goTo: (index: number) => void,
  }

  interface WizardProps {
    /**
     Ref is required for using this package
     */
    ref: RefObject<WizardRef>,

    /**
     Set active step with index of step.
     */
    activeStep?: number,

    /**
     Set step with props.
     */
    steps: any,

    /**
     Set transition animation duration.
     */
    duration?: number,

    /**
     Callback function run after next()
     */
    onNext?: () => void,

    /**
     nextStepAnimation name
     */
    nextStepAnimation?: string,

    /**
     prevStepAnimation name
     */
    prevStepAnimation?: string,

    /**
     Callback function: running if is first step
     */
    isFirstStep?: (value: boolean) => void,

    /**
     Callback function: running if is last step
     */
    isLastStep?: (value: boolean) => void,

    /**
     useNativeDriver
     */
    useNativeDriver?: boolean,

    /**
     contentContainerStyle
     */
    contentContainerStyle?: object,

    /**
     Callback function run step change.
     */
    currentStep: (payload: {
      currentStep: number;
      isFirstStep: boolean;
      isLastStep: boolean
    }) => void;
  }

  const Wizard: FunctionComponent<WizardProps>
  export default Wizard
}

