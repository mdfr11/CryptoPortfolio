import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { SQLite } from "expo-sqlite";
import { SearchBar, Input, Button } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const db = SQLite.openDatabase("db.db");

class AddNewData extends Component {
  state = {
    search: "",
    items: null,
    name: "",
    amount: "",
    price: "",
    namePortfolio: ""
  };

  render() {
    const { navigation } = this.props;
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1E2223",
          height: hp("100%")
        }}
      >
        <Text
          style={{
            color: "#D3BD83",
            fontWeight: "bold",
            fontSize: 17,
            padding: 15
          }}
        >
          Add a manual transaction by searching for a coin
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SearchCoin", {
              namePortfolio: this.props.navigation.state.params.namePortfolio
            })
          }
        >
          <View pointerEvents="none">
            <SearchBar
              placeholder="Search coin"
              onChangeText={this.updateSearch}
              value={this.state.search}
              containerStyle={{
                backgroundColor: "rgba(0, 0, 0, 0);",
                width: wp('70%'),
                borderTopWidth: 0,
                borderBottomWidth: 0
              }}
            ></SearchBar>
          </View>
        </TouchableOpacity>
        <View>
          <Text style={{ color: "white" }}>Add portfolio</Text>
          <Input
            placeholder="Name"
            onChangeText={namePortfolio => this.setState({ namePortfolio })}
            value={this.state.namePortfolio}
          />
          <Button
            title="Add"
            onPress={() =>
              db.transaction(tx => {
                tx.executeSql(
                  "insert into portfoliosqq (namePortfolio) values (?)",
                  [this.state.namePortfolio]
                );
              })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#787878",
    padding: 8,
    fontSize: 15
  }
});

const { text } = styles;

export default AddNewData;
