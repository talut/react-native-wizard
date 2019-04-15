import React, {Component} from 'react';

import {View, Image, Button, SafeAreaView, Text} from 'react-native'

// Wizard
import Wizard from "react-native-wizard";

import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";

export default class App extends Component {

  state = {
    isLastStep  : false,
    isFirstStep : false,
    currentIndex: 0
  };

  render() {
    console.log(this.state.isFirstStep ? "TEST" : "DENEME")
    const steps = [
      {
        component: () => <Image source={{uri: "http://placehold.it/200x200"}} style={{width: 200, height: 200}}/>,
      },
      {
        component: Step2,
        props    : {
          title: "Step 2 TEST",
        }
      },
      {
        component: Step3,
        props    : {
          color       : '#ff334f',
          step3Special: 'Step 3 special prop'
        }
      },
    ];
    return (
        <SafeAreaView style={{flex: 1}}>
          <View style={{alignItems: 'center', paddingVertical: 25}}>
            <Text style={{fontSize: 18}}>Active Step Index: {this.state.currentIndex}</Text>
            <Text style={{fontSize: 18}}>Is First Step?: {this.state.isFirstStep ? "True" : "False"}</Text>
            <Text style={{fontSize: 18}}>Is Last Step?: {this.state.isLastStep ? "True" : "False"}</Text>
          </View>
          <Wizard
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
              onNext={() => {console.log("next() Called")}}
              onPrev={() => {console.log("prev() Called")}}
              onFinish={() => {alert("onFinish Called")}}
              steps={steps}/>

          <View style={{bottom: 100, position: 'absolute', zIndex: 999}}>

            <Button onPress={() => {
              this.wizard.next();
            }} title={this.state.isLastStep ? "Finish" : "Next"}/>

            {this.state.isFirstStep ? undefined : <Button onPress={() => {
              this.wizard.prev();
            }} title={"Back"}/>}

            {!this.state.isLastStep ? <Button onPress={() => {
              this.wizard.goToStep(2);
            }} title={"Go To Step 3"}/> : undefined}

          </View>
        </SafeAreaView>
    )
  }
};