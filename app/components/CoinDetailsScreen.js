import React, { PureComponent } from "react";
import { CoinDataHistorical } from "../actions/";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { LineChart, BarChart } from "react-native-svg-charts";

class CoinDetailsScreen extends PureComponent {
  componentDidMount() {
    const time = {
      coin: this.props.navigation.state.params.item.id,
      interval: "2h",
      start: Math.round(new Date().getTime() / 1000.0) - 604800,
      end: Math.round(new Date().getTime() / 1000.0)
    };
    this.props.CoinDataHistorical(time);
  }
  render() {
    const { item } = this.props.navigation.state.params;
    const { coinHistory } = this.props;
    const fill = '#a5a6a7'
    return (
      <View>
        <View style={{backgroundColor: '#1E2223'}}>
        <View style={header}>
          <Text style={textYellow}>{item.quotes.USD.price}</Text>
          <Text style={
              item.quotes.USD.percent_change_24h > 0 ? percentUp : percentDown
            }>{item.quotes.USD.market_cap_change_24h}%</Text>
        </View>
        <View>
          <LineChart
            style={{ height: 200 }}
            data={this.getPrice(coinHistory.data)}
            svg={{ stroke: item.quotes.USD.percent_change_24h > 0 ? percentUp.color : percentDown.color }}
            contentInset={{ top: 20 }}
          />
          <BarChart style={{ height: 100 }} data={this.getVolume(coinHistory.data)} svg={{ fill }} contentInset={{ bottom: 40, }}/>
        </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center",}}>
          <Text style={{color: "#D3BD83", padding: 10, fontSize: 18, fontWeight: 'bold',}}>Info</Text>
        </View>
        <View style={{backgroundColor: '#1E2223', padding: 10}}>
            <Text style={text}>volume_24h {item.quotes.USD.volume_24h}</Text>
            <Text style={text}>volume_24h_change_24h {item.quotes.USD.volume_24h_change_24h}</Text>
            <Text style={text}>market_cap {item.quotes.USD.market_cap}</Text>
            <Text style={text}>market_cap_change_24h {item.quotes.USD.market_cap_change_24h}</Text>
            <Text style={text}>percent_change_1h <Text style={{color: item.quotes.USD.percent_change_1h > 0 ? percentUp.color : percentDown.color}}>{item.quotes.USD.percent_change_1h}</Text></Text>
            <Text style={text}>percent_change_12h <Text style={{color: item.quotes.USD.percent_change_12h > 0 ? percentUp.color : percentDown.color}}>{item.quotes.USD.percent_change_12h}</Text></Text>
            <Text style={text}>percent_change_24h <Text style={{color: item.quotes.USD.percent_change_24h > 0 ? percentUp.color : percentDown.color}}>{item.quotes.USD.percent_change_24h}</Text></Text>
            <Text style={text}>percent_change_7d <Text style={{color: item.quotes.USD.percent_change_7d > 0 ? percentUp.color : percentDown.color}}>{item.quotes.USD.percent_change_7d}</Text></Text>
            <Text style={text}>percent_change_30d <Text style={{color: item.quotes.USD.percent_change_30d > 0 ? percentUp.color : percentDown.color}}>{item.quotes.USD.percent_change_30d}</Text></Text>
            <Text style={text}>percent_change_1y <Text style={{color: item.quotes.USD.percent_change_1y > 0 ? percentUp.color : percentDown.color}}>{item.quotes.USD.percent_change_1y}</Text></Text>
        </View>
      </View>
    );
  }
  getPrice(data) {
    var array = [];
    if (typeof data !== "undefined" && data.length > 0) {
      Object.keys(data).map(coin => {
        array.push(parseFloat(data[coin].price));
      });
    }
    return array;
  }
  getVolume(data) {
    var array = [];
    if (typeof data !== "undefined" && data.length > 0) {
      Object.keys(data).map(coin => {
        array.push(parseFloat(data[coin].volume_24h));
      });
    }
    return array;
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#787878",
    fontSize: 15
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 17,
  },
  percentUp: {
    color: "#2DB091",
    fontWeight: 'bold',
    fontSize: 17
  },
  percentDown: {
    color: "#D86273",
    fontWeight: 'bold',
    fontSize: 17
  },
  textYellow: {
    color: "#D3BD83",
    fontWeight: 'bold',
    fontSize: 17
  }
});

const { text, header, percentUp, percentDown, textYellow, } = styles;

const mapStateToProps = state => ({
  coinHistory: state.coinHistory
});

export default connect(
  mapStateToProps,
  { CoinDataHistorical }
)(CoinDetailsScreen);
