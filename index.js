import React, { useEffect, useState } from "react"
import { Animated, Dimensions } from "react-native"

export default React.forwardRef(
  (
    {
        steps,
        activeStep = 0,
        currentStep = () => {},
        onNext = () => {},
        onPrev = () => {},
        isFirstStep = () => {},
        isLastStep = () => {},
        duration = 500,
        nextStepAnimation = "fade",
        prevStepAnimation = "fade",
        containerStyles = {}
    },
    ref
  ) => {
      const [activeStepNo, setActiveStepNo] = useState(activeStep)
      const [isNext, setIsNext] = useState(true)
      ref.current = {
          next: () => {
              if (steps.length - 1 !== activeStepNo) {
                  setActiveStepNo(activeStepNo + 1)
                  setIsNext(true)
                  currentStep({
                      currentStep: activeStepNo + 1,
                      isFirstStep: activeStepNo + 1 === 0,
                      isLastStep: activeStepNo + 1 === steps.length - 1,
                  })
                  onNext()
              }
          },
          prev: () => {
              if (activeStepNo > 0) {
                  setActiveStepNo(activeStepNo - 1)
                  setIsNext(false)
                  currentStep({
                      currentStep: activeStepNo - 1,
                      isFirstStep: activeStepNo - 1 === 0,
                      isLastStep: activeStepNo - 1 === steps.length - 1,
                  })
                  onPrev()
              }
          },
          goTo: step => {
              if (steps.length - 1 <= step || step >= 0) {
                  if (activeStepNo > step) {
                      setIsNext(false)
                      onPrev()
                  } else {
                      setIsNext(true)
                      onNext()
                  }
                  currentStep({ currentStep: step, isFirstStep: step === 0, isLastStep: step !== 0 })
                  setActiveStepNo(step)
              }
          },
      }

      useEffect(() => {
          currentStep({
              currentStep: activeStepNo,
              isFirstStep: activeStepNo === 0,
              isLastStep: activeStepNo === steps.length - 1,
          })
      },[activeStepNo, steps.length])

      useEffect(() => {
          isFirstStep(activeStepNo === 0)
          isLastStep(activeStepNo === steps.length - 1)
      }, [activeStepNo, steps.length])
      return (
        <Step
          currentStep={activeStepNo}
          duration={duration}
          animation={isNext ? nextStepAnimation : prevStepAnimation}
          content={steps[activeStepNo].content}
          containerStyles={containerStyles}
        />
      )
  }
)

const Step = ({ content, animation, duration, currentStep, containerStyles }) => {
    const [style, setStyle] = useState(undefined)
    useEffect(() => {
        switch (animation) {
            case "slideLeft": {
                const slideLeft = new Animated.Value(-Dimensions.get("window").width)
                Animated.timing(slideLeft, {
                    toValue: 0,
                    duration: duration,
                }).start()
                setStyle({
                    transform: [
                        {
                            translateX: slideLeft,
                        },
                    ],
                })
                break
            }
            case "slideRight": {
                const slideRight = new Animated.Value(Dimensions.get("window").width)
                Animated.timing(slideRight, {
                    toValue: 0,
                    duration: duration,
                }).start()
                setStyle({
                    transform: [
                        {
                            translateX: slideRight,
                        },
                    ],
                })
                break
            }

            case "slideUp": {
                const slideUp = new Animated.Value(-Dimensions.get("window").height)
                Animated.timing(slideUp, {
                    toValue: 0,
                    duration: duration,
                }).start()
                setStyle({
                    transform: [
                        {
                            translateY: slideUp,
                        },
                    ],
                })
                break
            }
            case "slideDown": {
                const slideDown = new Animated.Value(Dimensions.get("window").height)
                Animated.timing(slideDown, {
                    toValue: 0,
                    duration: duration,
                }).start()
                setStyle({
                    transform: [
                        {
                            translateY: slideDown,
                        },
                    ],
                })
                break
            }
            case "fade":
            default: {
                const opacity = new Animated.Value(0)
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: duration,
                }).start()
                setStyle({ opacity: opacity })
            }
        }
        return () => {
            const opacity = new Animated.Value(1)
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
            }).start()
            setStyle({ opacity: opacity })
        }
    }, [animation, duration, setStyle, currentStep])
    return <Animated.View style={[style, containerStyles]}>{content}</Animated.View>
}
