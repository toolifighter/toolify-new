import React from "react";
import {Picker, ScrollView, Text, TextInput, View} from "react-native";
import styles from "../../styles";
import {Body, Header, Icon, Left} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";

export default class Velocity extends React.Component {

	stateDefault = {
		unitStart: null,
	};

	state = this.stateDefault;

	reset = () => {
		state = this.stateDefault;
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.container}>
					<Header style={styles.header}>
						<Left style={styles.headerContents}>
							<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}
								  style={styles.icon}/>
						</Left>
						<Body style={styles.headerContents}>
						<Text style={styles.headerText}>Einheiten</Text>
						</Body>
					</Header>
				</View>

				<ScrollView>
					<View style={styles.container}>
						<TextInput onChangeText={itemValue => this.setState({startValue: itemValue})}
								   value={this.state.startValue}
								   style={styles.inputText}
								   placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"
						/>
						<Picker
							selectedValue={this.state.unitStart}
							style={[styles.inputPicker]}
							onValueChange={itemValue => this.setState({unitStart: itemValue})}
						>
							<Picker.Item
								label="Auswählen"
								value=""
								style={styles.inputText}
							/>
							<Picker.Item
								label="km/h"
								value="km/h"
								style={styles.inputText}
							/>
							<Picker.Item
								label="m/s"
								value="m/s"
								style={styles.inputText}
							/>
							<Picker.Item
								label="m/h"
								value="m/h"
								style={styles.inputText}
							/>
							<Picker.Item
								label="km/s"
								value="km/s"
								style={styles.inputText}
							/>
							<Picker.Item
								label="mi/h"
								value="mi/h"
								style={styles.inputText}
							/>
							<Picker.Item
								label="mi/s"
								value="mi/s"
								style={styles.inputText}
							/>
						</Picker>
					</View>
					<View style={styles.container}>
						<Text>umrechnen in</Text>
						<MaterialIcons name="compare-arrows" size={22}/>
					</View>
				</ScrollView>
			</View>
		);
	}
}