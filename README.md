# React Native Wizard
 
Easy, convenient, quick-forming Wizard component for React Native. This package is not using any native modules so you don't need to run `react-native link`. Also this package is providing simple usage with few props and functions. You can see examples below the page.


<p align='center'><img src='https://taluttasgiran.com.tr/assets/reactNativeWizardExample.gif' alt='PinView 1'></p>


## Getting Started

**With NPM**

```
npm install --save react-native-wizard
```

**With YARN**

```
yarn add react-native-wizard
```

### 1.0.1 Features
* TypeScript definitions added.

## Props

| Props                 |Description|
|-----------------------|-----------------------|
|activeStep             |For setting active step at start.|
|showNextButton         |If you want to get showable status of showNextButton from Step use this.
|showPrevButton         |If you want to get showable status of showPrevButton from Step use this.|
|ref                    |You need to set ref for using some function like `goToStep()`|    
|currentStep            |You can get current step index. Also you can get that step is last step or first step. **Required**|
|duration               |You can set duration of transition animation. Default is `500` |
|onNext                 |If next button click and step is change, this function will run.|
|onPrev                 |If prev button click and step is change, this function will run.|
|onFinish               |If you click next button and if that step the last one then this function will run.|
|steps                  |You can set step with this prop. **Required**|

## Reference Functions (`ref={e=>this.wizard=e}`)

| Props                 |Usage                  |
|-----------------------|-----------------------|
|next()                 |this.wizard.next() |
|prev()                 |this.wizard.prev() |
|goToStep(stepIndex)                 |this.wizard.goToStep(stepIndex)|

## Understanding the usage of Step

This wizard using your component class/function as a child. Every time this Wizard rendering your active step with your setted props. Also wizard sending some props for in step usage.  Like `goToStep(stepIndex)`, `goNext()` and `goBack()` also step is sending showable status of next and back button to root component. With this props your step can manage wizard.

## Example App

You can find the usage example of the package in the example folder.

```sh
git clone https://github.com/talut/react-native-wizard

cd react-native-wizard/example

npm install

react-native run-ios/android
```

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
        component: () => <Image source={{uri: "http://placehold.it/96x96"}} style={{width:50, height:50}}/>,
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

### Note
 This package has no step show component but you can easily add by yourself. Maybe at the future I can add this feature.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
