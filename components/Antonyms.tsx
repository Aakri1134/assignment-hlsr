import styles from "@/style/styles"
import { meaning } from "@/types/types"
import {
  InputFieldColor,
  meanBorderColor,
  meanTextColor,
  screenWidth,
} from "@/utils/Constants"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useEffect, useRef, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"


const Antonyms = ({ data }: { data: meaning[] | null }) => {
  const [isExpanded, setIsExpanded] = useState<Boolean>(false)
  const [antonyms, setAntonyms] = useState<String[]>([])
  const ants = useRef<number>(0)

  useEffect(() => {
    if (data != null)
      data.map((meaning: meaning) => {
        setAntonyms((x) => [...x, ...meaning.antonyms])
      })
  }, [data])

  useEffect(() => {
    ants.current = 0
  }, [isExpanded])

  return (
    <View
      style={{
        padding: 10,
        width: screenWidth - 20,
        alignItems : 'center',
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
          Antonyms
        </Text>
      </TouchableOpacity>
      {isExpanded ? (
        <View
          style={{
            paddingLeft: 10,
          }}
        >
          {antonyms.length > 0 ? (
            <>
              {antonyms.map((ant) => {
                ants.current = ants.current + 1
                return (
                  <Text key={ants.current}>
                    {ants.current}. {ant}
                  </Text>
                )
              })}
            </>
          ) : 
          <Text> No Antonyms Found </Text>}
        </View>
      ) : null}
    </View>
  )
}
export default Antonyms
