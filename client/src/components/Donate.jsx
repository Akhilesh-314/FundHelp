import Card from "./Card";

import { useEffect, useState } from "react";

function Donate() {
  const handleWhatsAppPay = () => {
    const stripeLink = "https://buy.stripe.com/test_14k8zE9C60G9al24gg";
    const message = `Hey, I want to make a payment. Here's the link: ${stripeLink}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappLink);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:6001/api/form/getForm'); // Assuming you have a route to fetch data
        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log(result);
        } else {
          console.error('Failed to fetch data from the server');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 className="main-heading">Trending FundRaisers</h1>
      <div className="Cards">
        {data.map((item) => (
          <Card
            key={item._id}
            src={item.image}
            alt={item.username}
            heading={item.cause}
            personname={item.username}
            funddetails={item.estimatedAmount}
          />
        ))}
      </div>

      <section className="donate-relative">
        <h1 className="main-heading">Donate Someone You Know!</h1>

        <div className="form">
          <div className="search">
            <input type="text" placeholder="Search user.." />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input type="text" placeholder="Selected User" readOnly />
          <div className="details">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="details">
            <input type="email" placeholder="Email Id" />
            <input type="tel" placeholder="Mobile Number" />
          </div>

          <div className="payment-options">
            <div className="container1">
              <a
                href="https://buy.stripe.com/test_14k8zE9C60G9al24gg"
                target="_blank"
                rel="noopener noreferrer"
                className="make-payment"
              >
                Make Payment
              </a>
            </div>
            <div className="container2">
              <button className="whatsapp" 
              onClick={handleWhatsAppPay}
              >
                <div className="align-container2">
                  <img src="./whatsapp.png" alt="" />
                  <span>Whatsapp and Pay</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Donate;
