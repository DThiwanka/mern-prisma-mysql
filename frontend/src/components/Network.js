import React, { useEffect, useState } from "react";

const NetworkDetails = () => {
    const [networkDetails, setNetworkDetails] = useState({
        macAddresses: [],
        ipAddresses: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the backend
        fetch("http://localhost:5000/api/network-details")
            .then((response) => response.json())
            .then((data) => {
                setNetworkDetails(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching network details:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading network details...</p>;
    }

    return (
        <section style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>Network Details</h1>
            <div
                style={{
                    border: "1px solid #ddd",
                    padding: "20px",
                    borderRadius: "8px",
                    maxWidth: "500px",
                    margin: "0 auto",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <h2>MAC Addresses:</h2>
                <ul>
                    {networkDetails.macAddresses.map((mac, index) => (
                        <li key={index}>{mac}</li>
                    ))}
                </ul>
                <h2>IPv4 Addresses:</h2>
                <ul>
                    {networkDetails.ipAddresses.map((ip, index) => (
                        <li key={index}>{ip}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default NetworkDetails;
