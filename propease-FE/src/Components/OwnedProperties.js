import React, { useEffect, useState } from "react";
import './CSS/OwnedProperties.css';
import { API_BASE_URL, PROPERTY_PLACEHOLDER_IMAGE_URL } from "../config/env";

const OwnedProperties = () => {
    const [ownedProperties, setOwnedProperties] = useState([]);
    const [expandedId, setExpandedId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOwnedProperties();
    }, []);

    const loadOwnedProperties = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setLoading(false);
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/ownedProperties?userId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                setOwnedProperties(data);
            }
        } catch (error) {
            console.error("Error loading owned properties:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReceiptClick = (propId) => {
        setExpandedId(expandedId === propId ? null : propId);
    };

    const downloadReceipt = (prop) => {
        const receiptContent = `
═══════════════════════════════════════
   PROPEASE - PAYMENT CONFIRMATION RECEIPT
═══════════════════════════════════════

Property ID: ${prop.id}
Address: ${prop.address}
Contact: ${prop.contact}
Email: ${prop.email}

═══════════════════════════════════════
PAYMENT DETAILS
═══════════════════════════════════════
Amount Paid: $${prop.amountPaid}
Payment Date: ${new Date(prop.paymentDate).toLocaleDateString()}
Transaction ID: ${prop.transactionId}
Status: ✓ PAID

═══════════════════════════════════════
Thank you for choosing Propease!
This is an automatically generated receipt.
═══════════════════════════════════════
        `;
        
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(receiptContent));
        element.setAttribute('download', `receipt_${prop.id}_${Date.now()}.txt`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="owned-properties-page">
            <h1 className="owned-page-title">🏠 Your Owned Properties</h1>
            
            {loading ? (
                <div className="loading">Loading...</div>
            ) : ownedProperties.length > 0 ? (
                <div className="owned-container">
                    {ownedProperties.map((prop) => (
                        <div key={prop.id} className="owned-card">
                            <div className="owned-header">
                                <img 
                                    src={`${API_BASE_URL}/api/product/${prop.id}/image`} 
                                    alt="Property" 
                                    className="owned-image"
                                    onError={(e) => { e.target.onerror = null; e.target.src = PROPERTY_PLACEHOLDER_IMAGE_URL; }}
                                />
                                <div className="paid-status">✓ PAID</div>
                            </div>
                            <div className="owned-info">
                                <p className="owned-address">{prop.address}</p>
                                <p className="owned-contact">📞 {prop.contact}</p>
                                <p className="owned-email">📧 {prop.email}</p>
                                
                                <button 
                                    className="receipt-btn"
                                    onClick={() => handleReceiptClick(prop.id)}
                                >
                                    📄 {expandedId === prop.id ? 'Hide Receipt' : 'View Receipt'}
                                </button>
                                
                                {expandedId === prop.id && (
                                    <div className="receipt-details">
                                        <div className="receipt-row">
                                            <span><strong>Amount Paid:</strong></span>
                                            <span>${prop.amountPaid}</span>
                                        </div>
                                        <div className="receipt-row">
                                            <span><strong>Payment Date:</strong></span>
                                            <span>{new Date(prop.paymentDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="receipt-row">
                                            <span><strong>Transaction ID:</strong></span>
                                            <span className="txn-id">{prop.transactionId}</span>
                                        </div>
                                        <button 
                                            className="download-btn"
                                            onClick={() => downloadReceipt(prop)}
                                        >
                                            ⬇️ Download Receipt
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-properties">
                    <p>You haven't purchased any properties yet.</p>
                    <p>Visit the Property page to explore and buy!</p>
                </div>
            )}
        </div>
    );
};

export default OwnedProperties;
