import { StyleSheet, SafeAreaView, View, Text } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { Stack, useRouter } from "expo-router"
import { Image } from 'expo-image'

import Blocks from "../components/Blocks"
import BitcoinPrice from "../components/BitcoinPrice"
import MempoolDataTable from "../components/MempoolDataTable"
import MempoolLogo from "../components/mempool-space-logo-bigger.png"


export default function Mempool() {
  const router = useRouter()

      return(
        <>
        <Stack.Screen
        options={{
          title: "My home",
          headerStyle: { backgroundColor: "#f8fafc" },
          headerTintColor: "black",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "",
          headerLeft: () => <Feather name="home" size={24} color="black" onPress={() => {
            router.push("/")}}/>,
          headerRight: () => <Feather name="settings" size={24} color="black" onPress={() => {
            router.push("/settingsModal")}}/>,
        }}
      />
        <SafeAreaView style={styles.safeAreaContainer}>
          <View>
            <BitcoinPrice />
            <Blocks />          
            <MempoolDataTable />
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>Data provided by:  </Text>      
            <Image 
              style={styles.logo} 
              source={MempoolLogo}
              contentFit='contain'
            />
            </View> 
          </View>
   
        </SafeAreaView>
        
        </>
      )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 12,
  },
  logoContainer:{
    backgroundColor: "#e2e8f0", 
    padding: 10, 
    marginVertical: 8, 
    borderRadius: 10
  },
  logoText:{
    fontSize: 24, 
    fontWeight: "bold", 
    textAlign: "center"
  },
  logo:{
    height: 100,
  }
});
