import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import RandomGame from "./RandomGame";
import Home from "./home";
import Lobby from "./Lobby";
import db from "./db";
import SelectedUsers from "./SelectedUsers";

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Lobby
    },
    // RandomGame: {
    //   screen: RandomGame
    // },
    // Lobby: {
    //   screen: Lobby
    // },
    SelectedUsers: {
      screen: SelectedUsers
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#5DADE2"
      },
      headerTintStyle: "",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  return (
    <AppContainer />
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    margin: 100
  }
});
