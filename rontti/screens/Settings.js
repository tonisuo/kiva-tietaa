import React, { Component } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default class SettingsScreen extends Component {

  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    return finalStatus === 'granted';
  };

  componentDidMount() {
    this.askPermissions().then((data) => {
      console.log(`Permission response: ${data}`)
    });
  };

  cancelNotifications = async () => {
    const response = await Notifications.cancelAllScheduledNotificationsAsync();
    console.log(response);
  };

  createAndroidChannel = async () => {
    await Notifications.createChannelAndroidAsync("nightly-notification", {
      name: 'Nightly notification',
      sound: true,
      vibrate: true,
    })
  };

  scheduleNotification = async () => {
    const date = new Date();
    const threeAm = date.setHours(3, 0, 0, 0);

    if (Platform.OS === "android") {
      this.createAndroidChannel();
    }

    console.log("scheduling notifications");

    return Notifications.scheduleLocalNotificationAsync(
      {
        title: "Kiva tietää näin kolmelta aamuyöstä",
        body: "Paina tästä oppiaksesi totuuden",
        ios: { // (optional) (object) — notification configuration specific to iOS.
          sound: true // (optional) (boolean) — if true, play a sound. Default: false.
        },
        android: { // (optional) (object) — notification configuration specific to Android.
          channelId: "nightly-notification"
        }
      },
      {
        repeat: "day",
        time: threeAm
      }
    );
  };

  subscribeToNotification = () => {
    this.scheduleNotification().then((response) => {
      console.log(response);
    });
  };


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Tästä voit tilata jokaöiset ilmoitukset</Text>
        <View style={styles.button}>
          <Button
            style={styles.button}
            title={"Tilaa ilmoitus"}
            onPress={() => this.subscribeToNotification()}
          />
        </View>
        <View style={styles.button}>
          <Button
            style={styles.button}
            title={"Poista ilmoitukset"}
            onPress={() => this.cancelNotifications()}
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
    //alignItems: 'center', // this breaks button texts for some reason
    justifyContent: 'center',
    padding: 40,
  },
  text: {
    fontSize: 20,
    marginHorizontal: 30,
    marginVertical: 60,
    textAlign: 'center',
  },
  button: {
    paddingBottom: 20,
  }
});
