import React, { PureComponent, Fragment } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity
  } from 'react-native';
  import MapView, { Marker, Callout } from 'react-native-maps';
  import connect from '../redux/connect';

  
  class Map extends PureComponent {
      constructor(props){
          super(props)
          this.renderMarkers = this.renderMarkers.bind(this)
          this.renderMap = this.renderMap.bind(this)

          this.state = {
              latitude: null,
              longitude: null,
              
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
                                latitude: info.lat,
                                longitude: info.lng,
                                latitudeDelta: 0.05,
                                longitudeDelta: 0.05
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
                                latitudeDelta: 0.1,
                                longitudeDelta: 0.1
                            }}
                            title={person.fullName}
                            description={person.fullName}
                        />
                        <Callout>
                            <View>
                                <Text>THISISCALLOUT</Text>
                            </View>
                        </Callout>
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
            </View>
            
          )
      }
  }
  const fill = StyleSheet.absoluteFillObject;
  const styles = StyleSheet.create({
    container: fill,
    map: fill
  })
  
  const mapState = (state) => ({
    search: state.search,
    user: state.user,
    people: state.people,
    coordinates: state.location,
    singlePerson: state.singlePerson
  })
  
  export default connect(mapState)(Map);