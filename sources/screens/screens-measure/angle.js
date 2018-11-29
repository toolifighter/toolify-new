import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button, TextInput, ScrollView } from 'react-native';
import { Accelerometer } from "expo";
import styles from '../../styles';
import {Header, Left, Right, Body, Title, Container, Icon} from 'native-base';

export default class Winkelmesser extends React.Component {
   
   state = {
    buttontitle:"test",

   };

   Loschen = () => {
      this.setState({

      })
   };
   







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
                <Text style={styles.inputText}>Nehmen sie ein Winkelmesser und messen selber.</Text>
            </View>
                <View style={styles.outputContainer}>
                    <Button onPress={this.Start} title={this.state.buttontitle}></Button>
                </View>           
                <View style={styles.outputContainer}>
                    {this.state.indicatorStatus ? <ActivityIndicator size="large"/> : null}
                    <View style={[styles.notification, styles.outputContainer, {backgroundColor: '#ccc'}]}>
                        <Text style={styles.outputText}>Aktuelle Messung: {this.state.ausgabe} °</Text>
                        <Text style={styles.outputText}>Durchschnitt: {this.state.ausgabe2} °</Text>
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