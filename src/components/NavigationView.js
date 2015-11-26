import React, { Component, Text, View} from 'react-native';

export default class NavigationView extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Leaderboard</Text>
      </View>
    );
  }
}
