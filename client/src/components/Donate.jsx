import Card from "./Card";

import { useEffect, useState } from "react";

function Donate() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleWhatsAppPay = () => {
    const stripeLink = "https://buy.stripe.com/test_14k8zE9C60G9al24gg";
    const message = `Hey, I want to make a payment. Here's the link: ${stripeLink}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappLink);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:6001/api/form/getForm'); // Assuming you have a route to fetch data
        if (response.ok) {
          const result = await response.json();
          setData(result);
          setFilteredData(result);
        } else {
          console.error('Failed to fetch data from the server');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    // Update searchQuery state
    setSearchQuery(query);

    // Filter data based on the search query
    const filtered = data.filter((item) =>
      item.username.toLowerCase().includes(query.toLowerCase())
    );

    // Update filteredData state
    setFilteredData(filtered);
  };

  return (
    <>
      <h1 className="main-heading">Trending FundRaisers</h1>
      <div className="Cards">
        {filteredData.map((item) => (
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
            <input
              type="text"
              placeholder="Search user.."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </section>
    </>
  );
}

export default Donate;
