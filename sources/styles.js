import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    inputContainer: {
      padding: 40,
      backgroundColor: '#333',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',      
    },
    inputText: {
      color: '#ccc',
      fontSize: 20,
      paddingBottom: 10,
      marginBottom: 5,
    },
    inputPicker: {
      color: '#ccc',
      marginBottom: 5,
    },
    bmiContainer: {
      maxHeight: 300,
      minHeight: 300,
    },
    notification: {
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 5,
    },
    notificationImage: {
      width: 300,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    outputText: {
      textAlign: 'center',
      fontSize: 18,
    },
    outputContainer: {
      padding: 20,
    },
    containerMeasure: {
      flex: 1,
      justifyContent: 'space-around',
    },
    container: {
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor: '#fff',
    },
    button: {
      height: 100,
      fontSize: 40,
    },
    headertext: {
      fontSize: 25,
      textAlign: 'left',
    },
    header : {
      paddingLeft: 20,
      paddingTop: 45,
      paddingBottom: 15,
      height: 'auto',
      backgroundColor: '#DBDBDB'
    },
    // headerContents: {
    //   paddingTop: 15,
    //   paddingBottom: 15,
    //   marginLeft: 5,
    // }
  });
  export default styles;