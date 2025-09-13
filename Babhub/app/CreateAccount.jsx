// app/CreateAccount.jsx
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Mybutton from "../components/Mybutton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width, height } = Dimensions.get("window");

const CreateAccount = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [dobFocus, setDobFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [errors, setErrors] = useState({});

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const showDatepicker = () => {
    setDatePickerVisibility(true);
    setDobFocus(true);
  };

  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    setDob(formatDate(date));
    setDatePickerVisibility(false);
    if (errors.dob) {
      setErrors((prev) => ({ ...prev, dob: "" }));
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setDob("");
    setPassword("");
    setConfirmPassword("");
    setSelectedDate(new Date());
    setNameFocus(false);
    setEmailFocus(false);
    setDobFocus(false);
    setPasswordFocus(false);
    setConfirmPasswordFocus(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }
    if (!dob) newErrors.dob = "Date of birth is required";
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateAccount = async () => {
    if (!validateForm()) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }, 100);
      return;
    }

    try {
      const response = await fetch(
        "https://account.babahub.co/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, dob, password }),
        }
      );

      const data = await response.json();

      if (data.ok) {
        Alert.alert("Success", "Account created successfully!", [
          {
            text: "OK",
            onPress: () => {
              clearForm();
              router.back();
            },
          },
        ]);
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to connect to server");
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  const scrollViewRef = React.useRef();

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.header}>Create Account</Text>
        <Text style={styles.subHeader}>
          Fill in your details to create a new account
        </Text>

        {/* Name */}
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          placeholder="John Doe"
          style={[
            styles.input,
            nameFocus && styles.inputActive,
            errors.name && styles.inputError,
          ]}
          value={name}
          onChangeText={(text) => {
            setName(text);
            if (errors.name && text.trim()) {
              setErrors((prev) => ({ ...prev, name: "" }));
            }
          }}
          onFocus={() => setNameFocus(true)}
          onBlur={() => setNameFocus(false)}
          underlineColorAndroid="transparent"
          selectionColor="#3366FF"
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        {/* Email */}
        <Text style={styles.label}>Email *</Text>
        <TextInput
          placeholder="hello@example.com"
          style={[
            styles.input,
            emailFocus && styles.inputActive,
            errors.email && styles.inputError,
          ]}
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email && text.trim()) {
              setErrors((prev) => ({ ...prev, email: "" }));
            }
          }}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          underlineColorAndroid="transparent"
          selectionColor="#3366FF"
          autoCapitalize="none"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        {/* DOB */}
        <Text style={styles.label}>Date of Birth *</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <View
            style={[
              styles.input,
              dobFocus && styles.inputActive,
              errors.dob && styles.inputError,
              styles.dobInput,
            ]}
          >
            <Text style={[dob ? styles.dobText : styles.placeholderText]}>
              {dob || "DD/MM/YYYY"}
            </Text>
            <MaterialIcons name="calendar-today" size={20} color="#888" />
          </View>
        </TouchableOpacity>
        {errors.dob ? <Text style={styles.errorText}>{errors.dob}</Text> : null}

        {/* Date Picker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          maximumDate={new Date()}
          date={selectedDate}
          onConfirm={handleConfirmDate}
          onCancel={() => setDatePickerVisibility(false)}
        />

        {/* Password */}
        <Text style={styles.label}>Password *</Text>
        <View
          style={[
            styles.passwordInputContainer,
            passwordFocus && styles.inputActive,
            errors.password && styles.inputError,
          ]}
        >
          <TextInput
            placeholder="••••••••"
            style={styles.passwordInput}
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password && text) {
                setErrors((prev) => ({ ...prev, password: "" }));
              }
              if (errors.confirmPassword && text === confirmPassword) {
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }
            }}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            underlineColorAndroid="transparent"
            selectionColor="#3366FF"
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <MaterialIcons
              name={passwordVisible ? "visibility" : "visibility-off"}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password *</Text>
        <View
          style={[
            styles.passwordInputContainer,
            confirmPasswordFocus && styles.inputActive,
            errors.confirmPassword && styles.inputError,
          ]}
        >
          <TextInput
            placeholder="••••••••"
            style={styles.passwordInput}
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (errors.confirmPassword && text) {
                setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              }
            }}
            onFocus={() => setConfirmPasswordFocus(true)}
            onBlur={() => setConfirmPasswordFocus(false)}
            underlineColorAndroid="transparent"
            selectionColor="#3366FF"
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <MaterialIcons
              name={confirmPasswordVisible ? "visibility" : "visibility-off"}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword ? (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        ) : null}

        <Mybutton btntitle="Create Account" onPress={handleCreateAccount} />

        <TouchableOpacity onPress={handleBackToLogin}>
          <Text style={styles.backToLogin}>Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: width > 500 ? width * 0.15 : 24,
    paddingVertical: height < 700 ? 20 : 40,
    backgroundColor: "#fff",
    minHeight: height,
  },
  header: {
    fontSize: width > 400 ? 32 : 28,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
    textAlign: "center",
    marginTop: height * 0.02,
  },
  subHeader: {
    fontSize: width > 400 ? 18 : 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: width * 0.05,
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
    fontSize: width > 400 ? 16 : 14,
    color: "#333",
  },
  input: {
    height: height < 700 ? 45 : 50,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 18,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: width > 400 ? 16 : 15,
    justifyContent: "center",
  },
  inputActive: {
    borderColor: "#3366FF",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  dobInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dobText: {
    fontSize: width > 400 ? 16 : 15,
    color: "#000",
  },
  placeholderText: {
    fontSize: width > 400 ? 16 : 15,
    color: "#888",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    marginBottom: 10,
    height: height < 700 ? 45 : 50,
  },
  passwordInput: {
    flex: 1,
    fontSize: width > 400 ? 16 : 15,
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
    color: "#000",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginBottom: 15,
    marginTop: -5,
  },
  backToLogin: {
    color: "#3366FF",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
    fontWeight: "600",
    fontSize: width > 400 ? 16 : 14,
  },
});

export default CreateAccount;
