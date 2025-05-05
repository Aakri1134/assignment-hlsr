import styles from "@/style/styles"
import { meaning, noMeaning } from "@/types/types"
import { useEffect, useRef } from "react"
import { Text, View } from "react-native"

const Output = ({ data }: { data: meaning[] | null }) => {
  const num = useRef<number>(0)
  const means = useRef<number>(0)
  const syns = useRef<number>(0)
  const ants = useRef<number>(0)
  return (
    <View
      style={{
        flex: 1,
        alignItems: "stretch",
        gap: 5,
      }}
    >
      {data != null
        ? data.map((meaning: meaning) => {
            const { partOfSpeech, definitions, synonyms, antonyms }: meaning =
              meaning
            num.current = num.current + 1
            means.current = 0
            syns.current = 0
            ants.current = 0
            return (
              <View
                key={num.current}
                style={{
                  flex: 1,
                  backgroundColor: "blue",
                  padding: 10,
                }}
              >
                <Text style={styles.text.heading}>
                  {partOfSpeech.toUpperCase()}
                </Text>
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
                {syns.current == 0 ? <Text>No Synonyms Found</Text> : null}
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
              </View>
            )
          })
        : null}
    </View>
  )
}

export default Output
