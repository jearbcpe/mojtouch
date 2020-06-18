import React, { Component } from 'react';
import {
  SafeAreaView, Text, TextInput, View, Button,
  StyleSheet, Image, TouchableOpacity, Switch, FlatList, ScrollView
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
import { userCheck, cancelCheck, switchLocation, confirmCheck } from './actions/attend';
import { getNews } from './actions/content';
//import { captureScreen } from "react-native-view-shot";
//import RNFS from 'react-native-fs';
//import RNFetchBlob from 'react-native-fetch-blob';
const stylesList = StyleSheet.create({
  container: {
    flex: 1,
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
    height: '16%'
  }

});

const styleImageView = StyleSheet.create({
  widthMore: {
    width: '100%',
    height: 250
  },
  heightMore: {
    width: '100%',
    height: 550
  }
});

const stylesLink = StyleSheet.create({
  scrollViewLink: {
    flex: 1,
  },
  txtName: {
    fontSize: 13
  }
});

const borderCheck = StyleSheet.create({
  captureCheckIn: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#8EBFBB', //green
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
    backgroundColor: '#0364A7',
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
      icon: 'book',
      label: 'ประชาสัมพันธ์',
      barColor: '#A34B62',
      pressColor: 'rgba(245, 245, 245, 0.16)'
    },
    {
      key: 'attend',
      icon: 'run',
      label: 'ลงเวลา',
      barColor: '#0364A7',
      pressColor: 'rgba(245, 245, 245, 0.16)'
    },
    {
      key: 'profile',
      icon: 'account',
      label: 'ประวัติ',
      barColor: '#8EBFBB',
      pressColor: 'rgba(245, 245, 245, 0.16)'
    },
  ]


  

  toggleSwitch = () => { this.props.switchLocation() };

  renderIcon = icon => ({ isActive }) => (
    <Icon size={20} color="#F5F5F5" name={icon} />
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
    this.setState({ activeTab: 'news' });
    //this.props.getNews();
  }

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
              <TextInput style={styles.TextInput}
                placeholder={'Username'} placeholderTextColor="#A34B62"
                onChangeText={(username) => this.props.setUsername(username)}
              />
              <TextInput
                secureTextEntry={true}
                style={styles.TextInput}
                placeholder={'Password'} placeholderTextColor="#A34B62"
                onChangeText={(username) => this.props.setPassword(username)}
              />
              {/*  <View style={{ width: '80%', paddingTop: 15 }}>
              <Button onPress={() => {
                this.props.userLogin(this.props.fetchReducer.username, this.props.fetchReducer.password);
                this.setState({ activeTab: 'attend' })
              }
              } title={'Login'} color="#0365A7" />
            </View> */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  width: '80%', height: '4%',
                  justifyContent: 'center',
                  backgroundColor: '#0365A7',
                  borderRadius: 3,
                  alignItems: 'center',
                  marginTop: '3%'
                }}
                onPress={() => {
                  this.props.userLogin(this.props.fetchReducer.username, this.props.fetchReducer.password);
                  this.setState({ activeTab: 'news' })
                }
                }
              >
                <Text style={{ color: 'white', fontSize: 13 }}>LOGIN</Text>
              </TouchableOpacity>
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
              {/*  <View style={{ width: '80%', paddingTop: 20 }}>
              <Button onPress={() => this.props.userLogin(this.props.fetchReducer.username, this.props.fetchReducer.password)} title={'Enroll'} color="#A34B62" />
            </View> */}


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
                  //flashMode={RNCamera.Constants.FlashMode.on}
                  pauseAfterCapture={true}
                  /*
                  androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                  }}*/
                  captureAudio={false}
                  onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    console.log(barcodes);
                  }}
                >
                  <View style={styles.behind}>
                    <View style={{ flex: 1,backgroundColor: 'rgba(52, 52, 52, 0.1)' }}><Text style={{ flex: 2, fontSize: 20, color: '#28A745' }} ></Text></View>
                  </View>


                  <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View style={{ flex: 1, width: '30%', height: '55%', marginTop: '2%', marginLeft: 10, justifyContent: 'flex-start', flexDirection: 'column' }}>
                      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '80%', paddingTop: '4%' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <Icon style={{ flex: 1 }} size={25} color="#28A745" name={(this.props.fetchReducer.checkInLocation == "inside") ? 'office-building' : (this.props.fetchReducer.checkInLocation == "outside") ? 'home' : 'check'} />
                          <Text style={{ flex: 2, fontSize: 20, color: '#28A745' }} >เข้า  </Text>
                          <Text style={{ flex: 4, fontSize: 20, color: '#28A745' }} >{this.props.fetchReducer.checkInTime} น.</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                          <Icon style={{ flex: 1 }} size={25} color="#A34B62" name={(this.props.fetchReducer.checkOutLocation == "inside") ? 'office-building' : (this.props.fetchReducer.checkOutLocation == "outside") ? 'home' : 'check'} />
                          <Text style={{ flex: 2, fontSize: 20, color: '#A34B62' }} >ออก </Text>
                          <Text style={{ flex: 4, fontSize: 20, color: '#A34B62' }} >{this.props.fetchReducer.checkOutTime} น.</Text>
                        </View>
                      </View>
                    </View>


                    <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-end', width: '30%', height: '100%', marginTop: '2%', marginRight: '3%' }}>
                      <View style={{ flex: 1, marginRight: '3%', flexDirection: 'column', justifyContent: 'flex-start', height: '50%' }}>
                        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                          <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold', alignItems: 'flex-start' }} >14:54 น.</Text>
                        </View>
                        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start', marginRight: '3%' }}>
                          <Text style={{ fontSize: 20, textAlign: 'right', color: 'white' }}>5 มิ.ย.63 </Text>
                        </View>
                      </View>
                      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', width: '100%', height: '50%', marginRight: '8%' }}>
                        {/* ????? 
                      <Text style={{ fontSize: 15, color: 'yellow', fontWeight: 'bold',justifyContent:'flex-start', alignItems: 'flex-start' }} >
                        สวัสดีคุณธีระพล
                      </Text>
                      */}
                      </View>
                    </View>

                  </View>
                  <View style={{ flex: 5, justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                  </View>
                  <View style={{ justifyContent: 'space-between', flex: 1, flexDirection: 'row', width: '40%', height: '50%' }}>

                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      {
                        this.props.fetchReducer.waitConfirm &&
                        <Icon size={30} color="white" name="home" />
                      }
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                      {
                        this.props.fetchReducer.waitConfirm &&
                        <Switch
                          trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
                          thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={this.toggleSwitch}
                          value={this.props.fetchReducer.insideCheckConfirm}
                        />
                      }
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      {
                        this.props.fetchReducer.waitConfirm &&
                        <Icon size={30} color="white" name="office-building" />
                      }
                    </View>

                  </View>
                  <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 25, alignItems: 'center', width: '100%' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        {
                          this.props.fetchReducer.waitConfirm &&
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: '20%', marginTop: '15%', height: '100%' }}>


                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ flex: 1, fontSize: 18, color: '#FFFFFF' }} >{this.props.fetchReducer.typeCheckConfirm}</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ flex: 1, fontSize: 18, color: '#FFFFFF' }} >{this.props.fetchReducer.timeCheckConfirm} น.</Text>
                            </View>
                          </View>
                        }
                      </View>
                      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <View style={[styles.circleTakePhoto, (this.props.fetchReducer.waitConfirm) ? borderCheck.captureConfirm : (this.props.fetchReducer.alreadyCheckIn) ? borderCheck.captureCheckOut : borderCheck.captureCheckIn, { flexDirection: 'column', alignItems: 'center' }]}>

                          <TouchableOpacity
                            onPress={
                              () => {
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
                                  this.props.confirmCheck(this.camera);
                              }
                            }
                            style={
                              [styles.circleTakePhoto,
                              { justifyContent: 'center', alignItems: 'center' }
                              ]}>
                            <Icon size={45} color={this.props.fetchReducer.waitConfirm ? '#0364A7' : this.props.fetchReducer.alreadyCheckIn ? '#A34B62' : '#8EBFBB'} name={(this.props.fetchReducer.waitConfirm ? 'check' : 'run')} />

                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        {
                          this.props.fetchReducer.waitConfirm &&
                          <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: '20%', marginTop: '15%', width: '100%', height: '100%' }}>

                            <TouchableOpacity onPress={() => {
                              this.props.cancelCheck();
                              this.camera.resumePreview();
                            }}
                              style={
                                [
                                  styles.circleCaptureScreen,
                                  { justifyContent: 'center', alignItems: 'center', width: '100%' }
                                ]
                              }>
                              {/* <Icon size={30} color="#FFFFFF" name="close" /> */}
                              <Text style={{ flex: 1, fontSize: 18, color: '#FFFFFF' }} >ยกเลิก</Text>

                            </TouchableOpacity>
                          </View>
                        }
                      </View>

                    </View>
                  </View>

                </RNCamera>
              </View>
            </View>
          }
          {
            this.props.fetchReducer.active && this.state.activeTab == "news" &&
            <View style={[stylesList.container, { backgroundColor: '#F2F3F4' }]}>
              <View style={{ flex: 0.6, backgroundColor: 'white', marginBottom: '2%' }}>
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
                  <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', paddingBottom: '1%' }}>
                    <View style={{ flex: 1, width: 100, height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <View style={{ flex: 1 }}>
                        <Icon size={28} color="red" name="text" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <Text style={stylesLink.txtName}>e-doc</Text>
                      </View>
                    </View>
                    <View style={{ flex: 1, width: 100, height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <View style={{ flex: 1 }}>
                        <Icon size={28} color="#8EBFBB" name="account" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <Text style={stylesLink.txtName}>dpis</Text>
                      </View>
                    </View>
                    <View style={{ flex: 1, width: 100, height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <View style={{ flex: 1 }}>
                        <Icon size={28} color="#0364A7" name="car" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <Text style={stylesLink.txtName}>จองรถ</Text>
                      </View>
                    </View>
                    <View style={{ flex: 1, width: 100, height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <View style={{ flex: 1 }}>
                        <Icon size={28} color="#f5dd4b" name="pencil" />
                      </View>
                      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                        <Text style={stylesLink.txtName}>ลงทะเบียน</Text>
                      </View>
                    </View>

                  </View>


                </ScrollView>
              </View >
              <View style={{ flex: 3, backgroundColor: '#FFFFFF', marginTop: '0.3%', paddingTop: 5, paddingHorizontal: 3 }}>
                <View style={stylesList.item} >
                  <Text style={[stylesList.title, { fontWeight: 'bold' }]}>ข่าวประชาสัมพันธ์</Text>
                </View>
                <FlatList
                  data={this.props.fetchReducer.newsList}
                  renderItem={({ item }) =>
                    <View style={[{ flex: 1, flexDirection: 'column' }]}>

                      <View style={[stylesList.item, { flex: 1, flexDirection: 'row' }]}>
                        <View style={{ flex: 1 }}>
                          <Image style={{ width: 45, height: 45 }}
                            source={{
                              uri: 'http://intranet.moj.go.th/' + item.divnLogo,
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
                            uri: (item.newsImage != '') ? 'http://intranet.moj.go.th/' + item.newsImage : null,
                          }} />
                      </View>
                    </View>
                  }
                  keyExtractor={item => item.id}
                />
              </View>

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
              style={{ height: '6%' }}
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
  cancelCheck: () => { dispatch(cancelCheck()) },
  switchLocation: () => { dispatch(switchLocation()) },
  confirmCheck: (camera) => { dispatch(confirmCheck(camera)) },
  getNews: () => { dispatch(getNews()) }
});

//export default App
export default connect(mapStateToProps, mapDispatchToProps)(App)