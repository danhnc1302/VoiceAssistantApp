import React, { useState, useEffect, useRef } from 'react'
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Feature from '../components/feature'
import Voice from '@wdragon/react-native-voice';
import { apiCall } from '../api/openAI'
import Tts from 'react-native-tts';

const HomeScreen = () => {
  const [messages, setMessages] = useState([])
  const [recording, setRecording] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const ScrollViewRef = useRef()

  const clearMessages = () => {
    Tts.stop()
    setMessages([])
  }

  const stopSpeaking = () => {
    Tts.stop()
    setSpeaking(false)
  }

  const speechStartHandler = (e) => {
    console.log("speechStartHandler")
  }

  const speechEndHandler = (e) => {
    setRecording(false)
    console.log("speechEndHandler")

  }

  const speechResultsHandler = (e) => {
    console.log("speechResultsHandler: ", e)
    const text = e.value[0]
    setResult(text)
  }

  const speechErrorHanlder = (e) => {
    console.log("speechErrorHanlder: ", e)
  }

  const startRecording = async () => {
    setRecording(true)
    Tts.stop()
    try {
      await Voice.start('en-GB')
    } catch (error) {
      console.log("error: ", error)
    }
  }

  const stopRecording = async () => {
    try {
      await Voice.stop()
      setRecording(false)
      fetchResponse()
    } catch (error) {
      console.log("error: ", error)
    }
  }

  const fetchResponse = () => {
    if (result.trim().length > 0) {

      let newMessages = [...messages]
      newMessages.push({
        role: "user",
        content: result.trim()
      })
      setMessages([...newMessages])
      updateScrollView()
      setLoading(true)
      apiCall(result.trim(), newMessages).then(res => {
        setLoading(false)
        if (res.success) {
          setMessages([...res.data])
          updateScrollView()
          setResult("")
          startTextToSpeech(res.data[res.data.length - 1])
        } else {
          Alert.alert("Error", res.msg)
        }
      })
    }
  }

  const startTextToSpeech = () => {
    if (!messages.content.includes("https")) {
      setSpeaking(true)
      if (Platform.OS === "ios") {
        Tts.speak('Hello, world!', {
          iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
          rate: 0.5,
        })
      } else {
        Tts.speak(messages.content, {
          androidParams: {
            KEY_PARAM_PAN: -1,
            KEY_PARAM_VOLUME: 0.5,
            KEY_PARAM_STREAM: 'STREAM_MUSIC',
          },
        })
      }
    }
  }

  const updateScrollView = () => {
    setTimeout(() => {
      ScrollViewRef?.current?.scrollToEnd({ animated: true })
    }, 200)
  }

  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler
    Voice.onSpeechEnd = speechEndHandler
    Voice.onSpeechResults = speechResultsHandler
    Voice.onSpeechError = speechErrorHanlder

    Tts.addEventListener('tts-start', (event) => console.log("start", event));
    Tts.addEventListener('tts-progress', (event) => console.log("progress", event));
    Tts.addEventListener('tts-finish', (event) => {
      console.log("finish", event)
      setSpeaking(false)
    })
    Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex-row justify-center">
          <Image source={require("../../assets/images/bot.png")} style={{ width: hp(15), height: hp(15), marginTop: 40 }} />
        </View>

        {
          messages.length > 0 ? (
            <View className="space-y-2 flex-1">
              <Text style={{ fontSize: wp(5) }} className="text-gray-700 font-semibold ml-1">Assistant</Text>
              <View className="bg-neutral-200 rounded-3xl p-4">
                <ScrollView
                  ref={ScrollViewRef}
                  bounces={false}
                  className="space-y-4"
                  showsVerticalScrollIndicator={false}
                >
                  {
                    messages.map((message, index) => {
                      if (message.role == "assistant") {
                        if (message.content.includes("https")) {
                          return (
                            <View key={index} className="flex-row justify-start">
                              <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                                <Image key={index} source={{ uri: message.content }} style={{ width: wp(60), height: wp(60) }} className="rounded-2xl" />
                              </View>
                            </View>
                          )
                        } else {
                          return (
                            <View key={index} style={{ width: wp(70) }} className="bg-emerald-100 rounded-xl  p-2 rounded-tl-none">
                              <Text>{message.content}</Text>
                            </View>
                          )
                        }
                      } else {
                        return (
                          <View key={index} className="flex-row justify-end">
                            <View style={{ width: wp(70) }} className="bg-white rounded-xl p-2 rounded-tr-none">
                              <Text>{message.content}</Text>
                            </View>
                          </View>
                        )
                      }
                    })
                  }
                </ScrollView>
              </View>
            </View>
          ) : (
            <Feature />
          )
        }
        <View className="flex justify-center items-center my-4">
          {
            loading ? (
              <Image source={require("../../assets/images/loading.gif")} style={{ width: hp(10), height: hp(10) }} />
            ) :
              recording ? (
                <TouchableOpacity onPress={stopRecording}>
                  <Image source={require("../../assets/images/voiceloading_new.gif")} style={{ width: hp(10), height: hp(10) }} className="rounded-full" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={startRecording}>
                  <Image source={require("../../assets/images/recordingicon.png")} style={{ width: hp(8), height: hp(8) }} className="rounded-full" />
                </TouchableOpacity>
              )
          }
          {
            messages.length > 0 && (
              <TouchableOpacity onPress={clearMessages} className="bg-neutral-400 rounded-3xl p-2 absolute right-10">
                <Text className="text-white font-semibold">Clear</Text>
              </TouchableOpacity>
            )
          }
          {
            speaking && (
              <TouchableOpacity onPress={stopSpeaking} className="bg-red-400 rounded-3xl p-2 absolute left-10">
                <Text className="text-white font-semibold">Stop</Text>
              </TouchableOpacity>
            )
          }
        </View>
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen
