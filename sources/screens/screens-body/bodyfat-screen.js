import React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Button,
  TextInput,
  Picker
} from "react-native";
import styles from "../../styles";
import globalData from "../../global-state";
import { Header, Left, Right, Body, Title, Container, Icon } from "native-base";

export default class BodyFat extends React.Component {

    state = {
        isLoadingComplete: false,
        notification: null,
        sex: null,
        gewicht: null,
        groesse: null,
        alter: null,
        grundumsatz: null,
        notification: null,
        bgColorNotification: null,
        isExecuted: false,
    }


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Header style={styles.header}>
            <Left style={styles.headerContents}>
              <Icon
                name="menu"
                onPress={() => this.props.navigation.openDrawer()}
              />
            </Left>
            <Body style={styles.headerContents}>
              <Text style={styles.headertext}>Körperfett</Text>
            </Body>
          </Header>
          <View style={[styles.inputContainer, styles.calContainer]}>
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
            <Text style={styles.inputText}>Größe (cm):</Text>
            <TextInput
              onChangeText={this.eingabeGroesse}
              value={this.state.groesse}
              style={styles.inputText}
              placeholder="Bitte eingeben!"
              placeholderTextColor="#4A4A4A"
            />
            <Text style={styles.inputText}>Gewicht (kg):</Text>
            <TextInput
              onChangeText={this.eingabeGewicht}
              value={this.state.gewicht}
              style={styles.inputText}
              placeholder="Bitte eingeben!"
              placeholderTextColor="#4A4A4A"
            />
            <Text style={styles.inputText}>Alter:</Text>
            <TextInput
              onChangeText={this.eingabeAlter}
              value={this.state.alter}
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
              onPress={this.berechnenGrundumsatz}
              title="Grundumsatz berechnen"
            />
          </View>
          {this.state.isExecuted ? (
            <View
              style={[
                styles.outputContainer,
                { backgroundColor: this.state.bgColorNotification },
                styles.notification
              ]}
            >
              <Text style={styles.outputText}>{this.state.notification}</Text>
            </View>
          ) : null}
          <View style={styles.outputContainer}>
            <Button onPress={this.Loschen} title="Reset" />
          </View>
        </View>
      </ScrollView>
    );
  }
}
