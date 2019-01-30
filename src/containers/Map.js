import React, { PureComponent, Fragment } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
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
        // if(this.props.people !== nextProps.people){
        //   let newPeopleList = nextProps.people.people.map(person => {
        //     person.fullName = `${person.name.first} ${person.name.last}`
        //     console.log('DO I NEED?')
        //     return person;
        //   })
        //   this.setState({
        //     // search: props.search,
        //     // user: props.user
        //     peopleList: newPeopleList
        //   });
        // }
        // if(this.props.coordinates !== nextProps.people){
        //   this.setState({
        //     locationInformation: nextProps.coordinates
        //   })
        // }
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
                            region={{
                                latitude: info.lat - 0.001,
                                longitude: info.lng + 0.0001,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01
                            }}
                            style={styles.map}>
                        {this.renderMarkers()}
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
                                            <Text style={styles.toolTipText}>{person.fullName}</Text>
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
        const { interests} = this.props
        if(picture && interests){
            const pictureObject = person.picture
            console.log(pictureObject)
            console.log(interests, 'objk')
            return (
                <Animated.View style={[styles.subView, {transform: [{translateY: this.state.bounceValue}]}]}>
                <TouchableOpacity onPress={() => {
                    this.toggleView()
                }}>
                    <Text>X</Text>
                </TouchableOpacity>
                <View style={styles.detailView}>
                <Image style={{width: 100, height: 100, borderRadius: 20}} source={{ uri: person.picture.large }} />
                <View style={styles.detailViewPersonInfoView}>
                <Text style={styles.detailViewText}>{person.fullName}</Text>
                <Text style={styles.detailViewText}>{person.cell}</Text>
                <Text style={styles.detailViewText}>{person.email}</Text>
                <Text style={styles.detailViewText}>{person.username}</Text>
                </View>
                </View>
                <ScrollView
                    horizontal={true}
                >
                <View style={[styles.detailView, {paddingTop: 100}]}>
                {
                    interests.interests.map(info => {
                        console.log(info.hobby,'info')
                        return (
                            
                            <View key={info.id} style={{marginLeft: 5, marginRight: 5, borderRadius: 4, borderWidth: 0.5, borderColor: '#d6d7da' }}>
                            <Image source={{ uri: info.image }} style={{ width:100, height: 100}} />
                            <Text style={{alignSelf: 'center'}}>{info.hobby}</Text>
                            </View>
                            
                        )
                    })
                }
                </View>
                </ScrollView>
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
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        alignSelf: 'center'
    },
    detailView: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 10
    },
    detailViewPersonInfoView: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 10,
    },
    detailViewText: {
        paddingBottom: 10
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