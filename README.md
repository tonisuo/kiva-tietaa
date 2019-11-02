[![Build Status](https://travis-ci.com/tonisuo/kiva-tietaa.svg?token=5aLnZnpJEoXDMwxJmqMe&branch=master)](https://travis-ci.com/tonisuo/kiva-tietaa)

![alt text](doc/phone_hand.jpg "Logo Title Text 2")

# kiva-tietaa
"Kiva tietää näin kolmesta aamyöstä" Hackfest project. Sends a push-notification to mobile app at 3am (timezone Helsinki/Finland) with a vital random fact inserted to a Donald Duck meme.

Facts: `https://uselessfacts.jsph.pl/`

Translations (in Finnish): `https://translate.yandex.com/`

# Development

## Requirements

- Node
- npm
- Expo
- Docker & docker-compose 

## Backend

Run mongoDb:

```
docker-compose up
```

Start server:

```
cd blackkari
npm dev run
```

Ping server:

```
curl localhost:3000/ping
```

## Frontend

If you are testing on a mobile phone, install Expo app for local development

```
cd rontti
expo start
```
![alt text](doc/ngace.png "Logo Title Text 1")

