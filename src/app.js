import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Image } from 'react-native';
import BottomNavigation, {FullTab} from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { connect } from 'react-redux'
import { fetchData } from './actions'
import { userLogin } from './login'


const styles = StyleSheet.create({
  container: {
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center'
  },
  LoginContainer:{
    flex : 1,
    flexDirection : 'column',
    paddingTop : 100,
    alignItems : 'center'
  },
  Text: {
    textAlign: 'center',
    fontSize: 28,
    color: '#F3F3F3',
    marginBottom: 20,

  },  
  TextInput: {
    color:'#F3F3F3',
    borderColor: 'gray',
    borderWidth: 1,
    borderColor:'#1E1E1E',
    height: 40,
    marginBottom: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    paddingLeft: 10,
    width:'80%',
    borderRadius: 5
  },
  Image : {
    width:125,
    height:125,
    marginBottom:10
  },
  Button: {
    borderWidth: 1,
    height: 40,
    marginBottom: 10
  }
});

class App extends Component {
  
  tabs = [
    {
      key: 'attend',
      icon: 'alarm',
      label: 'ลงเวลา',
      barColor: '#FF4946',
      pressColor: 'rgba(245, 245, 245, 0.16)'
    },
    {
      key: 'news',
      icon: 'book',
      label: 'ประชาสัมพันธ์',
      barColor: '#FF4946',
      pressColor: 'rgba(245, 245, 245, 0.16)'
    },
    {
      key: 'profile',
      icon: 'account-key',
      label: 'ประวัติ',
      barColor: '#FF4946',
      pressColor: 'rgba(245, 245, 245, 0.16)'
    },
  ]
 
  state = {
    activeTab: 'attend'
  }
 
  renderIcon = icon => ({ isActive }) => (
    <Icon size={22} color="#F5F5F5" name={icon} />
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

    props = this.props;
    
    return (
      
      <View style={{flex:1,backgroundColor:'#292929'}}>
          {
            !props.fetchReducer.active  &&
              <View style={styles.LoginContainer}>
              <Text style={styles.Text}>Welcome</Text>
                  <Image style={styles.Image}
                      source={{
                        uri: 'http://intranet.moj.go.th/assets/img/moj_logo.png',
                  }}/> 
                   <Text style={[styles.Text,{ fontSize: 16,paddingBottom:15}]}>MOJ TOUCH</Text>
                  <TextInput style={styles.TextInput}
                      placeholder={'Username'} placeholderTextColor="#444444"/>
                  <TextInput style={styles.TextInput}
                      placeholder={'Password'} placeholderTextColor="#444444"/>
                  <View style={{width:'80%',paddingTop:15}}>
                    <Button onPress={() => props.userLogin()} title={'Login'} color="#3469AF" />
                  </View>
                  <View style={{width:'80%',paddingTop:20}}>
                    <Button onPress={() => props.userLogin()} title={'Enroll'} color="#FF4946" />
                  </View>
              </View>
           
          }
          {
            props.fetchReducer.active && this.state.activeTab == "attend" &&
            <View style={styles.container}> 
              <Text>ลงเวลา</Text>
            </View>
          }
          {
            props.fetchReducer.active && this.state.activeTab == "news" &&
            <View style={styles.container}> 
            {
                props.fetchReducer.isFetching && <Text>Loading</Text>
            }
            {
                !props.fetchReducer.isFetching && 
                
                props.fetchReducer.data.length ? (
                    props.fetchReducer.data.map((person,i)=>{
                        return <View key={i} >
                                <Text>Name : {person.name}</Text>
                                <Text>Position : {person.position}</Text>
                            </View>
                    })
                ) : null
            }
            <Button title='Load' onPress={()=> props.fetchData()}/>
            </View>
          }
       
          {
            props.fetchReducer.active &&  this.state.activeTab == "profile" &&
            <View style={styles.container}> 
            <Text>ประวัติ</Text>
            </View>
          }
          
          {
            props.fetchReducer.active &&
            <BottomNavigation
              activeTab={this.state.activeTab}
              onTabPress={newTab => this.setState({ activeTab: newTab.key })}
              renderTab={this.renderTab}
              tabs={this.tabs}
            />
        }
      </View>
    )
  }
}

//Used to add reducer's state into the props
const mapStateToProps = (state) => ({
    fetchReducer : state.fetchReducer
});

//Used to add action (dispatch) : into the props

const mapDispatchToProps = {fetchData,userLogin};

/*
const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchData),
  userLogin: () => dispatch(userLogin)
});
*/
//export default App
export default connect(mapStateToProps,mapDispatchToProps)(App)