import * as React from "react";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import type { Schema } from "../amplify/data/resource";
import AutocompleteAddressInput from "./AutocompleteAddressInput";

const client = generateClient<Schema>();

export default function ArchivePage() {
  const { user } = useAuthenticator();
  const [pins, setPins] = React.useState<Schema["Pin"]["type"][]>([]);
  const [editingPinId, setEditingPinId] = React.useState<string | null>(null);
  const [editedAddress, setEditedAddress] = React.useState("");

  


  // Load user pins 
  React.useEffect(() => {
    
    const loadPins = async () => {
      try {
        console.log("Current user:", user);
        console.log("Archive userId:", user?.userId);

        const res = await client.models.Pin.list({
          filter: { userId: { eq: user.userId } }, //  use userId, not owner
          authMode: "userPool"
        });
        console.log("Fetched pins:", res.data);
        setPins(res.data);
      } catch (err) {
        console.error("Error loading pins:", err);
      }
    };
    loadPins();
  }, [user.userId]);
  

  // Delete a pin
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pin?")) return;
    try {
      await client.models.Pin.delete({ id });
      setPins((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting pin:", err);
    }
  };

  // Enter edit mode
  const startEdit = (pin: Schema["Pin"]["type"]) => {
    setEditingPinId(pin.id ?? null);
    setEditedAddress(pin.location || "");
  };

  // Save updated address (with geocoding)
  const handleSave = async () => {
    if (!editingPinId || !editedAddress) return;

    try {
      // Geocode new address
      const geoRes = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          editedAddress
        )}&key=AIzaSyCWU-TAaHrKYGySM4hh3RRGpcKQhpOSihk`
      );
      const data = await geoRes.json();

      if (!data.results.length) {
        alert("Address not found!");
        return;
      }

      const { lat, lng } = data.results[0].geometry.location;

      // Update pin in Amplify
      await client.models.Pin.update({
        id: editingPinId,
        location: editedAddress,
        lat,
        lng,
      });

      // Update local state
      setPins((prev) =>
        prev.map((p) =>
          p.id === editingPinId ? { ...p, location: editedAddress, lat, lng } : p
        )
      );

      setEditingPinId(null);
      setEditedAddress("");
    } catch (err) {
      console.error("Error updating pin:", err);
      alert("Error updating pin. Please try again.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Your Pins
      </Typography>
      {pins.length === 0 ? (
        <Typography>No pins found.</Typography>
      ) : (
        pins.map((pin) => (
          <Card key={pin.id} sx={{ mb: 2, p: 1 }}>
            <CardContent>
              {editingPinId === pin.id ? (
                <>
                  <AutocompleteAddressInput
                    value={editedAddress}
                    onChange={setEditedAddress}
                />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{ mr: 1, mt: 1 }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditingPinId(null)}
                    sx={{ mt: 1 }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6">{pin.location}</Typography>
                  <Typography variant="body2">
                    📍 {pin.lat}, {pin.lng}
                  </Typography>
                  {pin.upload && (
                    <Typography variant="body2" color="text.secondary">
                      Upload: {pin.upload}
                    </Typography>
                  )}
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => startEdit(pin)}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(pin.id!)}
                    sx={{ mt: 1 }}
                  >
                    Delete
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
