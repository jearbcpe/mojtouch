import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import BottomNavigation, {FullTab} from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux'
import {  
          userLogin,
          usernameChangeText,
          passwordChangeText  
} from './actions/user';
import { userCheckIn,userCheckOut } from './actions/attend';


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
    justifyContent:'center',
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
    width:150,
    height:150,
    marginBottom:10
  },
  Button: {
    borderWidth: 1,
    height: 40,
    marginBottom: 10
  },
  cameraPreview: {
    flex: 1,
    overflow: 'hidden',
    height:'100%'
  },
  circleTakePhoto : {
    width: 60,
    height: 60,
    borderRadius: 60/2,
    backgroundColor:'#008000',
    position: 'absolute',
  }
});

class App extends Component {
  
  tabs = [
    {
      key: 'attend',
      icon: 'run',
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
      icon: 'account',
      label: 'ประวัติ',
      barColor: '#FF4946',
      pressColor: 'rgba(245, 245, 245, 0.16)'
    },
  ]
 
  state = {activeTab: 'attend'}
 
  renderIcon = icon => ({ isActive }) => (
    <Icon size={18} color="#F5F5F5" name={icon} />
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
                      placeholder={'Username'} placeholderTextColor="#444444"
                      onChangeText={(username) => this.props.setUsername(username)}
                      />
                  <TextInput 
                      secureTextEntry={true}
                      style={styles.TextInput}
                      placeholder={'Password'} placeholderTextColor="#444444"
                      onChangeText={(username) => this.props.setPassword(username)}
                      />
                  <View style={{width:'80%',paddingTop:15}}>
                    <Button onPress={() => this.props.userLogin(props.fetchReducer.username,props.fetchReducer.password)} title={'Login'} color="#3469AF" />
                  </View>
                  <View style={{width:'80%',paddingTop:20}}>
                    <Button onPress={() => this.props.userLogin(props.fetchReducer.username,props.fetchReducer.password)} title={'Enroll'} color="#FF4946" />
                  </View> 
                
              </View>
           
          }
          {
            props.fetchReducer.active && this.state.activeTab == "attend" &&
            <View style={[styles.cameraPreview]}> 
                <View style={{flex:1,
                flexDirection:'row',
                justifyContent:'flex-end',
                width:'100%',
                height:'100%',
                }}>
                <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={{flex:1,width:'100%',height:'100%',alignItems:'center'
              }}
                type={RNCamera.Constants.Type.front}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                  title: 'Permission to use camera',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                  title: 'Permission to use audio recording',
                  message: 'We need your permission to use your audio',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                  console.log(barcodes);
                }}
              >
            <View style={{flex:1,justifyContent:'flex-end',marginBottom:15,alignItems:'center'}}>
              <View style={[styles.circleTakePhoeo,
                {
                borderColor:'white',
                borderWidth:2,
                backgroundColor:'#292929',
                width:68,
                height:68,
                borderRadius: 68/2,
                alignItems:'center',
                justifyContent:'center'
               }]}>           
                    <TouchableOpacity
                    onPress={() => this.props.userCheckIn(props.fetchReducer.token,props.fetchReducer.userId,props.fetchReducer.divnId)} 
                    style={
                      [styles.circleTakePhoto,
                        {justifyContent:'center',alignItems:'center'}
                      ]}>
                      <Icon size={40} color="#F5F5F5" name="run" />
                    </TouchableOpacity>    
              </View> 
              </View>
              </RNCamera>
              </View>
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
              style={{height:45}}
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
const mapDispatchToProps = (dispatch) => ({
  //fetchData,
  userLogin : (username,password) => dispatch(userLogin(username,password)),
  setUsername : (txtKey) => dispatch(usernameChangeText(txtKey)),
  setPassword : (txtKey) => dispatch(passwordChangeText(txtKey)),
  userCheckIn : (token,userId,divnId) => dispatch(userCheckIn(token,userId,divnId)),
  userCheckOut : (token,userId) => dispatch(userCheckOut(token,userId))
});

//export default App
export default connect(mapStateToProps,mapDispatchToProps)(App)