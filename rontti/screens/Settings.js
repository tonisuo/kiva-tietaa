import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
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

  sendNotificationImmediately = async () => {
    const notificationId = await Notifications.presentLocalNotificationAsync({
      title: 'Kiva tietää',
      body: 'Paina tästä saadaksesi tietää totuuden',
    });
    console.log(notificationId); // can be saved in AsyncStorage or send to server
  };

  cancelNotifications = async () => {
    const response = await Notifications.cancelAllScheduledNotificationsAsync();
    console.log(response);
  };

  scheduleNotification = async () => {
    const date = new Date();
    //const time = `${date.getHours()}.${date.getMinutes()}:${date.getSeconds()}`;
    //const time = date.format("hh.mm:ss");
    return Notifications.scheduleLocalNotificationAsync(
      {
        title: "Kiva tietää näin kolmelta aamuyöstä",
        body: "Paina tästä oppiaksesi totuuden"
      },
      {
        repeat: "minute",
        time: date.getTime() + 10000
      }
    );
    //console.log(notificationId);
    //return notificationId;
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
          title={"Send notification"}
          onPress={() => this.sendNotificationImmediately()}
        />
        <Button
          title={"Subscribe to nightly notification"}
          onPress={() => this.subscribeToNotification()}
        />
        <Button
          title={"Remove all notifications"}
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
