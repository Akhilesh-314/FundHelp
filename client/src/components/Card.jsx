import React from "react";


function Card(props) {
    const handleWhatsAppPay = () => {
        const stripeLink = "https://buy.stripe.com/test_14k8zE9C60G9al24gg";
        const message = `Hey, I want to make a payment. Here's the link: ${stripeLink}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappLink = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappLink);
    };

    const handleDelete = () => {
        // Add the logic for handling delete here
        // You can use props.onDelete or any other mechanism to trigger the delete action
        if (props.onDelete) {
            props.onDelete();
        }
    };

    return (
        <>
            <div className="card">
                <div className="card-img">
                    {props.src && <img src={`http://localhost:6001/${props.src}`} alt={props.alt} />}
                </div>
                <div className="card-description">
                    <p className="heading">{props.heading}</p>
                    <p className="person-name">{props.personname}</p>
                    <p className="fund-raised">Funds have to raise:{props.funddetails}</p>
                    <div className="buttons-card">
                        <button className="share" onClick={handleWhatsAppPay} >Share</button>
                        <button className="donate" onClick={() => window.location.href = "https://buy.stripe.com/test_14k8zE9C60G9al24gg"}>
                            Donate
                        </button>
                        {props.showDeleteButton && (
                            <button className="delete" onClick={handleDelete}>Delete</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;