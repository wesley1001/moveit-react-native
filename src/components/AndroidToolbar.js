import React, { Component, ToolbarAndroid, StyleSheet } from 'react-native';

export default class AndroidToolbar extends Component {
  render() {
    return (
      <ToolbarAndroid
        title={this.props.title}
        style={styles.toolbar}
      />
    );
  }
}

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#fdc300',
    height: 56,
  },
});
