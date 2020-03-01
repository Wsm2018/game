//@refresh reset
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import db from "./db";
console.disableYellowBox = true;
export default function RandomGame(props) {
  // const user = props.user;
  const [randomNumbers, setRandomNumbers] = useState(
    Array.from(
      Array(6),
      (abc = { number: Math.floor(Math.random() * 10), flag: false }) => abc
    )
  );
  const name = props.navigation.getParam("name", "No params");
  const [result, setResult] = useState(0);
  const [sum, setSum] = useState(0);
  const [counter, setCounter] = useState(0);
  const [timer, setTimer] = useState(30);
  const [timerId, setTimerId] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  //------------------------------ TIMER START -----------------------------------------

  useEffect(() => {
    setTimerId(setTimeout(countdown, 1000));
  }, [timer]);

  const countdown = () => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else {
      alert("YOU LOST");
      props.navigation.goBack();
    }
  };

  //------------------------------ TIMER END -----------------------------------------

  useEffect(() => {
    db.collection("users")
      .doc(`${name}`)
      .set({ name: name, numbers: randomNumbers });
    generateResult();
  }, []);

  useEffect(() => {
    getUser();

    db.collection("users").onSnapshot(querySnap => {
      let allUsers = [];
      querySnap.forEach(doc => {
        allUsers.push({ id: doc.id, ...doc.data() });
      });
      setUsers(allUsers);
    });
  }, [user]);

  const getUser = async () => {
    const response = await db
      .collection("users")
      .doc(`${name}`)
      .get();
    const data = response.data();
    setUser(data);
    //console.log("user", data);
  };

  // const fetchData = async () => {
  //   const response = await db
  //     .collection("random")
  //     .doc("id")
  //     .get();
  //   const data = await response.data();
  //   setRandomNumbers(data.numbers);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, [randomNumbers]);

  const generateResult = () => {
    let result = 0;
    for (let i = 0; i < 4; i++) {
      let randomNumber = Math.floor(Math.random() * 10);
      result += randomNumber;
    }
    setResult(result);
  };

  const generateRandomNumbers = () => {
    let arr = [];
    for (let i = 0; i < 6; i++) {
      arr.push({ number: Math.floor(Math.random() * 10), flag: false });
    }
    db.collection("random")
      .doc("id")
      .set({ numbers: arr });
    setRandomNumbers(arr);
  };

  const reset = () => {
    generateRandomNumbers();
    generateResult();
    setSum(0);
    setTimer(30);
    clearTimeout(timerId);
  };

  useEffect(() => {
    checkSum();
  }, [sum]);

  const addNumber = item => {
    if (counter < 4) {
      if (!item.flag) {
        let localCount = counter;
        let localSum = sum;
        localCount++;
        item.flag = true;
        setCounter(localCount);
        localSum += item.number;
        setSum(localSum);
        db.collection("users")
          .doc(`${name}`)
          .update({ name: name, numbers: user.numbers });
      } else {
        alert("Select Another Number");
      }
    }
  };

  const checkSum = () => {
    if (counter === 4) {
      if (sum === result) {
        alert("You WON");

        db.collection("winners").add({ name: name, time: timer });
        props.navigation.goBack();
      } else {
        alert("YOU LOST");
        props.navigation.goBack();
      }
    }
  };

  return users.length < 2 ? (
    <Text>Not Enough Players</Text>
  ) : (
    <View style={styles.container}>
      <Button title="RESET" onPress={() => reset()} />
      <View>
        <Text style={styles.textStyle}>Your Name: {name}</Text>
        <Text style={styles.textStyle}>Your Sum: {sum}</Text>
        <Text style={styles.textStyle}>Timer: {timer}</Text>
        <Text style={styles.textStyle}>Result: {result}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.touchable}>
        {user &&
          user.numbers.map((item, index) => (
            //   <View style={styles.touchable}>
            <TouchableOpacity
              key={index}
              disabled={counter === 4}
              style={styles.touch}
              onPress={() => addNumber(item)}
            >
              <Text style={{ fontSize: 40 }}>{item.number}</Text>
            </TouchableOpacity>
            //   </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1
    //marginTop: "10%"
  },
  textStyle: {
    fontSize: 15,
    textAlign: "center"
  },
  touchable: {
    justifyContent: "space-around",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "1%"
    //width: "100%",
    // alignItems: "center"
  },
  touch: {
    borderColor: "black",
    borderWidth: 1,
    padding: "5%",
    margin: "10%"
  }
});
