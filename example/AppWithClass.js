import React, { Component } from "react"

import { Button, SafeAreaView, View, Text } from "react-native"
// Wizard
import Wizard from "react-native-wizard"

export default class App extends Component {
  state = {
    isFirstStep: false,
    isLastStep: false,
  }
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
      <SafeAreaView>
        <Button title={"Next"} disabled={this.state.isLastStep} onPress={() => this.wizard.current.next()} />
        <Button title={"Prev"} disabled={this.state.isFirstStep} onPress={() => this.wizard.current.prev()} />
        <Text>{this.state.currentStep}</Text>
        <Wizard
          activeStep={2}
          isLastStep={value => this.setState({ isLastStep: value })}
          isFirstStep={value => this.setState({ isFirstStep: value })}
          ref={this.wizard}
          duration={1500}
          steps={stepList}
          currentStep={({ currentStep }) => {
            this.setState({ currentStep: currentStep })
          }}
        />
      </SafeAreaView>
    )
  }
};
