import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const ip = "192.168.43.65";

export default class HomeScreen extends Component {

  state = {
    displayNotification: false
  };

  componentDidMount() {
    // try to fetch info about notification
    // {notification: true}
    // if it returns true, try to fetch the image
    //getNotifications()
    this.handleDisplaying()
  }

  handleDisplaying = () => {
    /*const status = getNotifications();
    if (status.notifications) {
      console.log("notification available")
    } else {
      console.log("it's not 3 am!");
    }*/

    fetch(`http://${ip}:3000/hasNotifications?appKey=asdasdasd`)
      .then(response => response.json())
      .then(data => {
        if (data.notifications) {
          console.log("it is 3 am!");
          this.setState({displayNotification: true})
        } else {
          console.log("not 3 am");
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    const { displayNotification } = this.state;

    return (
      <View style={styles.container}>
        {displayNotification ?
          (<Text>Kello on kolme!</Text>) :
          (<Text>Kello ei ole kolme aamuyöstä</Text>)}
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
});
