# Song Guesser

Song Guesser JS Project, using the Spotify Web API and WebSockets to play a game of guessing.

## Description:

The idea of the project is to represent a multiplayer/real-time song guessing game which uses data from the Spotify API.

In order to play, **two clients** need to connect to our server which will contain a **Express** server and **Socket.IO** server that integrates with the other one. The clients will communicate with the backend using the Socket IO client.

Once we have two connected users, the game begins with a counter, after which a random song is chosen from a dataset coming from the Spotify API.
A random song plays in the background and the users have to choose the correct answer. They will receive points for that leading to a final score - whovere has the highest score between the two wins.

## Technologies used:

**CLIENT <=> EXPRESS SERVER <=> SPOTIFY API**

Setting up the server/sending requests to Spotify:

- Node.js
- Express
- Spotify Web API (Node)

Real time communication for clients:

- Socket.IO
- Sockeet.IO-Client
