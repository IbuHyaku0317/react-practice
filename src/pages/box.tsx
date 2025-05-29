import React from "react";

const Boxlike = () => (
  <div style={{ display: "flex", gap: "32px", justifyContent: "center" }}>
    <div
      style={{
        position: "absolute",
        width: "30%",
        height: "200px",
        background: "#e0e0e0",
        border: "2px solid #888",
        borderRadius: "12px",
        color: "#888",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: "2400px",
        height: "200px",
        background: "#e0e0e0",
        border: "2px solid #888",
        borderRadius: "12px",
      }}
    />
  </div>
);

export default Boxlike;
