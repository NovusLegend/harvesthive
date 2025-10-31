import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../contexts/UserProfileContext';
import ChatList from '../components/ChatList';
import './Chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [otherUser, setOtherUser] = useState(null);
  const [productInfo, setProductInfo] = useState(null);
  const [initialMessageSet, setInitialMessageSet] = useState(false);
  const { currentUser } = useAuth();
  const { getUserDisplayName, getUserProfile } = useUserProfile();
  const messagesEndRef = useRef(null);
  
  const sellerId = searchParams.get('seller');
  const chatIdParam = searchParams.get('chatId');
  const productId = searchParams.get('productId');
  const productName = searchParams.get('productName');
  const productPrice = searchParams.get('productPrice');
  
  // Determine chat ID - either from URL param or create from seller ID and product
  const chatId = chatIdParam || (sellerId && productId ? `chat_${productId}_${[currentUser?.uid, sellerId].sort().join('_')}` : 'general');

  useEffect(() => {
    if (!currentUser) return;

    // Set up product info
    if (productId && productName) {
      setProductInfo({
        id: productId,
        name: decodeURIComponent(productName)
      });
    }

    // Set up other user info for direct chats
    if (chatId !== 'general' && chatId.startsWith('chat_')) {
      const chatParts = chatId.replace('chat_', '').split('_');
      // Remove product ID if present (first part after chat_)
      const userIds = chatParts.length > 2 ? chatParts.slice(1) : chatParts;
      const otherUserId = userIds.find(id => id !== currentUser.uid);
      setOtherUser(otherUserId);
      
      // Load other user's profile
      if (otherUserId) {
        getUserProfile(otherUserId);
      }
    } else {
      setOtherUser(null);
    }

    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId, currentUser, getUserProfile, productId, productName]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-quote product in first message
  useEffect(() => {
    if (productName && productPrice && messages.length === 0 && !initialMessageSet) {
      const quotedMessage = `Hi! I'm interested in your product "${decodeURIComponent(productName)}" listed at UGX ${parseInt(productPrice).toLocaleString()}. Is this still available?`;
      setNewMessage(quotedMessage);
      setInitialMessageSet(true);
    }
  }, [productName, productPrice, messages.length, initialMessageSet]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    try {
      const messageData = {
        text: newMessage,
        senderId: currentUser.uid,
        senderEmail: currentUser.email,
        createdAt: serverTimestamp()
      };

      // Add message to the messages subcollection
      await addDoc(collection(db, 'chats', chatId, 'messages'), messageData);
      
      // Update the chat document with last message info
      await setDoc(doc(db, 'chats', chatId), {
        lastMessage: newMessage,
        lastMessageAt: serverTimestamp(),
        participants: chatId === 'general' ? [currentUser.uid] : [currentUser.uid, otherUser].filter(Boolean),
        productInfo: productInfo ? {
          id: productInfo.id,
          name: productInfo.name
        } : null
      }, { merge: true });
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-page">
      <div className="page-header">
        <h1>Messages</h1>
        <p className="page-subtitle">Connect with farmers and buyers</p>
      </div>

      <div className="chat-container">
        <div className="chat-sidebar">
          <ChatList />
        </div>
        
        {/* Main Chat Area */}
        <div className="chat-main">
          <div className="chat-header">
            <div className="chat-title">
              <h2>
                {chatId === 'general' ? 'General Chat' : 
                 otherUser ? `Chat with ${getUserDisplayName(otherUser)}` : 
                 'Select a conversation'}
              </h2>
              {productInfo && (
                <p className="product-context">About: {productInfo.name}</p>
              )}
            </div>
            {chatId !== 'general' && otherUser && (
              <Link to="/products" className="btn btn-outline btn-sm">
                Browse Products
              </Link>
            )}
          </div>
          
          <div className="messages-container">
            {loading ? (
              <div className="loading">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="no-messages">
                <p>
                  {chatId === 'general' ? 
                    'No messages yet. Start the conversation!' :
                    'No messages yet. Say hello!'
                  }
                </p>
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={`message ${message.senderId === currentUser.uid ? 'own-message' : 'other-message'}`}
                >
                  <div className="message-content">
                    <div className="message-sender">
                      {message.senderId === currentUser.uid ? 'You' : getUserDisplayName(message.senderId)}
                    </div>
                    <div className="message-text">
                      {message.text}
                    </div>
                    <div className="message-time">
                      {message.createdAt?.toDate ? 
                        message.createdAt.toDate().toLocaleTimeString() : 
                        'Unknown time'
                      }
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={sendMessage} className="message-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={
                chatId === 'general' ? 
                "Type your message to everyone..." :
                "Type your message..."
              }
              className="message-input"
            />
            <button type="submit" disabled={!newMessage.trim()} className="send-button">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
