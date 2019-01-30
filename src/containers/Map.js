import React, { PureComponent, Fragment } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    ScrollView
  } from 'react-native';
  import MapView, { Marker, Callout } from 'react-native-maps';
  import connect from '../redux/connect';

  class Map extends PureComponent {
      constructor(props){
          super(props)
          this.renderMarkers = this.renderMarkers.bind(this)
          this.renderMap = this.renderMap.bind(this)
          this.toggleView = this.toggleView.bind(this)
          this.renderDetails = this.renderDetails.bind(this)

          this.state = {
              latitude: null,
              longitude: null,
              showingDetails: false,
              bounceValue: new Animated.Value(0),
              interests: []
          }
      }

      componentWillReceiveProps(nextProps) {
        if(this.props.singlePerson !== nextProps.singlePerson){
            const { interest_ids } = nextProps.singlePerson.person
            this.props.actions.fetchInterests(interest_ids)
            this.setState({
                showingDetails: false,
                interests: nextProps.singlePerson.person.interest_ids
            },() => this.toggleView())
            
        }
      }

      toggleView() { 
          const { showingDetails } = this.state;
          let toValue = showingDetails ? 325 : -325
            Animated.spring(
                this.state.bounceValue,
                {
                toValue: toValue,
                velocity: 3,
                tension: 2,
                friction: 8,
                }
            ).start();
            this.setState({
                showingDetails: !showingDetails
            })
    }

      renderMap(){
          const { coordinates } = this.props
          if(coordinates.data.result){
              return (
                coordinates.data.result.map(info => {
                    return(
                        <MapView 
                            key={info.id}
                            showsUserLocation
                            region={{
                                latitude: info.lat - 0.001,
                                longitude: info.lng + 0.0001,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01
                            }}
                            style={styles.map}>
                        {
                            this.renderMarkers()
                        }
                        </MapView>
                    )
                }) 
              )
          } else {
              return (
                <MapView style={styles.map}/>
              )
          }
    
      }

      renderMarkers(){
        const { coordinates } = this.props;
        const { person } = this.props.singlePerson
        if (coordinates.data.result){     
            return(
                coordinates.data.result.map(info => {
                    return (
                        <Fragment key={person.fullName}>
                            <Marker 
                                key={person.fullName}
                                coordinate={{
                                    latitude: info.lat,
                                    longitude: info.lng,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                }}
                                title={person.fullName}
                                description={person.fullName}
                            >
                                <Callout key={person.fullName}>
                                    <View style={styles.toolTipView}>
                                        <Image style={styles.toolTipImage} source={{uri: person.picture.thumbnail}} />
                                        <View>
                                            <Text style={styles.toolTipText}>{person.fullName.toUpperCase()}</Text>
                                            <Text style={styles.toolTipText}>{info.streetName}</Text>
                                            <Text style={styles.toolTipText}>{info.city}</Text>
                                            <Text style={styles.toolTipText}>{info.state}</Text>
                                        </View>
                                    </View>
                                </Callout>
                            </Marker>
                        </Fragment>
                    )
                   })
            )

        }
      }

    renderDetails(){
        const { person } = this.props.singlePerson
        const { picture } = this.props.singlePerson.person
        const { interests} = this.props.interests
        if(picture && interests){
            return (
                <Animated.View style={[styles.subView, {transform: [{translateY: this.state.bounceValue}]}]}>
                <View style={styles.detailView}>
                    <Image style={{width: 100, height: 100, borderRadius:10 }} source={{ uri: person.picture.large }} />
                    <View style={styles.detailViewPersonInfoView1}>
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailViewTextCell, {fontFamily: 'TitilliumWeb-Bold'}]}>Name:</Text>
                            <Text style={[styles.detailViewTextCell, {fontFamily: 'TitilliumWeb-Regular'}]}>{person.fullName.toUpperCase()}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailViewTextCell, {fontFamily: 'TitilliumWeb-Bold'}]}>Cell:</Text>
                            <Text style={[styles.detailViewTextCell, {fontFamily: 'TitilliumWeb-Regular'}]}>{person.cell}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailViewTextCell, {fontFamily: 'TitilliumWeb-Bold'}]}>Email:</Text>
                            <Text style={[styles.detailViewTextCell, {fontFamily: 'TitilliumWeb-Regular'}]}>{person.email}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={[styles.detailViewTextCell, {fontFamily: 'TitilliumWeb-Bold'}]}>Username:</Text>
                            <Text style={[styles.detailViewTextCell, {fontFamily: 'TitilliumWeb-Regular'}]}>{person.username}</Text>
                        </View>
                    </View>
                    <View style={styles.xButtonView}>
                        <TouchableOpacity onPress={() => {
                        this.toggleView()
                        }}>
                            <Text style={{ fontFamily: 'FontAwesome', fontSize: 20, color: '#FD4439', paddingRight: 10 }}>&#xf057;</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{paddingTop: 10, paddingBottom: 10, paddingRight: 10, paddingLeft: 15, fontFamily: 'TitilliumWeb-Bold'}}>Hobbies:</Text>
                
                <View style={styles.hobbyView}>
                <ScrollView
                    horizontal={true}
                >

                
                {
                    interests.map(info => {
                        return (
                            <View key={info.id} style={{marginLeft: 5, marginRight: 5, borderRadius: 4, borderTopWidth: 4, bordeToprColor: '#d6d7da' }}>
                                <Image source={{ uri: info.image }} style={{ width:100, height: 100, borderRadius:10}} />
                                <Text style={{alignSelf: 'center', padding: 10, fontFamily: 'TitilliumWeb-Regular'}}>{info.hobby}</Text>
                            </View>
                            
                        )
                    })
                }
                </ScrollView>
                </View>
                
            </Animated.View>
            )
        } else {
            <View></View>
        }
    }

      render(){
          return (
            <View style={styles.container}>
                {
                    this.renderMap()
                }
                {
                    this.renderDetails()
                }
            </View>
            
          )
      }
  }
  const fill = StyleSheet.absoluteFillObject;
  const styles = StyleSheet.create({
    container: fill,
    map: fill,
    subView: {
        position: "absolute",
        bottom: -325,
        left: 0,
        right: 0,
        backgroundColor: "#ffffff",
        height: 325,
      },
    toolTipView: {
        display: 'flex', 
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start', 
        justifyContent: 'flex-start'
    },
    toolTipText:{
        paddingLeft: 5,
    },
    toolTipImage: {
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        alignSelf: 'center'
    },
    detailRow: {
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
        paddingBottom: 10
    },
    detailView: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        marginBottom: -50,
        paddingTop: 10
    },
    hobbyView: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 10,
    },
    detailViewPersonInfoView1: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    detailViewTextCell: {
        paddingLeft: 5,
        fontFamily: 'TitilliumWeb-Regular'
    },
    xButtonView: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    }
  })
  
  const mapState = (state) => ({
    search: state.search,
    user: state.user,
    people: state.people,
    coordinates: state.location,
    singlePerson: state.singlePerson,
    interests: state.interests
  })
  
  export default connect(mapState)(Map);