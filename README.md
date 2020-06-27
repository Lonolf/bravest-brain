WARNING! THIS IS A BETA VERSION WARNING!

This is a beta version of the software. That said, my girlfriend used it with hers scholars and they completed a simple quiz, so, it works.

![Image of Yaktocat](https://drive.google.com/file/d/1JetQdUmjwSL3O8_D375o8tMoHQCkcNlJ/view?usp=sharing)

INTRODUCTION

I needed a simple webApp to make and manage quiz for my girlfriend, who teaches on a elementary school, so I cobble something together to help her.

It is a simple React-Redux-Saga project, with the noSql database and user authentication managed by a free version of Google Firebase

Simple starting tutorial:

- Download the repository
- Install all the packets (npm i)
- Create a firebase project with
  - User authentication
  - Firestore with two collections:
    - Answers (it will contain the answers to every quiz as separate documents)
    - Quiz (it will contain the quiz (both settings and questions) as separate documents)
- Insert the firebase keys in the file src/config/firebase.json.example and rename it firebase.json
- Local deploy with npm start or build and host (I personally recommend firebase hosting)
- Enjoy!
