import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { connect } from "react-redux";
import { GetTransactions } from "../actions/";
import { CreateTable } from "../actions/";
import Loading from "../components/Loading";
import PortfolioItem from "../components/PortfolioItem";
import { SQLite } from "expo-sqlite";
import { Button } from "react-native-elements";
import { LineChart, BarChart } from "react-native-svg-charts";
import AntDesign from "react-native-vector-icons/AntDesign";

const db = SQLite.openDatabase("db.db");

class PortfolioCont extends Component {
  state = {
    items: null
  };
  componentDidMount() {
    this.props.GetTransactions(this.props.PortfolioReducer.portfolio)
    this.props.CreateTable();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.PortfolioReducer.portfolio !==
      prevProps.PortfolioReducer.portfolio
    ) {
      this.props.GetTransactions(this.props.PortfolioReducer.portfolio);
    }
  }
  render() {
    const { SqlReducer, navigation, PortfolioReducer } = this.props;
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80
    ];
    if (SqlReducer.isFetching) {
      return <Loading />;
    }
    return (
      <ScrollView>
        <View>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              padding: 10
            }}
          >
            <Text style={{ color: "white" }}>234324$</Text>
            <Text style={{ color: "white" }}>2.4%</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button title="1h" type="clear" titleStyle={{ color: "#D3BD83" }} />
            <Button
              title="24h"
              type="clear"
              titleStyle={{ color: "#D3BD83" }}
            />
            <Button title="1w" type="clear" titleStyle={{ color: "#D3BD83" }} />
          </View>
          <LineChart
            style={{ height: 200 }}
            data={data}
            svg={{ stroke: "#D3BD83" }}
            contentInset={{ top: 20, bottom: 20 }}
          />
          <Button
            buttonStyle={{ padding: 0 }}
            onPress={() =>
              navigation.navigate("AddNewData", {
                namePortfolio: this.props.PortfolioReducer.portfolio
              })
            }
            icon={<AntDesign name="pluscircleo" size={40} color="#D3BD83" />}
            type="clear"
          />
          <FlatList
            data={SqlReducer.data}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({ item }) => <PortfolioItem item={item} />}
          />
        </View>
      </ScrollView>
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
  SqlReducer: state.SqlReducer,
  PortfolioReducer: state.PortfolioReducer
});

export default connect(
  mapStateToProps,
  { GetTransactions, CreateTable }
)(PortfolioCont);
