import React, { useState } from 'react';
import { Container, CssBaseline, Paper, Typography, TextField, Button, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import UserIcon from '@mui/icons-material/AccountCircle';
import ChatbotIcon from '@mui/icons-material/ChatBubbleOutline';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [chat, setChat] = useState([]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() === '') {
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_input: userInput,
        }),
      });

      const data = await response.json();
      const botResponse = data.response;

      setChat([...chat, { type: 'user', message: userInput }, { type: 'bot', message: botResponse }]);
      setUserInput('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app-container">
      <CssBaseline />
      <Container maxWidth="sm">
        <Paper className="chat-container" elevation={3}>
          <Typography variant="h4" align="center" gutterBottom>
            <h2>🤖ShortGPT🔥</h2>
          </Typography>
          <div className="chat-messages">
            {chat.map((message, index) => (
              <div key={index} className={`chat-message ${message.type}`}>
                {message.type === 'user' ? (
                  <Avatar className="avatar-icon user-avatar">
                    <UserIcon />
                  </Avatar>
                ) : (
                  <Avatar className="avatar-icon bot-avatar">
                    <ChatbotIcon />
                  </Avatar>
                )}
                <div className="message-text">{message.message}</div>
              </div>
            ))}
          </div>
          <form className="chat-input-form" onSubmit={handleChatSubmit}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type your message..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default App;
