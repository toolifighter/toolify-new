import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { Accelerometer } from "expo";
import styles from '../../styles';
import {Header, Left, Right, Body, Title, Container, Icon} from 'native-base';

export default class Bewegungsmesser extends React.Component {
   state = {
      buttontitle: "Start",
      ausgabeergebnis: 0,
      ausgabedurchschnitt: 0,
      ausgabedurchschnittcount: "",
      fehler: false,
      ergebnisindicator: false,
      loading: false,
   };

   fehlertext = ""
   measurementData = []
   calculationdurchschnitt = []
   ergebnisdurchschnitt = []
   timebreaker = 0
   timer = 0
   calculationtime = 0

   Loschen = () => {
      console.log("Reset")
      if (this.state.buttontitle == "Start") {
         this.setState({
            buttontitle: "Start",
            ausgabeergebnis: 0,
            ausgabedurchschnitt: 0,
            ausgabedurchschnittcount: "",
            fehler: false,
            ergebnisindicator: false,
            loading: false,
         })
         this.fehlertext = ""
         this.measurementData = []
         this.calculationdurchschnitt = []
         this.ergebnisdurchschnitt = []
         this.timer = 0
         this.calculationtime = 0
         this.timebreaker = 0
      }
   }

   toggle = () => {
      if (this.state.buttontitle == "Start") {
         this.Start();
      } else if (this.state.buttontitle == "Stop") {
         this.Stop();
      }
   }
   
   Start = () => {
      console.log("Start")
      this.timebreaker = Date.now();
      this.setState({
         buttontitle: "Stop",
         fehler: false,
         ergebnisindicator: false,
         loading: true,
      })
      let zahler = 0;
      let schleifefalse = 0;
      let noschleife = 0;
      let tolleranz = 11;
      let resetcount = tolleranz + 1;
      this.measurementData = [];
      this.durchschnittler = [];
      let timer = Date.now();
      Accelerometer.setUpdateInterval(1);
      Accelerometer.addListener(accelerometerData => {
         this.measurementData.push({
            x: accelerometerData.x * 9.81,
            y: accelerometerData.y * 9.81,
         })
         if (this.measurementData[zahler].x > -1 && this.measurementData[zahler].x < 1) {
            this.measurementData[zahler].x = 0
         }
         if (this.measurementData[zahler].y > -1 && this.measurementData[zahler].y < 1) {
            this.measurementData[zahler].y = 0
         }
         if (this.measurementData[zahler].x != 0 || this.measurementData[zahler].y != 0) {
            schleifefalse ++;
            noschleife = 0;
            resetcount = 0;
            console.log("Messen")
            if (timer == null) {
               timer = Date.now();
            }
         } else if (this.measurementData[zahler].x == 0 && this.measurementData[zahler].y == 0) {
            if (schleifefalse > tolleranz) {
               if (noschleife > tolleranz) {
                  timer = Date.now() - timer;
                  console.log("time: " + timer)
                  
                  this.measurementData.length = this.measurementData.length - 13;
                  Accelerometer.removeAllListeners()
                  this.calculationtime = ((timer / this.measurementData.length) / 1000);
                  console.log("Calctime: " + this.calculationtime);
                  console.log("Stopende");
                  this.Stop();
               } else {
                  noschleife ++;
                  console.log("Stop " + noschleife)
               }
            } else {
               if (resetcount > tolleranz) {
                  this.measurementData = [];
                  zahler = -1;
                  console.log("Reset: " + resetcount);
                  timer = null;
               } else {
                  this.measurementData.shift();
                  zahler --;
                  resetcount ++;
               }
            }
         }   
         zahler ++;
      });
     this.measurementData = []
   } 

   Stop = () => {
      Accelerometer.removeAllListeners()
      if (Date.now() - this.timebreaker > 500) {
         this.setState({
            buttontitle: "Start"
         })
         let data1 = [];
         let data2 = [];
         let durchschnittsumme = 0;
         let ergebnis = 0;
         let ergebnisdurchschnittsumme = 0;
         let durchschnitt = 0;
         for (let g = 0; g < this.measurementData.length; g++) {
            if (g % 2 == 0) {
               data1.push(this.measurementData[g]);
            } else {
               data2.push(this.measurementData[g]);
            }
         }
         console.log(data1);
         this.calculation(data1);
         this.calculation(data2);
         console.log(this.calculationdurchschnitt);
         if (this.state.fehler == false) {
            for (let g = 0; g < this.calculationdurchschnitt.length; g++) {
               durchschnittsumme += this.calculationdurchschnitt[g];
            }
            ergebnis = durchschnittsumme / this.calculationdurchschnitt.length;
            this.calculationdurchschnitt = [];
            console.log(ergebnis);
            this.ergebnisdurchschnitt.push(ergebnis);
            for (let g = 0; g < this.ergebnisdurchschnitt.length; g++) {
               ergebnisdurchschnittsumme += this.ergebnisdurchschnitt[g];
            }
            durchschnitt = ergebnisdurchschnittsumme / this.ergebnisdurchschnitt.length;
            console.log(this.ergebnisdurchschnitt);
            this.setState({
               ergebnisindicator: true,
               ausgabeergebnis: Math.round(ergebnis * 100) / 100,
               ausgabedurchschnitt: Math.round(durchschnitt * 100) / 100,
               ausgabedurchschnittcount: "(" + this.ergebnisdurchschnitt.length + ")",
            })
            console.log("geupdated: 1")
         }
         console.log("ende")
         this.measurementData = [];
         this.setState({loading: false})
      } else {
         console.log("Restart")
         this.Start();
         this.measurementData = [];
      }
   }

   calculation = (data) => {
      let sx = 0;
      let vx = 0;
      let sy = 0;
      let vy = 0;
      let c = 0;

      for (let g = 0; g < data.length; g++) {
         vx += data[g].x * this.calculationtime;
         sx += vx * this.calculationtime;

         vy += data[g].y * this.calculationtime;
         sy += vy * this.calculationtime;
         /*   sy += (data[g].x / 2) * (this.calculationtime * this.calculationtime) + (vx * this.calculationtime);
         vy += (data[g].x * this.calculationtime);
         diese Formel geht auch   */
      }
      c = Math.sqrt(sx * sx + sy * sy);
      console.log("c: "+c);
      if (c < 0.01) {
         this.setState({fehler: true});
         this.fehlertext = "zu kleine Messung";
         console.log("zu kleine Messung")
      } else {
         this.calculationdurchschnitt.push(c);
      }
   }

   render() {
      return (
        <ScrollView>
            <View style={styles.container}>
            <Header style={styles.header}>
            <Left style={styles.headerContents}>
                    <Icon name="menu" onPress={()=>this.props.navigation.openDrawer()}
                          style={styles.icon}/>
                  </Left>
                  <Body style={styles.headerContents}>
                    <Text style={styles.headerText}>Messen</Text>
                  </Body>
                </Header>
            <View style={[styles.inputContainer, {maxHeight: 350}]}>
               <Text style={styles.inputText}>Legen Sie Ihr Smartphone auf eine gerade Unterlage. Starten Sie die Messung und bewgen Sie das Gerät zügig zur Zielposition. Stoppen Sie die Messung. Führen sie diese Messung erneut in entgegengesetzte Richtung durch, um Ungenauigkeiten zu vermeiden. Sie können auch weitere Messungen durchführen.</Text>
            </View>
               <View style={styles.outputContainer}>
                  <Button onPress={this.toggle} title={this.state.buttontitle}></Button>
               </View>           
               <View style={styles.outputContainer}>
                  {this.state.loading ? <ActivityIndicator size="large"/> : null}
                  <View style={[styles.notification, styles.outputContainer, {backgroundColor: '#ccc'}]}>
                     <Text style={styles.outputText}>Aktuelle Messung: {this.state.ausgabeergebnis} m</Text>
                     <Text style={styles.outputText}>Durchschnitt{this.state.ausgabedurchschnittcount}: {this.state.ausgabedurchschnitt} m</Text>
                  </View>
                  {this.state.fehler ? <View style={[styles.outputContainer, {backgroundColor: '#f00'}, styles.notification]}>
                  <Text style={styles.outputText}>{this.state.fehlertext}</Text>
                  </View> : null}
                  <View style={styles.outputContainer}>
                     <Button onPress={this.Loschen} title="Reset"/>
                  </View>
               </View>
            </View>
        </ScrollView>
      )
   }
}