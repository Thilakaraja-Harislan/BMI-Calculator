import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  StatusBar,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import BMIResultModal from "../components/BMIResultModal";

export default function HomeScreen() {
  // STATES

  const [gender, setGender] =
    useState<"male" | "female">("female");

  const [weight, setWeight] = useState("59.5");
  const [height, setHeight] = useState("172");
  const [age, setAge] = useState("32");

  const [bmiResult, setBmiResult] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Track focused input
  const [focusedInput, setFocusedInput] =
    useState<"weight" | "height" | "age" | null>(null);

  // MANUAL INPUT HANDLERS

  const handleWeightInput = (text: string) => {
    // Allow digits and one decimal point
    let cleaned = text.replace(/[^0-9.]/g, "");

    const firstDecimal = cleaned.indexOf(".");

    if (firstDecimal !== -1) {
      cleaned =
        cleaned.substring(0, firstDecimal + 1) +
        cleaned
          .substring(firstDecimal + 1)
          .replace(/\./g, "");
    }

    // Limit weight to 6 characters
    cleaned = cleaned.slice(0, 6);

    setWeight(cleaned);
  };

  const handleHeightInput = (text: string) => {
    // Allow digits only
    const cleaned = text
      .replace(/[^0-9]/g, "")
      .slice(0, 3);

    setHeight(cleaned);
  };

  const handleAgeInput = (text: string) => {
    // Allow digits only
    const cleaned = text
      .replace(/[^0-9]/g, "")
      .slice(0, 3);

    setAge(cleaned);
  };

  // WEIGHT CONTROLS

  const increaseWeight = () => {
    const current = parseFloat(weight);

    const value = isNaN(current) ? 0 : current;

    const newValue = Math.min(300, value + 0.5);

    setWeight(newValue.toFixed(1));
  };

  const decreaseWeight = () => {
    const current = parseFloat(weight);

    const value = isNaN(current) ? 0.5 : current;

    const newValue = Math.max(0.5, value - 0.5);

    setWeight(newValue.toFixed(1));
  };

  // HEIGHT CONTROLS

  const increaseHeight = () => {
    const current = parseInt(height, 10);

    const value = isNaN(current) ? 99 : current;

    const newValue = Math.min(250, value + 1);

    setHeight(String(newValue));
  };

  const decreaseHeight = () => {
    const current = parseInt(height, 10);

    const value = isNaN(current) ? 101 : current;

    const newValue = Math.max(100, value - 1);

    setHeight(String(newValue));
  };

  // AGE CONTROLS

  const increaseAge = () => {
    const current = parseInt(age, 10);

    const value = isNaN(current) ? 0 : current;

    const newValue = Math.min(120, value + 1);

    setAge(String(newValue));
  };

  const decreaseAge = () => {
    const current = parseInt(age, 10);

    const value = isNaN(current) ? 2 : current;

    const newValue = Math.max(1, value - 1);

    setAge(String(newValue));
  };

  // BMI CALCULATION

  const calculateBMI = () => {
    const weightNumber = parseFloat(weight);
    const heightNumber = parseFloat(height);
    const ageNumber = parseInt(age, 10);

    if (
      weight.trim() === "" ||
      height.trim() === "" ||
      age.trim() === "" ||
      isNaN(weightNumber) ||
      isNaN(heightNumber) ||
      isNaN(ageNumber)
    ) {
      Alert.alert(
        "Invalid Input",
        "Please enter your weight, height and age."
      );

      return;
    }

    if (
      weightNumber <= 0 ||
      heightNumber <= 0 ||
      ageNumber <= 0
    ) {
      Alert.alert(
        "Invalid Input",
        "Weight, height and age must be greater than zero."
      );

      return;
    }

    const heightInMeters = heightNumber / 100;

    const bmi =
      weightNumber /
      (heightInMeters * heightInMeters);

    Keyboard.dismiss();

    setFocusedInput(null);
    setBmiResult(bmi);
    setShowResult(true);
  };

  // SCREEN

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom"]}
    >
      <StatusBar
        hidden={false}
        barStyle="dark-content"
        backgroundColor="#FAF8FC"
        translucent={false}
      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <View style={styles.screen}>

          <View style={styles.header}>
            <Text style={styles.title}>
              BMI Calculator
            </Text>

            <Text style={styles.description}>
              Body mass index BMI is a measure of body fat
              based on height and weight that applies to adults.
            </Text>
          </View>

          <View style={styles.genderRow}>
            {/* Male */}

            <Pressable
              style={[
                styles.genderCard,
                gender === "male" &&
                  styles.selectedGenderCard,
              ]}
              onPress={() => {
                Keyboard.dismiss();
                setFocusedInput(null);
                setGender("male");
              }}
            >
              <Text
                style={[
                  styles.genderIcon,
                  gender === "male" &&
                    styles.selectedGenderText,
                ]}
              >
                ♂
              </Text>

              <Text
                style={[
                  styles.genderText,
                  gender === "male" &&
                    styles.selectedGenderText,
                ]}
              >
                Male
              </Text>
            </Pressable>

            {/* Female */}

            <Pressable
              style={[
                styles.genderCard,
                gender === "female" &&
                  styles.selectedGenderCard,
              ]}
              onPress={() => {
                Keyboard.dismiss();
                setFocusedInput(null);
                setGender("female");
              }}
            >
              <Text
                style={[
                  styles.genderIcon,
                  gender === "female" &&
                    styles.selectedGenderText,
                ]}
              >
                ♀
              </Text>

              <Text
                style={[
                  styles.genderText,
                  gender === "female" &&
                    styles.selectedGenderText,
                ]}
              >
                Female
              </Text>
            </Pressable>
          </View>

          <View style={styles.measurementSection}>
            <View style={styles.leftColumn}>
              <View style={styles.smallCard}>
                <Text style={styles.cardTitle}>
                  Weight{" "}
                  <Text style={styles.unit}>
                    (kg)
                  </Text>
                </Text>

                {/* Manual Weight Input */}

                <View
                  style={[
                    styles.inputRow,
                    focusedInput === "weight" &&
                      styles.focusedInputRow,
                  ]}
                >
                  <TextInput
                    style={styles.smallInput}
                    value={weight}
                    onChangeText={handleWeightInput}

                    // Mobile numeric keyboard
                    keyboardType="decimal-pad"

                    // Web HTML input hint
                    inputMode="decimal"

                    placeholder="59.5"
                    placeholderTextColor="#D1CAD5"

                    maxLength={6}

                    // Allows typing/editing
                    editable={true}

                    // Allows mouse selection on web
                    selectTextOnFocus={true}

                    // Important for web interaction
                    pointerEvents="auto"

                    onFocus={() =>
                      setFocusedInput("weight")
                    }

                    onBlur={() =>
                      setFocusedInput(null)
                    }

                    returnKeyType="done"

                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                      setFocusedInput(null);
                    }}
                  />

                  <Text style={styles.inputUnit}>
                    kg
                  </Text>
                </View>

                {/* Weight Controls */}

                <View style={styles.weightControls}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.weightControlButton,
                      pressed &&
                        styles.controlButtonPressed,
                    ]}
                    onPress={() => {
                      Keyboard.dismiss();
                      setFocusedInput(null);
                      decreaseWeight();
                    }}
                    hitSlop={8}
                  >
                    <Text style={styles.controlSymbol}>
                      −
                    </Text>
                  </Pressable>

                  <View style={styles.weightCenter}>
                    <View style={styles.triangleDown} />
                  </View>

                  <Pressable
                    style={({ pressed }) => [
                      styles.weightControlButton,
                      pressed &&
                        styles.controlButtonPressed,
                    ]}
                    onPress={() => {
                      Keyboard.dismiss();
                      setFocusedInput(null);
                      increaseWeight();
                    }}
                    hitSlop={8}
                  >
                    <Text style={styles.controlSymbol}>
                      +
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.smallCard}>
                <Text style={styles.cardTitle}>
                  Age
                </Text>

                {/* Manual Age Input */}

                <View
                  style={[
                    styles.inputRow,
                    focusedInput === "age" &&
                      styles.focusedInputRow,
                  ]}
                >
                  <TextInput
                    style={styles.smallInput}
                    value={age}
                    onChangeText={handleAgeInput}

                    // Mobile numeric keyboard
                    keyboardType="number-pad"

                    // Web numeric input hint
                    inputMode="numeric"

                    placeholder="32"
                    placeholderTextColor="#D1CAD5"

                    maxLength={3}

                    editable={true}
                    selectTextOnFocus={true}
                    pointerEvents="auto"

                    onFocus={() =>
                      setFocusedInput("age")
                    }

                    onBlur={() =>
                      setFocusedInput(null)
                    }

                    returnKeyType="done"

                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                      setFocusedInput(null);
                    }}
                  />

                  <Text style={styles.inputUnit}>
                    years
                  </Text>
                </View>

                {/* Age Controls */}

                <View style={styles.ageControls}>
                  <Pressable
                    style={({ pressed }) => [
                      styles.ageControlButton,
                      pressed &&
                        styles.controlButtonPressed,
                    ]}
                    onPress={() => {
                      Keyboard.dismiss();
                      setFocusedInput(null);
                      decreaseAge();
                    }}
                    hitSlop={8}
                  >
                    <Text style={styles.controlSymbol}>
                      −
                    </Text>
                  </Pressable>

                  <View style={styles.ageCenter}>
                    <View style={styles.triangleUp} />
                  </View>

                  <Pressable
                    style={({ pressed }) => [
                      styles.ageControlButton,
                      pressed &&
                        styles.controlButtonPressed,
                    ]}
                    onPress={() => {
                      Keyboard.dismiss();
                      setFocusedInput(null);
                      increaseAge();
                    }}
                    hitSlop={8}
                  >
                    <Text style={styles.controlSymbol}>
                      +
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={styles.heightCard}>
              <Text style={styles.cardTitle}>
                Height{" "}
                <Text style={styles.unit}>
                  (cm)
                </Text>
              </Text>

              <View style={styles.heightBody}>
                <View
                  style={[
                    styles.heightInputRow,
                    focusedInput === "height" &&
                      styles.focusedHeightInputRow,
                  ]}
                >
                  <TextInput
                    style={styles.heightInput}
                    value={height}
                    onChangeText={handleHeightInput}

                    // Mobile numeric keyboard
                    keyboardType="number-pad"

                    // Web numeric input hint
                    inputMode="numeric"

                    placeholder="172"
                    placeholderTextColor="#D1CAD5"

                    maxLength={3}

                    editable={true}
                    selectTextOnFocus={true}
                    pointerEvents="auto"

                    onFocus={() =>
                      setFocusedInput("height")
                    }

                    onBlur={() =>
                      setFocusedInput(null)
                    }

                    returnKeyType="done"

                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                      setFocusedInput(null);
                    }}
                  />

                  <Text style={styles.heightUnit}>
                    cm
                  </Text>
                </View>
              </View>

              <View style={styles.heightControls}>
                <Pressable
                  style={({ pressed }) => [
                    styles.heightControlButton,
                    pressed &&
                      styles.controlButtonPressed,
                  ]}
                  onPress={() => {
                    Keyboard.dismiss();
                    setFocusedInput(null);
                    decreaseHeight();
                  }}
                >
                  <Text style={styles.heightControlSymbol}>
                    −
                  </Text>

                  <Text style={styles.heightControlLabel}>
                    1 cm
                  </Text>
                </Pressable>

                <View style={styles.heightControlDivider} />

                <Pressable
                  style={({ pressed }) => [
                    styles.heightControlButton,
                    pressed &&
                      styles.controlButtonPressed,
                  ]}
                  onPress={() => {
                    Keyboard.dismiss();
                    setFocusedInput(null);
                    increaseHeight();
                  }}
                >
                  <Text style={styles.heightControlSymbol}>
                    +
                  </Text>

                  <Text style={styles.heightControlLabel}>
                    1 cm
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.calculateButton,
              pressed &&
                styles.calculateButtonPressed,
            ]}
            onPress={calculateBMI}
          >
            <Text style={styles.calculateText}>
              Calculate BMI
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <BMIResultModal
        visible={showResult}
        bmi={bmiResult}
        onClose={() => setShowResult(false)}
      />
    </SafeAreaView>
  );
}

// STYLES

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF8FC",
  },

  keyboardContainer: {
    flex: 1,
  },

  screen: {
    flex: 1,

    backgroundColor: "#FAF8FC",

    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 18,
  },

  header: {
    marginBottom: 18,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",

    color: "#3C145A",

    marginBottom: 6,
  },

  description: {
    fontSize: 12,
    lineHeight: 17,

    color: "#716A76",
  },

  genderRow: {
    flexDirection: "row",

    gap: 12,

    marginBottom: 14,
  },

  genderCard: {
    flex: 1,

    height: 112,

    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1.5,
    borderColor: "transparent",

    shadowColor: "#000000",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.07,
    shadowRadius: 5,

    elevation: 3,
  },

  selectedGenderCard: {
    borderColor: "#6B20A0",

    backgroundColor: "#FCF9FF",
  },

  genderIcon: {
    fontSize: 39,

    color: "#D6CEE0",

    marginBottom: 4,
  },

  genderText: {
    fontSize: 13,
    fontWeight: "600",

    color: "#B7AFBF",
  },

  selectedGenderText: {
    color: "#4C116D",
  },

  measurementSection: {
    flexDirection: "row",

    gap: 12,

    marginBottom: 16,
  },

  leftColumn: {
    flex: 1,

    gap: 12,
  },

  smallCard: {
    height: 135,

    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    paddingTop: 14,
    paddingHorizontal: 10,

    alignItems: "center",

    overflow: "hidden",

    shadowColor: "#000000",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.07,
    shadowRadius: 5,

    elevation: 3,
  },

  cardTitle: {
    fontSize: 12,

    color: "#4D4850",

    textAlign: "center",
  },

  unit: {
    fontSize: 10,

    color: "#B8B2BB",
  },

  inputRow: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    marginTop: 8,

    paddingHorizontal: 7,

    borderRadius: 8,

    borderWidth: 1,
    borderColor: "transparent",
  },

  focusedInputRow: {
    borderColor: "#D8C6E7",

    backgroundColor: "#FCF9FF",
  },

  smallInput: {
    minWidth: 55,

    paddingHorizontal: 3,
    paddingVertical: 2,

    fontSize: 23,
    fontWeight: "800",

    color: "#42145E",

    textAlign: "center",

    backgroundColor: "transparent",

    // React Native Web
    outlineStyle: "none",

    cursor: "text",
  } as any,

  inputUnit: {
    fontSize: 10,

    color: "#B8B2BB",

    marginLeft: 3,
  },

  controlSymbol: {
    fontSize: 20,

    fontWeight: "500",

    color: "#8E6BAA",

    lineHeight: 22,
  },

  controlButtonPressed: {
    opacity: 0.45,

    backgroundColor: "#F2EAF8",
  },

  weightControls: {
    flex: 1,

    width: "100%",

    flexDirection: "row",

    alignItems: "flex-end",
    justifyContent: "space-between",

    paddingBottom: 8,
  },

  weightControlButton: {
    width: 38,
    height: 32,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 8,

    zIndex: 10,
  },

  weightCenter: {
    flex: 1,

    height: 32,

    alignItems: "center",
    justifyContent: "center",
  },

  triangleDown: {
    width: 0,
    height: 0,

    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 7,

    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#A989C2",
  },

  ageControls: {
    flex: 1,

    width: "100%",

    flexDirection: "row",

    alignItems: "flex-end",
    justifyContent: "space-between",

    paddingBottom: 8,
  },

  ageControlButton: {
    width: 38,
    height: 32,

    borderRadius: 8,

    alignItems: "center",
    justifyContent: "center",

    zIndex: 10,
  },

  ageCenter: {
    flex: 1,

    height: 32,

    alignItems: "center",
    justifyContent: "center",
  },

  triangleUp: {
    width: 0,
    height: 0,

    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 7,

    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#A989C2",
  },

  heightCard: {
    flex: 1,

    height: 282,

    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    paddingTop: 14,

    alignItems: "center",

    overflow: "hidden",

    shadowColor: "#000000",

    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.07,
    shadowRadius: 5,

    elevation: 3,
  },

  heightBody: {
    flex: 1,

    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },

  heightInputRow: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 7,

    borderRadius: 8,

    borderWidth: 1,
    borderColor: "transparent",
  },

  focusedHeightInputRow: {
    borderColor: "#D8C6E7",

    backgroundColor: "#FCF9FF",
  },

  heightInput: {
    minWidth: 55,

    paddingHorizontal: 2,
    paddingVertical: 2,

    fontSize: 23,
    fontWeight: "800",

    color: "#42145E",

    textAlign: "center",

    backgroundColor: "transparent",

    // React Native Web
    outlineStyle: "none",

    cursor: "text",
  } as any,

  heightUnit: {
    fontSize: 9,

    color: "#B8B2BB",

    marginLeft: 3,
  },

  heightControls: {
    width: "100%",

    height: 43,

    flexDirection: "row",

    alignItems: "center",

    borderTopWidth: 1,

    borderTopColor: "#F0EBF3",
  },

  heightControlButton: {
    flex: 1,

    height: "100%",

    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    gap: 3,
  },

  heightControlDivider: {
    width: 1,

    height: 20,

    backgroundColor: "#EEE8F1",
  },

  heightControlSymbol: {
    fontSize: 19,

    color: "#8E6BAA",

    fontWeight: "500",
  },

  heightControlLabel: {
    fontSize: 7,

    color: "#C5B9CD",
  },

  calculateButton: {
    marginTop: "auto",

    height: 54,

    borderRadius: 27,

    backgroundColor: "#7135D6",

    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#7135D6",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.25,
    shadowRadius: 7,

    elevation: 5,
  },

  calculateButtonPressed: {
    opacity: 0.85,
  },

  calculateText: {
    fontSize: 15,

    fontWeight: "700",

    color: "#FFFFFF",
  },
});