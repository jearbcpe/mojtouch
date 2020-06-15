import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Image, TouchableOpacity , Switch } from 'react-native';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux'
import {
  userLogin,
  userLogout,
  usernameChangeText,
  passwordChangeText,
  checkStillOnline
} from './actions/user';
import { userCheck } from './actions/attend';
import AsyncStorage from '@react-native-community/async-storage';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  LoginContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Text: {
    textAlign: 'center',
    fontSize: 28,
    color: '#F3F3F3',
    marginBottom: 20,

  },
  TextInput: {
    color: '#F3F3F3',
    borderColor: 'gray',
    borderWidth: 1,
    borderColor: '#1E1E1E',
    height: 40,
    marginBottom: 10,
    backgroundColor: '#1E1E1E',
    borderRadius: 5,
    paddingLeft: 10,
    width: '80%',
    borderRadius: 5
  },
  Image: {
    width: 150,
    height: 150,
    marginBottom: 10
  },
  Button: {
    borderWidth: 1,
    height: 40,
    marginBottom: 10
  },
  cameraPreview: {
    flex: 1,
    overflow: 'hidden',
    height: '100%'
  },
  circleTakePhoto: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  }
});

const borderCheck = StyleSheet.create({
  captureCheckIn: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'green',
    width: 68,
    height: 68,
    borderRadius: 68 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  captureCheckOut: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'red',
    width: 68,
    height: 68,
    borderRadius: 68 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  captureConfirm: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'blue',
    width: 68,
    height: 68,
    borderRadius: 68 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class App extends Component {
  constructor(props) {
    super(props);
  }

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

  state = { activeTab: 'attend' }

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

  UNSAFE_componentWillMount() {
    this.props.checkStillOnline();
    this.setState({activeTab:'attend'});
  }

  render() {

    //props = this.props;
    return (

      <View style={{ flex: 1, backgroundColor: '#292929' }}>
        {
          !this.props.fetchReducer.active &&
          <View style={styles.LoginContainer}>
            <Text style={styles.Text}>Welcome</Text>
            <Image style={styles.Image}
              source={{
                uri: 'http://intranet.moj.go.th/assets/img/moj_logo.png',
              }} />
            <Text style={[styles.Text, { fontSize: 16, paddingBottom: 15 }]}>MOJ TOUCH</Text>
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
            <View style={{ width: '80%', paddingTop: 15 }}>
              <Button onPress={() => {
                this.props.userLogin(this.props.fetchReducer.username, this.props.fetchReducer.password);
                this.setState({activeTab:'attend'})
                }
              } title={'Login'} color="#3469AF" />
            </View>
            <View style={{ width: '80%', paddingTop: 20 }}>
              <Button onPress={() => this.props.userLogin(this.props.fetchReducer.username, this.props.fetchReducer.password)} title={'Enroll'} color="#FF4946" />
            </View>

          </View>

        }
        {
          this.props.fetchReducer.active && this.state.activeTab == "attend" &&
          <View style={[styles.cameraPreview]}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              width: '100%',
              height: '100%',
            }}>
              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={{
                  flex: 1, width: '100%', height: '100%', alignItems: 'center'
                }}
                type={RNCamera.Constants.Type.front}
                flashMode={RNCamera.Constants.FlashMode.on}
                pauseAfterCapture={true}
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
              
              
              <View style={{flex:3,flexDirection:'row',justifyContent:'space-between'}}>
              
               <View style={{flex:1,width:'30%',height:'40%',marginTop:20,marginLeft:10}}>
                <View style={{flex:1,flexDirection:'column',alignItems:'flex-start',width:'80%'}}>
                  <View style={{flex:1,flexDirection:'row'}}>
                    <Icon style={{flex:1}} size={25} color="#7DCEA0" name="home" />
                    <Text style={{flex:2, fontSize: 20,color:'#7DCEA0',fontWeight:'bold'}} >IN </Text>
                    <Text style={{flex:3, fontSize: 20,color:'#7DCEA0',fontWeight:'bold'}} >14:54 น.</Text>
                  </View>
                  <View style={{flex:1,flexDirection:'row'}}>
                  <Icon style={{flex:1}} size={25} color="#F5B7B1" name="office-building" />
                    <Text style={{flex:2, fontSize: 20,color:'#F5B7B1',fontWeight:'bold'}} >OUT </Text>
                    <Text style={{flex:3, fontSize: 20,color:'#F5B7B1',fontWeight:'bold'}} > -- : -- น.</Text>
                  </View>
                </View>
              </View>
              
              
              <View style={{flex: 1,justifyContent:'center',flexDirection:'column',alignItems:'flex-end',width:'30%',height:'80%',marginTop:10,marginRight:10}}>
                <View style={{flex:1,marginRight:10,flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
                  <View style={{flex:3,flexDirection:'row'}}> 
                  <Text style={{fontSize: 40,color:'white',fontWeight:'bold'}} >14:54 น.</Text>
                  </View>
                  <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end'}}> 
                  <Text style={{fontSize: 20,textAlign:'right',color:'white'}}>5 มิ.ย.63 </Text>
                  </View>
                </View>
                <View style={{justifyContent:'space-between',flex:1,flexDirection:'row',width:'60%',marginRight:5}}>

                  <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                  { 
                  !this.props.fetchReducer.waitConfirm &&
                  <Icon style={{flex:1,borderColor:'blue'}} size={25} color="white" name="home" />
                  }
                  </View>
                  <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                  { 
                  !this.props.fetchReducer.waitConfirm &&
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    value={true}
                  />
                  }
                  </View>
                  <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                  { 
                  !this.props.fetchReducer.waitConfirm &&
                      <Icon style={{flex:1}} size={25} color="white" name="office-building" />
                  }
                  </View>
  
                </View>
              </View>
              
              </View>
              <View style={{ flex: 5, justifyContent: 'flex-end', alignItems: 'center',width:'100%'}}>
</View>
              <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 25, alignItems: 'center',width:'100%'}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                  <Icon style={{flex:1}} size={25} color="white" name="office-building" />
                </View>
                <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                <View style={[styles.circleTakePhoto, (this.props.fetchReducer.waitConfirm) ? borderCheck.captureConfirm : (this.props.fetchReducer.alreadyCheckIn) ? borderCheck.captureCheckOut : borderCheck.captureCheckIn,{flexDirection:'column',alignItems:'center'}]}>

<TouchableOpacity
  onPress={
    () =>
    {
      if(!this.props.fetchReducer.waitConfirm){
        this.props.userCheck(
          this.props.fetchReducer.alreadyCheckIn,
          this.props.fetchReducer.token,
          this.props.fetchReducer.userId,
          this.props.fetchReducer.divnId,
          this.camera
        );
      }
      else  
        console.log('confirm!!');
    }
  }
  style={
    [styles.circleTakePhoto,
    { justifyContent: 'center', alignItems: 'center' }
    ]}>
  <Icon size={45} color={this.props.fetchReducer.waitConfirm ? 'blue' : this.props.fetchReducer.alreadyCheckIn ? 'red' : 'green'} name={(this.props.fetchReducer.waitConfirm ? 'check' : 'run')} />
</TouchableOpacity>
</View>
                </View>
                <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                  <Icon style={{flex:1}} size={25} color="white" name="office-building" />
                </View>
 
                  </View>
              </View>
              
              </RNCamera>
            </View>
          </View>
        }
        {
          this.props.fetchReducer.active && this.state.activeTab == "news" &&
          <View style={styles.container}>
            {
              this.props.fetchReducer.isFetching && <Text>Loading</Text>
            }
            {
              !this.props.fetchReducer.isFetching &&

              this.props.fetchReducer.data.length ? (
                this.props.fetchReducer.data.map((person, i) => {
                    return <View key={i} >
                      <Text>Name : {person.name}</Text>
                      <Text>Position : {person.position}</Text>
                    </View>
                  })
                ) : null
            }
            <Button title='Load' onPress={() => this.props.fetchData()} />
          </View>
        }

        {
          this.props.fetchReducer.active && this.state.activeTab == "profile" &&
          <View style={styles.container}>
            <Text>ประวัติ</Text>
            <View style={{ width: '80%', paddingTop: 20 }}>
              <Button onPress={() => this.props.userLogout(this.props.fetchReducer.token)} title={'Logout'} color="gray" />
            </View>
          </View>
        }

        {
          this.props.fetchReducer.active &&
          <BottomNavigation
            activeTab={this.state.activeTab}
            onTabPress={newTab => this.setState({ activeTab: newTab.key })}
            renderTab={this.renderTab}
            tabs={this.tabs}
            style={{ height: 45 }}
          />
        }
      </View>
    )
  }
}


//Used to add reducer's state into the props
const mapStateToProps = (state) => ({
  fetchReducer: state.fetchReducer
});

//Used to add action (dispatch) : into the props
const mapDispatchToProps = (dispatch) => ({
  userLogin: (username, password) => dispatch(userLogin(username, password)),
  setUsername: (txtKey) => dispatch(usernameChangeText(txtKey)),
  setPassword: (txtKey) => dispatch(passwordChangeText(txtKey)),
  userCheck: (alreadyCheckIn, token, userId, divnId, camera) => dispatch(userCheck(alreadyCheckIn, token, userId, divnId, camera)),
  checkStillOnline: () => dispatch(checkStillOnline()),
  userLogout : (token) => {dispatch(userLogout(token))}
});

//export default App
export default connect(mapStateToProps, mapDispatchToProps)(App)