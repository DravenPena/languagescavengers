import {
    createStackNavigator,
  } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import ScavengerModeScreen from '../screens/ScavengerModeScreen';
import SettingScreen from '../screens/SettingScreen';
<<<<<<< HEAD
import LanguageSelectScreen from '../screens/LanguageSelectScreen';
import VolumeScreen from '../screens/VolumeScreen';
import DiscoveryScreen from '../screens/DiscoveryModeScreen';
=======
import DiscoveryModeScreen from '../screens/DiscoveryModeScreen';
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d

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
<<<<<<< HEAD
      DiscoveryMode: {
        screen: DiscoveryScreen
      },
      LanguageSelectMode: {
        screen: LanguageSelectScreen
      },
      VolumeMode: {
        screen: VolumeScreen
      },
=======
>>>>>>> 73abe89fa40e91df9b2932b1f770c4b23a9da08d
    },
    {
      initialRouteName: 'Home',
    }
  );

  export default AppNavigator;
