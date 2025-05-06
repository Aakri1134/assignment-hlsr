import { InputFieldColor } from "@/utils/Constants"

const styles = {
  container: {
    flex : 1,
    flexDirection : 'column' as "column",
    gap : 5,
    justifyContent : 'space-around' as 'space-around'
  },
  inputBar: {
    backgroundColor : InputFieldColor
  },
  tabIcons: {},
  header: {},
  text: {
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
  dropdown : {
    
  },
  button : {

  }
}

export default styles
