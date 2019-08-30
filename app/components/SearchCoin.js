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
import AntDesign from "react-native-vector-icons/AntDesign";
import { Input, Button, SearchBar } from "react-native-elements";
import filter from "lodash/filter";
import { getStatusBarHeight } from "react-native-status-bar-height";

class SearchCoin extends Component {
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
          <View style={container} key={key}>
            <View style={containerTwo}>
              <Text style={textYellow}>{coin.name}</Text>
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Text style={text}>{coin.symbol}</Text>
              </View>
            </View>

            <Text style={textYellow}>
              <AntDesign name="right" size={15} color={"#D3BD83"} />
            </Text>
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
      <ScrollView>
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
      <View style={{ marginTop: getStatusBarHeight() }}>
        <SearchBar
          pointerEvents="none"
          placeholder="Search coin"
          onChangeText={this.updateSearch}
          value={this.state.search}
          containerStyle={{
            backgroundColor: "rgba(0, 0, 0, 0);",
            borderTopWidth: 0,
            borderBottomWidth: 0
          }}
        />
        <View>{this.filterCoins()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#787878"
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#1E2223",
    margin: 5,
    borderRadius: 5
  },
  containerTwo: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 15
  },
  containerChart: {
    flex: 1,
    alignItems: "center"
  },
  percentUp: {
    color: "#2DB091",
    paddingLeft: 5
  },
  percentDown: {
    color: "#D86273",
    paddingLeft: 5
  },
  textYellow: {
    color: "#D3BD83"
  }
});

const {
  text,
  container,
  percentUp,
  percentDown,
  textYellow,
  containerTwo,
  containerChart
} = styles;

const mapStateToProps = state => ({
  crypto: state.crypto.data
});

export default connect(
  mapStateToProps,
  { FetchDbData }
)(SearchCoin);
