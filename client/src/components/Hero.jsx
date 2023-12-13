import "./styles.css";
import { useHistory } from 'react-router-dom'; 

function Hero() {
  const history = useHistory(); // Access the history object

  const handleGetFund = () => {
    history.push('/getfunds');
  };

  const handleDonate = () => {
    history.push('/donate');
  };

  return (
    <div className="hero-section">
      

      <div className="button-card" onClick={() => handleGetFund()}>
        <h1>Get Funds</h1>
      </div>

      <div className="button-card" onClick={() => handleDonate()}>
        <h1>Donate</h1>
      </div>
    </div>
  );
};

export default Hero;
