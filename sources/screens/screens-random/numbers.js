import React from 'react';
import {Platform, StatusBar, StyleSheet, View, Text, ActivityIndicator, Button, TextInput, Picker, ScrollView} from 'react-native';
import styles from '../../styles';
import {Header, Left, Right, Body, Title, Container, Icon} from 'native-base';

export default class Numbers extends React.Component {
	state = {
        klein: null,
        gross: null,
        activelist: false,
        ausgabe: false,
        ausgabetext: "",
        fehler: false,
        fehlertext: "",
    }

    listelements = [];

    Loschen = () => {
        this.setState({
            klein: null,
            gross: null,
            ausgabe: false,
            ausgabetext: "",
            fehler: false,
            fehlertext: "",
        })
    }
    Klein = (x) => {
        this.setState({klein: x})
    }
    Gross = (x) => {
        this.setState({gross: x})
    }
    List = (x) => {
        this.setState({list: x})
        switch (x) {
            case ("nein"): {} break;
            case ("ja"): {this.setState({activelist: true})} break;
        }
    }
    Elemente = (x) => {
        this.setState({elemente: x})
    }
    Ausfuhren = () => {
        this.setState({ausgabe:false,ausgabetext:"",fehler:false,fehlertext:""})
        this.listelements = [];
        let ausgabe = 0;
        let text = "";
        let klein = parseInt(this.state.klein);
        let gross = parseInt(this.state.gross);
        if (this.state.klein == null || this.state.klein == "") {
            if (this.state.gross == null || this.state.gross == "") {
                this.setState({fehler: true, fehlertext: "fehlende Eingabe"})
            } else {
                this.setState({fehler: true, fehlertext: "unvollständige Eingabe"})
            }
        } else if (this.state.gross == null || this.state.gross == "") {
            this.setState({fehler: true, fehlertext: "unvollständige Eingabe"})
        } else {
            if (this.state.list == "nein") {
                ausgabe = Math.random() * (gross - klein) + klein;
                this.setState({ausgabe: true, ausgabetext: Math.round(ausgabe)})
            } else {
                for (let g = 0; g < this.state.elemente; g++) {
                    let number = Math.random() * (gross - klein) + klein;
                    this.listelements.push(Math.round(number));
                }
                console.log(this.listelements);

                for (let i = 0; i < this.state.elemente; i++) {
                    let textpart = this.listelements[i] + ""
                    if (text == "") {
                        text = textpart + "\n";
                    } else {
                        text = textpart + "\n" + text;
                    }
                    console.log("part: " + textpart);
                    console.log("ganzes: " + text)
                }
                console.log("end")
                alert(
                    text,
                    [
                        {text: 'neu generieren', onPress: () => this.Ausfuhren()},
                        {text: 'Reset', onPress: () => this.Loschen()},
                        {text: 'Schließen', onPress: () => console.log('close')},
                    ],
                    //geht irgendwie nicht so richtig
                    {cancelable: true}
                )
            }
        }
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
						<Text style={styles.headerText}>Zufall</Text>
					</Body>
				</Header>
				<ScrollView>
					<View style={[styles.inputContainer, styles.zinsContainer]}>
                        <Text style={styles.inputText}>kleinste Zahl:</Text>
                        <TextInput onChangeText={this.Klein} value={this.state.klein} style={styles.inputText}
								placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput>
                        <Text style={styles.inputText}>größte Zahl:</Text>
                        <TextInput onChangeText={this.Gross} value={this.state.gross} style={styles.inputText}
								placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput>
                        <Text style={styles.inputText}>Liste:</Text>
                        <Picker selectedValue={this.state.list} style={[styles.inputPicker]}
							onValueChange={this.List}>
							<Picker.Item label="keine" value="nein" style={styles.inputText}/>
							<Picker.Item label="erstellen" value="ja" style={styles.inputText}/>
						</Picker>
                        {this.state.activelist ? <Text style={styles.inputText}>Anzahl Elemente:</Text> : null}
                        {this.state.activelist ? <TextInput onChangeText={this.Elemente} value={this.state.elemente} style={styles.inputText}
								placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput> : null }
                    </View>
                    <View style={styles.outputContainer}>
						<Button onPress={this.Ausfuhren} title="Generierne"/>
					</View>
                    {this.state.ausgabe ? <View style={[styles.notification, styles.outputContainer, {backgroundColor: '#ccc'}]}>
                        <Text style={styles.outputText}>{this.state.ausgabetext}</Text>
                    </View> : null}
                    {this.state.fehler ? <View style={[styles.notification, styles.outputContainer, {backgroundColor: '#f00'}]}>
                        <Text style={styles.outputText}>{this.state.fehlertext}</Text>
                    </View> : null}
                    <View style={styles.outputContainer}>
					    <Button onPress={this.Loschen} title="Reset"/>
					</View>
                </ScrollView>
            </View>
        )
    }
}