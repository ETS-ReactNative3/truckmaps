'use strict';

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import connect from '../redux/connect';
import SearchBar from './SearchBar';
import Map from './Map'


class App extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Map style={styles.map} />
        <View>
          <SearchBar />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: StyleSheet.absoluteFillObject,
})
const mapState = (state) => ({
  global: state.global
})

export default connect(mapState)(App);
