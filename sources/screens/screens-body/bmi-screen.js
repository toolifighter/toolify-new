import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, ActivityIndicator, Button, TextInput, Picker, Image, ScrollView } from 'react-native';
import styles from '../../styles';
import {Header, Left, Right, Body, Title, Container, Icon} from 'native-base';

export default class BMI extends React.Component {
  state = {
    isLoadingComplete: false,
    login: false,
    gewicht: '',
    groesse: '',
    bmi: null,
    notification: null,
    bgColorNotification: '#ccc',
    imageStatus: false,
    outputStatus: false,
    isFailed: false,
  };

  Loschen = () => {
    this.setState({
      isLoadingComplete: false,
      login: false,
      gewicht: '',
      groesse: '',
      bmi: null,
      notification: null,
      bgColorNotification: '#FFF',
      imageStatus: false,
      outputStatus: false,
      isFailed: false,
    })
}

  eingabeGewicht = (val) => {
    this.setState({
      gewicht: val,
    })
  }

  eingabeGroesse = (val) => {
    this.setState({
      groesse: val,
    })
  }

  berechnen = () => {
    let h = parseInt(this.state.groesse)/100;
    let b = parseInt(this.state.gewicht);
    let bmi = Math.round(b / (h*h));
    // console.log(b,h,bmi);
    this.setState({
      bmi: bmi,
      outputStatus: true,
      isFailed: false,
    })
    switch (true) {
      case (bmi < 18):
      this.setState({
        notification: 'Sie haben Untergewicht.',
        bgColorNotification: '#FE4141',
        imageStatus: false,
      })
      break;
      case (18<=bmi && 25>=bmi):
      this.setState({
        notification: 'Sie haben Normalgewicht.',
        bgColorNotification: '#93E961',
        imageStatus: false,
      })
      break;
      case (25 < bmi && 30 >= bmi):
      this.setState({
        notification: 'Sie haben Übergewicht. Mehr Rettich!',
        bgColorNotification: '#ff8c66',        
        imageStatus: true,
      })
      break;
      case (bmi > 30):
      this.setState({
        notification: 'Sie haben Adipositas.',
        bgColorNotification: '#FE4141',     
        imageStatus: true,
      })
      break;
      default:
      this.setState({
        bgColorNotification: '#FFF',
        imageStatus: false,
        isFailed: true,
      })
      break;
    }
    if (this.state.isFailed == true || typeof bmi != "number" || isNaN(bmi) == true) {
      this.setState({
        notification: 'Fehler: Bitte geben Sie alle Werte korrekt ein!',
        isFailed: false,
        bgColorNotification: '#FE4141',
      });
      console.log(this.state.isFailed);
    } else {
      this.setState({bmiOut: 'Ihr BMI beträgt '+bmi+'.'})
    }
    console.log(this.state.isFailed);
  }

  render() {
    return <ScrollView>
      <View style={styles.container}>
      <Header style={styles.header}>
                  <Left style={styles.headerContents}>
                    <Icon name="menu" onPress={()=>this.props.navigation.openDrawer()}/>
                  </Left>
                  <Body style={styles.headerContents}>
                    <Text style={styles.headertext}>BMI-Rechner</Text>
                  </Body>
                </Header>
        <View style={[styles.inputContainer, styles.bmiContainer]}>
          <Text style={styles.inputText}>Größe (cm):</Text>
          <TextInput onChangeText={this.eingabeGroesse} value={this.state.groesse} style={styles.inputText} placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput>
          <Text style={styles.inputText}>Gewicht (kg):</Text>
          <TextInput onChangeText={this.eingabeGewicht} value={this.state.gewicht} style={styles.inputText} placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A"></TextInput>
        </View>
        <View style={styles.outputContainer}>
          <Button onPress={this.berechnen} title="BMI berechnen"/>
        </View>  
        {this.state.outputStatus ? <View>
          {this.state.isFailed ? null : <View style={[styles.notification, styles.outputContainer, {backgroundColor: '#ccc'}]}>
            <Text style={styles.outputText}>{this.state.bmiOut}</Text>
          </View>}
          {<View style={[styles.outputContainer, styles.notification, {backgroundColor: this.state.bgColorNotification}]}>
            <Text style={styles.outputText}>{this.state.notification}</Text>
            {this.state.imageStatus ? <Image source={require('../../images/salat.jpg')} style={styles.notificationImage}/> : null}
          </View>}
        </View> : null}
        <View style={styles.outputContainer}>
          <Button onPress={this.Loschen} title="Reset"/>
        </View>
      </View>
    </ScrollView>
    
  }    
}