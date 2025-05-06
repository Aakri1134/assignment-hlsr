import { meaning } from "@/types/types"
import { useRef } from "react"
import { View, Text } from "react-native"
import Card from "./Cards"
import styles from "@/style/styles"
import Synonyms from "./Synonyms"
import Antonyms from "./Antonyms"

const Output = ({ data }: { data: meaning[] | null }) => {
  const Keys = useRef<number>(0)

  return (
    <View
      style={{
        justifyContent : 'flex-start',
        alignItems: "center",
        gap: 5,
        marginLeft : 10,
        marginRight : 10,
      }}
    >
      <Text style={{...styles.text.heading, fontSize : 40}}>Meanings</Text>
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
      <Synonyms data={data}/>
      <Antonyms data={data}/>
    </View>
  )
}

export default Output
