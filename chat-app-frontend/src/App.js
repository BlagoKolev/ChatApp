import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
import Lobby from './components/Lobby';
import Chat from './components/Chat';

function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl('https://localhost:7035/chat')
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        // console.log('message received: ', message);
        setMessages(messages => [...messages, { user, message }]);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
      });


      await connection.start();
      await connection.invoke('JoinRoom', { user, room });
      setConnection(connection);

    } catch (e) {
      console.log(e)
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="app">
      <h2>Let`s Chat</h2>
      <hr />{!connection
        ? <Lobby joinRoom={joinRoom} />
        : <Chat messages={messages} sendMessage={sendMessage} closeConnection={closeConnection} />
      }

    </div>
  );
}

export default App;
