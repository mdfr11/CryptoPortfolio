import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SQLite } from "expo-sqlite";
import { Input, Button } from "react-native-elements";

const db = SQLite.openDatabase("db.db");

class AddTransaction extends Component {
  state = {
    search: "",
    items: null,
    id: this.props.navigation.state.params.idCoin,
    name: this.props.navigation.state.params.nameCoin,
    amount: "",
    price: "",
    namePortfolio: this.props.navigation.state.params.namePortfolio
  };

  render() {
    return (
      <View>
        <Input placeholder="Name" editable={false} value={this.state.name} />
        <Input
          placeholder="amount"
          onChangeText={amount => this.setState({ amount })}
          value={this.state.amount}
        />
        <Input
          placeholder="Price"
          onChangeText={price => this.setState({ price })}
          value={this.state.price}
        />
        <Button
          title="Add"
          onPress={() =>
            db.transaction(tx => {
              tx.executeSql(
                "insert into transactions (name, price, amount, portfolioId) values (?, ?, ?, ?)",
                [
                  this.state.name,
                  this.state.price,
                  this.state.amount,
                  this.state.namePortfolio
                ]
              );
            })
          }
        />
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

export default AddTransaction;
