import React, { Text, View, Component, DrawerLayoutAndroid, ToolbarAndroid, StyleSheet } from 'react-native';
import Entry from './../components/Entry.js';
import NavigationView from './../components/NavigationView.js';

let DRAWER_WIDTH = 250;

export default class ReMoveIt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: this.getMoveItHome(),
    };
  }

  getMoveItHome() {
    return {
      title: 'Add Entry',
      component: this.renderAddEntry(),
    }
  }

  renderAddEntry() {
    return React.createClass({
      render: function() {
        return (
          <Entry />
        );
      }
    });
  }

  renderNavigationView() {
      return (
        <NavigationView/>
    );
  }

  render() {
    return (
      <DrawerLayoutAndroid
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        drawerWidth={DRAWER_WIDTH}
        keyboardDismissMode="on-drag"
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={this.renderNavigationView}>
        {this.renderNavigation()}
      </DrawerLayoutAndroid>
    );
  }

  renderNavigation() {
    var Component = this.state.view.component;
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title={this.state.view.title}
        />
        <Component />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: '#fdc300',
    height: 56,
  },
});
