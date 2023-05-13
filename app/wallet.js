import { useState, useEffect, useRef, useCallback } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, RefreshControl, ScrollView} from 'react-native'
import { useRouter, Stack } from "expo-router"
import { Image } from 'expo-image'
import { styles } from '../components/styles'
import { Feather } from '@expo/vector-icons'
import { useAuth } from "../context/auth"
import { getBalance } from "../hooks/getBalance"
import History from "../components/history"
import ShowHideButton from '../components/showHideButton'

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
    const [walletName, walletBalance] = await getBalance()
    setName(walletName)
    setBalance(walletBalance)
  }

  useEffect(()=>{
    useGetBalance()
  }, [])
  
  return (
    <>
    <SafeAreaView style={styles.container}>
            <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "My home",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "#f8fafc" },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          headerTitle: "",
          headerLeft: () => <Feather name="home" size={24} color="black" onPress={() => {
            router.push("/")}}/>,
          headerRight: () => <Feather name="settings" size={24} color="black" onPress={() => {
            router.push("/settingsModal")}}/>,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.headerContainer}>
        <Text style={styles.header}>{name}</Text>
        <ShowHideButton> 
        <Text style={styles.satBalance}>⚡{balance}</Text>
        </ShowHideButton>
        </View>
        <Image 
        style={styles.logo} 
        source={user.profilePhoto} 
        contentFit="contain"/>
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

        <History />
      </ScrollView>
    </SafeAreaView>
    </>
  );
}
