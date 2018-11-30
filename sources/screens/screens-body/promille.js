import React from 'react';
import styles from "../../styles";
import {Picker, ScrollView, Text, TextInput, View, TouchableOpacity} from "react-native";
import {Body, Header, Icon, Left} from "native-base";

export default class Promille extends React.Component {

	stateDefault = {
		refresh: 0,
		drinkElements: [],
	};

	state = this.stateDefault;

	helperDefault = {
		lastElementKey: 0,
	};

	helper = this.helperDefault;

	reset = () => {
		state = this.stateDefault;
		helper = this.helperDefault;
	};

	addDrinkElement = () => {
		this.state.drinkElements.push(<Text>Elem</Text>);
		console.log(this.state.drinkElements);
	};

	render() {
		return(
			<ScrollView>
				<View style={styles.container}>
					<Header style={styles.header}>
						<Left style={styles.headerContents}>
							<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}
								  style={styles.icon}/>
						</Left>
						<Body style={styles.headerContents}>
						<Text style={styles.headerText}>Körper</Text>
						</Body>
					</Header>
				</View>
				<View style={styles.inputContainer}>
					<Text style={styles.inputText}>Geschlecht:</Text>
					<Picker
						selectedValue={this.state.sex}
						style={[styles.inputPicker]}
						onValueChange={(itemValue) => this.setState({sex: itemValue})}>
						<Picker.Item label="Auswählen" value="" style={styles.inputText}/>
						<Picker.Item label="weiblich" value="w" style={styles.inputText}/>
						<Picker.Item label="männlich" value="m" style={styles.inputText}/>
					</Picker>
					<Text style={styles.inputText}>Gewicht (kg):</Text>
					<TextInput onChangeText={this.eingabeGewicht} value={this.state.gewicht} style={styles.inputText}
							   placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"/>
					<Text style={styles.inputText}>Getrunkene Alkoholmenge:</Text>
					<TouchableOpacity onPress={this.addDrinkElement}>
						<View style={styles.buttonContainer}>
							<View style={styles.floatingActionButton} elevation={5}>
								<Icon name="md-add" style={styles.icon}/>
							</View>
							<Text style={[styles.inputText, {marginTop: 8}]}>Getränk hinzufügen</Text>
						</View>
					</TouchableOpacity>
					{this.state.drinkElements}
					<TextInput onChangeText={this.eingabeAlter} value={this.state.alter} style={styles.inputText}
							   placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"/>
				</View>
			</ScrollView>
		)
	}
}