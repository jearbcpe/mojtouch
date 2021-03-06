import React, { Component } from 'react';
import {
  SafeAreaView, Text, TextInput, View,Linking,
  StyleSheet, Image, TouchableOpacity, Switch, FlatList, ScrollView, ActivityIndicator
} from 'react-native';
import BottomNavigation, { FullTab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { SliderBox } from "react-native-image-slider-box";
import {
  userLogin,
  userLogout,
  usernameChangeText,
  passwordChangeText,
  checkStillOnline
} from './actions/user';
import { userCheck, cancelCheck, switchLocation, confirmCheck,updateTimeMin,getCurrentTime } from './actions/attend';
import { getNews } from './actions/content';
//import { captureScreen } from "react-native-view-shot";
//import RNFS from 'react-native-fs';
//import RNFetchBlob from 'react-native-fetch-blob';
const stylesList = StyleSheet.create({
  container: {
    flex: 13,
    marginTop: 0,
  },
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 5,
    borderColor: 'gray',
    borderWidth: 0
  },
  title: {
    fontSize: 15,
  },
  datetime: {
    fontStyle: 'italic',
    fontSize: 12
  } 
});

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
    color: '#A34B62',
    marginBottom: 20,

  },
  TextInput: {
    color: '#0365A7',
    borderColor: 'gray',
    borderWidth: 0,
    borderColor: '#1E1E1E',
    height: 40,
    marginBottom: 10,
    backgroundColor: '#FFF2EA',
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
  ImageProfile: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderRadius: 75,
    //borderWidth:3,
    //borderColor:'#0364A7'
  },
  Button: {
    borderWidth: 1,
    height: 40,
    marginBottom: 10
  },
  cameraPreview: {
    flex: 13,
    overflow: 'hidden',
    height: '100%'
  },
  circleTakePhoto: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  },
  circleCaptureScreen: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderColor: '#FFFFFF',

    position: 'absolute',
  },
  behind: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '17%'
  }

});

const styleImageView = StyleSheet.create({
  widthMore: {
    width: '100%',
    height: 250
  },
  heightMore: {
    width: '100%',
    height: 500
  }
});

const stylesLink = StyleSheet.create({
  scrollViewLink: {
    flex: 1,
  },
  txtName: {
    fontSize: 10
  }
});

const styleTextAttend = StyleSheet.create({
  textCheckIn : {
    //color : '#28A745'
    color : 'white'
  },
  textCheckOut : {
    //color : '#A34B62'
    color : 'white'
  }
});

const borderCheck = StyleSheet.create({
  captureCheckIn: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#28A745', //green
    width: 68,
    height: 68,
    borderRadius: 68 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  captureCheckOut: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#A34B62', //red
    width: 68,
    height: 68,
    borderRadius: 68 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  captureConfirm: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#0364A7',//blue
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
    state = {
      activeTab: 'news'
    }
  }

  tabs = [
    {
      key: 'news',
      icon: 'home',
      label: 'หน้าแรก',
      barColor: '#8EBFBB',
      pressColor: 'rgba(245, 245, 245, 0.16)'
    },
    {
      key: 'attend',
      icon: 'clock',
      label: 'ลงเวลา',
      barColor: '#0364A7',
      pressColor: 'rgba(245, 245, 245, 0.16)'
    },
    {
      key: 'profile',
      icon: 'account',
      label: 'ประวัติ',
      barColor: '#A34B62',
      pressColor: 'rgba(245, 245, 245, 0.16)'
    }
  ]


  

  toggleSwitch = () => { this.props.switchLocation() };

  renderIcon = icon => ({ isActive }) => (
    (isActive) ? <Icon size={20} color="black" name={icon} /> : <Icon size={20} color="#F5F5F5" name={icon} />

  )

  renderTab = ({ tab, isActive }) => (
    (isActive) ? 
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
      labelStyle={{ color: 'black',fontSize:11 }}
    />
    :
    <FullTab
    isActive={isActive}
    key={tab.key}
    label={tab.label}
    renderIcon={this.renderIcon(tab.icon)}
    labelStyle={{ color: '#F5F5F5',fontSize:11 }}
  />

  )

  UNSAFE_componentWillMount() {
    this.props.checkStillOnline();
    this.setState({ activeTab: 'news' });
    setInterval(() => {       
      if(this.state.activeTab == "attend" && this.props.fetchReducer.active){
        if(!(this.props.fetchReducer.waitConfirm || this.props.fetchReducer.isFetchingLocation || this.props.fetchReducer.isFetchingUploadCheckImage))
          this.props.checkStillOnline();
      }
    }, 30000);
  }

  //componentDidMount() {
    //console.log(AppState.currentState + "zzz");  
  //}

  //componentWillUnmount() {
    //console.log(AppState.currentState + "yyy");
  //}

  Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }


  render() {

    //props = this.props;
    return (

      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ flex: 1, backgroundColor: '#8EBFBB' }}>
          {
            !this.props.fetchReducer.active && 
            <View style={styles.LoginContainer}>
              <Text style={styles.Text}>Welcome</Text>
              <Image style={styles.Image}
                source={{
                  uri: 'https://intranet.moj.go.th/assets/img/moj_logo.png',
                }} />
              <Text style={[styles.Text, { fontSize: 16, paddingBottom: 15 }]}>MOJ TOUCH</Text>
              { !this.props.fetchReducer.isFetching &&
              <TextInput style={styles.TextInput}
                placeholder={'Username'} placeholderTextColor="#A34B62"
                onChangeText={(username) => this.props.setUsername(username)}
              />
              }
            
              { !this.props.fetchReducer.isFetching &&
              <TextInput
                secureTextEntry={true}
                style={styles.TextInput}
                placeholder={'Password'} placeholderTextColor="#A34B62"
                onChangeText={(username) => this.props.setPassword(username)}
              />
              }
              
        
              {/*  <View style={{ width: '80%', paddingTop: 15 }}>
              <Button onPress={() => {
                this.props.userLogin(this.props.fetchReducer.username, this.props.fetchReducer.password);
                this.setState({ activeTab: 'attend' })
              }
              } title={'Login'} color="#0365A7" />
            </View> */}
               { !this.props.fetchReducer.isFetching &&
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '80%', height: '4%',
                  justifyContent: 'center',
                  backgroundColor: '#0365A7',
                  borderRadius: 3,
                  alignItems: 'center',
                  marginTop: '3%',
                  marginBottom : '3%'
                }}
                onPress={() => {
                  this.props.userLogin(this.props.fetchReducer.username, this.props.fetchReducer.password);
                  this.setState({ activeTab: 'news' })
                }
                }
              >
                <Text style={{ color: 'white', fontSize: 13 }}>LOGIN</Text>
              </TouchableOpacity>
  }
  { 
                this.props.fetchReducer.isFetching &&
               <ActivityIndicator color="#0365A7" size={25} style={{height:20}} />
              }
              {
                this.props.fetchReducer.isVerifyFail && !this.props.fetchReducer.isFetching &&
                <Text style={[{ fontSize: 12,color:'#E74C3C' }]}>Invalid username or password</Text>
              }
              {/* {!this.props.fetchReducer.isFetching &&
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '80%', height: '4%',
                  justifyContent: 'center',
                  backgroundColor: '#A34B62',
                  borderRadius: 3,
                  alignItems: 'center',
                  marginTop: '3%'
                }}
                onPress={() => this.props.userLogin(this.props.fetchReducer.username, this.props.fetchReducer.password)}
              >
                <Text style={{ color: 'white', fontSize: 13 }}>ENROLL</Text>
              </TouchableOpacity>
              } */}
              
             


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
                    flex: 1, width: '100%', height: '100%', alignItems: 'center', paddingTop: '2%'
                  }}
                  type={RNCamera.Constants.Type.front}
                  pauseAfterCapture={true}
                  captureAudio={false}
                  //flashMode={RNCamera.Constants.FlashMode.on}
                  /*
                  androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                  }}
                  
                  onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    console.log(barcodes);
                  }}
                  */
                
                >
                  <View style={styles.behind}>
                    <View style={{ flex: 1,backgroundColor: 'rgba(52, 52, 52, 0.1)' }}><Text style={{ flex: 2, fontSize: 20, color: '#28A745' }} ></Text></View>
                  </View>
 

                  <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'space-between'}}>

                    <View style={{ flex: 1, width: '30%', height: '100%', marginTop: '2%', marginLeft: 10, justifyContent: 'flex-start', flexDirection: 'column' }}>
                      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', paddingTop: '4%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <Icon style={{ flex: 2 }} size={25} color="#28A745" name={(this.props.fetchReducer.checkInLocation == "inside") ? 'office-building' : (this.props.fetchReducer.checkInLocation == "outside") ? 'home' : 'watch'} />
                          <Text style={{ flex: 4, fontSize: 20, color: '#28A745' }} >เข้า  </Text>
                          <Text style={{ flex: 6, fontSize: 20, color: '#28A745' }} >{this.props.fetchReducer.checkInTime} น.</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <Icon style={{ flex: 2 }} size={25} color="#A34B62" name={(this.props.fetchReducer.checkOutLocation == "inside") ? 'office-building' : (this.props.fetchReducer.checkOutLocation == "outside") ? 'home' : 'watch'} />
                          <Text style={{ flex: 4, fontSize: 20, color: '#A34B62' }} >ออก </Text>
                          <Text style={{ flex: 6, fontSize: 20, color: '#A34B62' }} >{this.props.fetchReducer.checkOutTime} น.</Text>
                        </View>
                      </View>
                    </View>
                    <View style={{ flex: 1, width: '30%', height: '100%', marginTop: '2%', marginRight: 10,alignItems:'flex-end' ,justifyContent: 'flex-start', flexDirection: 'column' }}>
                      <View style={{ flex: 1, flexDirection: 'column',alignItems:'flex-end', justifyContent: 'flex-start', width: '80%' }}>
                      <View style={{ flex: 1, flexDirection: 'row' }}>
                          <Text style={{ fontSize: 40, textAlign: 'right', color: 'white' }}>{this.props.fetchReducer.currentTime.substring(0, 5)} น.</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <Text style={{ fontSize: 20, textAlign: 'right', color: 'white' }}>{this.props.fetchReducer.currentDate} </Text>
                        </View>
                      </View>
                    </View>

{/*
                    <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-end', width: '30%', height: '100%', marginTop: '2%', marginRight: '3%' }}>
                      <View style={{ flex: 1, marginRight: '3%', flexDirection: 'column', justifyContent: 'flex-start', height: '100%' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', alignItems: 'flex-start' }} >{this.props.fetchReducer.currentTime.substring(0, 5)} น.</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', marginRight: '3%' }}>
                          <Text style={{ fontSize: 20, textAlign: 'right', color: 'white' }}>5 มิ.ย.63 </Text>
                        </View>
                      </View>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', width: '100%', height: '50%', marginRight: '8%' }}>
                         ????? 
                      <Text style={{ fontSize: 15, color: 'yellow', fontWeight: 'bold',justifyContent:'flex-start', alignItems: 'flex-start' }} >
                        สวัสดีคุณธีระพล
                      </Text>
                    
                      </View>
                    </View>  */}

                  </View>
                  <View style={{ flex: 5, justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                  </View>
                  <View style={{ justifyContent: 'space-between', flex: 1, flexDirection: 'row', width: '40%', height: '50%' }}>

                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      {
                        this.props.fetchReducer.waitConfirm &&
                        <Icon size={30} color={(!this.props.fetchReducer.insideCheckConfirm) ? '#f5dd4b' : 'white'} name="home" />
                      }
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    
                      {
                        this.props.fetchReducer.waitConfirm &&
                        <Switch
                          trackColor={{ false: "white", true: "white" }}
                          thumbColor={true ? "#f5dd4b" : "#f5dd4b"}
                          ios_backgroundColor="#ffffff"
                          onValueChange={this.toggleSwitch}
                          value={this.props.fetchReducer.insideCheckConfirm}
                          disabled={!this.props.fetchReducer.isEnableSwitchLocation}
                        />
                      }
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      {
                        this.props.fetchReducer.waitConfirm &&
                        <Icon size={30} color={(this.props.fetchReducer.insideCheckConfirm) ? '#f5dd4b' : 'white'}  name="office-building" />
                      }
                      
                    </View>

                  </View>
                  <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: '0.02%', alignItems: 'center', width: '100%' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        {
                          this.props.fetchReducer.waitConfirm &&
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: '20%', marginTop: '15%', height: '100%' }}>


                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={[{ flex: 1, fontSize: 15 },(this.props.fetchReducer.typeCheckConfirm=="IN") ? styleTextAttend.textCheckIn : styleTextAttend.textCheckOut ]} >{(this.props.fetchReducer.typeCheckConfirm=="IN") ? 'เข้า' : 'ออก'}</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={[{ flex: 1, fontSize: 15 },(this.props.fetchReducer.typeCheckConfirm=="IN") ? styleTextAttend.textCheckIn : styleTextAttend.textCheckOut ]} >{this.props.fetchReducer.timeCheckConfirm} น.</Text>
                            </View>
                          </View>
                        }
                      </View>
                      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        { this.props.fetchReducer.workingTime &&
                        <View style={[styles.circleTakePhoto, (this.props.fetchReducer.waitConfirm) ? borderCheck.captureConfirm : (this.props.fetchReducer.alreadyCheckIn) ? borderCheck.captureCheckOut : borderCheck.captureCheckIn, { flexDirection: 'column', alignItems: 'center' }]}>

                          <TouchableOpacity
                            disabled={(this.props.fetchReducer.isFetchingLocation || this.props.fetchReducer.isFetchingUploadCheckImage) ? true : false }
                            onPress={
                              () => {
                                //console.log(this.props.fetchReducer.isFetching)
                               // if(!this.props.fetchReducer.isFetching){
                                 
                                  if (!this.props.fetchReducer.waitConfirm) {
                                    this.props.userCheck(
                                      this.props.fetchReducer.alreadyCheckIn,
                                      this.props.fetchReducer.token,
                                      this.props.fetchReducer.userId,
                                      this.props.fetchReducer.divnId,
                                      this.camera
                                    );
                                  }
                                  else
                                    this.props.confirmCheck(
                                      this.props.fetchReducer.tempIdCheckConfirm,
                                      this.props.fetchReducer.typeCheckConfirm,
                                      this.props.fetchReducer.insideCheckConfirm,
                                      this.camera
                                    );
                                //}
                                
                              }
                            }
                            style={
                              [styles.circleTakePhoto,
                              { justifyContent: 'center', alignItems: 'center' }
                              ]}>
                              {
                              //  this.props.fetchReducer.isFetching && !this.props.fetchReducer.isFetchingLocation && !this.props.fetchReducer.isFetchingUploadCheckImage &&
                             //   <ActivityIndicator color={this.props.fetchReducer.waitConfirm ? '#0364A7' : this.props.fetchReducer.alreadyCheckIn ? '#A34B62' : '#8EBFBB'} size={25} />
                              }
                              {
                                this.props.fetchReducer.isFetchingLocation &&
                                <Icon size={30} color={this.props.fetchReducer.waitConfirm ? '#0364A7' : this.props.fetchReducer.alreadyCheckIn ? '#A34B62' : '#28A745'}  name="crosshairs-gps" />
                              }
                               {
                                this.props.fetchReducer.isFetchingUploadCheckImage &&
                                <Icon size={30} color={this.props.fetchReducer.waitConfirm ? '#0364A7' : this.props.fetchReducer.alreadyCheckIn ? '#A34B62' : '#28A745'}  name="image-move" />
                              }
                              {
                                !this.props.fetchReducer.isFetchingLocation && !this.props.fetchReducer.isFetchingUploadCheckImage && //!this.props.fetchReducer.isFetching &&
                                <Icon size={45} color={this.props.fetchReducer.waitConfirm ? '#0364A7' : this.props.fetchReducer.alreadyCheckIn ? '#A34B62' : '#28A745'} name={(this.props.fetchReducer.waitConfirm ? 'check' : 'run')} />
                              }

                          </TouchableOpacity>
                        </View>
          }
                      </View>
                      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        {
                          this.props.fetchReducer.waitConfirm &&
                          <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: '20%', marginTop: '15%', width: '100%', height: '100%' }}>

                            <TouchableOpacity onPress={() => {
                              this.props.cancelCheck(this.camera);
                              
                            }}
                              style={
                                [
                                  styles.circleCaptureScreen,
                                  { justifyContent: 'center', alignItems: 'center', width: '100%' }
                                ]
                              }>
                              {/* <Icon size={30} color="#FFFFFF" name="close" /> */}
                              <Text style={[{ flex: 1, fontSize: 15,},((this.props.fetchReducer.typeCheckConfirm=="IN") ? styleTextAttend.textCheckIn : styleTextAttend.textCheckOut )]} >ยกเลิก</Text>

                            </TouchableOpacity>

                          </View>
                        }
                      </View>
                    </View>
                  </View>
                  <View style={{height:20,width:'100%',marginBottom:'2%',flexDirection:'column',alignItems:'center'}} >
                  { this.props.fetchReducer.isFetchingLocation &&
                      <Text style={[{ flex: 1, fontSize: 15 },(!this.props.fetchReducer.alreadyCheckIn) ? styleTextAttend.textCheckIn : styleTextAttend.textCheckOut]} >กำลังค้นหาตำแหน่ง...</Text>
                  }
                  { this.props.fetchReducer.isFetchingUploadCheckImage &&
                  <Text style={[{ flex: 1, fontSize: 15, },(!this.props.fetchReducer.alreadyCheckIn) ? styleTextAttend.textCheckIn : styleTextAttend.textCheckOut]} >กำลังส่งรูปภาพ...</Text>
                  }
                  </View>

                </RNCamera>
              </View>
            </View>
          }
          {
            this.props.fetchReducer.active && this.state.activeTab == "news" &&
            <View style={[stylesList.container, { backgroundColor: '#F2F3F4' }]}>
              <View style={{ flex: 1, backgroundColor: 'white', marginBottom: '2%' }}>
                {/*  <SliderBox
              resizeMethod={'resize'}
              resizeMode={'stretch'}
              autoplayInterval={6000}
              autoplay={true}
              circleLoop={true}
              ImageComponentStyle={{borderRadius: 0, width: '100%',height:'100%' ,marginTop: 0}}
              images={this.state.images} // like this
              onCurrentImagePressed={index => console.log(`image ${index} pressed`)}
              currentImageEmitter={index => console.log(`current pos is: ${index}`)}
            /> */}

                <View style={stylesList.item} >
                  <Text style={[stylesList.title, { fontWeight: 'bold' }]}>ระบบงาน</Text>
                </View>
                <ScrollView horizontal={true} style={[stylesLink.scrollViewLink]} showsHorizontalScrollIndicator={false}>
                  <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', paddingBottom: '1%' }}>
                  
                    <TouchableOpacity style={{ flex: 1, width: 80, height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
                    onPress={ ()=>{ Linking.openURL('https://saraban.moj.go.th')}}
                    >
                      <View style={{ flex: 1 }}>
                        <Icon size={20} color="red" name="text" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-start',marginTop:2  }}>
                        <Text style={stylesLink.txtName}>e-doc</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, width: 80, height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
                    onPress={ ()=>{ Linking.openURL('http://dpis.moj.go.th:88/')}}
                    >
                      <View style={{ flex: 1 }}>
                        <Icon size={20} color="#8EBFBB" name="account" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-start',marginTop:2  }}>
                        <Text style={stylesLink.txtName}>dpis</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, width: 80, height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
                    onPress={ ()=>{ Linking.openURL('https://car.moj.go.th/login')}}
                    >
                      <View style={{ flex: 1 }}>
                        <Icon size={20} color="#0364A7" name="car" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-start',marginTop:2  }}>
                        <Text style={stylesLink.txtName}>จองรถ</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, width: 80, height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
                    onPress={ ()=>{ Linking.openURL('http://register.moj.go.th/')}}
                    >
                      <View style={{ flex: 1 }}>
                        <Icon size={20} color="#f5dd4b" name="pencil" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-start',marginTop:2  }}>
                        <Text style={stylesLink.txtName}>ลงทะเบียน</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, width: 80, height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
                    onPress={ ()=>{ Linking.openURL('http://mrbs.moj.go.th/')}}
                    >
                      <View style={{ flex: 1 }}>
                        <Icon size={20} color="#AF7AC5" name="google-classroom" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-start' ,marginTop:2 }}>
                        <Text style={stylesLink.txtName}>ห้องประชุม</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, width: 80, height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
                    onPress={ ()=>{ Linking.openURL('http://payrollslip.moj.go.th/')}}
                    >
                      <View style={{ flex: 1 }}>
                        <Icon size={20} color="#D35400" name="archive" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-start',marginTop:2  }}>
                        <Text style={stylesLink.txtName}>slip</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, width: 80, height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
                    onPress={ ()=>{ Linking.openURL('https://intranet.moj.go.th')}}
                    >
                      <View style={{ flex: 1 }}>
                        <Icon size={20} color="#2ECC71" name="blur" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-start',marginTop:2 }}>
                        <Text style={stylesLink.txtName}>intranet</Text>
                      </View>
                    </TouchableOpacity>
                  </View>


                </ScrollView>
              </View >
              <View style={{ flex: 6, backgroundColor: '#FFFFFF', marginTop: '0.3%', paddingTop: 5, paddingHorizontal: 3 }}>
                <View style={stylesList.item} >
                  <Text style={[stylesList.title, { fontWeight: 'bold' }]}>ข่าวประชาสัมพันธ์</Text>
                </View>
                <FlatList
                  ref={(ref) => { this.flatListRef = ref; }}
                  data={this.props.fetchReducer.newsList}
                  renderItem={({ item }) =>
                    <View style={[{ flex: 1, flexDirection: 'column' }]}>

                      <View style={[stylesList.item, { flex: 1, flexDirection: 'row' }]}>
                        <View style={{ flex: 1 }}>
                          <Image style={{ width: 45, height: 45 }}
                            source={{
                              uri: 'http://intranet.moj.go.th/assets/img/logo/' + item.divnLogo,
                            }} />
                        </View>
                        <View style={{ flex: 5, flexDirection: 'column' }}>
                          <Text style={stylesList.title}>{item.title}</Text>
                          <Text style={stylesList.datetime}>{item.datetime}</Text>
                          {/*  <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
                    <Text style={{alignItems:'flex-end'}}>{item.datetime}</Text>
                  </View> */}

                        </View>

                      </View>
                      <View style={[stylesList.item, { flex: 1, flexDirection: 'column' }]}>
                        <Image style={[(item.widthMore ? styleImageView.widthMore : styleImageView.heightMore)]}
                          resizeMode="contain"
                          source={{
                            uri: (item.newsImage != '') ? 'http://intranet.moj.go.th/ws/uploads/' + item.newsImage : null,
                          }} />
                      </View>
 {/*                      <View style={[stylesList.item, { flex: 1, flexDirection: 'column',justifyContent:'flex-start',alignItems:'center',borderBottomWidth:1,borderColor:'#E5E7E9'}]}>
                          <View style={{flex:1,flexDirection:'row',width:'20%',height:'10%',justifyContent:'flex-start'}}>
                              <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Icon size={25} name="thumb-up-outline" color="#839192"></Icon>
                              </View>
                              <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:20,color:'#839192'}}>100</Text>
                              </View>
                          </View>
                      </View> */}
                    </View>
                  }
                  keyExtractor={item => item.id}
                />
              </View>

            </View>
          }

          {
            this.props.fetchReducer.active && this.state.activeTab == "profile" &&
            <View style={[stylesList.container, { backgroundColor: '#F2F3F4' }]}>
{/*             <View style={{ flex: 1, backgroundColor: 'white', marginBottom: '2%' }}>

              <View style={stylesList.item} >
                <Text style={[stylesList.title, { fontWeight: 'bold' }]}>ระบบงาน</Text>
              </View>
              <ScrollView horizontal={true} style={[stylesLink.scrollViewLink]} showsHorizontalScrollIndicator={false}>
             
              </ScrollView>
            </View > */}
            <View style={{ flex: 6, backgroundColor: '#FFFFFF', marginTop: '0.3%', paddingTop: 5, paddingHorizontal: 3 }}>
              <View style={stylesList.item} >
                {/* <Text style={[stylesList.title, { fontWeight: 'bold' }]}>ข้อมูลผู้ใช้งาน</Text> */}
              </View>
              <View style={{ width: '100%',height:'100%', flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
              <Image style={styles.ImageProfile}
                source={{
                  uri: (this.props.fetchReducer.fullName.match(/นาย.*/)) ?
                         'https://intranet.moj.go.th/assets/img/avatar04.png'
                        : (this.props.fetchReducer.fullName.match(/นางสาว.*/) ? 
                         'https://intranet.moj.go.th/assets/img/avatar2.png' 
                        : (this.props.fetchReducer.fullName.match(/นาง.*/)) ?
                         'https://intranet.moj.go.th/assets/img/avatar3.png' 
                        :'https://intranet.moj.go.th/assets/img/avatar5.png'
                        )
                }} />
                <View style={stylesList.item} >
              <Text style={[{ fontWeight: 'bold',fontSize : 20 ,color:'#4D5656' }]}>{this.props.fetchReducer.fullName}</Text>
                </View>
                <View style={stylesList.item} >
                  <Text style={[stylesList.title, { fontWeight: 'bold',fontSize : 20 ,color:'#4D5656' }]}>{this.props.fetchReducer.position}</Text>
                </View>
                
                <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '50%', height: '4%',
                  justifyContent: 'center',
                  backgroundColor: 'gray',
                  borderRadius: 3,
                  alignItems: 'center',
                  marginTop: '3%'
                }}
                onPress={() => this.props.userLogout(this.props.fetchReducer.token)}
              >
              <Text style={{ color: 'white', fontSize: 13 }}>LOGOUT</Text>
              </TouchableOpacity>
              </View>
            </View>

          </View>
          }

          {
            this.props.fetchReducer.active &&
           

            <BottomNavigation
              activeTab={this.state.activeTab}
              
              onTabPress={newTab => { 
                if(!this.props.fetchReducer.waitConfirm && !this.props.fetchReducer.isFetching){
                  this.setState({ activeTab: newTab.key }); 
                  this.props.checkStillOnline();
                }
                
                if(newTab.key == "news")
                {
                  if(this.state.activeTab=="news")
                    this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
                  this.props.getNews(this.props.fetchReducer.divnId);
                }
              }}
              renderTab={this.renderTab}
              tabs={this.tabs}
              style={{flex:1}}
            />
            
          }
        </View>
      </SafeAreaView>
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
  userLogout: (token) => { dispatch(userLogout(token)) },
  cancelCheck: (camera) => { dispatch(cancelCheck(camera)) },
  switchLocation: () => { dispatch(switchLocation()) },
  confirmCheck: (tempId,typeCheck,isInside,camera) => { dispatch(confirmCheck(tempId,typeCheck,isInside,camera)) },
  getNews: (divnId) => { dispatch(getNews(divnId)) },
  updateTimeMin : () => { dispatch(updateTimeMin())},
  getCurrentTime : () => { dispatch(getCurrentTime())}
});

//export default App
export default connect(mapStateToProps, mapDispatchToProps)(App)