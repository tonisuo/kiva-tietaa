import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import FullWidthImage from 'react-native-fullwidth-image';

const ip = "192.168.43.65";
const app_key = "asdasdasd";
const url = `http://${ip}:3000/`;
const auth = `?appKey=${app_key}`;
const status_url = `${url}hasNotifications${auth}`;
const img_url = `${url}getImage${auth}`;

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
        (<FullWidthImage
          source={{uri: `${img_url}&timestamp=${new Date().getTime()}`}}
        />) :
        (<Text style={styles.text}>Kello ei ole kolme aamuyöstä, yritä myöhemmin uudelleen.</Text>)}
        <View style={styles.buttonContainer}>
          <Button
            title={"Asetukset"}
            onPress={() => this.props.navigation.navigate('Settings')}
            style={styles.button}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', // this breaks button texts for some reason
    padding: 40,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    height: 300,
    width: 300,
  },
  text: {
    fontSize: 20,
    marginVertical: 60,
    textAlign: 'center',
  },
  button: {
    position: 'absolute'
  }
});

export default withNavigationFocus(HomeScreen);
