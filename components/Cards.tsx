import styles from "@/style/styles"
import { meaning } from "@/types/types"
import { useRef, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { screenWidth } from "@/utils/Constants"

const Card = ({ partOfSpeech, definitions, synonyms, antonyms }: meaning) => {
  const means = useRef<number>(0)
  const syns = useRef<number>(0)
  const ants = useRef<number>(0)

  const [isExpanded, setIsExpanded] = useState<Boolean>(false)

  means.current = 0
  syns.current = 0
  ants.current = 0
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "blue",
        padding: 10,
        width : screenWidth
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        onPressOut={() => setIsExpanded(x => !x)}
      >
        <Ionicons name="arrow-forward-circle" size={24} color="black" style={{transform : [{ rotate: isExpanded ? '90deg' : '0deg' }] }}/>
        <Text style={styles.text.heading}>{partOfSpeech.toUpperCase()}</Text>
      </TouchableOpacity>
      {(isExpanded)? <>
      {definitions.map((definition) => {
        means.current = means.current + 1
        return (
          <View key={means.current}>
            <Text style={styles.text.subHeading}>
              Meaning {means.current} :
            </Text>
            <Text>{definition.definition}</Text>
          </View>
        )
      })}
      <Text style={styles.text.subHeading}>Synonyms : </Text>
      {synonyms.length > 0 ? (
        synonyms.map((synonym) => {
          syns.current = syns.current + 1
          return (
            <Text key={syns.current}>
              {syns.current}. {synonym}
            </Text>
          )
        })
      ) : (
        <Text>No Synonyms Found</Text>
      )}
      <Text style={styles.text.subHeading}>Antonyms : </Text>
      {antonyms.length > 0 ? (
        antonyms.map((antonym) => {
          ants.current = ants.current + 1
          return (
            <Text key={ants.current}>
              {ants.current}. {antonym}
            </Text>
          )
        })
      ) : (
        <Text>No Antonyms Found</Text>
      )}
      </> : null}
    </View>
  )
}
export default Card
