import React from "react";
import { Picker, ScrollView, Text, TextInput, View, Button } from "react-native";
import styles from "../../styles";
import { Body, Header, Icon, Left } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

export default class Unit extends React.Component {

   state = {
      unitStart: "null",
      activgeschwindigkeit: false,
      activstrecke: false,
      activmasse: false,
      activeingabe: false,
      ausgabe: false,
      ergebnis: "",
   };
   eingabeeinheit = "null"
   eingabeamount = null
   eingabeumrechnen = "null"
   eingabemultiplyer = null
   umrechnermultiplyer = 0
   eingabeindicator = false
   groseindicator = false
   umrechnerindicator = false

   Loschen = () => {
      this.setState({
         unitStart: "null",
         activgeschwindigkeit: false,
         activstrecke: false,
         activmasse: false,
         activeingabe: false,
         eingabeeinheit: "null",
         eingabeamount: null,
         eingabeumrechnen: "null",
         eingabemultiplyer: null,
         ausgabe: false,
         ergebnis: "",
      })
      this.eingabeeinheit = "null"
      this.eingabeumrechnen = "null"
      this.eingabeamount = null
      this.umrechnermultiplyer = 0
      this.eingabemultiplyer = null
      this.groseindicator = false
      this.eingabeindicator = false
      this.umrechnerindicator = false
   };

   unitStart = (x) => {
      switch (x) {
         case ("null"): { this.setState({ unitStart: x, activeingabe: false, activegrose: false, activeumrechnen: false }) } break;
         case ("v"): { this.setState({ activgeschwindigkeit: true, activstrecke: false, activmasse: false, unitStart: x, activeingabe: true }) } break;
         case ("s"): { this.setState({ activgeschwindigkeit: false, activstrecke: true, activmasse: false, unitStart: x, activeingabe: true }) } break;
         case ("m"): { this.setState({ activgeschwindigkeit: false, activstrecke: false, activmasse: true, unitStart: x, activeingabe: true }) } break;
      }
   }

   Eingabe = (x) => {
      this.eingabeeinheit = x
      this.eingabeindicator = true
      switch (x) {
         case ("null"): { this.eingabeindicator = false } break;

         case ("c"): { this.eingabemultiplyer = 1 / 299792458 } break;
         case ("m/s"): { this.eingabemultiplyer = 1 } break;
         case ("km/h"): { this.eingabemultiplyer = 3.6 } break;
         case ("kn"): { this.eingabemultiplyer = 1.94384 } break;
         case ("mph"): { this.eingabemultiplyer = 2.23694 } break;

         case ("Lj"): { this.eingabemultiplyer = 1 / 9460730472580800 } break;
         case ("Ae"): { this.eingabemultiplyer = 1 / 149597870700 } break;
         case ("mi"): { this.eingabemultiplyer = 0.000621371 } break;
         case ("inch"): { this.eingabemultiplyer = 39.3701 } break;
         case ("km"): { this.eingabemultiplyer = 0.001 } break;
         case ("m"): { this.eingabemultiplyer = 1 } break;
         case ("dm"): { this.eingabemultiplyer = 10 } break;
         case ("cm"): { this.eingabemultiplyer = 100 } break;
         case ("mm"): { this.eingabemultiplyer = 1000 } break;

         case ("kg"): { this.eingabemultiplyer = 1 } break;
         case ("g"): { this.eingabemultiplyer = 1000 } break;
         case ("t"): { this.eingabemultiplyer = 0.001 } break;
         case ("ztr"): { this.eingabemultiplyer = 0.02 } break;
         case ("oz"): { this.eingabemultiplyer = 35.274 } break;
         case ("lb"): { this.eingabemultiplyer = 2.20462 } break;
         case ("EM"): { this.eingabemultiplyer = 1 / (5.9722 * Math.pow(10, 24)) } break;
         case ("SM"): { this.eingabemultiplyer = 1 / (1.9891 * Math.pow(10, 30)) } break;
         case ("AM"): { this.eingabemultiplyer = 6.02214 * Math.pow(10, 26) } break;
      }
      this.Berechnung();
   }

   Grose = (x) => {
      this.eingabeamount = x
      if (x == "" || x == null) {
         this.groseindicator = false
      } else {
         this.groseindicator = true
      }
      this.Berechnung();
   }

   Umrechner = (x) => {
      this.eingabeumrechnen = x
      this.umrechnerindicator = true
      switch (x) {
         case ("null"): { this.umrechnerindicator = false } break;

         case ("m/s"): { this.umrechnermultiplyer = 1 } break;
         case ("c"): { this.umrechnermultiplyer = 1 / 299792458 } break;
         case ("km/h"): { this.umrechnermultiplyer = 3.6 } break;
         case ("kn"): { this.umrechnermultiplyer = 1.94384 } break;
         case ("mph"): { this.umrechnermultiplyer = 2.23694 } break;

         case ("Lj"): { this.umrechnermultiplyer = 1 / 9460730472580800 } break;
         case ("Ae"): { this.umrechnermultiplyer = 1 / 149597870700 } break;
         case ("mi"): { this.umrechnermultiplyer = 0.000621371 } break;
         case ("inch"): { this.umrechnermultiplyer = 39.3701 } break;
         case ("km"): { this.umrechnermultiplyer = 0.001 } break;
         case ("m"): { this.umrechnermultiplyer = 1 } break;
         case ("dm"): { this.umrechnermultiplyer = 10 } break;
         case ("cm"): { this.umrechnermultiplyer = 100 } break;
         case ("mm"): { this.umrechnermultiplyer = 1000 } break;

         case ("kg"): { this.umrechnermultiplyer = 1 } break;
         case ("g"): { this.umrechnermultiplyer = 1000 } break;
         case ("t"): { this.umrechnermultiplyer = 0.001 } break;
         case ("ztr"): { this.umrechnermultiplyer = 0.02 } break;
         case ("oz"): { this.umrechnermultiplyer = 35.274 } break;
         case ("lb"): { this.umrechnermultiplyer = 2.20462 } break;
         case ("EM"): { this.umrechnermultiplyer = 1 / (5.9722 * Math.pow(10, 24)) } break;
         case ("SM"): { this.umrechnermultiplyer = 1 / (1.9891 * Math.pow(10, 30)) } break;
         case ("AM"): { this.umrechnermultiplyer = 6.02214 * Math.pow(10, 26) } break;
      }
      this.Berechnung();
   }

   Berechnung = () => {
      let ergebnis = 0;
      this.setState({ ausagbe: true })
      if (this.eingabeindicator && this.groseindicator && this.umrechnerindicator) {
         ergebnis = this.eingabeamount / this.eingabemultiplyer * this.umrechnermultiplyer;
         console.log("starte Nicenumber")
         ergebnis = this.NiceNumber(ergebnis);
         console.log(ergebnis + " = " + this.eingabeamount + " / " + this.eingabemultiplyer + " * " + this.umrechnermultiplyer);
         this.setState({ ausgabe: true, ergebnis: ergebnis + "" + this.eingabeumrechnen })
      } else {
         this.setState({ ausgabe: false, ergebnis: "" })
         console.log("false")
      }
   }

   NiceNumber = (x) => {
      let fullactiv = true
      let fulllist = []
      let full = Math.floor(x)
      let fullpart = ""
      let fullend = ""
      let backcount = 0
      let backlist = []
      let back = x - Math.floor(x)
      let backpart = 0
      let backend = ""
      let cleaner = true
      let cleanershort = true
      console.log("x: " + x)
      if (full < 1000000000000000) {
         while (fullactiv == true) {
            if (full > 0) {
               fullpart = full - (Math.floor(full / 10) * 10)
               fulllist.push(fullpart)
               full = Math.floor(full / 10)
            } else {
               fullactiv = false
            }
         }
         let fullcount = 0
         while (fullcount < (fulllist.length - 3)) {
            fullend = fulllist[fullcount + 2] + "" + fulllist[fullcount + 1] + "" + fulllist[fullcount] + " " + fullend;
            fullcount = fullcount + 3
         }
         let divfull = fulllist.length - fullcount;
         switch (divfull) {
            case (1): { fullend = fulllist[fullcount + divfull - 1] + " " + fullend } break;
            case (2): { fullend = fulllist[fullcount + divfull - 1] + "" + fulllist[fullcount + divfull - 2] + " " + fullend } break;
            case (3): { fullend = fulllist[fullcount + divfull - 1] + "" + fulllist[fullcount + divfull - 2] + "" + fulllist[fullcount + divfull - 3] + " " + fullend } break;
         }
         console.log("fullend: " + fullend)

         console.log("back: " + back)
         back = Math.round(back * (Math.pow(10, 16)))
         console.log(back)
         for (let b = 0; b < 16; b++) {
            backpart = back - (Math.floor(back / 10) * 10)
            backlist.push(backpart)
            back = Math.floor(back / 10)
         }
         console.log(backlist)
         while (cleaner == true) {
            if (backlist[0] == 0) {
               backlist.shift()
               console.log("Kürzen")
               cleanershort = false
            } else {
               cleaner = false
            }
         }
         console.log(backlist)
         backcount = backlist.length
         backlist.reverse();
         for (let b2 = 0; b2 <= backcount - 3; b2 = b2 + 3) {
            backend = backend + "" + backlist[b2] + "" + backlist[b2 + 1] + "" + backlist[b2 + 2] + " ";
         }
         let divback = backcount % 3
         console.log("backend: " + backend)
         switch (divback) {
            case (1): { backend = backend + "" + backlist[backcount - 1] } break;
            case (2): { backend = backend + "" + backlist[backcount - 2] + "" + backlist[backcount - 1] } break;
         }
         console.log("backend: " + backend)
         let end = ""
         if (fullend == "") {
            if (backend == "") {
               end = 0
            } else {
               end = "0," + backend
            }
         } else {
            if (backend == "") {
               end = fullend
            } else {
               end = fullend + "," + backend
            }
         }
         if (cleanershort == true) {
            end = end + " ... "
         }
         return end;
      }
      return "fehlerhaft Eingabe für: "
   }

   render() {
      return (
         <View style={styles.container}>
            <Header style={styles.header}>
               <Left style={styles.headerContents}>
                  <Icon name="menu" onPress={() => this.props.navigation.openDrawer()}
                     style={styles.icon} />
               </Left>
               <Body style={styles.headerContents}>
                  <Text style={styles.headerText}>Umrechner</Text>
               </Body>
            </Header>
            <ScrollView>
               <View style={[styles.inputContainer, styles.zinsContainer]}>
                  <Text style={styles.inputText}>Physikalische Größe:</Text>
                  <Picker selectedValue={this.state.unitStart} style={[styles.inputPicker]} onValueChange={this.unitStart}>
                     <Picker.Item label="Auswählen" value="null" style={styles.inputText} />
                     <Picker.Item label="Geschwindigkeit" value="v" style={styles.inputText} />
                     <Picker.Item label="Strecke" value="s" style={styles.inputText} />
                     <Picker.Item label="Masse" value="m" style={styles.inputText} />
                  </Picker>
                  {this.state.activeingabe ? <Text style={styles.inputText}>Einheit:</Text> : null}
                  {this.state.activgeschwindigkeit ? this.state.activeingabe ? <Picker selectedValue={this.eingabeeinheit} style={[styles.inputPicker]} onValueChange={this.Eingabe}>
                     <Picker.Item label="Auswählen" value="null" style={styles.inputText} />
                     <Picker.Item label="c" value="c" style={styles.inputText} />
                     <Picker.Item label="m/s" value="m/s" style={styles.inputText} />
                     <Picker.Item label="km/h" value="km/h" style={styles.inputText} />
                     <Picker.Item label="Knoten" value="kn" style={styles.inputText} />
                     <Picker.Item label="mph" value="mph" style={styles.inputText} />
                  </Picker> : null : null}
                  {this.state.activstrecke ? this.state.activeingabe ? <Picker selectedValue={this.eingabeeinheit} style={[styles.inputPicker]} onValueChange={this.Eingabe}>
                     <Picker.Item label="Auswählen" value="null" style={styles.inputText} />
                     <Picker.Item label="Lichtjahr" value="Lj" style={styles.inputText} />
                     <Picker.Item label="Astr. Einheit" value="AE" style={styles.inputText} />
                     <Picker.Item label="Meile" value="mi" style={styles.inputText} />
                     <Picker.Item label="Zoll" value="inch" style={styles.inputText} />
                     <Picker.Item label="km" value="km" style={styles.inputText} />
                     <Picker.Item label="m" value="m" style={styles.inputText} />
                     <Picker.Item label="dm" value="dm" style={styles.inputText} />
                     <Picker.Item label="cm" value="cm" style={styles.inputText} />
                     <Picker.Item label="mm" value="mm" style={styles.inputText} />
                  </Picker> : null : null}
                  {this.state.activmasse ? this.state.activeingabe ? <Picker selectedValue={this.eingabeeinheit} style={[styles.inputPicker]} onValueChange={this.Eingabe}>
                     <Picker.Item label="Auswählen" value="null" style={styles.inputText} />
                     <Picker.Item label="kg" value="kg" style={styles.inputText} />
                     <Picker.Item label="g" value="g" style={styles.inputText} />
                     <Picker.Item label="t" value="t" style={styles.inputText} />
                     <Picker.Item label="Zentner" value="ztr" style={styles.inputText} />
                     <Picker.Item label="ounze" value="oz" style={styles.inputText} />
                     <Picker.Item label="Pfund" value="lb" style={styles.inputText} />
                     <Picker.Item label="Erdmasse" value="EM" style={styles.inputText} />
                     <Picker.Item label="Sonnenmasse" value="SM" style={styles.inputText} />
                     <Picker.Item label="Atommasse" value="AM" style={styles.inputText} />
                  </Picker> : null : null}
                  {this.state.activeingabe ? <Text style={styles.inputText}>Größe:</Text> : null}
                  {this.state.activeingabe ? <TextInput onChangeText={this.Grose}
                     value={this.eingabeamount} style={styles.inputText} placeholder="Bitte eingeben!" placeholderTextColor="#4A4A4A" /> : null}
                  {this.state.activeingabe ? <Text style={styles.inputText}>Umrechnen in:</Text> : null}
                  {this.state.activgeschwindigkeit ? this.state.activeingabe ? <Picker selectedValue={this.eingabeumrechnen} style={[styles.inputPicker]} onValueChange={this.Umrechner}>
                     <Picker.Item label="Auswählen" value="null" style={styles.inputText} />
                     <Picker.Item label="c" value="c" style={styles.inputText} />
                     <Picker.Item label="m/s" value="m/s" style={styles.inputText} />
                     <Picker.Item label="km/h" value="km/h" style={styles.inputText} />
                     <Picker.Item label="Knoten" value="kn" style={styles.inputText} />
                     <Picker.Item label="mph" value="mph" style={styles.inputText} />
                  </Picker> : null : null}
                  {this.state.activstrecke ? this.state.activeingabe ? <Picker selectedValue={this.eingabeumrechnen} style={[styles.inputPicker]} onValueChange={this.Umrechner}>
                     <Picker.Item label="Auswählen" value="null" style={styles.inputText} />
                     <Picker.Item label="Lichtjahr" value="Lj" style={styles.inputText} />
                     <Picker.Item label="Astr. Einheit" value="AE" style={styles.inputText} />
                     <Picker.Item label="Meile" value="mi" style={styles.inputText} />
                     <Picker.Item label="Zoll" value="inch" style={styles.inputText} />
                     <Picker.Item label="km" value="km" style={styles.inputText} />
                     <Picker.Item label="m" value="m" style={styles.inputText} />
                     <Picker.Item label="dm" value="dm" style={styles.inputText} />
                     <Picker.Item label="cm" value="cm" style={styles.inputText} />
                     <Picker.Item label="mm" value="mm" style={styles.inputText} />
                  </Picker> : null : null}
                  {this.state.activmasse ? this.state.activeingabe ? <Picker selectedValue={this.eingabeumrechnen} style={[styles.inputPicker]} onValueChange={this.Umrechner}>
                     <Picker.Item label="Auswählen" value="null" style={styles.inputText} />
                     <Picker.Item label="kg" value="kg" style={styles.inputText} />
                     <Picker.Item label="g" value="g" style={styles.inputText} />
                     <Picker.Item label="t" value="t" style={styles.inputText} />
                     <Picker.Item label="Zentner" value="ztr" style={styles.inputText} />
                     <Picker.Item label="ounze" value="oz" style={styles.inputText} />
                     <Picker.Item label="Pfund" value="lb" style={styles.inputText} />
                     <Picker.Item label="Erdmasse" value="EM" style={styles.inputText} />
                     <Picker.Item label="Sonnenmasse" value="SM" style={styles.inputText} />
                     <Picker.Item label="Atommasse" value="AM" style={styles.inputText} />
                  </Picker> : null : null}
               </View>
               <View style={styles.outputContainer}>
                  {this.state.ausgabe ?
                     <View style={[styles.outputContainer, { backgroundColor: '#CCC' }, styles.notification]}>
                        <Text style={styles.outputText}>{this.state.ergebnis}</Text>
                     </View> : null}
                  <View style={styles.outputContainer}>
                     <Button onPress={this.Loschen} title="Reset" />
                  </View>
               </View>
            </ScrollView>
         </View>
      )
   }
}