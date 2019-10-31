import React, { Component } from "react"

import { Button, SafeAreaView, View } from "react-native"
// Wizard
import Wizard from "react-native-wizard"

export default class App extends Component {
  state = {
    isLastStep  : false,
    isFirstStep : false,
    currentIndex: 0
  };
  wizard = React.createRef()
  render() {
    const stepList = [
      {
        content: <View style={{ width: 100, height: 100, backgroundColor: "#fc0" }} />,
      },
      {
        content: <View style={{ width: 100, height: 100, backgroundColor: "#000" }} />,
      },
      {
        content: <View style={{ width: 100, height: 100, backgroundColor: "#2634e0" }} />,
      },
    ]
    return (
        <SafeAreaView style={{flex: 1}}>
          <Button title={"Next"} onPress={() => this.wizard.current.next()} />
          <Button title={"Prev"} onPress={() => this.wizard.current.prev()} />
          <Wizard ref={this.wizard} duration={1500} steps={stepList} currentStep={() => {}} />
        </SafeAreaView>
    )
  }
};
