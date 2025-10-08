//import { useEffect, useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import * as React from 'react';
//import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';



//bottom nav imports
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MapIcon from '@mui/icons-material/Map';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import UploadIcon from '@mui/icons-material/Upload';
import Form from "./form";



//import { UseAuthenticator } from "@aws-amplify/ui-react";
import{
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  //InfoWindow,
} from "@vis.gl/react-google-maps";
const client = generateClient<Schema>();
//console.log("App loaded");


/*
 function MapView(){
  const { user, route } = useAuthenticator((context) => [context.user, context.route]);
  console.log("ath route: ", route);
  console.log("User:", user);

  const position = { lat: 39.8283, lng: -98.5795};

  if(route !== 'authenticated'){
    return <div>Loading or not signed in...</div>;
  }


  return(
    <APIProvider apiKey="AIzaSyCWU-TAaHrKYGySM4hh3RRGpcKQhpOSihk">
    <div style = {{height: "100vh"}}>
    <Map 
    defaultZoom = {5} 
    defaultCenter={position} 
    mapId = "93e9c6ace1e544e"
    >
      <AdvancedMarker position={position}>
        <Pin
        background={"purple"}
        borderColor={"green"}
        glyphColor={"blue"}
        />
      </AdvancedMarker>
    </Map>
    </div>
    </APIProvider>
  );
}
*/

function MapView() {
  const { user } = useAuthenticator();
  const [pins, setPins] = React.useState<Schema["Pin"]["type"][]>([]);
  const client = generateClient<Schema>();
  const center = { lat: 38.8283, lng: -98.5795 };

  React.useEffect(() => {
    const loadPins = async () => {
      try {
        const res = await client.models.Pin.list({
          filter: { userId: { eq: user.userId } },
        });
        setPins(res.data);
      } catch (err) {
        console.error("Error loading pins:", err);
      }
    };
    loadPins();
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


  



 function App(){
  const { signOut } = useAuthenticator();

  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    
  }, [value]);

  return (
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
      {value === 0 && <MapView />}
      {value === 1 && <Form />}
      {value === 2 && <div style={{ padding: 20 }}>Blank Archive Page</div>}
      {value === 3 && <div style={{ padding: 20 }}>Blank Archive Page</div>}
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
          <BottomNavigationAction label="Info" icon={<InfoOutlineIcon />} />
          <BottomNavigationAction label="Pin Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}


export default App;
