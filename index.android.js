/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var request = require('superagent');
var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  ToolbarAndroid,
  TouchableHighlight,
  TextInput,
  Component,
  Text,
  View,
  ProgressBarAndroid
} = React;

class ReMoveIt extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: false};
  }

  fetchData() {
    request
  .post('http://staging-move1t.herokuapp.com/entries.json')
  .send({ email: 'peter.l@multunus.com',
        entry: {
          duration: "30",
          date: "2015-12-23 12:01:02",
          description: 'test'
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

  render() {
    let spinner = this.state.isLoading ? (<ProgressBarAndroid styleAttr="Inverse"/>) : (<View/>);
    return (
      <View>
        {spinner}
        <ToolbarAndroid
          style={styles.toolbar}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder='Enter Email'
        />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        placeholder='Enter Minutes'
      />
    <TouchableHighlight
      onPress={this.onSubmit.bind(this)}>
      <Text>Submit</Text>
    </TouchableHighlight>
    </View>
    );
  }
}

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#fdc300',
    height: 56,
  },
});

AppRegistry.registerComponent('ReMoveIt', () => ReMoveIt);
