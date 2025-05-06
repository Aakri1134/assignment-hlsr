// This Component Generates the Synonym Card


import styles from "@/style/styles"
import { meaning } from "@/types/types"
import {
  screenWidth,
} from "@/utils/Constants"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useRef, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

const Synonyms = ({ data }: { data: meaning[] | null }) => {
  const [isExpanded, setIsExpanded] = useState<Boolean>(false)
  const [synonyms, setSynonyms] = useState<String[]>([])
  const syns = useRef<number>(0)

  useEffect(() => {
    if (data != null)
      data.map((meaning: meaning) => {
        setSynonyms((x) => [...x, ...meaning.synonyms])
      })
  }, [data])

  useEffect(() => {
    syns.current = 0
  }, [isExpanded])

  return (
    <View
      style={{
        padding: 10,
        width: screenWidth - 20,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        onPressOut={() => setIsExpanded((x) => !x)}
      >
        <Ionicons
          name="arrow-forward-circle"
          size={24}
          color="black"
          style={{ transform: [{ rotate: isExpanded ? "90deg" : "0deg" }] }}
        />
        <Text
          style={{ ...styles.text.heading, fontSize: 40, textAlign: "center" }}
        >
          Synonyms
        </Text>
      </TouchableOpacity>
      {isExpanded ? (
        <View
          style={{
            paddingLeft: 10,
          }}
        >
          {synonyms.length > 0 ? (
            <>
              {synonyms.map((syn) => {
                syns.current = syns.current + 1
                return (
                  <Text key={syns.current} style={{...styles.text.subHeading}}>
                    {syns.current}. {syn}
                  </Text>
                )
              })}
            </>
          ) : 
          <Text style={{...styles.text.subHeading}}> No Synonyms Found </Text>}
        </View>
      ) : null}
    </View>
  )
}
export default Synonyms
