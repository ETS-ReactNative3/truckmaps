import React, { PureComponent, Fragment } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Animated
  } from 'react-native';
  import MapView, { Marker, Callout } from 'react-native-maps';
  import connect from '../redux/connect';
  
  
  class Map extends PureComponent {
      constructor(props){
          super(props)
          this.renderMarkers = this.renderMarkers.bind(this)
          this.renderMap = this.renderMap.bind(this)
          this.toggleView = this.toggleView.bind(this)

          this.state = {
              latitude: null,
              longitude: null,
              showingDetails: false,
              bounceValue: new Animated.Value(0)
          }
      }

      componentWillReceiveProps(nextProps) {
        if(this.props.people !== nextProps.people){
          let newPeopleList = nextProps.people.people.map(person => {
            person.fullName = `${person.name.first} ${person.name.last}`
            return person;
          })
          this.setState({
            // search: props.search,
            // user: props.user
            peopleList: newPeopleList
          });
        }
        if(this.props.coordinates !== nextProps.people){
          this.setState({
            locationInformation: nextProps.coordinates
          })
        }
        if(this.props.singlePerson !== nextProps.singlePerson){
            this.setState({
                showingDetails: false
            },() => this.toggleView())
            
        }
      }

      toggleView() { 
          const { showingDetails } = this.state;
          let toValue = showingDetails ? 325 : -325
          console.log(this.state.bounceValue, 'bounce') 
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
                        <Fragment>
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
                                
                                <Callout>
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
      render(){
          return (
            <View style={styles.container}>
                {
                    this.renderMap()
                }
                        <Animated.View
                            style={[styles.subView, {transform: [{translateY: this.state.bounceValue}]}]}
                         >
                            <TouchableOpacity onPress={() => {
                                this.toggleView()
                            }}>
                                <Text>X</Text>
                            </TouchableOpacity>
                            <Text>This is a sub view</Text>
                        </Animated.View>
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
        backgroundColor: "#FFFFFF",
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
    }
  })
  
  const mapState = (state) => ({
    search: state.search,
    user: state.user,
    people: state.people,
    coordinates: state.location,
    singlePerson: state.singlePerson
  })
  
  export default connect(mapState)(Map);