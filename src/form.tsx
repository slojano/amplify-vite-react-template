import * as React from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import AutocompleteAddressInput from "./AutocompleteAddressInput";
import { Card, CardContent, Typography, Button } from "@mui/material";
import FileUpload from "./fileUp";

const client = generateClient<Schema>();

export default function Form() {
  const [imageKey, setImageKey] = React.useState<string | null>(null);

  const { user } = useAuthenticator();
  const [address, setAddress] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    try {
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

      await client.models.Pin.create({
        location: address,
        lat,
        lng,
        userId: user.userId,
        //description: string,
        upload: imageKey,
      },
      {authMode: "userPool"}
    );

      alert("Pin created!");
      setAddress("");
      setImageKey(null)
    } catch (err) {
      console.error("Error creating pin:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Add a New Pin
      </Typography>

      <Card sx={{ mb: 2, p: 2, overflow: "visible" }}>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            
            <div style={{ position: "relative", zIndex: 1000 }}>
              <AutocompleteAddressInput
                value={address}
                onChange={setAddress}
                placeholder="123 Main St, New York, NY"
              />

            </div>
            <div style={{ position: "relative", zIndex: 1000 }}>
             
            </div>
            <div style={{ position: "relative", zIndex: 1000 }}>
            <FileUpload onUploaded={(key) => setImageKey(key)} />

            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ alignSelf: "flex-start", mt: 1 }}
            >
              Create Pin
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
