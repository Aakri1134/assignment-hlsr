import styles from "@/style/styles"
import { meaning, noMeaning } from "@/types/types"
import { useEffect, useRef } from "react"
import { Text, View } from "react-native"
import Card from "./Cards"

const Output = ({ data }: { data: meaning[] | null }) => {
  const Keys = useRef<number>(0)

  return (
    <View
      style={{
        flex: 1,
        alignItems: "stretch",
        gap: 5,
      }}
    >
      {data != null
        ? data.map(
            ({ partOfSpeech, definitions, synonyms, antonyms }: meaning) => {
              Keys.current = Keys.current + 1
              return (
                <Card
                  key={Keys.current}
                  partOfSpeech={partOfSpeech}
                  definitions={definitions}
                  synonyms={synonyms}
                  antonyms={antonyms}
                />
              )
            }
          )
        : null}
    </View>
  )
}

export default Output
