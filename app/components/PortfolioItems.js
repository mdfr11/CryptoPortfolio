import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Picker } from "react-native";
import { connect } from "react-redux";
import { GetPortfolios } from "../actions/";
import { CreateTable } from "../actions/";
import { SQLite } from "expo-sqlite";
import store from "../store/store";

const db = SQLite.openDatabase("db.db");

class PortfolioItems extends Component {
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
      <View style={{marginTop: 50, marginLeft: 50}}>
        <Picker
          selectedValue={this.state.portfolioId}
          style={{ height: 50, width: 200, color: 'white' }}
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
  }
});

const { text } = styles;

const mapStateToProps = state => ({
    PortfolioReducer: state.PortfolioReducer
});

export default connect(
  mapStateToProps,
  { GetPortfolios, CreateTable }
)(PortfolioItems);
