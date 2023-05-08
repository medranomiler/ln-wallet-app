import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Stack } from "expo-router";
import { useAuth } from "../../context/auth";
import { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSignIn = () => {
    setLoading(true)
    signIn(email.toLocaleLowerCase(), password);
  }


return (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.modalContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
        <Stack.Screen 
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitle: "",
          headerShadowVisible: false, 
          }} 
          />
        <View>
          <View style={styles.buttonContainer}>
            <Text style={styles.textInputLabel}>Email</Text>
            <TextInput 
              style={styles.textInput} 
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.textInputLabel}>Password</Text>
            <TextInput 
              style={styles.textInput} 
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button}
              onPress={handleSignIn}
            >
              <Text style={styles.text}>
                {loading? "Loading" : "Sign In" }
              </Text><MaterialCommunityIcons name="login" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'black'
},
buttonContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  height: 140
},
button: {
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: 'center',
  backgroundColor: '#DDDDDD',
  padding: 10,
  borderRadius: 10,
  width: 120,
},
text: {
  fontSize: 20,
},
textInput:{
  height: 40,
  margin: 12,
  borderWidth: 1,
  borderColor: 'white',
  borderRadius: 10,
  color: 'white',
  width: 240,
  padding: 10,
  fontSize: 20,
  alignSelf: 'center',
  textAlign: 'center',
},
textInputLabel: {
  color: 'white',
  fontSize: 24,
},
});