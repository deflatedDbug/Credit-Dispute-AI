import React, { useState } from "react";
import axios from "axios";
import "../App.css"; // Add a CSS file for styles
import { jsPDF } from "jspdf"

const CreditDisputeGenerator = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        disputeDetails: "",
    });

    const [generated_letter, set_generated_letter] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        set_generated_letter("");
        setIsLoading(true)

        try {
            const response = await axios.post(
                "http://localhost:3000/api/generate-letter",
                formData
            );
            set_generated_letter(response.data.letter);
        } catch (error) {
            setError("Error generating letter, please try again");
        }
        finally{
            setIsLoading(false)
        }
    };

    const handleDownload = async (e) => {
        const doc = new jsPDF();

        doc.setFont("times")
        doc.setFontSize(12)

        doc.text(generated_letter, 10, 10, {maxWidth: 180})

        doc.save("dispute-letter.pdf");
    }

    return (
        <div className="credit-dispute-container">
            <h1 className="title">DisputeAI</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Dispute Details:</label>
                    <textarea
                        name="disputeDetails"
                        value={formData.disputeDetails}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn generate-button-primary">
                    Generate Letter
                </button>
            </form>

            {isLoading && (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Generating your letter...</p>
                </div>
            )}

            {error && <p className="error-message">{error}</p>}

            {generated_letter && (
                <div className="generated-letter-container">
                    <h2>Generated Letter</h2>
                    <pre className="generated-letter">{generated_letter}</pre>
                    <button onClick={handleDownload} className="btn btn-secondary">
                        Download PDF
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreditDisputeGenerator;
