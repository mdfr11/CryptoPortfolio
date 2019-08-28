import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { CoinDataHistorical } from "../actions/";
import { StyleSheet, Text, View } from "react-native";
import { LineChart, Grid } from 'react-native-svg-charts'

class CryptoItem extends PureComponent {
  render() {
    const { item, coinHistory } = this.props;
    return (
      <View style={container}>
        <Text style={text}>{item.rank}</Text>
        <View style={containerTwo}>
          <Text style={textYellow}>{item.name}</Text>
          <View style={{flex: 1, flexDirection: "row",}}>
          <Text style={text}>{item.symbol}</Text>
          <Text
            style={
              item.quotes.USD.percent_change_24h > 0 ? percentUp : percentDown
            }
          >
            {item.quotes.USD.percent_change_24h}%
          </Text>
          </View>
        </View>
        <Text style={textYellow}>{item.quotes.USD.price}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#787878",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#1E2223",
    margin: 5,
    borderRadius: 5,
  },
  containerTwo: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 15
  },
  containerChart: {
    flex: 1,
    alignItems: 'center'
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
    coinHistory: state.coinHistory
  });
  
export default connect(
    mapStateToProps,
    { CoinDataHistorical }
  )(CryptoItem);
