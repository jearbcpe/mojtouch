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
    color: 'gray',
    marginBottom: 20,

  },  
  TextInput: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    width:'70%'
  },
  Image : {
    width:125,
    height:125,
    marginBottom:10
  },
  Button: {
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
  }
});

class App extends Component {
  
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
      icon: 'account-key',
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

    props = this.props;
    
    return (
      
      <View style={{flex:1}}>
          {
            !props.fetchReducer.active  &&
              <View style={styles.LoginContainer}>
              <Text style={styles.Text}>MOJ Touch</Text>
                  <Image style={styles.Image}
                      source={{
                        uri: 'http://intranet.moj.go.th/assets/img/moj_logo.png',
                  }}/> 
                  <TextInput style={styles.TextInput}
                      placeholder={'Username'}/>
                  <TextInput style={styles.TextInput}
                      placeholder={'Password'}/>
                  <View style={{width:'70%'}}>
                    <Button onPress={() => props.userLogin()} title={'ตกลง'} color="#0099ff" />
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