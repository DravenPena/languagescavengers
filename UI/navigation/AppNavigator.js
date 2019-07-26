/*File: AppNavigator.js
  Description: This file is used as a template for navigating through the screens
  of the react-native project.  */


  //Import libraries
  import { createAppContainer,
    createStackNavigator
  } from 'react-navigation';//newer version of react-navigation requires containers around the app's stack navigator

  //Import screens to be connected from UI/screens folder
  import HomeScreen from '../screens/HomeScreen';
  import ScavengerModeScreen from '../screens/ScavengerModeScreen';
  import SettingScreen from '../screens/SettingScreen';
  import DiscoveryModeScreen from '../screens/DiscoveryModeScreen';

  const AppNavigator = createStackNavigator(
    {
      Home: {
          screen: HomeScreen
      },
      ScavengerMode: {
        screen: ScavengerModeScreen
      },
      DiscoveryMode: {
        screen: DiscoveryModeScreen
      },
      SettingMode: {
        screen: SettingScreen
      },
    },
    {
      initialRouteName: 'Home',
    }
  );

  const AppContainer = createAppContainer (AppNavigator);

  export default AppContainer;
