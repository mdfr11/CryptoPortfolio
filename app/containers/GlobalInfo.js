import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { FetchGlobalData } from "../actions/";
import Loading from "../components/Loading";

class GlobalInfo extends Component {
  componentDidMount() {
    this.props.FetchGlobalData();
  }
  render() {
    const { global } = this.props;
    if (global.isFetching) {
      return <Loading />;
    }
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={text}>market_cap_usd {global.data.market_cap_usd}</Text>
        <Text style={text}>volume_24h_usd {global.data.volume_24h_usd}</Text>
        <Text style={text}>
          bitcoin_dominance_percentage
          {global.data.bitcoin_dominance_percentage}%
        </Text>
        <Text style={text}>
          market_cap_change_24h {global.data.market_cap_change_24h}
        </Text>
        <Text style={text}>
          volume_24h_change_24h {global.data.volume_24h_change_24h}
        </Text>
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
  global: state.global
});

export default connect(
  mapStateToProps,
  { FetchGlobalData }
)(GlobalInfo);
