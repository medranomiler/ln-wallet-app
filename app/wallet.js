import { useState, useEffect, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, RefreshControl, ScrollView, } from 'react-native'
import { useRouter } from "expo-router"
import { Image } from 'expo-image'
import { styles } from '../components/styles'
import { Feather } from '@expo/vector-icons'
import { useAuth } from "../context/auth"
import { getBalance } from "../hooks/getBalance"

export default function Wallet() {
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const [name, setName] = useState('')
  const [balance, setBalance] = useState('')

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    useGetBalance()
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const useGetBalance = async () => {
    const [walletName, walletBalance] = await getBalance(user)
    setName(walletName)
    setBalance(walletBalance)
  }

  useGetBalance()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.headerContainer}>
        <Text style={styles.header}>{name}</Text>
        <Text style={styles.balance}>{balance} sats</Text>
        <Image style={styles.logo} source={user.profilePhoto} />          
        <View style={styles.container2}>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={() => {
                    router.push("/receiveModal")}}
                  >
                  <Text style={styles.sendButtonText}>Recieve</Text>
                  <Feather name="arrow-down-left" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={() => {
                    router.push("/sendModal");
                  }}
                  >
                  <Text style={styles.sendButtonText}>Send</Text>
                  <Feather name="send" size={24} color="black" />
                </TouchableOpacity>      
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
