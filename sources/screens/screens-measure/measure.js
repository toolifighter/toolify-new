import React from 'react';
import styles from '../../styles';
import { Accelerometer } from "expo";
import { Platform, StatusBar, StyleSheet, View, Text, ActivityIndicator, Button, SafeAreaView, ScrollView } from 'react-native';
import {Header, Left, Right, Body, Title, Container, Icon} from 'native-base';
import {MaterielIcons} from '@expo/vector-icons';

const Value = ({name, value}) => (
   <View style={styles.valueContainer}>
      <Text style={styles.valueName}>{name}:</Text>
      <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
   </View>
)

export default class BMI extends React.Component {
   state = {
      notification: null,
      notificationdurchschnitt: "",
      indicatorStatus: false,
      fehlerindicator: false,
      fehlertext: "",
      isMeasured: false,
      buttontitle: "Start",
   }
   mesurementData = []
   time = 0;
   timebreaker = 0
   durchschnitt = [];

   Loschen = () => {
      this.setState({
         notification: null,
         notificationdurchschnitt: "",
         indicatorStatus: false,
         fehlerindicator: false,
         fehlertext: "",
         isMeasured: false,
         buttontitle: "Start",
      })
      this.mesurementData = []
      this.time = 0;
      this.durchschnitt = [];
      this.timebreaker = 0;
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
         indicatorStatus: true,
         fehlerindicator: false,
         fehlertext: "",
      })
      this.measurementData = []
      this.time = 0;
      let zahler = 0;
      let timer = Date.now()
      let schleifestart = false;
      Accelerometer.setUpdateInterval(10);
      Accelerometer.addListener(accelerometerData => {
         this.measurementData.push({
            z: accelerometerData.z*9.81-9.81,
         })
         if (this.measurementData[zahler].z < -8) {
            schleifestart = true;
            timer = Date.now() - timer
            this.time += timer;
            console.log(this.time)
            console.log("Messen")
         } else {
            this.measurementData[zahler].z = 0;
            if (schleifestart == true) {
               console.log("Stopende");
               console.log("time: " + this.time)
               this.measurementData.pop();
               this.Stop();
            } else {
               this.measurementData = [];
               zahler = -1;
            }
         }
         timer = Date.now();
         zahler ++;
      });   
   }
   
   Stop = () => {
      Accelerometer.removeAllListeners()
      console.log(Date.now() - this.timebreaker);
      if (Date.now() - this.timebreaker > 500) {
         console.log("Stop")
         let durchschnitt = 0;
         let durchschnittsumme = 0;
         this.setState({buttontitle: "Start"})
         this.time = this.time / 1000;      
         let s = (9.81/2)*(Math.pow(this.time,2));  
         if (s < 0.01) {
            this.setState({
               fehlerindicator: true,
               fehlertext: "zu kleine Messung",
               indicatorStatus: false,
            })
         } else {
            this.durchschnitt.push(s);
            for (let g = 0; g < this.durchschnitt.length; g++) {
               durchschnittsumme += this.durchschnitt[g];
            }
            durchschnitt = durchschnittsumme / this.durchschnitt.length;
            this.setState({
               notification: 'Gemessene Strecke: ' + s.toFixed(2) + 'm',
               notificationdurchschnitt: "Durchschnitt(" + this.durchschnitt.length + "): " + durchschnitt.toFixed(2) + "m",
               indicatorStatus: false,
               isMeasured: true,
            })
            if (this.durchschnitt.length <= 1) {
               this.setState({notificationdurchschnitt: "Durchschnitt: " + durchschnitt.toFixed(2) + "m",})     
            }
         }
      } else {
         console.log("Restart")
         this.Start();
      }
   }

   render() {
      return (
         <ScrollView>          
            <View>
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
                  <Text style={styles.inputText}>Halten Sie Ihr Smartphone mit dem Display nach oben. Drücken Sie den Start-Button und lassen Sie es fallen. Drücken Sie dann den Stopp-Button.</Text>
               </View>
               <View  style={styles.outputContainer}>
                  <Button onPress={this.toggle} title={this.state.buttontitle} style={styles.button}></Button>
               </View>
               <View style={styles.outputContainer}>
                  {this.state.indicatorStatus ? <View style={styles.outputContainer}><ActivityIndicator size="large"/></View> : null}
                  {this.state.isMeasured ? <View style={[styles.notification, styles.outputContainer, {backgroundColor: '#ccc'}]}>
                     <Text style={styles.outputText}>{this.state.notification}</Text>
                     <Text style={styles.outputText}>{this.state.notificationdurchschnitt}</Text>
                  </View> : null}
                  {this.state.fehlerindicator ? <View style={[styles.notification, styles.outputContainer, {backgroundColor: '#f00'}]}>
                     <Text style={styles.outputText}>{this.state.fehlertext}</Text>
                  </View> : null}
                  <View style={styles.outputContainer}>
                     <Button onPress={this.Loschen} title="Reset"/>
                  </View>
               </View>
            </View>
         </ScrollView>            
      );
   }
}

