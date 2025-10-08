import * as React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const client = generateClient<Schema>();

export default function MapView() {
  const { user } = useAuthenticator();
  const [pins, setPins] = React.useState<Schema["Pin"]["type"][]>([]);
  const center = { lat: 39.8283, lng: -98.5795 };

  React.useEffect(() => {
    const loadPins = async () => {
      const res = await client.models.Pin.list({
        filter: { userId: { eq: user.userId } },
      });
      setPins(res.data);
    };
    loadPins();
  }, [user.userId]);

  return (
    <APIProvider apiKey="AIzaSyCWU-TAaHrKYGySM4hh3RRGpcKQhpOSihk">
      <div style={{ height: "100vh" }}>
        <Map defaultZoom={5} defaultCenter={center} mapId="93e9c6ace1e544e">
          {pins.map((pin) => (
            <AdvancedMarker key={pin.id} position={{ lat: pin.lat!, lng: pin.lng! }}>
              <Pin
                background={"purple"}
                borderColor={"green"}
                glyphColor={"white"}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}
