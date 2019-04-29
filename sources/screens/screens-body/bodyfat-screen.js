import React from "react";
import { Button, Picker, ScrollView, Text, TextInput, View } from "react-native";
import styles from "../../styles";
import { Body, Header, Icon, Left } from "native-base";

export default class BodyFat extends React.Component {

	stateDefault = {
		isLoadingComplete: false,
		notification: null,
		sex: null,
		weight: null,
		height: null,
		age: null,
		neck: "",
		tommy: null,
		waist: null,
		bodyFatSelectedRegion: null,
		bodyFat: null,
		bgColorNotification: null,
		isExecuted: false,
	};

	state = this.stateDefault;

	reset = () => {
		this.setState(this.stateDefault);
	};

	calcBodyFat = () => {
		const sex = this.state.sex;
		const weight = parseFloat(this.state.weight);
		const height = parseFloat(this.state.height);
		const bodyFatSelectedRegion = this.state.bodyFatSelectedRegion;
		const neck = parseFloat(this.state.neck);
		const tommy = parseFloat(this.state.tommy);
		const waist = parseFloat(this.state.waist);
		let method = "both";
		let bodyFatUSNavy = null;
		let bodyFatYMCA = null;
		let bodyFat = null;

		// checking user input
		switch (true) {
			case (sex != "m" && sex != "w"):
				this.errorHandler("noSex");
				return null;
			case (bodyFatSelectedRegion != "onlyTommy" && bodyFatSelectedRegion != "tommy" && bodyFatSelectedRegion != "wholeBody"):
				this.errorHandler("noSex");
				return null;
			case (typeof height != "number" || true == isNaN(height) || height <= 0):
				this.errorHandler("noHeight");
				return null;
			case (typeof weight != "number" || true == isNaN(weight) || weight <= 0):
				this.errorHandler("noWeight");
				return null;
			case (typeof tommy != "number" || true == isNaN(tommy) || tommy <= 0):
				this.errorHandler("noTommy");
				console.log("tommy1");
				return null;
			case (typeof waist != "number" || true === isNaN(waist) || waist <= 0):
				this.errorHandler("noWaist");
				method = "onlyYMCA";
				break;
			case (typeof neck != "number" || true === isNaN(neck) || neck <= 0):
				this.errorHandler("noNeck");
				method = "onlyYMCA";
				break;
		}

		//formula for body fat depending on sex and method
		switch (sex) {
			case "w":
				switch (method) {
					case "both":
						bodyFatUSNavy = 163.205 * Math.log10(tommy * 0.393700787 + waist * 0.393700787 - neck * 0.393700787) - 97.684 * Math.log10(height * 0.393700787) - 104.912;
						bodyFatYMCA = (74.11 * tommy - 3482) / weight - 8.2;
						break;
					case "onlyYMCA":
						bodyFatYMCA = (74.11 * tommy - 3482) / weight - 8.2;
						break;
					default:
						this.errorHandler();
						return null;
				}
				break;
			case "m":
				switch (method) {
					case "both":
						bodyFatUSNavy = 86.01 * Math.log10(tommy * 0.393700787 - neck * 0.393700787) - 70.041 * Math.log10(height * 0.393700787) + 30.3;
						bodyFatYMCA = (74.11 * tommy - 4464) / weight - 8.2;
						break;
					case "onlyYMCA":
						bodyFatYMCA = (74.11 * tommy - 4464) / weight - 8.2;
						break;
					default:
						this.errorHandler();
						return null;
				}
				break;
			default:
				this.errorHandler();
				return null;
		}

		// calculating final body fat with average dependig on selected region
		switch (bodyFatSelectedRegion) {
			case "onlyTommy":
				bodyFat = Math.round(bodyFatYMCA * 100) / 100;
				break;
			case "tommy":
				bodyFat = Math.round((3 * bodyFatYMCA + bodyFatUSNavy) / 4 * 100) / 100;
				break;
			case "wholeBody":
				bodyFat = Math.round((bodyFatYMCA + 3 * bodyFatUSNavy) / 4 * 100) / 100;
				break;
			default:
				this.errorHandler();
				return null;
		}

		if (bodyFatUSNavy <= 0 && bodyFatYMCA > 0) {
			bodyFat = Math.round(bodyFatYMCA * 100) / 100;
		}

		//body fat output as notification
		if (typeof bodyFat == "number" && true != isNaN(bodyFat) && bodyFat > 0) {
			this.setState({
				notification: 'Ihr Körperfettanteil beträgt ' + bodyFat + ' %.', bgColorNotification: '#ccc',
			});
		} else if (bodyFat <= 0) {
			this.errorHandler("resultNotReal");
		} else {
			this.errorHandler();
		}

		console.log("US: " + bodyFatUSNavy + ", Y: " + bodyFatYMCA + ", insg: " + bodyFat);
		console.log(this.state);

		this.setState({ isExecuted: true });
	}

	errorHandler = (errorType) => {
		switch (errorType) {
			case "noSex":
				console.log("nosex2");
				this.setState({
					notification: "Mindestens eines der erforderlichen Felder wurde nicht ausgefüllt oder ist ungültig. Überprüfen Sie Ihre Eingabe!",
					bgColorNotification: "#FE4141",
				});
				console.log(this.state);
				break;
			case "noSelectedBodyFatRegion":
				this.setState({
					notification: "Mindestens eines der erforderlichen Felder wurde nicht ausgefüllt oder ist ungültig. Überprüfen Sie Ihre Eingabe!",
					bgColorNotification: "#FE4141",
				});
				break;
			case "noHeight":
				this.setState({
					notification: "Mindestens eines der erforderlichen Felder wurde nicht ausgefüllt oder ist ungültig. Überprüfen Sie Ihre Eingabe!",
					bgColorNotification: "#FE4141",
				});
				break;
			case "noWeight":
				this.setState({
					notification: "Mindestens eines der erforderlichen Felder wurde nicht ausgefüllt oder ist ungültig. Überprüfen Sie Ihre Eingabe!",
					bgColorNotification: "#FE4141",
				});
				break;
			case "noTommy":
				this.setState({
					notification: "Mindestens eines der erforderlichen Felder wurde nicht ausgefüllt oder ist ungültig. Überprüfen Sie Ihre Eingabe!",
					bgColorNotification: "#FE4141",
				});
				break;
			case "noNeck":
				this.setState({
					notification: "Wenn Sie nur die erforderlichen Felder ausfüllen, wird die berechnng deutlich ungenauer.",
					bgColorNotification: "#FFD900",
				});
				break;
			case "noWaist":
				this.setState({
					notification: "Wenn Sie nur die erforderlichen Felder ausfüllen, wird die berechnng deutlich ungenauer.",
					bgColorNotification: "#FFD900",
				});
				break;
			case "resultNotReal":
				this.setState({
					notification: 'Ergebnis nicht real. Überprüfen Sie Ihre Eingabe!', bgColorNotification: '#FE4141',
				});
				break;
			default:
				this.setState({
					notification: "Ein unbekannter Fehler ist aufgetreten. Versuchen Sie es noch einmal.",
					bgColorNotification: "#FE4141",
				});
				break;
		}
		this.setState({
			isExecuted: true,
		});
	}


	render() {
		return 	<View style={styles.container}>
				<Header style={styles.header}>
					<Left style={styles.headerContents}>
						<Icon
							name="menu"
							onPress={() => this.props.navigation.openDrawer()}
							style={styles.icon}
						/>
					</Left>
					<Body style={styles.headerContentsIconLeft}>
						<Text style={styles.headerText}>Körper</Text>
					</Body>
				</Header>
				<ScrollView>
					<View style={styles.inputContainer}>
						<Text style={styles.inputText}>Geschlecht:</Text>
						<Picker
							selectedValue={this.state.sex}
							style={[styles.inputPicker]}
							onValueChange={itemValue => this.setState({ sex: itemValue })}
						>
							<Picker.Item
								label="Auswählen"
								value=""
								style={styles.inputText}
							/>
							<Picker.Item
								label="weiblich"
								value="w"
								style={styles.inputText}
							/>
							<Picker.Item
								label="männlich"
								value="m"
								style={styles.inputText}
							/>
						</Picker>
						<Text style={styles.inputText}>Wo glauben Sie, ist Ihr Körperfettanteil am höchsten?</Text>
						<Picker
							selectedValue={this.state.bodyFatSelectedRegion}
							style={[styles.inputPicker]}
							onValueChange={itemValue => this.setState({ bodyFatSelectedRegion: itemValue })}
						>
							<Picker.Item
								label="Auswählen"
								value=""
								style={styles.inputText}
							/>
							<Picker.Item
								label="Nur am Bauch"
								value="onlyTommy"
								style={styles.inputText}
							/>
							<Picker.Item
								label="Am Bauch"
								value="tommy"
								style={styles.inputText}
							/>
							<Picker.Item
								label="Am ganzen Körper gleich verteilt"
								value="wholeBody"
								style={styles.inputText}
							/>
						</Picker>
						<Text style={styles.inputText}>Größe (cm):</Text>
						<TextInput
							onChangeText={textValue => this.setState({ height: textValue })}
							value={this.state.height}
							style={styles.inputText}
							placeholder="Bitte eingeben!"
							placeholderTextColor="#4A4A4A"
						/>
						<Text style={styles.inputText}>Gewicht (kg):</Text>
						<TextInput
							onChangeText={textValue => this.setState({ weight: textValue })}
							value={this.state.weight}
							style={styles.inputText}
							placeholder="Bitte eingeben!"
							placeholderTextColor="#4A4A4A"
						/>
						<Text style={styles.inputText}>Alter:</Text>
						<TextInput
							onChangeText={textValue => this.setState({ age: textValue })}
							value={this.state.age}
							style={styles.inputText}
							placeholder="Bitte eingeben!"
							placeholderTextColor="#4A4A4A"
						/>
						<Text style={styles.inputText}>Hüftumfang:</Text>
						<TextInput
							onChangeText={textValue => this.setState({ waist: textValue })}
							value={this.state.waist}
							style={styles.inputText}
							placeholder="Bitte eingeben!"
							placeholderTextColor="#4A4A4A"
						/>
						<Text style={styles.inputText}>Nackenumfang:</Text>
						<TextInput
							onChangeText={textValue => this.setState({ neck: textValue })}
							value={this.state.neck}
							style={styles.inputText}
							placeholder="Bitte eingeben!"
							placeholderTextColor="#4A4A4A"
						/>
						<Text style={styles.inputText}>Bauchumfang:</Text>
						<TextInput
							onChangeText={textValue => this.setState({ tommy: textValue })}
							value={this.state.tommy}
							style={styles.inputText}
							placeholder="Bitte eingeben!"
							placeholderTextColor="#4A4A4A"
						/>
					</View>
					{/* <View style={styles.outputContainer}>
          				<Button onPress={this.autoFill} title="Automatisch ausfüllen" />
        			</View> */}
					<View style={styles.outputContainer}>
						<Button
							onPress={this.calcBodyFat}
							title="Körperfettanteil berechnen"
						/>
					</View>
					{this.state.isExecuted ? (<View
						style={[styles.outputContainer, { backgroundColor: this.state.bgColorNotification }, styles.notification]}
					>
						<Text style={styles.outputText}>{this.state.notification}</Text>
					</View>) : null}
					<View style={styles.outputContainer}>
						<Button onPress={this.reset} title="Reset" />
					</View>


				</ScrollView>
			</View>
	}
}
