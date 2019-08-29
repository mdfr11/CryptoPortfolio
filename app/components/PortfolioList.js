import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Picker } from "react-native";
import { connect } from "react-redux";
import { GetPortfolios } from "../actions";
import { CreateTable } from "../actions";
import { SQLite } from "expo-sqlite";
import store from "../store/store";
import { getStatusBarHeight } from 'react-native-status-bar-height';

const db = SQLite.openDatabase("db.db");

class PortfolioList extends Component {
  state = {
    items: null,
    portfolioId: ''
  };
  componentDidMount() {
    this.props.GetPortfolios();

  }
  render() {
    const { PortfolioReducer, navigation } = this.props;
    return (
      <View style={{flexDirection: "row",
      justifyContent: "center",
      alignItems: "center", marginTop: getStatusBarHeight()}}>
        <Picker
          style={dropdown}
          selectedValue={this.state.portfolioId}
          onValueChange={(itemValue, itemIndex) =>
            {this.setState({ portfolioId: itemValue })
            store.dispatch(GetPortfolios(itemValue));}
          }
        >
          {PortfolioReducer.data ? PortfolioReducer.data.map((item, i) => (
              <Picker.Item key={i} label={item.namePortfolio} value={item.portfolioId} />
            )) : <Picker.Item label="null" value="null" />}
        </Picker>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: "#787878",
    padding: 8,
    fontSize: 15
  },
  dropdown: {
    height: 50,
    width: 100,
    backgroundColor: "rgba(255, 0, 0, 0)",
    color: "#D3BD83",
    fontSize: 13
  }
});

const { text, dropdown } = styles;

const mapStateToProps = state => ({
    PortfolioReducer: state.PortfolioReducer
});

export default connect(
  mapStateToProps,
  { GetPortfolios, CreateTable }
)(PortfolioList);
