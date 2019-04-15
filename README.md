# React Native Wizard

Easy, convenient, quick-forming Wizard/Stepper component for React Native. It runs smoothly for both IOS and Android. There is no need to run `react-native link`

## Getting Started

**With NPM**

```
npm install --save react-native-wizard
```

**With YARN**

```
yarn add react-native-wizard
```

## Props

| Props                 |Description|
|-----------------------|-----------------------|
|activeStep             |For setting active step at start.|
|showNextButton         |If you want to get showable status of showNextButton from Step use this.
|showPrevButton         |If you want to get showable status of showPrevButton from Step use this.|
|ref                    |You need to set ref for using some function like `goToStep()`|    
|currentStep            |You can get current step index. Also you can get that step is last step or first step.|
|duration               |You can set duration of transition animation. Default is `500` |
|onNext                 |If next button click and step is change, this function will run.|
|onPrev                 |If prev button click and step is change, this function will run.|
|onFinish               |If you click next button and if that step the last one then this function will run.|
|steps                  |You can set step with this prop.|

## Basic Usage

```javascript
// import Wizard
import Wizard from "react-native-wizard"

// Import your own step components
import Step1 from "./yourStepsDir/Step1";
import Step2 from "./yourStepsDir/Step2";
import Step3 from "./yourStepsDir/Step3";

// ...

const steps = [
    {
        component: Step1,
        props    : {
          step1Special: "Step 1 special props"
        }
    },
    {
        component: Step2,
        props    : {
          step2Special: "Step 2 special props"
        }
    },
    {
        component: Step3,
        props    : {
          step3Special: "Step 3 special props"
        }
    },
    ]
    <Wizard
        ref={(e) => this.wizard = e}
        currentStep={(currentIndex, isFirstStep, isLastStep) => {
             this.setState({
                isLastStep  : isLastStep,
                isFirstStep : isFirstStep,
                currentIndex: currentIndex
            })
         }}
        steps={steps}
    />

```

## Advanced Usage

You can access `this.wizard.next()`, `this.wizard.prev()` and `goToStep(stepIndex)` functions via `ref={(e) => this.wizard = e}`

```javascript
 <Button onPress={() => {
              this.wizard.next();
            }} title={this.state.isLastStep ? "Bitir" : "İlerle"}/>


```


