import { useEffect } from 'react';

export default function MinePage() {
  useEffect(() => {
    const header = document.getElementById('mainHeader');
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Scroll animations
    const animatedElements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    animatedElements.forEach(el => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <style>{`
        /* Reset */
        html, body {
          margin: 0;
          padding: 0;
        }

        /* Global Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          word-spacing: normal;
          letter-spacing: normal;
        }

        /* Body Styling */
        body {
          font-family: 'Segoe UI', sans-serif;
          line-height: 1.6;
          scroll-behavior: smooth;
        }

        /* Top Navigation Styles */
        .top-header {
          position: fixed;
          top: 0;
          width: 100%;
          background-color: #251339;
          padding: 12px 20px;
          z-index: 999;
          transition: background-color 0.4s ease;
        }

        .top-header.scrolled {
          background-color: #583b8b;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .top-header .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-area {
          display: flex;
          align-items: center;
        }

        .search-btn,
        .menu-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 20px;
          color: #fff;
          margin-left: 10px;
        }

        .pi-logo {
          height: 32px;
          margin-right: 10px;
        }

        .nav-icons i {
          color: #fff;
          font-size: 22px;
          cursor: pointer;
        }

        /* HEADER */
        .header {
          background: #251339;
          color: white;
          text-align: left;
          padding: 40px 20px;
          margin-top: 60px;
        }

        .heading-title {
          font-size: 30px;
          opacity: 0;
          animation: floatInLeft 1s ease-out forwards;
          animation-delay: 0.2s;
          margin-bottom: 30px;
        }

        .intro-text {
          font-size: 15px;
          opacity: 0;
          animation: floatInBottom 1s ease-out forwards;
          animation-delay: 0.8s;
          margin-bottom: 20px;
        }

        .button-wrapper {
          text-align: center;
          margin: 20px 0;
        }
          
        .btn-outline {
          border: 2.5px solid #F1BE24;
          color: #F1BE24;
          background: transparent;
          font-size: 16px;
          font-weight: bold;
          padding: 14px 32px;
          text-decoration: none;
          border-radius: 8px;
          display: inline-flex;
          width: 90%;
          height: 10%;
          transition: all 0.3s ease;
          align-items: center;
          cursor: pointer;
          justify-content: center;
        }

        .btn-outline img {
          width: 35px;
          height: 30px;
          margin-left: 18px;
        }

        .btn-outline:hover {
          background: #F1BE24;
          color: #251339;
        }

        .video {
          margin: 20px auto;
          max-width: 500px;
        }

        .note {
          background: #783A8D;
          padding: 20px;
          margin-top: 20px;
          color: #fff;
          text-align: center;
          font-weight: bold;
          font-size: 17px;
        }

        /* MINING SECTION */
        .mine {
          text-align: center;
        }

        .mine img {
          width: 90%;
          margin-bottom: 20px;
        }

        .mining {
          text-align: left;
          padding: 40px 20px;
        }

        .color {
          color: #8A348D;
          font-size: 35px;
          margin-top: 10px;
          margin-bottom: 10px;
        }

        .mining-text {
          font-size: 18px;
        }

        .btn-filled {
          background: #8A348D;
          color: #fff;
          padding: 10px 20px;
          display: inline-block;
          margin: 20px 0;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        }

        /* FEATURES */
        .features {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
        }

        .card {
          background: #f8f8f8;
          padding: 20px;
          margin: 10px;
          border-radius: 8px;
          width: 90%;
          max-width: 400px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          text-align: center;
          opacity: 0;
          animation: floatInBottom 1s ease-out forwards;
          animation-delay: 0.3s;
        }

        /* DOWNLOAD SECTION */
        .download {
          text-align: center;
          background: linear-gradient(to bottom right, #4b0082, #8a2be2);
          color: #fff;
          padding: 40px 20px;
        }

        .left {
          text-align: left;
        }

        .download-heading {
          color: #F0AE51;
          font-size: 30px;
        }

        .download-text {
          font-size: 18px;
        }

        .download img {
          width: 200px;
          margin: 20px 10px;
        }

        .google-play img {
          width: 200px;
        }

        .app-store-badge {
          width: 220px;
          max-width: 80%;
          border-radius: 12px;
        }

        /* FOOTER */
        .footer {
          background-color: #111;
          color: white;
          text-align: center;
          padding: 30px 20px 50px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 30px 0;
        }

        .link-group {
          margin-bottom: 20px;
        }

        .link-group a {
          display: block;
          color: #ccc;
          margin: 6px 0;
          text-decoration: none;
          font-size: 16px;
        }

        .link-group a:hover {
          color: #fff;
        }

        .footer-logo img {
          width: 80%;
          margin-top: 20px;
        }

        /* === ANIMATIONS === */
        @keyframes floatInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes floatInBottom {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .animate.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .download-heading.animate {
          transform: translateX(-50px);
          opacity: 0;
          transition: all 0.8s ease;
        }

        .download-heading.animate.visible {
          transform: translateX(0);
          opacity: 1;
        }
      `}</style>

      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" 
      />

      {/* Top Navigation Header */}
      <header className="top-header" id="mainHeader">
        <div className="container">
          <div className="logo-area">
            <img src="/images/pilogo.png" alt="Pi Logo" className="pi-logo" />
          </div>
          <div className="nav-icons">
            <a href="#"><button className="search-btn"><i className="fas fa-search"></i></button></a>
            <button className="menu-btn"><i className="fas fa-bars"></i></button>
          </div>
        </div>
      </header>

      {/* Section 1: Header */}
      <header className="header">
        <h1 className="heading-title">Activate Marketplace</h1>
        <p className="intro-text">
          <b>Activating Marketplace on your Pi wallet allows you to securely trade your Pi assets with other pioneers, using Pi Network Escrow services, this is only available to pioneers who have completed KYC and migrated all assets to the Mainnet.</b>
        </p>

        <div className="button-wrapper">
          <a href="/mine/validate" className="btn-outline">
            Activate Marketplace
            <img src="/images/p3p.png" alt="P2P" />
          </a>
        </div>

        <div className="video">
          <iframe 
            width="100%" 
            height="215" 
            src="https://www.youtube.com/embed/MsOaC61cR3U" 
            frameBorder="0" 
            allowFullScreen
          ></iframe>
        </div>

        <p className="note">
          Mining crypto is hard.<br /> 
          Investing in crypto is risky.<br /> 
          Too many of us are left out of the<br /> 
          cryptocurrency revolution...
        </p>
      </header>

      {/* Section 2: Easy Mining */}
      <section className="mine">
        <img src="/images/coinphone.png" alt="Pi Coin" />
      </section>
      <section className="mining">
        <h2 className="color">Pi makes crypto<br /> mining easy.</h2>
        <p className="mining-text">Breakthrough tech allows you to mine Pi on your phone without draining your battery.</p>
        <a href="https://minepi.com/white-paper/" className="btn-filled">Learn The Tech Behind Pi</a>
      </section>

      {/* Section 3: Features */}
      <section className="features">
        <div className="card animate">
          <img src="/images/mine2.png" alt="Mine" />
          <h2>Decentralized</h2>     
          <p style={{fontSize: '18px'}}>Secure, immutable, non-counterfeitable and interoperable digital money.</p>
        </div>
        <div className="card animate">
          <img src="/images/miny.png" alt="Mobile" />
          <h2>Mobile First</h2>
          <p style={{fontSize: '18px'}}>Works on your mobile phone and does not drain your battery.</p>
        </div>
        <div className="card">
          <img src="/images/minu.png" alt="User Friendly" />
          <h2>User & Planet-Friendly</h2>
          <p style={{fontSize: '18px'}}>Easy to use, secure at scale, without the massive electrical waste.</p>
        </div>
      </section>

      {/* Section 4: Download App */}
      <section className="download">
        <img src="/images/minepi.png" alt="Pi Mobile App" />
        <section className="left">
          <h2 className="download-heading animate">Download the mobile app to start mining today! Join now.</h2>
          <p className="download-text">
            <b>Keep your money! Mining Pi is free.<br />All you need is an invitation from an existing trusted<br />member on the<br />network.</b>
          </p>
        </section>
        <a href="https://play.google.com/store" className="google-play">
          <img src="/images/googleplaybadge.png" alt="Get it on Google Play" />
        </a>
        <a href="#">
          <img src="/images/appstorebadge.png" alt="Download on the App Store" className="app-store-badge" />
        </a>
      </section>

      {/* Section 5: Footer */}
      <footer className="footer">
        <div className="footer-links">
          <div className="link-group">
            <a href="#">Pi Whitepaper</a>
            <a href="#">Support & FAQ</a>
            <a href="#">Terms of Service</a>
          </div>
          <div className="link-group">
            <a href="#">Privacy Policy</a>
            <a href="#">Developer Terms of Use</a>
            <a href="#">Pi Trademark</a>
          </div>
        </div>
        <div className="footer-logo">
          <img src="/images/pilogofooter.png" alt="Pi Network Logo" />
        </div>
      </footer>
    </div>
  );
}