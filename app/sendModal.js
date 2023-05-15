import { View, Text, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import { useState } from 'react';
import { useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Feather } from '@expo/vector-icons';
import { styles } from '../components/styles';
import { payInvoice } from "../hooks/payInvoice"
import { decodeInvoice } from "../hooks/readInvoice"
import { Foundation } from '@expo/vector-icons';
import axios from 'axios';

export default function Modal() {
    const [invoice, setInvoice] = useState('');
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
    const isPresented = navigation.canGoBack();

    const onPressPayInvoice = async () => {
      setLoading(true)
      const message = await payInvoice(invoice)
      setMessage("Sending Payment")
      setTimeout(() => {
      setMessage(message)
      setLoading(false)
    }, 2000)  
    };

    const readInvoice = async () => {
      const decodedInvoice = await decodeInvoice(invoice)
      setMessage("Decoding Invoice...")
      setTimeout(() => {
      setMessage(`${decodedInvoice.num_satoshis} Sats for ${decodedInvoice.description}`)
    }, 1000)  
    }

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.modalContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modal}>
        {isPresented && 
            <>
            <View>
                <Text style={styles.header}>SEND SATS</Text>
                  <Text style={styles.subheadline}>Enter Invoice</Text>
                  <TextInput
                    style={styles.textInputAmount} 
                    onChangeText={setInvoice}
                    value={invoice} />
                    <View style={styles.container2}>
                        {loading? (
                        <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                        <TouchableOpacity
                          style={styles.sendButton}
                          onPress={readInvoice}
                        >
                            <Text style={styles.sendButtonText}>Read</Text>
                            <Foundation name="magnifying-glass" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.sendButton}
                          
                        >
                            <Text style={styles.sendButtonText}>Sending</Text>
                            <ActivityIndicator size="small" color="black"/>
                        </TouchableOpacity>
                        </View>):(<View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
                        <TouchableOpacity
                          style={styles.sendButton}
                          onPress={readInvoice}
                        >
                            <Text style={styles.sendButtonText}>Read</Text>
                            <Foundation name="magnifying-glass" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.sendButton}
                          onPress={onPressPayInvoice}
                        >
                            <Text style={styles.sendButtonText}>Send</Text>
                            <Feather name="send" size={24} color="black" />
                        </TouchableOpacity>
                        
                          </View>)}
                    </View>
                  <Text style={styles.balance}>
                      {message}
                </Text>
            </View>
            </>
          }
          <StatusBar style="light" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}