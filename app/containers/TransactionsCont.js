import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchCoinData } from "../actions/";
import { TouchableOpacity, Text, View, FlatList } from "react-native";
import CryptoItem from "../components/CryptoItem";
import sortFunction from "../tools/SortCoins";
import Loading from "../components/Loading";

class TransactionsCont extends Component {
  componentDidMount() {
    this.props.FetchCoinData();
  }
  render() {
    const { crypto, navigation, sort } = this.props;
    if (crypto.isFetching) {
      return <Loading />;
    }
    return (
      <View>
        <FlatList
          data={sortFunction(sort, crypto.data)}
          initialNumToRender={11}
          removeClippedSubviews={true}
          keyExtractor={(item, rank) => rank.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CoinDetailsScreen", { item: item })
              }
            >
              <CryptoItem item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  crypto: state.crypto,
  sort: state.sort.sortBy
});

export default connect(
  mapStateToProps,
  { FetchCoinData }
)(TransactionsCont);
