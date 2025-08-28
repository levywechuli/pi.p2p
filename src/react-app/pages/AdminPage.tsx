import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

interface Message {
  id: number;
  user_identifier: string;
  message_content: string;
  word_count: number;
  created_at: string;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/messages');
      const rawData = await response.json();

      // 🔑 Map the raw DB rows (id, content, created_at) → Message interface
      const data: Message[] = rawData.map((row: any) => ({
        id: row.id,
        user_identifier: "Anonymous", // or later add user info if you want
        message_content: row.content,
        word_count: row.content.trim().split(/\s+/).length,
        created_at: row.created_at,
      }));

      setMessages(data);
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleBack = () => {
    navigate('/mine/validate');
  };

  return (
    <div>
      {/* Keep your existing CSS styles here unchanged */}
      <style>{`/* your CSS unchanged */`}</style>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />

      <div className="admin-container">
        <header className="admin-header">
          <div className="back-arrow" onClick={handleBack}>←</div>
          <div className="header-content">
            <div className="admin-icon"></div>
            <span className="header-title">Admin Dashboard</span>
          </div>
        </header>

        <div className="admin-content">
          <h1 className="page-title">Message Administration</h1>
          <p className="page-subtitle">View and manage user messages</p>

          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">{messages.length}</div>
              <div className="stat-label">Total Messages</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {messages.filter(m => new Date(m.created_at).toDateString() === new Date().toDateString()).length}
              </div>
              <div className="stat-label">Today</div>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading messages...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>{error}</p>
              <button className="refresh-button" onClick={fetchMessages}>Try Again</button>
            </div>
          ) : (
            <div className="messages-container">
              <div className="messages-header">
                User Messages
                <button
                  className="refresh-button"
                  onClick={fetchMessages}
                  style={{ float: 'right', padding: '5px 10px', fontSize: '12px' }}
                >
                  Refresh
                </button>
              </div>

              {messages.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📝</div>
                  <p>No messages yet</p>
                  <p style={{ fontSize: '14px', marginTop: '10px' }}>
                    User messages will appear here when they submit them.
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div key={message.id} className="message-item">
                    <div className="message-header">
                      <div className="message-user">{message.user_identifier}</div>
                      <div className="message-meta">{formatDate(message.created_at)}</div>
                    </div>
                    <div className="message-content">{message.message_content}</div>
                    <div className="word-count">{message.word_count} words</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
