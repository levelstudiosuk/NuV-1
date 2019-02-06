import   React from 'react';
import { Ionicons } from '@expo/vector-icons';
import   Icon from 'react-native-vector-icons/FontAwesome';
import   BottomNavigation,{
         FullTab,
         Shifting,
         Badge } from 'react-native-material-bottom-navigation';
import { StyleSheet,
         TextInput,
         Image,
         TouchableHighlight,
         Dimensions,
         Button,
         Text,
         View } from 'react-native';

export default class AnimatedNavBar extends React.Component {

  tabs = [
    {
      key: 'home',
      icon: 'home',
      label: 'Home',
      barColor: '#0dc6b5',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'map',
      icon: 'map',
      label: 'Map',
      barColor: '#0dc6b5',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'favourite',
      icon: 'star',
      label: 'Favourite',
      barColor: '#0dc6b5',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'settings',
      icon: 'cogs',
      label: 'Settings',
      barColor: '#0dc6b5',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
  ]

  renderIcon = icon => ({ isActive }) => (
    <Icon size={30} color="#0dc6b5" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}

    />
  )

render() {

  const {navigate} = this.props.navigation;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Your screen contents depending on current tab. */}
      </View>
        <BottomNavigation
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.tabs}
          useLayoutAnimation
        />
      </View>
    )
  }
}
