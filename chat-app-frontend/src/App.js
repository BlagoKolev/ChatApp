import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Lobby from './components/Lobby';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from 'react';
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

      await connection.start();
      await connection.invoke('JoinRoom', { user, room });
      setConnection(connection);

    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="app">
      <h2>Let`s Chat</h2>
      <hr />{!connection
        ? <Lobby joinRoom={joinRoom} />
        : <Chat messages={messages} />
      }

    </div>
  );
}

export default App;
