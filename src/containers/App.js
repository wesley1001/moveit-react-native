import React, { View, Component } from 'react-native';
import AndroidToolbar from './../components/AndroidToolbar.js';
import Entry from './../components/Entry.js';

export default class ReMoveIt extends Component {

  render() {
    return (
      <View>
        <AndroidToolbar title='Add Entry'/>
        <Entry />
    </View>
    );
  }
}
