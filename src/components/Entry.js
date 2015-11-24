import moment from 'moment';
import request from 'superagent';
import React, { Component, TextInput, Text, View, ProgressBarAndroid, TouchableOpacity, NativeModules } from 'react-native';

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: false, email: '', duration: '',date: moment().format('YYYY-MM-DD'), description: ''};
  }

  fetchData() {
    request
  .post('http://staging-move1t.herokuapp.com/entries.json')
  .send({ email: this.state.email,
        entry: {
          duration: this.state.duration,
          date: this.state.date,
          description: this.state.description
        }
      })
  .set('Accept', 'application/json')
  .end((err, res) => {
    // Calling the end function will send the request
    this.setState({isLoading: false});
    console.log(res);
  });
}

  onSubmit() {
    this.setState({isLoading: true});
    this.fetchData();
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
    return (
      this.state.isLoading ? (<ProgressBarAndroid styleAttr="Inverse"/>) : (
        <View>
          <Text onPress={(event) => this.handleDateClick()}>
            Date: {this.state.date}
          </Text>
        <TextInput
          keyboardType='email-address'
          onChangeText={(email) => this.setState({email})}
          placeholder='Email'
          value={this.state.email}
        />

      <TextInput
        keyboardType='numeric'
        onChangeText={(duration) => this.setState({duration})}
        placeholder='Duration of workout in minutes:'
        value={this.state.duration}
        />

      <TextInput
        keyboardType='default'
        onChangeText={(description) => this.setState({description})}
        placeholder='Brief description:'
        value={this.state.description}
      />

      <TouchableOpacity
        onPress={this.onSubmit.bind(this)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </ View>
      )
    );
  }
}
