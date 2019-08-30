import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import AntDesign from "react-native-vector-icons/AntDesign";
import GlobalInfo from "../containers/GlobalInfo";
import TransactionsCont from "../containers/TransactionsCont";
import PortfolioCont from "../containers/Portfolio";
import CoinDetailsScreen from "../components/CoinDetailsScreen";
import SortMenu from "../components/SortMenu";
import PortfolioList from "../components/PortfolioList";
import AddNewData from "../components/AddNewDataScreen";
import AddTransaction from "../components/AddTransaction";
import SearchCoin from "../components/SearchCoin";

const TransactionsIcon = ({ tintColor }) => (
  <AntDesign name="linechart" size={25} color={tintColor} />
);

const GlobalInfoIcon = ({ tintColor }) => (
  <AntDesign name="piechart" size={25} color={tintColor} />
);

const PortfolioIcon = ({ tintColor }) => (
  <AntDesign name="form" size={25} color={tintColor} />
);

const Transactions = createStackNavigator(
  {
    Transactions: {
      screen: TransactionsCont,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: "#1E2223"
        },
        headerTitleStyle: {
          color: "#D3BD83"
        },
        title: null,
        headerBackground: <SortMenu />
      })
    },
    CoinDetailsScreen: {
      screen: CoinDetailsScreen,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#1E2223",
          elevation: 0
        },
        headerTitleStyle: {
          color: "#D3BD83"
        },
        headerTintColor: "#D3BD83",
        title: `${navigation.state.params.item.name}`
      })
    }
  },
  {
    headerMode: "screen",
    cardStyle: { backgroundColor: "#121212" }
  }
);

const Global = createStackNavigator(
  {
    GlobalInfoCont: {
      screen: GlobalInfo,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: "#1E2223"
        },
        headerTitleStyle: {
          color: "#D3BD83"
        },
        title: "Global data"
      })
    }
  },
  {
    headerMode: "screen",
    cardStyle: { backgroundColor: "#121212" }
  }
);

const Portfolio = createStackNavigator(
  {
    PortfolioCont: {
      screen: PortfolioCont,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: "#1E2223"
        },
        headerTitleStyle: {
          color: "#D3BD83"
        },
        headerBackground: <PortfolioList />
      })
    },
    AddNewData: {
      screen: AddNewData,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#1E2223",
          elevation: 0
        },
        headerTitleStyle: {
          color: "#D3BD83"
        },
        headerTintColor: "#D3BD83",
      })
    },
    AddTransaction: {
      screen: AddTransaction,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#1E2223",
          elevation: 0
        },
        headerTitleStyle: {
          color: "#D3BD83"
        },
        headerTintColor: "#D3BD83",
        title: `${navigation.state.params.nameCoin}`
      })
    },
    SearchCoin: {
      screen: SearchCoin,
      navigationOptions: ({ navigation }) => ({
        header: null,
        headerStyle: {
          backgroundColor: "#1E2223",
          elevation: 0
        },
        headerTitleStyle: {
          color: "#D3BD83"
        },
        headerTintColor: "#D3BD83",
        title: null,
      })
    }
  },
  {
    headerMode: "screen",
    cardStyle: { backgroundColor: "#121212" }
  }
);

const RootStack = createBottomTabNavigator(
  {
    Transactions: {
      screen: Transactions,
      navigationOptions: {
        tabBarIcon: TransactionsIcon,
        headerStyle: {
          backgroundColor: "#1E2223"
        },
        headerTitleStyle: {
          color: "white"
        }
      }
    },
    Global: {
      screen: Global,
      navigationOptions: {
        tabBarIcon: GlobalInfoIcon
      }
    },
    Portfolio: {
      screen: Portfolio,
      navigationOptions: {
        tabBarIcon: PortfolioIcon
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#D3BD83",
      inactiveTintColor: "#5d4d21",
      showLabel: false,
      style: {
        backgroundColor: "#1E2223"
      }
    }
  }
);

const MainNavigator = createAppContainer(RootStack);

export default MainNavigator;
