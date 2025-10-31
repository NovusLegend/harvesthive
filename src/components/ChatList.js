import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useUserProfile } from '../contexts/UserProfileContext';
import './ChatList.css';

function ChatList() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { getUserDisplayName } = useUserProfile();

  useEffect(() => {
    if (!currentUser) return;

    const fetchChats = async () => {
      try {
        // Get all chat documents where the current user is involved
        const chatsRef = collection(db, 'chats');
        const q = query(chatsRef, orderBy('lastMessageAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const userChats = [];
        
        for (const doc of querySnapshot.docs) {
          const chatData = doc.data();
          const chatId = doc.id;
          
          // Check if current user is part of this chat
          if (chatId.includes(currentUser.uid)) {
            // Get the latest message
            const messagesRef = collection(db, 'chats', chatId, 'messages');
            const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'));
            const messagesSnapshot = await getDocs(messagesQuery);
            
            let lastMessage = null;
            let otherUser = null;
            let productInfo = chatData.productInfo || null;
            
            if (messagesSnapshot.size > 0) {
              lastMessage = messagesSnapshot.docs[0].data();
            }
            
            // Find the other user in the chat
            if (chatId.startsWith('chat_')) {
              const chatParts = chatId.replace('chat_', '').split('_');
              // Remove product ID if present (first part after chat_)
              const userIds = chatParts.length > 2 ? chatParts.slice(1) : chatParts;
              otherUser = userIds.find(id => id !== currentUser.uid);
            }
            
            userChats.push({
              id: chatId,
              otherUserId: otherUser,
              lastMessage,
              lastMessageAt: lastMessage?.createdAt || chatData.lastMessageAt,
              productInfo
            });
          }
        }
        
        setChats(userChats);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [currentUser]);

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="chat-list">
        <div className="loading">Loading conversations...</div>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="chat-list">
        <div className="no-chats">
          <p>No conversations yet. Start chatting with sellers!</p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-list">
      <h3>Your Conversations</h3>
      <div className="chats-container">
        {chats.map(chat => (
          <Link 
            key={chat.id} 
            to={`/chat?chatId=${chat.id}`}
            className="chat-item"
          >
            <div className="chat-avatar">
              {chat.otherUserId ? getUserDisplayName(chat.otherUserId).charAt(0).toUpperCase() : '?'}
            </div>
            <div className="chat-content">
              <div className="chat-header">
                <span className="chat-user">
                  {chat.otherUserId ? getUserDisplayName(chat.otherUserId) : 'General Chat'}
                </span>
                <span className="chat-time">
                  {formatTime(chat.lastMessageAt)}
                </span>
              </div>
              {chat.productInfo && (
                <div className="chat-product">
                  About: {chat.productInfo.name}
                </div>
              )}
              <div className="chat-preview">
                {chat.lastMessage ? (
                  <>
                    <span className="chat-sender">
                      {chat.lastMessage.senderId === currentUser.uid ? 'You' : getUserDisplayName(chat.lastMessage.senderId)}: 
                    </span>
                    {chat.lastMessage.text}
                  </>
                ) : (
                  'No messages yet'
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
