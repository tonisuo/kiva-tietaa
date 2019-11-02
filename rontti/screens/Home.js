import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';

const ip = "192.168.43.65";
const app_key = "asdasdasd";
const url = `http://${ip}:3000/`;
const auth = `?appKey=${app_key}`;
const status_url = `${url}hasNotifications${auth}`;
const img_url = `${url}generateImage${auth}`;

class HomeScreen extends Component {

  state = {
    displayImage: false
  };

  componentDidMount() {
    this.handleDisplaying()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.handleDisplaying()
    }
  }

  handleDisplaying = () => {
    console.log("handling displaying");

    fetch(status_url)
      .then(response => response.json())
      .then(data => {
        if (data.notifications) {
          this.setState({displayImage: true})
        } else {
          this.setState({displayImage: false})
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    const { displayImage } = this.state;

    return (
      <View style={styles.container}>
        {displayImage ?
          (<Image
            style={styles.image}
            source={{uri: `${img_url}&timestamp=${new Date().getTime()}`}}
          />) :
          (<Text>Kello ei ole kolme aamuyöstä, yritä myöhemmin uudelleen.</Text>)}
        <Button
          title={"Asetukset"}
          onPress={() => this.props.navigation.navigate('Settings')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center', // this breaks button texts for some reason
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: 100,
    width: null
  }
});

export default withNavigationFocus(HomeScreen);
