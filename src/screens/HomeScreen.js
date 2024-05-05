import React, {useState} from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Feature from '../components/feature'

const HomeScreen = () => {
  const [message, setMessage] = useState([])
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex-row justify-center">
          <Image source={require("../../assets/images/bot.png")} style={{ width: hp(15), height: hp(15), marginTop: 40 }}/>
        </View>

        {
          message.length > 0 ? (
            <View>

            </View>
          ):(
            <Feature/>
          )

        }
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen
