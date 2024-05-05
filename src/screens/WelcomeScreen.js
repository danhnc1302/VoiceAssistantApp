import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'


const WelcomeScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white">
      <View className="space-y-2">
        <Text style={{ fontSize: wp(10) }} className="text-center font-bold text-gray-700">
          Danh's ChatBot
        </Text>
        <Text style={{ fontSize: wp(4) }} className="text-center tracking-wider text-gray-600 font-semibold">
          The Future is here, powered by AI
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Image source={require("../../assets/images/welcome.png")} style={{ width: wp(60), height: wp(60), borderRadius: wp(5) }} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")} className="bg-sky-500 mx-6 p-4 rounded-2xl">
        <Text style={{ fontSize: wp(6) }} className="text-center font-bold text-white">Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({})