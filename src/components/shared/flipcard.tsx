import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";

const FlipCard = ({
                      frontTitle,
                      frontImage,
                      backDescription,
                      backColor = "lightcoral",
                      isSelected = false,
                      onClick,
                  }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateDeviceType = () => {
            setIsMobile(window.matchMedia("(max-width: 768px)").matches);
        };
        updateDeviceType();
        window.addEventListener("resize", updateDeviceType);
        return () => window.removeEventListener("resize", updateDeviceType);
    }, []);

    useEffect(() => {
        // Keep the card flipped if it's selected
        setIsFlipped(isSelected);
    }, [isSelected]);

    const handleFlip = () => {
        if (!isSelected) {
            setIsFlipped((prev) => !prev);
        }
    };

    const cardStyle = {
        width: "100%",
        maxWidth: "300px",
        aspectRatio: "1",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        transition: "all 0.3s ease",
        border: isSelected ? "4px solid white" : "none",  // White border for selected card
    };

    return (
        <div onClick={onClick}>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                {/* Front Side */}
                <div
                    style={{
                        ...cardStyle,
                        backgroundImage: `url(${frontImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                    }}
                    onClick={isMobile ? handleFlip : null}
                    onMouseEnter={!isMobile ? handleFlip : null}
                    onMouseLeave={!isMobile ? handleFlip : null}
                >
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            color: "#fff",
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.8)",
                            background: "rgba(0, 0, 0, 0.7)",
                            padding: "10px 15px",
                            borderRadius: "0 0 10px 10px",
                        }}
                    >
                        {frontTitle}
                    </div>
                </div>

                {/* Back Side */}
                <div
                    style={{
                        ...cardStyle,
                        background: backColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        padding: "20px",
                        fontSize: "1rem",
                        fontWeight: "normal",
                        textAlign: "center",
                    }}
                >
                    {backDescription}
                </div>
            </ReactCardFlip>
        </div>
    );
};

export default FlipCard;
