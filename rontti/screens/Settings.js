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
        <Text>Tästä voit tilata jokaöiset ilmoitukset</Text>
        <Button
          title={"Subscribe to nightly notification"}
          onPress={() => this.subscribeToNotification()}
        />
        <Button
          title={"Remove notifications"}
          onPress={() => this.cancelNotifications()}
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
