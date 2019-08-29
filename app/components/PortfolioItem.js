import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class PortfolioItem extends Component {
  render() {
    const { item } = this.props;
    return (
      <View style={container}>
        <View style={containerTwo}>
          <Text style={textYellow}>{item.name}</Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={text}>Amount {item.amount}</Text>
          </View>
        </View>
        <Text style={textYellow}>${item.price} (avg)</Text>
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
    justifyContent: "center",
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

export default PortfolioItem;
