import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

const Loading = () => (
  <View style={loadingContainer}>
    <ActivityIndicator size="large" color="#D3BD83" />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center"
  },
  loadingIndicator: {
    height: 100,
    width: 100,
  }
});

const { loadingContainer, loadingIndicator } = styles;

export default Loading;
