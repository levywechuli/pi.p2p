import { useState, useEffect } from 'react';

export default function ValidatePage() {
  const [activeTab, setActiveTab] = useState('homeContent');
  const [expanded, setExpanded] = useState(true);

  const toggleCollapse = () => {
    setExpanded(!expanded);
  };

  const switchTab = (targetId: string) => {
    setActiveTab(targetId);
  };

  return (
    <div>
      <style>{`
        :root {
          --primary: #783A8D;
          --text: #783A8D;
        }

        * {
          box-sizing: border-box;
        }

        body {
          font-family: 'Roboto', sans-serif;
          margin: 0;
          padding: 0;
          background: #fff;
          color: #444;
          padding-top: 60px;
        }

        header {
          background: var(--primary);
          color: white;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          height: 50px;
        }

        .back-btn {
          font-size: 22px;
          cursor: pointer;
          color: white;
        }

        .header-right {
          font-size: 22px;
          cursor: pointer;
          color: white;
        }

        .header-title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .header-title img {
          width: 80px;
        }

        main {
          text-align: center;
          padding: 25px 15px;
          background-color: white;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          justify-items: center;
          align-items: center;
          margin-bottom: 18px;
          background-color: white;
        }

        .icon-link {
          text-decoration: none;
          color: var(--text);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .icon-box {
          background: #fff;
          border: 1px solid var(--text);
          border-radius: 12px;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease-in-out;
        }

        .icon-box:hover {
          transform: scale(1.05);
          background-color: #f8f0fc;
        }

        .icon-box img {
          max-width: 80%;
          max-height: 80%;
          object-fit: contain;
        }

        .icon-label {
          font-size: 13px;
          text-align: center;
          font-weight: 500;
          margin-top: 6px;
          max-width: 80px;
          line-height: 1.2;
        }

        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--primary);
          color: white;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 500;
          text-decoration: none;
          font-size: 14px;
          margin-top: 10px;
        }

        .button img {
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }

        @media (max-width: 480px) {
          .grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
          }

          .icon-box {
            width: 60px;
            height: 60px;
          }

          .icon-label {
            font-size: 12px;
          }
        }

        .top-bar {
          background-color: #6b21a8;
          color: white;
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 18px;
          font-weight: bold;
        }

        .content {
          padding: 16px;
        }

        .section-title {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 45px;
          text-align: center;
          color: black;
        }

        .card {
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 24px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
        }

        .card-image {
          width: 100%;
          display: flex;
          position: relative;
        }

        .footer-note {
          text-align: center;
          font-size: 13px;
          color: #777;
          margin-bottom: 26px;
        }
          
        .footer-notes {
          text-align: center;
          font-size: 13px;
          color: #777;
          margin-bottom: 70px;
          margin-top: 20px;
        }

        .explore-link {
          text-align: center;
          font-weight: bold;
          color: #6b21a8;
          margin-bottom: 40px;
        }

        .bookmark-box {
          background-color: #f3f4f7;
          padding: 20px;
          border-radius: 16px;
          text-align: center;
          margin-bottom: 50px;
        }

        .bookmark-title {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 38px;
          color: black;
          text-align: center;
        }

        .bookmark-text {
          font-size: 14px;
          color: black;
        }

        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid white;
          display: flex;
          justify-content: space-around;
          padding: 10px 0;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
        }
          
        .nav-item img {
          width: 50px;
          height: 50px;
          display: block;
          margin: 0 auto;
        }

        .nav-item {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 40px;
          color: #555;
          font-weight: bold;
          cursor: pointer;
        }

        .nav-item.active {
          color: #6b21a8;
        }

        .toggle-arrow {
          text-align: center;
          margin-top: 20px;
          font-size: 20px;
          cursor: pointer;
          color: #6b21a8;
          user-select: none;
        }

        #collapseContent {
          overflow: hidden;
          transition: max-height 0.5s ease;
          max-height: 1500px;
        }

        #collapseContent.collapsed {
          max-height: 0;
        }

        .tab-content {
          display: none;
        }

        .tab-content.active {
          display: block;
        }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />

      <header>
        <div className="back-btn">&#8592;</div>
        <div className="header-title">
          <img src="images/pihead.png" alt="Pi Icon" />
        </div>
        <div className="header-right">&#9660;</div>
      </header>

      {/* HOME TAB */}
      <div className={`tab-content ${activeTab === 'homeContent' ? 'active' : ''}`}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <img 
            src="images/pibrowser.png" 
            alt="Loading" 
            width="85%" 
            height="63px" 
            style={{marginBottom: '-50px', marginTop: '10px', alignItems: 'center'}} 
          />
        </div>
        
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px 0 16px'}}>
          <div 
            onClick={toggleCollapse} 
            style={{color: 'black', fontWeight: 'bold', fontSize: '16px', marginTop: '40px', marginLeft: '20px', cursor: 'pointer'}}
          >
            Core Team Apps
          </div>
          <div 
            onClick={toggleCollapse} 
            style={{fontSize: '27px', cursor: 'pointer', color: '#6b21a8', display: 'flex', alignItems: 'center', marginTop: '58px', marginRight: '25px'}}
          >
            {expanded ? '⌃' : '⌄'}
          </div>
        </div>

        <div 
          id="collapseContent" 
          className={expanded ? '' : 'collapsed'} 
          style={{display: 'block', marginTop: '10px', background: '#f3f4f6', borderRadius: '12px'}}
        >
          <main>
            <div className="grid">
              <a href="/mine/wallet" className="icon-link">
                <div className="icon-box"><img src="images/fireside.jpg" alt="Fireside" /></div>
                <div className="icon-label">Fireside</div>
              </a>
              <a href="/mine/wallet" className="icon-link">
                <div className="icon-box"><img src="images/wallet.jpg" alt="Wallet" /></div>
                <div className="icon-label">Wallet</div>
              </a>
              <a href="/mine/wallet" className="icon-link">
                <div className="icon-box"><img src="images/brain.jpg" alt="Brainstorm" /></div>
                <div className="icon-label">Brainstorm</div>
              </a>
              <a href="/mine/wallet" className="icon-link">
                <div className="icon-box"><img src="images/minne.jpg" alt="Mine" /></div>
                <div className="icon-label">Mine</div>
              </a>
              <a href="/mine/wallet" className="icon-link">
                <div className="icon-box"><img src="images/block.jpg" alt="Blockchain" /></div>
                <div className="icon-label">Blockchain</div>
              </a>
              <a href="/mine/wallet" className="icon-link">
                <div className="icon-box"><img src="images/develop.jpg" alt="Develop" /></div>
                <div className="icon-label">Develop</div>
              </a>
              <a href="/mine/wallet" className="icon-link">
                <div className="icon-box"><img src="images/kyc.jpg" alt="KYC" /></div>
                <div className="icon-label">KYC</div>
              </a>
              <a href="/mine/wallet" className="icon-link">
                <div className="icon-box"><img src="images/chats.jpg" alt="Chat" /></div>
                <div className="icon-label">Chat</div>
              </a>
              <a href="/mine/wallet" className="icon-link">
                <div className="icon-box"><img src="images/profile.jpg" alt="Profile" /></div>
                <div className="icon-label">Profile</div>
              </a>
              <a href="/mine/wallet" className="icon-link">
                <div className="icon-box"><img src="images/domains.png" alt="Domains" /></div>
                <div className="icon-label">Domains</div>
              </a>
              <a href="/mine/wallet" className="icon-link">
                <div className="icon-box"><img src="images/unlock.png" alt="App Studio" /></div>
                <div className="icon-label">App Studio</div>
              </a>
              <a href="/mine/wallet" className="icon-link">
                <div className="icon-box"><img src="images/p2p.png" alt="p2p" /></div>
                <div className="icon-label">P2P</div>
              </a>
            </div>
          </main>
        </div>

        <div className="content">
          <div className="section-title">Explore Third-Party Apps</div>

          <div className="card">
            <div style={{position: 'relative'}}>
              <img src="images/pitogo.png" className="card-image" alt="Pi Network Globe" />
            </div>
          </div>

          <div className="card">
            <div style={{position: 'relative'}}>
              <img src="images/oke.png" className="card-image" alt="Pi Network Globe" />
            </div>
          </div>

          <div className="footer-note">This data is updated every 15 minutes<br />Last refreshed at: Jul 1 3:33 AM</div>
          <div className="explore-link">Explore More</div>

          <div className="bookmark-title">Bookmarked Apps</div>
          <div className="bookmark-box">
            <div className="bookmark-text">
              <p>You have not bookmarked any apps, explore <br />the ecosystem and bookmark your favorite <br />apps in their app details page.</p>
            </div>
          </div>

          <h5 style={{textAlign: 'center', marginBottom: '90px'}}>Manage Account</h5>
        </div>
      </div>

      {/* APPS TAB */}
      <div className={`tab-content ${activeTab === 'appsContent' ? 'active' : ''}`}>
        <div className="content">
          <div className="section-title">Explore Third-Party Apps</div>
          <p style={{textAlign: 'center', fontSize: '14px', marginTop: '-35px'}}>Explore Third Party Services Connected to Pi.</p>
          <a href="/mine/wallet/">
            <p style={{color: '#783A8D', textAlign: 'center', fontSize: '12px', marginTop: '20px', marginBottom: '20px'}}>
              <b>Learn about the new App Ranking method</b>
            </p>
          </a>
          
          <div className="card">
            <div style={{position: 'relative'}}>
              <img src="images/category.png" className="card-image" alt="Pi Network Globe" />
            </div>
          </div>

          <div>
            <div style={{position: 'cover'}}>
              <img src="images/stake.png" className="card-image" alt="Pi Network Globe" style={{width: '105%'}} />
            </div>
          </div>
          
          <pre style={{fontSize: '15px'}}><b>Top Staked Apps</b></pre>
          <pre style={{textAlign: 'right', marginTop: '-27px', color: '#783A8D'}}>Ranking</pre>

          <div className="card" style={{marginTop: '35px'}}>
            <div style={{position: 'relative'}}>
              <img src="images/fruit1 (1).png" className="card-image" alt="Pi Network Globe" />
            </div>
          </div>

          <div className="footer-note">This data is updated every 15 minutes<br />Last refreshed at: Jul 1 3:33 AM</div>

          <pre style={{fontSize: '15px'}}><b>Top Staked Services</b></pre>
          <div style={{marginTop: '35px'}}>
            <div style={{position: 'relative'}}>
              <img src="images/mexc.png" className="card-image" alt="Pi Network Globe" />
            </div>
          </div>

          <div className="footer-notes">This data is updated every 15 minutes<br />Last refreshed at: Jul 1 3:33 AM</div>
        </div>
      </div>

      {/* SERVICE TAB */}
      <div className={`tab-content ${activeTab === 'serviceContent' ? 'active' : ''}`}>
        <div className="content">
          <div className="section-title">Explore Services</div>
          <p style={{textAlign: 'center', fontSize: '14px', marginTop: '-35px'}}>Explore Third Party Services Connected to Pi.</p>
          
          <div className="card">
            <div style={{position: 'relative'}}></div>
          </div>

          <pre style={{fontSize: '15px'}}><b>Exchanges</b></pre>
          <pre style={{textAlign: 'right', marginTop: '-27px', color: '#783A8D'}}>What's This</pre>

          <div className="card" style={{marginTop: '35px'}}>
            <div style={{position: 'relative'}}>
              <img src="images/piexchange.png" className="card-image" alt="Pi Network Globe" />
            </div>
          </div>

          <pre style={{fontSize: '15px'}}><b>Web3 Wallets</b></pre>
          <div style={{marginTop: '35px'}}>
            <div style={{position: 'relative'}}>
              <img src="images/piokx.png" className="card-image" alt="Pi Network Globe" />
            </div>
          </div>

          <pre style={{fontSize: '15px'}}><b>Bridges</b></pre>
          <pre style={{textAlign: 'right', marginTop: '-27px', color: '#783A8D'}}>What's This</pre>

          <div className="card" style={{marginTop: '35px'}}>
            <div style={{position: 'relative'}}>
              <img src="images/bridge.png" className="card-image" alt="Pi Network Globe" />
            </div>
          </div>

          <div className="footer-notes"></div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div 
          className={`nav-item ${activeTab === 'homeContent' ? 'active' : ''}`} 
          onClick={() => switchTab('homeContent')}
        >
          <img src="images/home.png" alt="Home" />
        </div>
        <div 
          className={`nav-item ${activeTab === 'appsContent' ? 'active' : ''}`} 
          onClick={() => switchTab('appsContent')}
        >
          <img src="images/apps.png" alt="Apps" />
        </div>
        <div 
          className={`nav-item ${activeTab === 'serviceContent' ? 'active' : ''}`} 
          onClick={() => switchTab('serviceContent')}
        >
          <img src="images/service.png" alt="Service" />
        </div>
      </div>
    </div>
  );
}
