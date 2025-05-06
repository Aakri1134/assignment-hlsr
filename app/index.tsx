import styles from "@/style/styles"
import { useEffect, useState, useRef } from "react"
import { Platform, Text, View } from "react-native"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import axios from "axios"
import Output from "@/components/Output"
import {
  backgroundColor,
  buttonColor,
  screenHeight,
  screenWidth,
  transitionColor,
} from "@/utils/Constants"
import { Button } from "@react-navigation/elements"

export default function Index() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<any>("")
  const [showOutput, setShowOutput] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(true)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    setShowOutput(false)
    setOutput("")
    setLoading(true)
    handleTimeout()
  }, [input])

  function handleTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(callBackend, 1000)
    return
  }

  async function callBackend() {
    if (input == "") return
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`
      )
      const data = res.data
      setOutput(
        data[0].meanings ? data[0].meanings : { err: "No Meaning found" }
      )
      setLoading(false)
    } catch (e: any) {
      if (e?.response?.status === 404) {
        setOutput({ err: "Term not found" })
      } else if (e?.message?.includes("Network Error")) {
        setOutput({ err: "Network error. Please check your connection." })
      } else {
        setOutput({ err: "Something went wrong. Please try again." })
      }
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          height: "30%",
          minHeight: 250,
          maxHeight: 350,
          backgroundColor: backgroundColor,
          flexDirection: "column",
          justifyContent: "space-around",
          padding: 10,
          borderColor: transitionColor,
          borderBottomWidth: 8,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text style={{ ...styles.text.heading, color: "white" }}>
          Enter Word Here...
        </Text>
        <TextInput
          style={{
            ...styles.inputBar,
            height: "25%",
            padding: 10,
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 15,
            borderStyle: "dashed",
            fontSize: 20,
            justifyContent: "center",
          }}
          placeholder="Input Word"
          onChange={(e) => setInput(e.nativeEvent.text)}
          onSubmitEditing={() => setShowOutput(true)}
        />
        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <Button
            onTouchStart={() => {
              setShowOutput(true)
            }}
            color="white"
            style={{
              width: 150,
              backgroundColor: buttonColor,
            }}
          >
            Search
          </Button>
        </View>
      </View>
      <ScrollView>
        {output != "" && !output.err && showOutput ? (
          !loading ? (
            <Output data={output} />
          ) : <Text>Loading...</Text>
        ) : output.err && showOutput ? (
          <Text
            style={{
              fontSize: 40,
              marginTop: 10,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {output.err}
          </Text>
        ) : null}
      </ScrollView>
    </View>
  )
}
