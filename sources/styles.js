import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
	inputContainer:    {
		paddingTop:      50,
		paddingBottom:   50,
		paddingLeft:     20,
		paddingRight:    20,
		backgroundColor: "#242424",
		flex:            1,
		flexDirection:   "column",
		justifyContent:  "space-around",
	},
	inputText:         {
		color:         "#fff",
		fontSize:      20,
		paddingBottom: 10,
		marginBottom:  5,
	},
	inputPicker:       {
		color:        "#ccc",
		marginBottom: 5,
	},
	bmiContainer:      {
		maxHeight: 300,
		minHeight: 300,
	},
	notification:      {
		marginTop:    5,
		marginBottom: 5,
		marginLeft:   20,
		marginRight:  20,
		borderRadius: 5,
	},
	notificationImage: {
		width:          300,
		height:         200,
		justifyContent: "center",
		alignItems:     "center",
	},
	outputText:        {
		textAlign: "center",
		fontSize:  18,
	},
	outputContainer:   {
		padding: 20,
	},
	containerMeasure:  {
		flex:           1,
		justifyContent: "space-around",
	},
	container:         {
		flex:            1,
		justifyContent:  "flex-start",
		backgroundColor: "#fff",
	},
	headerText:        {
		fontSize:  25,
		color:     "#FFF",
		justifyContent: 'flex-start',
	},
	header:            {
		paddingLeft:     20,
		paddingTop:      45,
		paddingBottom:   15,
		paddingRight:    65,
		height:          "auto",
		backgroundColor: "#000",
		justifyContent: 'flex-start',
	},
	icon:              {
		color: "#fff",
	},
	floatingActionButton: {
		height: 50,
		width: 50,
		margin: 20,
		borderRadius: 30,
		backgroundColor: '#005BFF',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
		shadowColor: '#fff',
		shadowOffset: {
			width: 10,
			height: 10,
		},
		shadowRadius: 5,
		shadowOpacity: 1.0,
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	}
});
export default styles;