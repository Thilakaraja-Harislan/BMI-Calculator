import React from "react";

import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

type BMIResultModalProps = {
  visible: boolean;
  bmi: number;
  onClose: () => void;
};

export default function BMIResultModal({
  visible,
  bmi,
  onClose,
}: BMIResultModalProps) {

 
  // BMI Category

  const getCategory = () => {
    if (bmi < 18.5) {
      return "Underweight";
    }

    if (bmi < 25) {
      return "Normal";
    }

    if (bmi < 30) {
      return "Overweight";
    }

    return "Obese";
  };


  // BMI Message

  const getMessage = () => {
    if (bmi < 18.5) {
      return "Your BMI is below the normal weight range.";
    }

    if (bmi < 25) {
      return "Your BMI is within the normal weight range.";
    }

    if (bmi < 30) {
      return "Your BMI is above the normal weight range.";
    }

    return "Your BMI is within the obese range.";
  };

  const category = getCategory();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >

      <View style={styles.overlay}>

        <View style={styles.popup}>

          {/* Close */}

          <Pressable
            style={styles.closeButton}
            onPress={onClose}
            hitSlop={10}
          >
            <Text style={styles.closeIcon}>
              ×
            </Text>
          </Pressable>

          {/* Header */}

          <Text style={styles.title}>
            Your Result
          </Text>

          <Text style={styles.subtitle}>
            Your Body Mass Index is
          </Text>

          {/* BMI Result */}

          <View style={styles.bmiCircle}>

            <Text style={styles.bmiValue}>
              {bmi.toFixed(1)}
            </Text>

            <Text style={styles.bmiText}>
              BMI
            </Text>

          </View>

          {/* Category */}

          <Text style={styles.category}>
            {category}
          </Text>

          <Text style={styles.message}>
            {getMessage()}
          </Text>

          {/* BMI ranges */}

          <View style={styles.rangeContainer}>

            <View style={styles.rangeRow}>
              <Text style={styles.rangeLabel}>
                Underweight
              </Text>

              <Text style={styles.rangeValue}>
                Below 18.5
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rangeRow}>
              <Text style={styles.rangeLabel}>
                Normal
              </Text>

              <Text style={styles.rangeValue}>
                18.5 - 24.9
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rangeRow}>
              <Text style={styles.rangeLabel}>
                Overweight
              </Text>

              <Text style={styles.rangeValue}>
                25.0 - 29.9
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rangeRow}>
              <Text style={styles.rangeLabel}>
                Obese
              </Text>

              <Text style={styles.rangeValue}>
                30.0 or above
              </Text>
            </View>

          </View>

          {/* Done */}

          <Pressable
            style={({ pressed }) => [
              styles.doneButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onClose}
          >

            <Text style={styles.doneText}>
              Done
            </Text>

          </Pressable>

        </View>

      </View>

    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,

    backgroundColor: "rgba(30, 15, 40, 0.55)",

    justifyContent: "center",

    paddingHorizontal: 20,
  },

  popup: {
    width: "100%",

    backgroundColor: "#FFFFFF",

    borderRadius: 30,

    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,

    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 15,

    elevation: 12,
  },

  // Close

  closeButton: {
    position: "absolute",

    top: 16,
    right: 16,

    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: "#F2EBF7",

    alignItems: "center",
    justifyContent: "center",

    zIndex: 10,
  },

  closeIcon: {
    fontSize: 27,
    color: "#4B1B63",
    lineHeight: 29,
  },

  // Header

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#35124D",

    marginTop: 5,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 14,
    color: "#8A808F",

    marginBottom: 20,
  },

  // BMI circle

  bmiCircle: {
    width: 145,
    height: 145,

    borderRadius: 73,

    backgroundColor: "#F5EEFC",

    borderWidth: 8,
    borderColor: "#7135D6",

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 18,
  },

  bmiValue: {
    fontSize: 42,
    fontWeight: "800",
    color: "#451561",
  },

  bmiText: {
    fontSize: 13,
    color: "#968A9C",
    marginTop: -3,
  },

  // Category

  category: {
    fontSize: 22,
    fontWeight: "800",
    color: "#5A1B7C",

    marginBottom: 7,
  },

  message: {
    fontSize: 14,
    lineHeight: 20,

    color: "#777078",

    textAlign: "center",

    marginBottom: 20,

    paddingHorizontal: 10,
  },

  // Ranges

  rangeContainer: {
    width: "100%",

    backgroundColor: "#F8F5FA",

    borderRadius: 18,

    paddingHorizontal: 16,
    paddingVertical: 8,

    marginBottom: 20,
  },

  rangeRow: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 9,
  },

  rangeLabel: {
    fontSize: 13,
    color: "#625969",
    fontWeight: "500",
  },

  rangeValue: {
    fontSize: 13,
    color: "#8E8494",
  },

  divider: {
    height: 1,
    backgroundColor: "#EAE4ED",
  },

  // Done

  doneButton: {
    width: "100%",
    height: 54,

    borderRadius: 27,

    backgroundColor: "#7135D6",

    alignItems: "center",
    justifyContent: "center",
  },

  doneText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  buttonPressed: {
    opacity: 0.85,
  },

});