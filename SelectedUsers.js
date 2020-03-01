import React, { useState } from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { Avatar } from "react-native-elements";
import { Tooltip, Text } from "react-native-elements";
export default SelectedUsers = props => {
  const users = props.navigation.getParam("users", "No params");

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 30 }}>Selected Users</Text>
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
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ margin: 10 }}>
            {/* <Text>------------------------------------</Text> */}
          </View>
        )}
        keyExtractor={(item, index) => String(index)}
      />
    </SafeAreaView>
  );
};
