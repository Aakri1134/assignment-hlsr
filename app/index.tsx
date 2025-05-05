import styles from "@/style/styles";
import { useEffect, useState, useRef } from "react";
import { Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Output from "@/components/Output";
import { screenWidth } from "@/utils/Constants";
import { Button } from "@react-navigation/elements";

export default function Index() {

  const [input, setInput] = useState("");
  const [output, setOutput] = useState<any>("");
  const [showOutput, setShowOutput] = useState<boolean>(false)
  
  const timeoutRef = useRef<number | null>(null)
  
  useEffect(() => {
    setShowOutput(false)
    setOutput("")
    handleTimeout()
  }, [input])

  function handleTimeout(){
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(callBackend, 1000)
    return;
  }

  async function callBackend(){
    if(input == "") return ;
    try{
      const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
      const data = res.data
    setOutput((data[0].meanings)?data[0].meanings:{err : "No Meaning found"});

    }catch(e){
      setOutput({err : "No Meaning found"});
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{...styles.text.heading, textAlign: "left", marginTop : 15, width: screenWidth, paddingLeft : 10}}>Enter Word Here...</Text>
      <TextInput
        style={styles.inputBar}
        placeholder="Input Word"
        onChange={e => setInput(e.nativeEvent.text)}
        onSubmitEditing={() => setShowOutput(true)}
      />
      <Button onTouchStart={() => {setShowOutput(true)}} style={{ width : 150}}>Search</Button>
      <Text style={{...styles.text.heading, textAlign: "left", width: screenWidth, paddingLeft : 10}}>Meaning...</Text>
      
      <ScrollView>
      {(output != "" && !output.err && showOutput)?<Output data={output}/>:
      (output.err && showOutput)? <Text>NO Meaning available</Text> :null}
    </ScrollView>
    </SafeAreaView>
  );
}



