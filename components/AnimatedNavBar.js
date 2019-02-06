import   React from 'react';
import { Ionicons } from '@expo/vector-icons';
import   Icon from 'react-native-vector-icons/FontAwesome';
import   BottomNavigation,{
         FullTab,
         IconTab,
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

  state = {
    activeTab: 'home'
  }

  tabs = [
      {
        key: 'home',
        icon: 'home',
        label: 'Home',
        barColor: 'renderBadge',
        pressColor: 'red'
      },
      {
        key: 'map',
        icon: 'map',
        label: 'Map',
        barColor: 'blue',
        pressColor: 'yellow'
      },
      {
        key: 'star',
        icon: 'star',
        label: 'Favourites',
        barColor: 'yellow',
        pressColor: 'blue'
      },
      {
        key: 'cogs',
        icon: 'cogs',
        label: 'Settings',
        barColor: 'pink',
        pressColor: 'red'
      }
    ]

  state = {
    activeTab: this.tabs[0].key
  }

  renderIcon = icon => ({ isActive }) => (
    <Icon size={30} color="#0dc6b5" name={icon} />
  )

  renderTab = ({ tab, isActive }) => (
    <IconTab
      isActive={isActive}
      showBadge={tab.key === 'map'}
      renderBadge={() => <Badge>:)</Badge>}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  render() {
    return (
        <BottomNavigation
          tabs={this.tabs}
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          useLayoutAnimation
        />
    )
  }
}
