import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import { FetchDbData } from "../actions/";
import Loading from "../components/Loading";
import { SQLite } from "expo-sqlite";
import { Input, Button } from "react-native-elements";
import { LineChart, BarChart } from "react-native-svg-charts";

const db = SQLite.openDatabase("db.db");

class AddNewData extends Component {
  state = {
    items: null,
    name: "",
    amount: "",
    price: "",
    namePortfolio: ""
  };
  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        `select name, price, sum(amount) from transactions where portfolioId = ? group by name`,
        [this.props.navigation.state.params.namePortfolio],
        (_, { rows: { _array } }) => this.setState({ items: _array })
      );
    });
    db.transaction(tx => {
      tx.executeSql("drop table asdas");
    });
  }
  render() {
    const {namePortfolio} = this.props.navigation.state.params;
    console.log("xvvvvvvvvvvv " + JSON.stringify(this.state.items));
    return (
      <View>
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
                tx.executeSql("insert into portfoliosqq (namePortfolio) values (?)", [
                  this.state.namePortfolio
                ]);
              })
            }
          />
        </View>
        <View>
          <Text style={{ color: "white" }}>Add transaction</Text>
          <Input
            placeholder="Name"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
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
          <Input
            placeholder="namePortfolio"
            editable={false}
            value={`${namePortfolio}`}
          />
          <Button
            title="Add"
            onPress={() =>
              db.transaction(tx => {
                tx.executeSql(
                  "insert into transactions (name, price, amount, portfolioId) values (?, ?, ?, ?)",
                  [this.state.name, this.state.price, this.state.amount, namePortfolio]
                );
              })
            }
          />
          <Button
            title="Update"
            onPress={() =>
              db.transaction(tx => {
                tx.executeSql(
                  `select name, price, sum(amount) from transactions where portfolioId = ? group by name`,
                  [this.props.navigation.state.params.namePortfolio],
                  (_, { rows: { _array } }) => this.setState({ items: _array })
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

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { FetchDbData }
)(AddNewData);
