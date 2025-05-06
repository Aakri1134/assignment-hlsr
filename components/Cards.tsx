// This Component Generates the Meaning Cards categoried under parts of speech

import styles from "@/style/styles"
import { meaning } from "@/types/types"
import {
  InputFieldColor,
  meanBorderColor,
  meanTextColor,
  screenWidth,
} from "@/utils/Constants"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useRef, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

const Card = ({ partOfSpeech, definitions, synonyms, antonyms }: meaning) => {
  const means = useRef<number>(0)

  const [isExpanded, setIsExpanded] = useState<Boolean>(false)

  means.current = 0
  return (
    <View
      style={{
        backgroundColor: InputFieldColor,
        padding: 10,
        width: screenWidth - 20,
        borderWidth: 2,
        borderColor: meanBorderColor,
        borderStyle : 'dashed'
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
        <Text style={{ ...styles.text.heading, color: meanTextColor }}>
          {partOfSpeech.toUpperCase()}
        </Text>
      </TouchableOpacity>
      {isExpanded ? (
        <View
          style={{
            paddingLeft: 10,
          }}
        >
          {definitions.map((definition) => {
            means.current = means.current + 1
            return (
              <View key={means.current}>
                <Text style={styles.text.subHeading}>
                  Meaning {means.current} :
                </Text>
                <Text style={styles.text.para}>{definition.definition}</Text>
              </View>
            )
          })}
        </View>
      ) : null}
    </View>
  )
}
export default Card
