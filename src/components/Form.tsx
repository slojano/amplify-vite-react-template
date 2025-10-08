import * as React from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";

const client = generateClient<Schema>();

export default function Form() {
  const { user } = useAuthenticator();
  const [address, setAddress] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) return;

    try {
      // 1️Geocode the address
      const geoRes = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=AIzaSyCWU-TAaHrKYGySM4hh3RRGpcKQhpOSihk`
      );
      const data = await geoRes.json();

      if (!data.results.length) {
        alert("Address not found!");
        return;
      }

      const { lat, lng } = data.results[0].geometry.location;

      // 2️Save the pin in Amplify Data
      const newPin = await client.models.Pin.create({
        location: address,
        lat,
        lng,
        userId: user.userId, 
      });

      console.log("Created pin:", newPin);
      alert("Pin created!");
      setAddress("");
    } catch (err) {
      console.error("Error creating pin:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "10px",
      }}
    >
      <label>
        Enter address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="123 Main St, New York, NY"
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </label>
      <button
        type="submit"
        style={{
          background: "#1976d2",
          color: "white",
          padding: "10px 16px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Create Pin
      </button>
    </form>
  );
}
