import { screenHeight, screenWidth } from "@/utils/Constants"

const styles = {
  container: {
    flex: 1,
    justifyContent : "center" as "center",
    alignItems : "center" as "center",
    backgroundColor: "yellow",
    width: screenWidth,
  },
  inputBar: {
    borderWidth: 4,
    marginTop: 20,
    borderColor: "black",
    width: 350,
    borderRadius: 20,
    paddingLeft: 20,
    marginBottom : 10
  },
  tabIcons: {},
  header: {},
  text: {
    heading: {
      fontSize: 20,
      fontWeight: "bold" as "bold",
    },
    para: {},
    subHeading: {
      fontSize: 15,
      fontWeight: "500" as "400",
    },
  },
}

export default styles
