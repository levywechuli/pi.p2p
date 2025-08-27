import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/mine');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'white', minHeight: '100vh' }}>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <p>
        <img 
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
          src="images/loading.png" 
          alt="Loading..." 
          width="333" 
          height="333" 
        />
      </p>
    </div>
  );
}