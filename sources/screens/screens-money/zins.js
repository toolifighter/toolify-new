import React from 'react';
import {
	Platform, StatusBar, StyleSheet, View, Text, ActivityIndicator, Button, TextInput, Picker, ScrollView
} from 'react-native';
import styles from '../../styles';
import {Header, Left, Right, Body, Title, Container, Icon} from 'native-base';

export default class Zinsber extends React.Component {
	state = {
		startkapital: '',
		zeit: '',
		gewinn: '',
		endkapital: '',
		zins: '',
		intervallzeit: "keine",
		intervalleinzahlung: "keine",
		einzahlung: '',
		schussig: "vor",
		ausgabetext: '',
		ausgabecolor: '#CCC',
		ausgabeindicator: false,
		ergebnisindicator: false,
	};
	Loschen = () => {
		this.setState({
			startkapital: '',
			zeit: '',
			gewinn: '',
			endkapital: '',
			zins: '',
			intervallzeit: "keine",
			intervalleinzahlung: "keine",
			einzahlung: '',
			schussig: "vor",
			ausgabetext: '',
			ausgabecolor: '#CCC',
			ausgabeindicator: false,
			ergebnisindicator: false,
		})
	};
	Startkapital = (x) => {
		this.setState({
			startkapital: x,
		})
	};
	Zinssatz = (x) => {
		this.setState({
			zins: x,
		})
	};
	Zeit = (x) => {
		this.setState({
			zeit: x,
		})
	};
	Einzahlung = (x) => {
		this.setState({
			einzahlung: x,
		})
	};
	berechnenGewinn = () => {
		this.setState({
			ausgabetext: '', ausgabecolor: '#CCC', ausgabeindicator: false, ergebnisindicator: false,
		});
		let zei = parseFloat(this.state.zeit);
		let sta = parseFloat(this.state.startkapital);
		let zin = parseFloat(this.state.zins) / 100;
		let ein = parseFloat(this.state.einzahlung);
		let end = sta;
		let gew = 0;
		if (this.state.startkapital == "") {
			this.setState({
				ausgabetext: 'Fehlendes Startkapital', ausgabecolor: '#f00', ausgabeindicator: true,
			})
		} else if (this.state.zins == "") {
			this.setState({
				ausgabetext: 'Fehlender Zinssatz', ausgabecolor: '#f00', ausgabeindicator: true,
			})
		} else if (this.state.zeit == "") {
			this.setState({
				ausgabetext: 'Fehlende Laufzeit', ausgabecolor: '#f00', ausgabeindicator: true,
			})
		} else if (this.state.intervallzeit == "keine") {
			this.setState({
				ausgabetext: 'Fehlender Intervall der Laufzeit', ausgabecolor: '#f00', ausgabeindicator: true,
			})
		} else {
			switch (this.state.intervalleinzahlung) {
				case ("keine"): {
					if (this.state.einzahlung !== "") {
						this.setState({
							ausgabetext: 'Fehlender intervall der Einzahlung',
							ausgabecolor: '#ff0',
							ausgabeindicator: true,
						})
					} else if (this.state.einzahlung == "") {
						switch (this.state.intervallzeit) {
							case ("monate"): {
								for (let t = 0; t < (Math.floor(zei / 12)); t++) {
									end = end * (zin + 1);
								}
								for (let t = zei; t >= 12; t = t - 12) {
									zei = zei - 12;
								}
								end += (end * zin * zei) / 12;
							}
								break;
							case ("jahre"): {
								for (let t = 0; t < zei; t++) {
									end = end * (zin + 1);
								}
							}
								break;
						}
						this.setState({
							ergebnisindicator: true,
						})
					}
				}
					break;
				case ("monatlich"): {
					if (this.state.einzahlung == "") {
						this.setState({
							ausgabetext: 'Fehlende Einzahlung', ausgabecolor: '#f00', ausgabeindicator: true,
						})
					} else if (this.state.einzahlung !== "") {
						switch (this.state.intervallzeit) {
							case ("monate"): {
								this.setState({
									ausgabetext: 'monatliche Einzahlung noch nicht unterstützt',
									ausgabecolor: '#f00',
									ausgabeindicator: true,
								})
							}
								break;
							case ("jahre"): {
								this.setState({
									ausgabetext: 'monatliche Einzahlung und jährlicher Intervall noch nicht unterstützt',
									ausgabecolor: '#f00',
									ausgabeindicator: true,
								})
							}
								break;
						}
					}
				}
					break;
				case ("jährlich"): {
					if (this.state.einzahlung == "") {
						this.setState({
							ausgabetext: 'Fehlende Einzahlung', ausgabecolor: '#f00', ausgabeindicator: true,
						})
					} else if (this.state.intervallzeit == "monate") {
						console.log("hi");
						this.setState({
							ausgabetext: 'monatlicher Intervall mit Einzahlung noch nicht unterstützt',
							ausgabecolor: '#f00',
							ausgabeindicator: true,
						})
					} else if (this.state.einzahlung !== "") {
						for (let t = 0; t < zei; t++) {
							if (this.state.schussig == "vor") {
								end = end + ein;
							}
							end = end * (zin + 1);
							if (this.state.schussig == "nach") {
								end = end + ein;
							}
						}
						this.setState({
							ergebnisindicator: true,
						})
					}
				}
					break;
			}
		}
		end = end.toFixed(2);
		gew = end - sta;
		gew = gew.toFixed(2);
		this.setState({
			endkapital: "Ihr Endkapital beträgt " + end + "€.", gewinn: "Ihr Gewinn beträgt " + gew + "€.",
		})
	};

	render() {
		return <ScrollView>
			<View style={styles.container}>
				<Header style={styles.header}>
					<Left style={styles.headerContents}>
						<Icon name="menu" onPress={() => this.props.navigation.openDrawer()}
							  style={styles.icon}/>
					</Left>
					<Body style={styles.headerContents}>
					<Text style={styles.headerText}>Geld</Text>
					</Body>
				</Header>
				<View style={[styles.inputContainer, styles.zinsContainer]}>
					<Text style={styles.inputText}>Startkapital (€):</Text>
					<TextInput onChangeText={this.Startkapital} value={this.state.startkapital} style={styles.inputText}
							   placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput>
					<Text style={styles.inputText}>Zinssatz (%):</Text>
					<TextInput onChangeText={this.Zinssatz} value={this.state.zins} style={styles.inputText}
							   placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput>
					<Text style={styles.inputText}>Laufzeit:</Text>
					<Picker
						selectedValue={this.state.intervallzeit}
						style={[styles.inputPicker]}
						onValueChange={(itemValue,) => this.setState({intervallzeit: itemValue})}>
						<Picker.Item label="Auswählen" value="keine" style={styles.inputText}/>
						<Picker.Item label="in Monaten" value="monate" style={styles.inputText}/>
						<Picker.Item label="in Jahren" value="jahre" style={styles.inputText}/>
					</Picker>
					<TextInput onChangeText={this.Zeit} value={this.state.zeit} style={styles.inputText}
							   placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput>
					<Text style={styles.inputText}>Einzahlung: (€)</Text>
					<Picker
						selectedValue={this.state.intervalleinzahlung}
						style={[styles.inputPicker]}
						onValueChange={(itemValue,) => this.setState({intervalleinzahlung: itemValue})}>
						<Picker.Item label="Keine" value="keine" style={styles.inputText}/>
						<Picker.Item label="monatlich" value="monatlich" style={styles.inputText}/>
						<Picker.Item label="jährlich" value="jährlich" style={styles.inputText}/>
					</Picker>
					<Picker
						selectedValue={this.state.schussig}
						style={[styles.inputPicker]}
						onValueChange={(itemValue,) => this.setState({schussig: itemValue})}>
						<Picker.Item label="vorschüssig" value="vor" style={styles.inputText}/>
						<Picker.Item label="nachschüssig" value="nach" style={styles.inputText}/>
					</Picker>
					<TextInput onChangeText={this.Einzahlung} value={this.state.einzahlung} style={styles.inputText}
							   placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput>
				</View>
				<View style={styles.outputContainer}>
					<Button onPress={this.berechnenGewinn} title="Zins berechnen"/>
				</View>
				<View style={styles.outputContainer}>
					{this.state.ausgabeindicator ? <View
						style={[styles.outputContainer, {backgroundColor: this.state.ausgabecolor}, styles.notification]}>
						<Text style={styles.outputText}>{this.state.ausgabetext}</Text>
					</View> : null}
					{this.state.ergebnisindicator ?
						<View style={[styles.outputContainer, {backgroundColor: '#CCC'}, styles.notification]}>
							<Text style={styles.outputText}>{this.state.gewinn}</Text>
							<Text style={styles.outputText}>{this.state.endkapital}</Text>
						</View> : null}
					<View style={styles.outputContainer}>
						<Button onPress={this.Loschen} title="Reset"/>
					</View>
				</View>
			</View>
		</ScrollView>
	}
} 