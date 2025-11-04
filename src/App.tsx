//import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import * as React from 'react';
//import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';

import FileUpload from "./fileUp";

//bottom nav imports
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
//import List from '@mui/material/List';
//import ListItemButton from '@mui/material/ListItemButton';
//import ListItemAvatar from '@mui/material/ListItemAvatar';
//import ListItemText from '@mui/material/ListItemText';
//import Avatar from '@mui/material/Avatar';
import MapIcon from '@mui/icons-material/Map';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import UploadIcon from '@mui/icons-material/Upload';
import Form from "./form";
import ArchivePage from "./archive";


//import { UseAuthenticator } from "@aws-amplify/ui-react";
import{
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  //InfoWindow,
} from "@vis.gl/react-google-maps";

//console.log("App loaded");


/*
function MapView() {
  const { user } = useAuthenticator();
  const [pins, setPins] = React.useState<Schema["Pin"]["type"][]>([]);
  const client = generateClient<Schema>();
  const center = { lat: 38.8283, lng: -98.5795 };

  React.useEffect(() => {
    const subCreate = client.models.Pin.onCreate().subscribe({
      next: (pin) => {
        //const pin = event;
        if (pin.userId === user.userId) {
          setPins((prev) => [...prev, pin]);
        }
      },
    });
  
    const subUpdate = client.models.Pin.onUpdate().subscribe({
      next: (pin) => {
        //const pin = event;
        if (pin.userId === user.userId) {
          setPins((prev) =>
            prev.map((p) => (p.id === pin.id ? { ...p, ...pin } : p))
          );
        }
      },
    });
  
    const subDelete = client.models.Pin.onDelete().subscribe({
      next: (pin) => {
        //const pin = event;
        if (pin.userId === user.userId) {
          setPins((prev) => prev.filter((p) => p.id !== pin.id));
        }
      },
    });
  
    // Initial load
    const loadPins = async () => {
      const res = await client.models.Pin.list( { authMode: "apiKey" }); // 👈 public read
      setPins(res.data);
    };
    loadPins();
  
    return () => {
      subCreate.unsubscribe();
      subUpdate.unsubscribe();
      subDelete.unsubscribe();
    };
  }, [user.userId]);
  

  return (
    <APIProvider apiKey="AIzaSyCWU-TAaHrKYGySM4hh3RRGpcKQhpOSihk">
      <div style={{ height: "100vh" }}>
        <Map defaultZoom={5} defaultCenter={center} mapId="93e9c6ace1e544e">
          {pins.map((pin) => (
            <AdvancedMarker key={pin.id} position={{ lat: pin.lat!, lng: pin.lng! }}>
              <Pin background="purple" borderColor="green" glyphColor="white" />
            </AdvancedMarker>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}
*/

type MapViewProps = {
  savedCenter: google.maps.LatLngLiteral;
  savedZoom: number;
  onMapMove: (center: google.maps.LatLngLiteral, zoom: number) => void;
};
  
function MapView({ savedCenter, savedZoom, onMapMove }: MapViewProps) {
  const { user } = useAuthenticator();
  const [pins, setPins] = React.useState<Schema["Pin"]["type"][]>([]);
  const client = generateClient<Schema>();

  React.useEffect(() => {
    const subCreate = client.models.Pin.onCreate().subscribe({
      next: (pin) => {
        if (pin.userId === user.userId) {
          setPins((prev) => [...prev, pin]);
        }
      },
    });

    const subUpdate = client.models.Pin.onUpdate().subscribe({
      next: (pin) => {
        if (pin.userId === user.userId) {
          setPins((prev) =>
            prev.map((p) => (p.id === pin.id ? { ...p, ...pin } : p))
          );
        }
      },
    });

    const subDelete = client.models.Pin.onDelete().subscribe({
      next: (pin) => {
        if (pin.userId === user.userId) {
          setPins((prev) => prev.filter((p) => p.id !== pin.id));
        }
      },
    });

    const loadPins = async () => {
      const res = await client.models.Pin.list({ authMode: "apiKey" });

      console.log("All pins (public read):", res.data);
      res.data.forEach(pin => console.log(pin.id, pin.userId, pin.owner));
      
      setPins(res.data);
    };
    loadPins();

    return () => {
      subCreate.unsubscribe();
      subUpdate.unsubscribe();
      subDelete.unsubscribe();
    };
  }, [user.userId]);

  return (
    <div style={{ height: "100vh" }}>
      <Map
        defaultZoom={savedZoom}
        defaultCenter={savedCenter}
        mapId="93e9c6ace1e544e"
        onCameraChanged={(ev) => {
          onMapMove(ev.detail.center, ev.detail.zoom);
        }}
      >
        {pins.map((pin) => (
          <AdvancedMarker key={pin.id} position={{ lat: pin.lat!, lng: pin.lng! }}>
            <Pin background="purple" borderColor="green" glyphColor="white" />
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
}




 function App(){
  const { signOut } = useAuthenticator();

  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  //map values
  const [mapCenter, setMapCenter] = React.useState({ lat: 38.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = React.useState(5);

  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    
  }, [value]);

  return (
    <APIProvider
      apiKey="AIzaSyCWU-TAaHrKYGySM4hh3RRGpcKQhpOSihk"
      libraries={["places"]} //for autocomplete
    >
    <Box sx={{ pb: 7 }} ref={ref}>
       <button id="logout" onClick={signOut}
       style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1000,
        padding: '8px 16px',
        background: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }} >
    Logout
  </button>
      <CssBaseline />
      {value === 0 && <MapView
            savedCenter={mapCenter}
            savedZoom={mapZoom}
            onMapMove={(center, zoom) => {
              setMapCenter(center);
              setMapZoom(zoom);
            }}
          />}
      {value === 1 && <Form />}
      {value === 2 && <ArchivePage />}
      {value === 3 && <FileUpload />}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Map" icon={<MapIcon />} />
          <BottomNavigationAction label="Upload" icon={<UploadIcon />} />
          <BottomNavigationAction label="Pin Archive" icon={<ArchiveIcon />} />
          <BottomNavigationAction label="Info" icon={<InfoOutlineIcon />} />

        </BottomNavigation>
      </Paper>
    </Box>
    </APIProvider>
  );
}


export default App;
