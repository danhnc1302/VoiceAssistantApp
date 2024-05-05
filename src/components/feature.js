import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


const Feature = () => {
  return (
    <View style={{ heigh: hp(60) }} className="space-y-4">
      <Text style={{ fontSize: wp(6.5) }} className="font-semibold text-gray-700">Features</Text>
      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
            <Image source={require("../../assets/images/chatgpticon.png")} style={{ width: hp(5), height: hp(5), borderRadius: hp(1.5), overflow: 'hidden' }}/>
            <Text style={{ fontSize: wp(4.8) }} className="font-semibold text-gray-700">ChatGPT</Text>
        </View>
        <Text style={{ fontSize: wp(3.8) }} className="text-gray-700 font-medium">
            ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topics 
        </Text>
      </View>
      <View className="bg-purple-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
            <Image source={require("../../assets/images/dalleicon.png")} style={{ width: hp(5), height: hp(5), borderRadius: hp(1.5), overflow: 'hidden' }}/>
            <Text style={{ fontSize: wp(4.8) }} className="font-semibold text-gray-700">DALL-E</Text>
        </View>
        <Text style={{ fontSize: wp(3.8) }} className="text-gray-700 font-medium">
            DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.
        </Text>
      </View>
      <View className="bg-cyan-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
            <Image source={require("../../assets/images/smarticon.png")} style={{ width: hp(5), height: hp(5), borderRadius: hp(1.5), overflow: 'hidden' }}/>
            <Text style={{ fontSize: wp(4.8) }} className="font-semibold text-gray-700">Smart AI</Text>
        </View>
        <Text style={{ fontSize: wp(3.8) }} className="text-gray-700 font-medium">
            A powerful voice assistant with the abilities of ChatGPT and Dall-E, providing you the best of both worlds.
        </Text>
      </View>
    </View>
  )
}

export default Feature

const styles = StyleSheet.create({})