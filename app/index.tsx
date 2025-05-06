import styles from "@/style/styles"
import { useEffect, useState, useRef } from "react"
import { Platform, Text, View } from "react-native"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import axios from "axios"
import Output from "@/components/Output"
import {
  backgroundColor,
  transitionColor,
} from "@/utils/Constants"
import { Button } from "@react-navigation/elements"

export default function Index() {
  const [input, setInput] = useState("") // stores value in TextInput
  const [output, setOutput] = useState<any>("") // stores the data recieved from backend
  const [showOutput, setShowOutput] = useState<boolean>(false) // As data is fetched asynchronously from user's search request, this keeps track if user wants to see the result
  const [loading, setLoading] = useState<boolean>(true) // is true when data is being fetched

  const timeoutRef = useRef<number | null>(null) // used in handleTimeout

  useEffect(() => {
    setShowOutput(false)
    setOutput("")
    setLoading(true)
    handleTimeout()
  }, [input])

  useEffect(() => {
    setLoading(false)
  }, [output])

  // handleTimeout => it will call the API if the input field has not been updated for 1 sec, this helps in faster search time
  function handleTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(callBackend, 1000)
    return
  }
  // callBackend => used to make the GET request from backend API
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
          style={styles.inputBar}
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
            style={styles.button}
          >
            Search
          </Button>
        </View>
      </View>
      <ScrollView>
        {(loading && showOutput)?<Text style={styles.text.error}>Loading...</Text>:null}
        {output != "" && !output.err && showOutput ? (
            <Output data={output} />
        ) : output.err && showOutput ? (
          <Text
            style={styles.text.error}
          >
            {output.err}
          </Text>
        ) : null}
      </ScrollView>
    </View>
  )
}
