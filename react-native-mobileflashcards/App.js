// In App.js in a new project

import * as React from 'react';
import { View, Text, Button, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/index'
import middleware from './middleware'
import CreateDeck from './components/CreateDeck'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import RemoveDeck from './components/RemoveDeck'
import { purple, white, red } from './utils/colors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants'
import  Quiz  from './components/Quiz'
import Feedback from './components/Feedback'


function DeckStatusBar ({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

// Config for TabNav
const RouteConfigs = {
  DeckList:{
    name: "DeckList",
    component: DeckList,
    options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'DeckList'}
  }, 
  AddDeck:{
    component: CreateDeck,
    name: "Add Deck",
    options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Deck'}
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios" ? red : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios" ? white : red,
      shadowColor: "rgba(0, 0, 0, 0.34)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
  };

  const Tab = Platform.OS === 'ios'
        ? createBottomTabNavigator() 
        : createMaterialTopTabNavigator()

const TabNav = () =>(
  <Tab.Navigator {...TabNavigatorConfig}>
      <Tab.Screen {...RouteConfigs['DeckList']} />
      <Tab.Screen {...RouteConfigs['AddDeck']} />
  </Tab.Navigator>
)


// Config for StackNav
const StackNavigatorConfig = {
  headerMode: "screen"
}
const StackConfig = {
  TabNav:{
    name: "Home",
    component: TabNav,
    options: {headerShown: false}
  }, 
  DeckDetail:{
    name: "DeckDetail",
    component: DeckDetail,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: red
      },
      title: "Deck Detail"
    }
  },
  DeckList:{
    name: "DeckList",
    component: DeckList,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: red
      },
      title: "Deck Detail"
    }
  },
  AddCard:{
    name: "AddCard",
    component: AddCard,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: red
      },
      title: "Add card"
    }
  },
   RemoveDeck:{
    name: "RemoveDeck",
    component: RemoveDeck,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: red
      },
      title: "Remove Deck"
    }
  },

 Quiz:{
    name: "Quiz",
    component: Quiz,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: red
      },
      title: "Start Quiz"
    }
  },
   Feedback:{
    name: "Feedback",
    component: Feedback,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: red
      },
      title: "Feedback"
    }
  },

  AddDeck:{
    name: "AddDeck",
    component: CreateDeck,
    options: {
      headerTintColor: white,
      headerStyle:{
        backgroundColor: red
      },
      title: "Start Quiz"
    }
  }
}

const Stack = createStackNavigator();
const MainNav = () =>(
    <Stack.Navigator {...StackNavigatorConfig}>
    <Stack.Screen {...StackConfig['TabNav']} />
    <Stack.Screen {...StackConfig['DeckDetail']} />
    <Stack.Screen {...StackConfig['DeckList']} />
     <Stack.Screen {...StackConfig['RemoveDeck']} />
    <Stack.Screen {...StackConfig['AddCard']} />
    <Stack.Screen {...StackConfig['Quiz']} />
    <Stack.Screen {...StackConfig['Feedback']} />
  </Stack.Navigator>
)


const store = createStore(reducer, middleware)

class App extends React.Component  {

  render(){
  return (
     <Provider store={store}>
     <SafeAreaProvider>
     <SafeAreaView style={{ flex: 1}} >
     <StatusBar background={red} barStyle="light-content" />
      <NavigationContainer>
     
       <MainNav/>

    </NavigationContainer>
         </SafeAreaView>
    </SafeAreaProvider>
    </Provider>
  );
}
}

export default App;