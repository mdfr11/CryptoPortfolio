import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { sortCoins } from "../actions/";
import { connect } from "react-redux";
import store from "../store/store";
import AntDesign from "react-native-vector-icons/AntDesign";
import { getStatusBarHeight } from 'react-native-status-bar-height';

sortType = (type, option) => {
  switch (type) {
    case option + "_ASC":
      return <AntDesign name="caretup" size={10} color="#D3BD83" />;
    case option + "_DESC":
      return <AntDesign name="caretdown" size={10} color="#D3BD83" />;
  }
};

const SortMenu = ({ sort }) => {
  const options = {
    Id: "SORTED_BY_RANK",
    Name: "SORTED_BY_NAME",
    Percent: "SORTED_BY_PERCENT",
    Price: "SORTED_BY_PRICE"
  };
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: getStatusBarHeight(),
        justifyContent: "space-around"
      }}
    >
      {Object.keys(options).map((item, i) => (
        <Button
          key={i}
          icon={sortType(sort, options[item])}
          title={item}
          titleStyle={{ color: "#D3BD83", fontSize: 14, margin: 6 }}
          type="clear"
          onPress={
            sort === options[item] + "_ASC"
              ? e => {
                  e.preventDefault();
                  store.dispatch(sortCoins(options[item] + "_DESC"));
                }
              : e => {
                  e.preventDefault();
                  store.dispatch(sortCoins(options[item] + "_ASC"));
                }
          }
        />
      ))}
    </View>
  );
};

const mapStateToProps = state => ({
  crypto: state.crypto,
  sort: state.sort.sortBy
});

export default connect(
  mapStateToProps,
  { sortCoins }
)(SortMenu);
