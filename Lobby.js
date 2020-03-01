//@refresh restart
import React, { useState, useEffect } from "react";
import {
  View,
  // Text,
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from "react-native";
// import db from "./db";
// import RandomGame from "./RandomGame";
import { Avatar } from "react-native-elements";
import { Tooltip, Text } from "react-native-elements";
import { CheckBox } from "react-native-elements";

export default function Lobby(props) {
  //   const [users, setUsers] = useState([]);
  // const name = props.navigation.getParam("name", "No params");
  // const [timer, setTimer] = useState(5);
  // const [user, setUser] = useState(null);
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   async function fetchUser() {
  //     const response = await db
  //       .collection("users")
  //       .doc(`${name}`)
  //       .get();
  //     const data = response.data();
  //     setUser(data);
  //   }

  //   db.collection("users").onSnapshot(query => {
  //     let all = [];
  //     query.forEach(doc => {
  //       all.push({ id: doc.id, ...doc.data() });
  //     });
  //     setUsers(all);
  //   });
  //   fetchUser();
  // }, []);

  // return users.length < 2 ? (
  //   <View>
  //     <Text>Not enough players</Text>
  //     <Text>Game Lobby</Text>
  //     {users.map((item, index) => (
  //       <Text key={index}>{item.name}</Text>
  //     ))}
  //   </View>
  // ) : (
  //   users.map((item, index) => <RandomGame user={item} />)
  // );

  // const [data, setData] = useState([
  //   { id: 1, name: "ABCD" },
  //   { id: 2, name: "EFGH" },
  //   { id: 3, name: "IJKL" }
  // ]);
  const [users, setUsers] = useState([]);
  const [number, setNumber] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log("hello");
  }, [selectedUsers]);

  const getUsers = async () => {
    try {
      let response = await fetch(
        `https://randomuser.me/api/?results=${number}`
      );
      let json = await response.json();
      json.results.map(item => (item.checked = false));
      setUsers([...users, ...json.results]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setLoading(true);
    setNumber(number + 10);
    getUsers();
  };

  const handleCheckBox = item => {
    item.checked = true;
    setSelectedUsers([...selectedUsers, item]);
  };

  return (
    <SafeAreaView>
      <Button title="ADD MORE" onPress={() => handleAdd()} />
      <Button title="SHOW SELECTED USERS" onPress={() => props.navigation.navigate("SelectedUsers",{users: selectedUsers})} />

      <Text style={{ fontSize: 30 }}>Names</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View key={item.id} style={{ flexDirection: "row" }}>
            <Tooltip
              height={150}
              width={200}
              popover={
                <View>
                  <Text style={{ color: "white" }}>
                    Country {item.location.country}
                  </Text>
                  <Text style={{ color: "white" }}>
                    State {item.location.state}
                  </Text>
                  <Text style={{ color: "white" }}>
                    City {item.location.city}
                  </Text>
                </View>
              }
            >
              <Avatar
                rounded
                source={{
                  uri: item.picture.thumbnail
                }}
              />
            </Tooltip>
            <Text
              style={{ fontSize: 20 }}
            >{`${item.name.first}  ${item.name.last}`}</Text>
            <CheckBox
              title="Click Here"
              checked={item.checked}
              onPress={() => handleCheckBox(item)}
            />
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ margin: 10 }}>
            {/* <Text>------------------------------------</Text> */}
          </View>
        )}
        keyExtractor={(item, index) => String(index)}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </SafeAreaView>
  );
}
