/* Es kann auch sein, dass dieses Programm nur auf meinem Handy genau funktioniert, weil der, 
wenn der alle 1 ms messen soll alle 5 ms misst, wenn der alle 5 ms messen soll alle 10 ms misst und
wenn der alle 15 ms messen soll alle 15 ms misst.
Jetzt misst der alle 1 ms und wertet das 5 mal aus. */

import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button, TextInput, ScrollView } from 'react-native';
import { Accelerometer } from "expo";
import styles from '../../styles';
import {Header, Left, Right, Body, Title, Container, Icon} from 'native-base';

export default class Bewegungsmesser extends React.Component {
   state = {
      buttontitle: "Start",
      ausgabe: 0,
      ausgabe2: 0,
      fehlercode1: '',
      fehlerindicator: false,
      teilfehler: false,
      durchschnittleranzeige: '',
   };

   helper = {
      c: 0,
      x: 0,
      y: 0,
      averageIndicator: 0,
      teilfehler: "false",
   };

   measurementData = []
   durchschnittler = []
   ergebnisdurchschnitt = []

   constructor(props) {
      super(props);
      Accelerometer.setUpdateInterval(1);
   }

   Start = () => {
      if (this.state.buttontitle == "Start") {
         this.setState({
            buttontitle: "Stop",
            fehlercode1: '',
            fehlerindicator: false,
         })
         this.durchschnittler = [],
         this.helper.teilfehler = false,
         Accelerometer.setUpdateInterval(1);
         Accelerometer.addListener(accelerometerData => {
         this.measurementData.push({
            x: accelerometerData.x * 9.81,
            y: accelerometerData.y * 9.81,
            })
         });
         this.measurementData = []
      } else if (this.state.buttontitle == "Stop") {
         Accelerometer.removeAllListeners()
         let dergebnis = 0;
         let ergebnis = 0;
         let sumergebnisdurchschnnitt = 0;
         let data = this.measurementData;
         let data1 = [];
         let data2 = [];
         for (t = 0; t < data.length; t++) {
            switch (t % 2) {
               case (0): {
                  data1.push(data[t]);
               }
               break;
               case (1): {
                  data2.push(data[t]);
               }
               break;
            }
         }
         this.calculation(data1);
         this.calculation(data2);
         if (this.helper.teilfehler == true) {
            this.setState({
               fehlercode1: 'Fehlermessung',
               fehlerindicator: true,
               buttontitle: "Start",
            })
         } else if (this.helper.teilfehler == false) {
            for (let g = 0; g < this.durchschnittler.length; g++) {
               dergebnis += this.durchschnittler[g];
            }
            ergebnis = dergebnis / this.durchschnittler.length;
            this.ergebnisdurchschnitt.push(ergebnis);
            for (let g = 0; g < this.ergebnisdurchschnitt.length; g++) {
               sumergebnisdurchschnnitt += this.ergebnisdurchschnitt[g];
            }
            dsumergebnis = sumergebnisdurchschnnitt / this.ergebnisdurchschnitt.length;
            this.setState({
               ausgabe: Math.round(ergebnis * 100) / 100,
               ausgabe2: Math.round(dsumergebnis * 100) / 100,
               buttontitle: "Start",
               durchschnittleranzeige: '(' + this.ergebnisdurchschnitt.length + ')',
            })
         }
         this.measurementData = [];
      }
   }

   Loschen = () => {
      if (this.state.buttontitle == "Start") {
         this.setState({
            buttontitle: "Start",
            buttontitle2: "",
            ausgabe: 0,
            ausgabe2: 0,
            durchschnittleranzeige: '',
            fehlercode1: '',
            fehlerindicator: false,
         })
         this.helper.c = 0;
         this.helper.x = 0,
         this.helper.y = 0,
         this.helper.teilfehler = false,
         this.helper.averageIndicator = 0;
         this.measurementData = []
         this.durchschnittler = []
         this.ergebnisdurchschnitt = []
      }
   }

   calculation = (data) => {
      let sx = 0;
      let vox = 0;
      let sy = 0;
      let voy = 0;
      let g = 0;
      let c = 0;
      let cleanedData = data.map((a) => {
         let x = a.x
         if (x > -0.4 && x < 0.4) {
            x = 0
         }
         let y = a.y
         if (y > -0.4 && y < 0.4) {
            y = 0
         }
         return { x: x, y: y }
      })
      while (this.allZero(cleanedData.slice(g, g + 10)) && g <= cleanedData.length) {
         g++;
      }
      while (!this.allZero(cleanedData.slice(g, g + 10)) && g <= cleanedData.length) {
         sx += (cleanedData[g].x / 2) * (0.01 * 0.01) + (vox * 0.01);
         vox += (cleanedData[g].x * 0.01);
         sy += (cleanedData[g].y / 2) * (0.01 * 0.01) + (voy * 0.01);
         voy += (cleanedData[g].y * 0.01);
         g++
      }
      c = Math.sqrt(sx * sx + sy * sy);
      if (Math.abs(c) < 0.01) {
         this.helper.teilfehler = true;
      } else {
         this.durchschnittler.push(c);
      }
   }

   allZero = (data) => {
      let count = 0;
      for (let h = 0; h < data.length; h++) {
         if (data[h].x == 0 && data[h].y == 0) {
            count++;
         }
      }
      if (count >= data.length * 0.8) {
         return true
      }
      return false
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
                    <Text style={styles.headertext}>Distanzmessung</Text>
                  </Body>
                </Header>
            <View style={[styles.inputContainer, {maxHeight: 350}]}>
                <Text style={styles.inputText}>Legen Sie Ihr Smartphone auf eine gerade Unterlage. Starten Sie die Messung und bewgen Sie das Gerät zügig zur Zielposition. Stoppen Sie die Messung. Führen sie diese Messung erneut in entgegengesetzte Richtung durch, um Ungenauigkeiten zu vermeiden. Sie können auch weitere Messungen durchführen.</Text>
            </View>
                <View style={styles.outputContainer}>
                    <Button onPress={this.Start} title={this.state.buttontitle}></Button>
                </View>           
                <View style={styles.outputContainer}>
                    {this.state.indicatorStatus ? <ActivityIndicator size="large"/> : null}
                    <View style={[styles.notification, styles.outputContainer, {backgroundColor: '#ccc'}]}>
                        <Text style={styles.outputText}>Aktuelle Messung: {this.state.ausgabe} m</Text>
                        <Text style={styles.outputText}>Durchschnitt: {this.state.ausgabe2} m</Text>
                    </View>
                    <View style={styles.outputContainer}>
                        <Button onPress={this.Loschen} title="Reset"/>
                    </View>
                </View>
            </View>
        </ScrollView>
      )
   }
}