import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import { FetchDbData } from "../actions/";
import Loading from "../components/Loading";
import { SQLite } from "expo-sqlite";
import { Input, Button, SearchBar } from "react-native-elements";
import filter from "lodash/filter";

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

  updateSearch = search => {
    this.setState({ search });
  };

  filterCoins = () => {
    const { crypto, navigation } = this.props;
    const searchCoin = filter(
      crypto,
      o =>
        o.name.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0 ||
        o.symbol.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0
    );
    const find = (coin, key) => {
      return (
        <TouchableOpacity
          key={key}
          onPress={() =>
            navigation.navigate("AddTransaction", {
              id: key,
              coin: coin.symbol,
              idCoin: coin.id,
              nameCoin: coin.name,
              namePortfolio: this.props.navigation.state.params.namePortfolio
            })
          }
        >
          <View style={{ flexDirection: "row", padding: 15 }} key={key}>
            <Text style={{ color: "white" }}>{coin.name} </Text>
            <Text style={{ color: "white" }}>{coin.symbol}</Text>
          </View>
        </TouchableOpacity>
      );
    };
    const empty = () => {
      return (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "white" }}></Text>
        </View>
      );
    };
    return (
      <ScrollView style={{ height: 300 }}>
        {this.state.search.length != 0
          ? searchCoin.map((coin, key) => find(coin, key))
          : empty()}
      </ScrollView>
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.filterCoins();
    }
  }

  render() {
    return (
      <View>
        <SearchBar
          placeholder="Search coin"
          onChangeText={this.updateSearch}
          value={this.state.search}
          containerStyle={{backgroundColor: '#1E2223'}}
        />
        <View>{this.filterCoins()}</View>
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

const mapStateToProps = state => ({
  crypto: state.crypto.data
});

export default connect(
  mapStateToProps,
  { FetchDbData }
)(AddNewData);
