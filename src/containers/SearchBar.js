'use strict';

import React, { PureComponent } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

import connect from '../redux/connect';
import Autocomplete from 'react-native-autocomplete-input';
import { getRandomLatLon } from '../lib/geo';


class SearchBar extends PureComponent {
  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this)
    this.renderTextInput = this.renderTextInput.bind(this)
    this.compare = this.compare.bind(this)

    this.state = {
      search: props.search,
      user: props.user,
      peopleList: [],
      searchQuery: ''
    }
  }

  componentDidMount(){
    this.props.actions.fetchAllPeople();

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
    // if(this.props.coordinates !== nextProps.people){
    //   this.setState({
    //     locationInformation: nextProps.coordinates
    //   })
    // }
  }

  onChangeText(searchQuery){
    this.setState({
      searchQuery: searchQuery
    })
  }

  renderAutoCompleteList(searchQuery){
    if(searchQuery.length <= 2){
      return [];
    }
    const { peopleList } = this.state;
    const r = new RegExp(`${searchQuery.trim()}`, 'i');
    let list = peopleList.filter(person =>
      person.fullName.search(r) >= 0
    );
    return list
  }

  handleSelect(person){
    // const coordinate = getRandomLatLon()
    this.props.actions.fetchLocation(getRandomLatLon())
    this.props.actions.fetchPerson(person)
    this.setState({
      searchQuery: person.fullName,
      // coordinate,
      person,
    })
  }


    renderTextInput(props) {
      return (
        <TextInput
          style={styles.inputContainerStyle}
          placeholder="Search for a user"
          onChangeText={this.onChangeText}
          underlineColorAndroid='transparent'
          {...props}
        />
      )
    }

    compare(first, second){
      if (first.toLowerCase().trim() === second.toLowerCase().trim()){
        return true
      } else {
        return false
      }
    }


  render() {
    const { searchQuery } = this.state;

    const people = this.renderAutoCompleteList(searchQuery);
    return (
      <View style={styles.container}>
        <View style={styles.autocomplete}>
          <Autocomplete 
            defaultValue={searchQuery}
            onChangeText={this.onChangeText}
            renderTextInput={this.renderTextInput}
            data={people.length === 1 && this.compare(searchQuery, people[0].fullName) ? [] : people }
            renderItem={item => (
              <TouchableOpacity
                onPress={() => this.handleSelect(item)}
                style={styles.listStyle}
              >
              <View style={styles.autoCompleteList}>
                <Image style={{width: 40, height: 40, borderRadius: 20}} source={{uri: item.picture.thumbnail}} />
                <View style={styles.autoCompleteText}>
                  <Text>{item.fullName}</Text>
                  <Text>{item.cell}</Text>
                </View>
              </View>
              </TouchableOpacity>
            )}
          />
          
        </View>
      </View>
    );
  }
}

const fill = StyleSheet.absoluteFillObject;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight:20
  },
  autocomplete: {
    marginTop: 40,
  },
  autoCompleteList: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  autoCompleteText: {
    paddingLeft: 5
  },
  listStyle: {
    padding: 5,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
})

const mapState = (state) => ({
  search: state.search,
  user: state.user,
  people: state.people,
  coordinates: state.location,
  interests: state.interests
})

export default connect(mapState)(SearchBar);
