import {
    createStackNavigator,
  } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ScavengerModeScreen from '../screens/ScavengerModeScreen';
import WordBookScreen from '../screens/WordBookScreen';
import SettingScreen from '../screens/SettingScreen';
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import VolumeScreen from '../screens/VolumeScreen';
import DiscoveryScreen from '../screens/DiscoveryModeScreen';

  const AppNavigator = createStackNavigator(
    {
      Home: {
          screen: HomeScreen
      },
      ScavengerMode: {
        screen: ScavengerModeScreen
      },
      WordBookMode: {
        screen: WordBookScreen
      },
      SettingMode: {
        screen: SettingScreen
      },
      DiscoveryMode: {
        screen: DiscoveryScreen
      },
      LanguageSelectMode: {
        screen: LanguageSelectScreen
      },
      VolumeMode: {
        screen: VolumeScreen
      },
    },
    {
      initialRouteName: 'Home',
    }
  );

  export default AppNavigator;
