import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/HomeScreen';
import store from './redux/store';
import {Provider} from 'react-redux';
import AppNavigator from "./src/AppNavigator.tsx";
const App = () => {
  return (
    <Provider store={store}>
      {/*<HomeScreen/>*/}
      <AppNavigator/>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
