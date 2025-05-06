// used to store common CSS styles

import { buttonColor, InputFieldColor } from "@/utils/Constants"

const styles = {
  container: {
    flex : 1,
    flexDirection : 'column' as "column",
    gap : 5,
    justifyContent : 'space-around' as 'space-around'
  },
  inputBar: {
    backgroundColor : InputFieldColor,
    padding: 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    borderStyle: "dashed" as "dashed",
    fontSize: 20,
    justifyContent: "center" as "center",
  },
  tabIcons: {},
  header: {},
  text: {
    error : {
      fontSize: 40,
      marginTop: 10,
      textAlign: "center" as "center",
      fontWeight: "bold" as "bold",
    },
    heading: {
      fontSize : 30,
      fontWeight : "bold" as "bold"
    },
    para: {
      paddingLeft : 15
    },
    subHeading: {
      fontWeight : '600' as '600',
      fontSize : 20,
    },
  },
  button : {
      width: 150,
      backgroundColor: buttonColor
  }
}

export default styles
