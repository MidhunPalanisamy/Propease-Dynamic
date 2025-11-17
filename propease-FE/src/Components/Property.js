import React, {useEffect, useState} from "react";
import Build from "../Assets/Build.png";
import "./CSS/Property.css";
import add from "../Assets/add.png";
import { Link } from "react-router-dom";


const Property = () => {
    const [property, setProperty] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [paidProperties, setPaidProperties] = useState(new Set());

    useEffect(()=>{
        loadProperty();
        loadPaidProperties();
    },[]);

    const loadProperty = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/allProperty");
            const data = await response.json();
            setProperty(data);
        } catch (error) {
            console.error("Error loading properties:", error);
        }
    }

    const loadPaidProperties = async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        try {
            const response = await fetch(`http://localhost:8080/api/userPayments/${userId}`);
            const payments = await response.json();
            const paidIds = new Set(payments.map(p => p.propertyId));
            setPaidProperties(paidIds);
        } catch (error) {
            console.error("Error loading paid properties:", error);
        }
    }

    const handleCardClick = (id) => {
        setExpandedId(expandedId === id ? null : id);
    }

    const handleWhatsApp = (contact) => {
        const message = "Hi, I'm interested in this property. Can you provide more details?";
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${contact}?text=${encodedMessage}`, '_blank');
    }

    const handleEmail = (email) => {
        const subject = "Property Inquiry";
        const body = "Hi, I'm interested in this property. Can you provide more details?";
        window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    }

    const handlePayment = async (propId) => {
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
            alert('Please login to make a payment');
            return;
        }

        if (paidProperties.has(propId)) {
            alert('You have already paid for this property!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/recordPayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    propertyId: propId,
                    amountPaid: 5000
                })
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Payment successful! Transaction ID: ${data.transactionId}`);
                
                // Update paid properties
                const newPaidProperties = new Set(paidProperties);
                newPaidProperties.add(propId);
                setPaidProperties(newPaidProperties);
                
                // Reload paid properties
                loadPaidProperties();
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('An error occurred during payment. Please try again.');
        }
    }

    return (
        <div>
            <h1 className="prop-txt">Find Your Space</h1>
            <div className="property-container">
                {property.map((prop) => (
                    <div 
                        key={prop.id} 
                        className={`property-card ${expandedId === prop.id ? 'expanded' : ''} ${paidProperties.has(prop.id) ? 'paid' : ''}`}
                        onClick={() => handleCardClick(prop.id)}
                    >
                        {paidProperties.has(prop.id) && (
                            <div className="paid-badge">✓ PAID</div>
                        )}
                        <img 
                            src={`http://localhost:8080/api/product/${prop.id}/image`} 
                            alt="Property" 
                            className="property-image" 
                            onError={(e) => { e.target.onerror = null; e.target.src = Build; }}
                        />
                        <div className="property-details">
                            <p className="property-address">{prop.address}</p>
                            <p className="property-contact">Contact: {prop.contact}</p>
                        </div>

                        {expandedId === prop.id && (
                            <div className="property-expanded">
                                <div className="expanded-content">
                                    <h3>Property Details</h3>
                                    <p><strong>Address:</strong> {prop.address}</p>
                                    <p><strong>Email:</strong> {prop.email}</p>
                                    <p><strong>Contact:</strong> {prop.contact}</p>
                                    <p><strong>Latitude:</strong> {prop.latitude}</p>
                                    <p><strong>Longitude:</strong> {prop.longitude}</p>
                                    
                                    <div className="action-buttons">
                                        <button 
                                            className="btn btn-whatsapp"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleWhatsApp(prop.contact);
                                            }}
                                        >
                                            💬 WhatsApp
                                        </button>
                                        <button 
                                            className="btn btn-email"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEmail(prop.email);
                                            }}
                                        >
                                            ✉️ Email
                                        </button>
                                        <button 
                                            className={`btn btn-pay ${paidProperties.has(prop.id) ? 'disabled' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!paidProperties.has(prop.id)) {
                                                    handlePayment(prop.id);
                                                }
                                            }}
                                            disabled={paidProperties.has(prop.id)}
                                        >
                                            {paidProperties.has(prop.id) ? '✓ Already Paid' : '💳 Pay Initial Amount'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <Link to="/addprop">
                <button className="addProp"><img className="addImg" src={add} height="20px" alt=""/>Add Property</button>
            </Link>
        </div>
    );
};

export default Property;