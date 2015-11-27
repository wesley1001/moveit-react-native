import moment from 'moment';
import Server from '../services/Server'
import React, { Component, Text, View, ProgressBarAndroid, NativeModules, StyleSheet } from 'react-native';
import MK, { MKButton, MKTextField } from 'react-native-material-kit';

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: false, email: '', duration: '',date: moment().format('YYYY-MM-DD'), description: ''};
    this.server = new Server('http://staging-move1t.herokuapp.com');
  }

  sendData() {
    let data = {
      email: this.state.email,
          entry: {
            duration: this.state.duration,
            date: this.state.date,
            description: this.state.description
      }
    };

    this.server.post('/entries.json', data, () => {
        this.setState({ isLoading: false });
      }
    );
  }

  onSave() {
    this.setState({ isLoading: true });
    this.sendData();
  }

  handleDateClick() {
    var self = this;
    NativeModules.DateAndroid.showDatepicker(function() {}, function(year,month,day) {
      month += 1;
      let newdate = year + '-' + month + '-' +day;
      self.setState({date: newdate});
    });
  }

  render() {
      if(this.state.isLoading) {
        return (<ProgressBarAndroid styleAttr="Inverse"/>);
      } else {
        return (
          <View>
            <Text onPress={(event) => this.handleDateClick()}>
              Date: {this.state.date}
            </Text>
            <MKTextField
              floatingLabelEnabled={true}
              floatingLabelFont={{fontSize: 15, fontWeight:'100'}}
              keyboardType='email-address'
              onChangeText={(email) => this.setState({email})}
              placeholder='Email'
              value={this.state.email}
              style={styles.textfieldWithFloatingLabel}
            />
            <MKTextField
              floatingLabelEnabled={true}
              floatingLabelFont={{fontSize: 15, fontWeight:'100'}}
              keyboardType='numeric'
              onChangeText={(duration) => this.setState({duration})}
              placeholder='Duration of workout in minutes:'
              value={this.state.duration}
              style={styles.textfieldWithFloatingLabel}
            />
            <MKTextField
              floatingLabelEnabled={true}
              floatingLabelFont={{fontSize: 10, fontWeight:'100'}}
              keyboardType='default'
              onChangeText={(description) => this.setState({description})}
              placeholder='Brief description:'
              value={this.state.description}
              style={styles.textfieldWithFloatingLabel}
            />

            <MKButton
              backgroundColor={'#43ca01'}
              style={{height: 38, padding: 10, margin: 10}}
              onPress={() => this.onSave()}
            >
              <Text pointerEvents="none"
                style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
                SAVE
              </Text>
            </MKButton>

          </View>
        );
      }
    }
  }

let styles = StyleSheet.create({
  textfieldWithFloatingLabel: {
    height: 50,
    marginTop: 10,
  },
});
