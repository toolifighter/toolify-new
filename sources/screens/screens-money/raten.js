import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, ActivityIndicator, Button, TextInput, Picker, ScrollView } from 'react-native';
import styles from '../../styles';
import {Header, Left, Right, Body, Title, Container, Icon} from 'native-base';

export default class Ratenber extends React.Component {
   state = {
      grundpreis: null,
      einzahlung: null,
      originalpreis: null,
      zeit: null,
      intervallzeit: "keine",
      ausgabecode: false,
      fehlercode: false,
      fehlertext: "",
      ausagbetext: "",
      ergebnistext: "",
      ausgabecolor: '#00f',
   };

   Löschen = () => {
      this.setState({
         grundpreis: null,
         einzahlung: null,
         originalpreis: null,
         zeit: null,
         intervallzeit: "keine",
         ausgabecode: false,
         fehlercode: false,
         fehlertext: "",
         ausagbetext: "",
         ergebnistext: "",
         ausgabecolor: '#00f',
      })
   }

   eingabeGrundpreis = (x) => {
      this.setState({
         grundpreis: x,
      })
   }

   eingabeEinzahung = (x) => {
      this.setState({
         einzahlung: x,
      })
   }

   eingabeOriginalpreis = (x) => {
      this.setState({
         originalpreis: x,
      })
   }

   eingabeZeit = (x) => {
      this.setState({
         zeit: x,
      })
   }

   calculate = () => {
      this.setState({
         ausgabecode: false,
         fehlercode: false,
      })
      let Preis = 0;
      let Differenz = 0;
      let Zuzahlung = 0;
      if (this.state.grundpreis == null) {
         this.setState({
            fehlercode: true,
            fehlertext: "Fehlender Grundpreis"
         })
      } else if (this.state.einzahlung == null) {
         this.setState({
            fehlercode: true,
            fehlertext: "Fehlende Einzahlung"
         })
      } else if (this.state.intervallzeit == "keine") {
         this.setState({
            fehlercode: true,
            fehlertext: "Fehlender Laufzeitenintervall"
         })
      } else if (this.state.zeit == null) {
         this.setState({
            fehlercode: true,
            fehlertext: "Fehlende Laufzeit"
         })
      } else if (this.state.originalpreis == null) {
         this.setState({
            fehlercode: true,
            fehlertext: "Fehlender Originalpreis"
         })
      } else {
         switch (this.state.intervallzeit) {
            case ("monate"): {
               if (this.state.zeit < 12) {
                  this.setState({
                     ausagbetext: "nach " + this.state.zeit + " Monate"
                  });
               } else if (this.state.zeit % 12 == 0) {
                  let Jahre = this.state.zeit / 12;
                  this.setState({
                     ausagbetext: "nach " + Jahre + " Jahre"
                  })
               } else {
                  let Jahre = Math.floor(this.state.zeit/12);
                  let Monate = this.state.zeit - Jahre * 12;
                  this.setState({
                     ausagbetext: "nach " + Jahre + " Jahre und " + Monate + " Monate",
                  })
               }
            }
            break;
            case ("jahre"): {
               this.setState({
                  ausagbetext: this.state.zeit + " Jahre"
               })
            }
            break;
         }
         Zuzahlung = this.state.zeit * this.state.einzahlung;
         Preis = (this.state.grundpreis * 1) + Zuzahlung;
         Differenz = Math.abs(Preis - this.state.originalpreis);
         if (this.state.originalpreis > Preis) {
            this.setState({
               ergebnistext: "Ersparnis von " + Differenz + " € bei " + Preis + " €",
               ausgabecolor: '#0f0',
            })
         } else if (this.state.originalpreis == Preis) {
            this.setState({
               ergebnistext: "Kein Ersparnis bei " + Preis + " €",
               ausgabecolor: '#ff0'
            })
         } else if (this.state.originalpreis < Preis) {
            this.setState({
               ergebnistext: "Verlust von " + Differenz + " € bei " + Preis + " €",
               ausgabecolor: '#f00'
            })
         }
         this.setState({
            ausgabecode: true
         })
      }
   }



   render() {
      return (
        <ScrollView>
            <View style={styles.container}>
               <Header style={styles.header}>
                  <Left style={styles.headerContents}>
                    <Icon name="menu" onPress={()=>this.props.navigation.openDrawer()}/>
                  </Left>
                  <Body style={styles.headerContents}>
                    <Text style={styles.headertext}>Ratenrechner</Text>
                  </Body>
               </Header>
               <View style={[styles.inputContainer, styles.calContainer]}>
               <Text style={styles.inputText}>Grundpreis:</Text>
               <TextInput onChangeText={this.eingabeGrundpreis} value={this.state.grundpreis} style={styles.inputText} placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput>
               <Text style={styles.inputText}>Einzahlung:</Text>
               <Picker
                  selectedValue={this.state.intervallzeit}
                  style={[styles.inputPicker]}
                  onValueChange={(itemValue,) => this.setState({intervallzeit: itemValue})}>
                  <Picker.Item label="Auswählen" value="keine" style={styles.inputText}/>
                  <Picker.Item label="pro Monat" value="monate" style={styles.inputText}/>
                  <Picker.Item label="pro Jahr" value="jahre" style={styles.inputText}/>
               </Picker>
               <TextInput onChangeText={this.eingabeEinzahung} value={this.state.einzahlung} style={styles.inputText} placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput>
               <Text style={styles.inputText}>Laufzeit:</Text>
               <TextInput onChangeText={this.eingabeZeit} value={this.state.zeit} style={styles.inputText} placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput>
               <Text style={styles.inputText}>Originalpreis:</Text>
               <TextInput onChangeText={this.eingabeOriginalpreis} value={this.state.originalpreis} style={styles.inputText} placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput>
               </View>
               <View style={styles.outputContainer}>
                  <Button onPress={this.calculate} title="Ratenpreis berechnen"></Button>
               </View> 
               {this.state.ausgabecode ? <View style={[styles.outputContainer, {backgroundColor: this.state.ausgabecolor}, styles.notification]}>
                  <Text style={styles.outputText}>{this.state.ergebnistext}</Text>
                  <Text style={styles.outputText}>{this.state.ausagbetext}</Text>
               </View> : null}
               {this.state.fehlercode ? <View style={[styles.outputContainer, {backgroundColor: '#f00'}, styles.notification]}>
                  <Text style={styles.outputText}>{this.state.fehlertext}</Text>
               </View> : null}           
               <View style={styles.outputContainer}>
                  <Button onPress={this.Löschen} title="Reset"/>
               </View>
            </View>
        </ScrollView>
      )
   }
}