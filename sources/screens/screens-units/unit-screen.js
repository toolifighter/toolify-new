import React from "react";
import {Picker, ScrollView, Text, TextInput, View, Button} from "react-native";
import styles from "../../styles";
import {Body, Header, Icon, Left} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";

export default class Unit extends React.Component {

	state = {
		unitStart: "null",
		activgeschwindigkeit: false,
		activstrecke: false,
		activmasse: false,
		activeingabe: false,
		ausgabe: false,
		ergebnis: "",
	};
	eingabeeinheit = "null"
	eingabeamount = null
	eingabeumrechnen = "null"
	eingabemultiplyer = null

	Loschen = () => {
		this.setState({
			unitStart: "null",
			activgeschwindigkeit: false,
			activstrecke: false,
			activmasse: false,
			activeingabe: false,
			eingabeeinheit: "null",
			eingabeamount: null,
			eingabeumrechnen: "null",
			eingabemultiplyer: null,
			ausgabe: false,
			ergebnis: "",
		})
	};

	unitStart = (x) => {
		switch (x) {
			case ("null"): {this.setState({unitStart: x, activeingabe: false, activegrose: false, activeumrechnen: false})}break;
			case ("v"): {this.setState({activgeschwindigkeit: true, activstrecke: false, activmasse: false, unitStart: x, activeingabe: true})}break;
			case ("s"): {this.setState({activgeschwindigkeit: false, activstrecke:true, activmasse: false, unitStart: x, activeingabe: true})}break;
			case ("m"): {this.setState({activgeschwindigkeit: false, activstrecke: false, activmasse:true, unitStart: x, activeingabe: true})}break;
		}
	}

	Eingabe = (x) => {
		this.eingabeeinheit = x
		switch (x) {
			case ("null"): {this.eingabemultiplyer = x}break;

			case ("c"): {this.eingabemultiplyer = 1 / 299792458}break;
			case ("m/s"): {this.eingabemultiplyer = 1}break;
			case ("km/h"): {this.eingabemultiplyer = 3.6}break;
			case ("kn"): {this.eingabemultiplyer = 1.94384}break;
			case ("mph"): {this.eingabemultiplyer = 2.23694}break;

			case ("Lj"): {this.eingabemultiplyer = 1 / 9460730472580800}break;
			case ("Ae"): {this.eingabemultiplyer = 1 / 149597870700}break;
			case ("mi"): {this.eingabemultiplyer = 0.000621371}break;
			case ("inch"): {this.eingabemultiplyer = 39.3701}break;
			case ("km"): {this.eingabemultiplyer = 0.001}break;
			case ("m"): {this.eingabemultiplyer = 1}break;
			case ("dm"): {this.eingabemultiplyer = 10}break;
			case ("cm"): {this.eingabemultiplyer = 100}break;
			case ("mm"): {this.eingabemultiplyer = 1000}break;

			case ("kg"): {this.eingabemultiplyer = 1}break;
			case ("g"): {this.eingabemultiplyer = 1000}break;
			case ("t"): {this.eingabemultiplyer = 0.001}break;
			case ("ztr"): {this.eingabemultiplyer = 0.02}break;
			case ("oz"): {this.eingabemultiplyer = 35.274}break;
			case ("lb"): {this.eingabemultiplyer = 2.20462}break;
			case ("EM"): {this.eingabemultiplyer = 1 / (5.9722 * Math.pow(10,24))}break;
			case ("SM"): {this.eingabemultiplyer = 1 / (1.9891 * Math.pow(10,30))}break;
			case ("AM"): {this.eingabemultiplyer = 6.02214 * Math.pow(10,26)}break;
		}
		this.Umrechner(this.eingabeumrechnen);
	}

	Grose = (x) => {
		this.eingabeamount = x
		this.Umrechner(this.eingabeumrechnen);
	}

	Umrechner = (x) => {
		let ergebnis = 0;
		let umrechnermultiplyer = 0;
		this.eingabeumrechnen = x
		switch (x) {
			case ("null"): {}break;

			case ("m/s"): {umrechnermultiplyer = 1} break;
			case ("c"): {umrechnermultiplyer = 1 / 299792458} break;
			case ("km/h"): {umrechnermultiplyer = 3.6} break;
			case ("kn"): {umrechnermultiplyer = 1.94384} break;
			case ("mph"): {umrechnermultiplyer = 2.23694} break;

			case ("Lj"): {umrechnermultiplyer = 1 / 9460730472580800}break;
			case ("Ae"): {umrechnermultiplyer = 1 / 149597870700}break;
			case ("mi"): {umrechnermultiplyer = 0.000621371}break;
			case ("inch"): {umrechnermultiplyer = 39.3701}break;
			case ("km"): {umrechnermultiplyer = 0.001}break;
			case ("m"): {umrechnermultiplyer = 1}break;
			case ("dm"): {umrechnermultiplyer = 10}break;
			case ("cm"): {umrechnermultiplyer = 100}break;
			case ("mm"): {umrechnermultiplyer = 1000}break;

			case ("kg"): {umrechnermultiplyer = 1}break;
			case ("g"): {umrechnermultiplyer = 1000}break;
			case ("t"): {umrechnermultiplyer = 0.001}break;
			case ("ztr"): {umrechnermultiplyer = 0.02}break;
			case ("oz"): {umrechnermultiplyer = 35.274}break;
			case ("lb"): {umrechnermultiplyer = 2.20462}break;
			case ("EM"): {umrechnermultiplyer = 1 / (5.9722 * Math.pow(10,24))}break;
			case ("SM"): {umrechnermultiplyer = 1 / (1.9891 * Math.pow(10,30))}break;
			case ("AM"): {umrechnermultiplyer = 6.02214 * Math.pow(10,26)}break;
		}
		
		this.setState({ausagbe: true})
		if (x != "null") {
			if (this.eingabeamount != null) {
				if (this.eingabeamount != 0) {
					if (this.eingabemultiplyer != "null") {
						ergebnis = this.eingabeamount / this.eingabemultiplyer * umrechnermultiplyer;
						ergebnis = Math.round(ergebnis * 100000000000000000)/100000000000000000;
						console.log(ergebnis + " = " + this.eingabeamount + " / " + this.eingabemultiplyer + " * " + umrechnermultiplyer);
						this.setState({ausgabe: true, ergebnis: ergebnis + "" + x})
					}
				}
			}
		}
		else {this.setState({ausgabe: false, ergebnis: ""})}
		console.log(ergebnis + " = " + this.eingabeamount + " / " + this.eingabemultiplyer + " * " + umrechnermultiplyer);
	}

	render() {
		return (
			<View style={styles.container}>
				<Header style={styles.header}>
					<Left style={styles.headerContents}>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}
							style={styles.icon}/>
					</Left>
					<Body style={styles.headerContents}>
						<Text style={styles.headerText}>Umrechner</Text>
					</Body>
				</Header>
				<ScrollView>
					<View style={[styles.inputContainer, styles.zinsContainer]}>
						<Text style={styles.inputText}>Physikalische Größe:</Text>
						<Picker selectedValue={this.state.unitStart} style={[styles.inputPicker]} onValueChange={this.unitStart}>
							<Picker.Item label="Auswählen" value="null" style={styles.inputText}/>
							<Picker.Item label="Geschwindigkeit" value="v" style={styles.inputText}/>
							<Picker.Item label="Strecke" value="s" style={styles.inputText}/>
							<Picker.Item label="Masse" value="m" style={styles.inputText}/>
						</Picker>
						{this.state.activeingabe ? <Text style={styles.inputText}>Einheit:</Text> : null}
						{this.state.activgeschwindigkeit ? this.state.activeingabe ? <Picker selectedValue={this.eingabeeinheit} style={[styles.inputPicker]} onValueChange={this.Eingabe}>
							<Picker.Item label="Auswählen" value="null" style={styles.inputText}/>
							<Picker.Item label="c" value="c" style={styles.inputText}/>
							<Picker.Item label="m/s" value="m/s" style={styles.inputText}/>
							<Picker.Item label="km/h" value="km/h" style={styles.inputText}/>
							<Picker.Item label="Knoten" value="kn" style={styles.inputText}/>
							<Picker.Item label="mph" value="mph" style={styles.inputText}/>						
						</Picker> : null : null}
						{this.state.activstrecke ? this.state.activeingabe ? <Picker selectedValue={this.eingabeeinheit} style={[styles.inputPicker]} onValueChange={this.Eingabe}>
							<Picker.Item label="Auswählen" value="null" style={styles.inputText}/>
							<Picker.Item label="Lichtjahr" value="Lj" style={styles.inputText}/>
							<Picker.Item label="Astr. Einheit" value="AE" style={styles.inputText}/>
							<Picker.Item label="Meile" value="mi" style={styles.inputText}/>
							<Picker.Item label="Zoll" value="inch" style={styles.inputText}/>
							<Picker.Item label="km" value="km" style={styles.inputText}/>
							<Picker.Item label="m" value="m" style={styles.inputText}/>
							<Picker.Item label="dm" value="dm" style={styles.inputText}/>
							<Picker.Item label="cm" value="cm" style={styles.inputText}/>
							<Picker.Item label="mm" value="mm" style={styles.inputText}/>
						</Picker> : null : null}
						{this.state.activmasse ? this.state.activeingabe ? <Picker selectedValue={this.eingabeeinheit} style={[styles.inputPicker]} onValueChange={this.Eingabe}>
							<Picker.Item label="Auswählen" value="null" style={styles.inputText}/>
							<Picker.Item label="kg" value="kg" style={styles.inputText}/>
							<Picker.Item label="g" value="g" style={styles.inputText}/>
							<Picker.Item label="t" value="t" style={styles.inputText}/>
							<Picker.Item label="Zentner" value="ztr" style={styles.inputText}/>
							<Picker.Item label="ounze" value="oz" style={styles.inputText}/>
							<Picker.Item label="Pfund" value="lb" style={styles.inputText}/>
							<Picker.Item label="Erdmasse" value="EM" style={styles.inputText}/>
							<Picker.Item label="Sonnenmasse" value="SM" style={styles.inputText}/>
							<Picker.Item label="Atommasse" value="AM" style={styles.inputText}/>
						</Picker> : null : null}
						{this.state.activeingabe ? <Text style={styles.inputText}>Größe:</Text> : null}
						{this.state.activeingabe ? <TextInput onChangeText={this.Grose}
							value={this.eingabeamount} style={styles.inputText} placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"/> : null}
						{this.state.activeingabe ? <Text style={styles.inputText}>Umrechnen in:</Text> : null}
						{this.state.activgeschwindigkeit ? this.state.activeingabe ? <Picker selectedValue={this.eingabeumrechnen} style={[styles.inputPicker]} onValueChange={this.Umrechner}>
							<Picker.Item label="Auswählen" value="null" style={styles.inputText}/>
							<Picker.Item label="c" value="c" style={styles.inputText}/>
							<Picker.Item label="m/s" value="m/s" style={styles.inputText}/>
							<Picker.Item label="km/h" value="km/h" style={styles.inputText}/>
							<Picker.Item label="Knoten" value="kn" style={styles.inputText}/>
							<Picker.Item label="mph" value="mph" style={styles.inputText}/>						
						</Picker> : null : null}
						{this.state.activstrecke ? this.state.activeingabe ? <Picker selectedValue={this.eingabeumrechnen} style={[styles.inputPicker]} onValueChange={this.Umrechner}>
							<Picker.Item label="Auswählen" value="null" style={styles.inputText}/>
							<Picker.Item label="Lichtjahr" value="Lj" style={styles.inputText}/>
							<Picker.Item label="Astr. Einheit" value="AE" style={styles.inputText}/>
							<Picker.Item label="Meile" value="mi" style={styles.inputText}/>
							<Picker.Item label="Zoll" value="inch" style={styles.inputText}/>
							<Picker.Item label="km" value="km" style={styles.inputText}/>
							<Picker.Item label="m" value="m" style={styles.inputText}/>
							<Picker.Item label="dm" value="dm" style={styles.inputText}/>
							<Picker.Item label="cm" value="cm" style={styles.inputText}/>
							<Picker.Item label="mm" value="mm" style={styles.inputText}/>
						</Picker> : null : null}
						{this.state.activmasse ? this.state.activeingabe ? <Picker selectedValue={this.eingabeumrechnen} style={[styles.inputPicker]} onValueChange={this.Umrechner}>
							<Picker.Item label="Auswählen" value="null" style={styles.inputText}/>
							<Picker.Item label="kg" value="kg" style={styles.inputText}/>
							<Picker.Item label="g" value="g" style={styles.inputText}/>
							<Picker.Item label="t" value="t" style={styles.inputText}/>
							<Picker.Item label="Zentner" value="ztr" style={styles.inputText}/>
							<Picker.Item label="ounze" value="oz" style={styles.inputText}/>
							<Picker.Item label="Pfund" value="lb" style={styles.inputText}/>
							<Picker.Item label="Erdmasse" value="EM" style={styles.inputText}/>
							<Picker.Item label="Sonnenmasse" value="SM" style={styles.inputText}/>
							<Picker.Item label="Atommasse" value="AM" style={styles.inputText}/>
						</Picker> : null : null}
					</View>
					<View style={styles.outputContainer}>
						{this.state.ausgabe ?
							<View style={[styles.outputContainer, {backgroundColor: '#CCC'}, styles.notification]}>
								<Text style={styles.outputText}>{this.state.ergebnis}</Text>
							</View> : null}
						<View style={styles.outputContainer}>
							<Button onPress={this.Loschen} title="Reset"/>
						</View>
					</View>
				</ScrollView>
			</View>
		)
	}
}