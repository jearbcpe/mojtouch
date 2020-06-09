import React, { Component } from 'react';
import { Text, View } from 'react-native';
import BottomNavigation, {FullTab} from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons'; 


export default class App extends Component {
  
  tabs = [
    {
      key: 'attend',
      icon: 'alarm',
      label: 'ลงเวลา',
      barColor: '#0F4D80',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'news',
      icon: 'book',
      label: 'ประชาสัมพันธ์',
      barColor: '#0F4D80',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
    {
      key: 'profile',
      icon: 'accessibility',
      label: 'ประวัติ',
      barColor: '#0F4D80',
      pressColor: 'rgba(255, 255, 255, 0.16)'
    },
  ]
 
  state = {
    activeTab: 'attend'
  }
 
  renderIcon = icon => ({ isActive }) => (
    <Icon size={22} color="white" name={icon} />
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
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1,flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
          {
            this.state.activeTab == "news" &&
            <Text>News</Text>
          }
          {
            this.state.activeTab == "attend" &&
            <Text>Attend</Text>
          }
           {
            this.state.activeTab == "profile" &&
            <Text>Attend</Text>
          }
        </View>
        <BottomNavigation
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({ activeTab: newTab.key })}
          renderTab={this.renderTab}
          tabs={this.tabs}
        />
      </View>
    )
  }
}