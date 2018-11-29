import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button, TextInput, ScrollView } from 'react-native';
import { Gyroscope } from "expo";
import styles from '../../styles';
import {Header, Left, Right, Body, Title, Container, Icon} from 'native-base';

export default class Winkelmesser extends React.Component {
   
   state = {
      buttontitle: "Start",
      ausgabe: 0,
      ausgabe2: 0,
   };

   gyroscopeData = []
   durchschnittler = []
   fehler = {
      indicator: false,
      text: "",
   }
   count = 0;
   

   Loschen = () => {
      if (this.state.buttontitle == "Start") {
         this.setState({
            buttontitle: "Start",
            ausgabe: 0,
            ausgabe2: 0,
         })
         this.gyroscopeData = []
         this.durchschnittler = []
         this.fehler.indicator = false
         this.fehler.text= ""
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
      console.log('Start');
      this.setState({
         buttontitle: "Stop"
      })
      let schleifefalse = 0;
      let noschleife = 0;
      let tolleranz = 5;
      let count = 0;
      let zahler = 0;
      this.gyroscopeData = []
      Gyroscope.setUpdateInterval(10);
      Gyroscope.addListener(gyroscopeData => {
         this.gyroscopeData.push({
            x: gyroscopeData.x,
            y: gyroscopeData.y,
            z: gyroscopeData.z,
         });

         if (Math.abs(this.gyroscopeData[zahler].z) < 1.0) {
            this.gyroscopeData[zahler].z = 0
         }
         if (this.gyroscopeData[zahler].z != 0) {
            count += this.gyroscopeData[zahler].z;
            schleifefalse ++;
            noschleife = 0;
         } else if (this.gyroscopeData[zahler].z == 0) {
            if (schleifefalse > tolleranz) {
               if (noschleife > tolleranz) {
                  this.Stop();
               } else {
                  noschleife ++;
               }
            } else {
               schleifefalse = 0;
            }
         }
         this.count = count;
         zahler ++;
      })
   }
   
   Stop = () => {
      console.log("Stop");
      Gyroscope.removeAllListeners()
      this.setState({
         buttontitle: "Start"
      })
      let az = 0;
      let durchschnittsumme = 0;
      let durchschnitt = 0;
      az = Math.abs(this.count);
      if (az < 0.5) {
         this.fehler.indicator = true;
         this.fehler.text= "zu kleine Messung"
      } else if (az > 0.5) {
         this.durchschnittler.push(az);
         this.setState({
            ausgabe: Math.round(az * 100) / 100,
         })
         for (let i = 0; i < this.durchschnittler.length; i++) {
            durchschnittsumme += this.durchschnittler[i];
         }
         durchschnitt = durchschnittsumme / this.durchschnittler.length;
         this.setState({
            ausgabe2: Math.round(durchschnitt * 100) / 100,
         })
      }
   }

   render() {
      return (
        <ScrollView>
            <View style={styles.container}>
               <Header style={styles.header}>
                  <Left style={styles.headerContents}>
<<<<<<< HEAD
                    <Icon name="menu" onPress={()=>this.props.navigation.openDrawer()}
                          style={styles.icon}/>
                  </Left>
                  <Body style={styles.headerContents}>
                    <Text style={styles.headerText}>Messen</Text>
=======
                     <Icon name="menu" onPress={()=>this.props.navigation.openDrawer()}/>
                  </Left>
                  <Body style={styles.headerContents}>
                     <Text style={styles.headertext}>Winkelmesser</Text>
>>>>>>> ce46d8833e0ee2d2f701f530633ebadd20fe0c07
                  </Body>
               </Header>
            <View style={[styles.inputContainer, {maxHeight: 350}]}>
               <Text style={styles.inputText}>Legen Sie Ihr Handy auff eine gerade Unterlage und bewegen Sie es zügig in eine Richtung um die eigene Achse. Sie können die Messung beliebig oft wiederholen.</Text>
            </View>
               <View style={styles.outputContainer}>
                  <Button onPress={this.toggle} title={this.state.buttontitle}></Button>
               </View>           
               <View style={styles.outputContainer}>
                  {this.state.indicatorStatus ? <ActivityIndicator size="large"/> : null}
                  <View style={[styles.notification, styles.outputContainer, {backgroundColor: '#ccc'}]}>
                     <Text style={styles.outputText}>Aktuelle Messung: {this.state.ausgabe}°</Text>
                     <Text style={styles.outputText}>Durchschnitt({this.durchschnittler.length}): {this.state.ausgabe2}°</Text>
                  </View>
                  {this.fehler.indicator ? <View style={[styles.outputContainer, {backgroundColor: '#f00'}, styles.notification]}>
                    <Text style={styles.outputText}>{this.fehler.text}</Text>
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