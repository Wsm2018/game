import React, { useState, useEffect } from "react";
import { Text, View, Button, TextInput } from "react-native";
import db from "./db";
export default Home = props => {
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(true);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   db.collection("users").onSnapshot(querySnap => {
  //     let allUsers = [];
  //     querySnap.forEach(doc => {
  //       allUsers.push({ id: doc.id, ...doc.data() });
  //     });
  //     setUsers(allUsers);
  //   });
  // }, [users]);

  const handleSubmit = async () => {
    // await db
    //   .collection("users")
    //   .doc(`${name}`)
    //   .set({
    //     name,
    //     numbers: Array.from(
    //       Array(6),
    //       (abc = { number: Math.floor(Math.random() * 10), flag: false }) => abc
    //     )
    //   });
    setFlag(setFlag(false));
  };

  return users.length <= 2 ? (
    <View>
      <Text
        style={{
          fontSize: 20,
          display: "flex",
          textAlign: "center",
          margin: 30,
          fontWeight: "bold"
        }}
      >
        GAME
      </Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>Enter Name:</Text>
        <TextInput
          style={{
            borderColor: "black",
            borderStyle: "solid",
            borderWidth: 1,
            width: 100,
            marginBottom: 10
          }}
          onChangeText={text => setName(text)}
          onSubmitEditing={handleSubmit}
        />
        <Button
          disabled={flag}
          title="START GAME"
          onPress={() =>
            props.navigation.navigate("RandomGame", { name: name })
          }
        />
      </View>
      {/* <Button title="HOME" onPress={() => props.navigation.push("Home")} /> */}
    </View>
  ) : (
    <Text>Lobby is full</Text>
  );
};
