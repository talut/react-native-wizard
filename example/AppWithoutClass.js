import React, { useRef, useState } from "react"
import { SafeAreaView, Button, View, Text } from "react-native"
import Wizard from "react-native-wizard"

export default ()=>{
  const wizard = useRef()
  const [isFirstStep, setIsFirstStep] = useState()
  const [isLastStep, setIsLastStep] = useState()
  const [currentStep, setCurrentStep] = useState(0)
  const stepList = [
    {
      content: (
        <View style={{ width: 100, height: 100, backgroundColor: "#000" }}>
          <Text style={{ color: "#FFF" }}>1. step</Text>
        </View>
      ),
    },
    {
      content: <View style={{ width: 100, height: 100, backgroundColor: "#e04851" }} />,
    },
    {
      content: <View style={{ width: 100, height: 500, backgroundColor: "#9be07d" }} />,
    },
    {
      content: <View style={{ width: 100, height: 100, backgroundColor: "#2634e0" }} />,
    },
  ]
  return (
    <View>
      <SafeAreaView style={{ backgroundColor: "#FFF" }}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#FFF",
            borderBottomColor: "#dedede",
            borderBottomWidth: 1,
          }}>
          <Button disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>{currentStep + 1}. Step</Text>
          <Button disabled={isLastStep} title="Next" onPress={() => wizard.current.next()} />
        </View>
      </SafeAreaView>
      <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Wizard
          nextStepAnimation="slideRight"
          ref={wizard}
          steps={stepList}
          isFirstStep={val => setIsFirstStep(val)}
          isLastStep={val => setIsLastStep(val)}
          onNext={() => {
            console.log("Next Step Called")
          }}
          onPrev={() => {
            console.log("Previous Step Called")
          }}
          currentStep={({ currentStep, isLastStep, isFirstStep }) => {
            setCurrentStep(currentStep)
          }}
        />
        <View style={{ flexDirection: "row", margin: 18 }}>
          {stepList.map((val, index) => (
            <View
              key={"step-indicator-" + index}
              style={{
                width: 10,
                marginHorizontal: 6,
                height: 10,
                borderRadius: 5,
                backgroundColor: index === currentStep ? "#fc0" : "#000",
              }}
            />
          ))}
        </View>
      </View>
    </View>
  )
}
