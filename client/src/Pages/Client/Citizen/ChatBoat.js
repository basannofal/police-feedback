  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import "../../../Assets/css/chatboat.css";

  const ChatBoat = () => {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([
      { text: "Hi there 👋 \nHow can Rajasthan Police help you today?", type: "incoming" },
    ]);
    const [showChatbot, setShowChatbot] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const handleSendMessage = async () => {
      try {
        // Display "typing..." message
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "typing...", type: "incoming" },
        ]);

        const response = await axios.post("http://localhost:1010/chat-boat", {
          prompt,
        });

        // Replace "typing..." message with actual response
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { text: prompt, type: "outgoing" },
          { text: response.data, type: "incoming" },
        ]);

        // Clear the input
        setPrompt("");
      } catch (err) {
        console.error(err);

        // Handle errors and remove "typing..." message
        setMessages((prevMessages) => prevMessages.slice(0, -1));
      } finally {
        // Set isSending to false after the response or error is handled
        setIsSending(false);
      }
    };

    const handleToggleChatbot = () => {
      setShowChatbot((prevShowChatbot) => !prevShowChatbot);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        // Set isSending to true when a message is being sent
        setIsSending(true);
        handleSendMessage();
      }
    };

    return (
      <>
        <button className="chatbot-toggler" onClick={handleToggleChatbot}>
          <span className="material-symbols-rounded">
            {showChatbot ? "close" : "mode_comment"}
          </span>
          <span className="material-symbols-outlined">
            {showChatbot ? "open" : "close"}
          </span>
        </button>
        {showChatbot && (
          <div className="chatbot">
            <header>
              <h2>ChatCrafter</h2>
              <span
                className="close-btn material-symbols-outlined"
                onClick={handleToggleChatbot}
              >
                close
              </span>
            </header>
            <ul className="chatbox">
              {
                messages.length > 0 ? (
                  messages.map((message, index) => (
                    <li key={index} className={`chat ${message.type}`}>
                      {message.type === "incoming" && (
                        <span className="material-symbols-outlined">smart_toy</span>
                      )}
                      <p>{message.text}</p>
                    </li>
                  ))
                ) : (
                  "Data is Not Avalible"
                )
              }
            </ul>
            <div className="chat-input">
              <textarea
                placeholder="Enter a message..."
                spellCheck="false"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
              ></textarea>

              <span
                id="send-btn"
                className="material-symbols-rounded"
                onClick={handleSendMessage}
              >
                send
              </span>
            </div>
          </div>
        )}
      </>
    );
  };

  export default ChatBoat;
