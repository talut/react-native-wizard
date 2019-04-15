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

## Reference Functions (`ref={e=>this.wizard=e}`)

| Props                 |Usage                  |
|-----------------------|-----------------------|
|next()                 |this.wizard.next() // you can change this.wizard as this.blabla.next()|
|prev()                 |this.wizard.prev() // you can change this.wizard as this.blabla.prev()|
|goToStep(stepIndex)                 |this.wizard.goToStep(stepIndex) // you can change this.wizard as this.blabla.goToStep(stepIndex)|

## Understanding the usage of Step

This wizard using your component class as a child. You can set any component as a child. Every time this Wizard rendering your active step with your setted props. Also wizard sending some props for in step usage.  Like `goToStep(stepIndex)`, `goNext()` and `goBack()` also step is sending showable status of next and back button to root component. With this props your step can manage wizard.

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

```
<Wizard
              activeStep={2}
              showNextButton={(status) => {
                status ? console.log("SHOW") : console.log("HIDE")
              }}
              showPrevButton={(status) => {
                status ? console.log("SHOW") : console.log("HIDE")
              }}
              ref={(e) => this.wizard = e}
              currentStep={(currentIndex, isFirstStep, isLastStep) => {
                this.setState({
                  isLastStep  : isLastStep,
                  isFirstStep : isFirstStep,
                  currentIndex: currentIndex
                })
              }}
              duration={500}
              onNext={() => {console.log("Next page called")}}
              onPrev={() => {console.log("Prev page called")}}
              onFinish={() => {alert("onFinish called")}}
              steps={steps}/>
```

```javascript

// this.wizard.next()
 <Button onPress={() => {
              this.wizard.next();
            }} title={this.state.isLastStep ? "Bitir" : "İlerle"}/>

// this.wizard.prev() if is not first step!
{!this.state.isFirstStep ? <Button onPress={() => {
              this.wizard.prev();
            }} title={"Go Back"}/> : undefined}

// this.wizard.goToStep(2)
<Button onPress={() => {
              this.wizard.goToStep(2);
            }} title={"Go to index 2 If you set 3 step then that means step 3"}/>

```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details