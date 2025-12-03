

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);


import { useAuthenticator } from '@aws-amplify/ui-react';
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import * as React from 'react';




import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';

import MapIcon from '@mui/icons-material/Map';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import UploadIcon from '@mui/icons-material/Upload';
import Form from "./form";
import ArchivePage from "./archive";
import { getUrl } from "aws-amplify/storage";


type PinType = Schema["Pin"]["type"];




import{
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";





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

      //res.data.forEach(pin => console.log(pin.id, pin.userId, pin.owner));
      const pinsWithUrls= await Promise.all(
        res.data.map (async (pin) =>{
          if(pin.upload){
            const url = await getUrl({path:pin.upload});
            return{...pin, imageUrl: url.url.toString()};
          }
          return pin;
        })
      )
      //setPins(res.data);
      setPins(pinsWithUrls)
    };
    loadPins();

    return () => {
      subCreate.unsubscribe();
      subUpdate.unsubscribe();
      subDelete.unsubscribe();
    };
  }, [user.userId]);

  function PinMarker({ pin }: { pin: PinType & { imageUrl?: string } }) {
    const [open, setOpen] = React.useState(false);
  
    return (
      <>
        <AdvancedMarker
          position={{ lat: pin.lat!, lng: pin.lng! }}
          onClick={() => setOpen(true)}
        >
          {pin.imageUrl ? (
            <img
              src={pin.imageUrl}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid white",
                boxShadow: "0 0 4px rgba(0,0,0,0.5)",
              }}
            />
          ) : (
            <Pin background="purple" borderColor="green" glyphColor="white" />
          )}
        </AdvancedMarker>
  
        {open && (
          <InfoWindow
            position={{ lat: pin.lat!, lng: pin.lng! }}
            onCloseClick={() => setOpen(false)}
          >
            <div style={{ maxWidth: "200px" }}>
              {pin.imageUrl && (
                <img
                  src={pin.imageUrl}
                  style={{ width: "100%", borderRadius: "6px" }}
                />
              )}
              <p>{pin.location}</p>
            </div>
          </InfoWindow>
        )}
      </>
    );
  }
  
  

  // search location
  const [searchBox, setSearchBox] = React.useState<google.maps.places.SearchBox>();
  React.useEffect(() => {
    const input = document.getElementById("pac-input") as HTMLInputElement;
    if (input && !searchBox) {
      const sb = new google.maps.places.SearchBox(input);
      sb.addListener("places_changed", () => {
        const places = sb.getPlaces();
        if (places && places.length > 0) {
          const loc = places[0].geometry?.location;
          if (loc) onMapMove({ lat: loc.lat(), lng: loc.lng() }, 12);
        }
      });
      setSearchBox(sb);
    }
  }, [searchBox]);

  return (
    <div style={{ height: "100vh" }}>
      
      <Map
        
        defaultZoom={savedZoom}
        defaultCenter={savedCenter}
        mapId="93e9c6ace1e544e"
        gestureHandling="greedy"
      disableDefaultUI={true}
        mapTypeControl={false}
        onCameraChanged={(ev) => {
          onMapMove(ev.detail.center, ev.detail.zoom);
        }}
      >
      
      {pins.map((pin) => (
        <PinMarker key={pin.id} pin={pin} />
      ))}

      </Map>
      
    </div>
  );
}
/*

*/



 function App(){
  const { signOut } = useAuthenticator();

  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  //map values
  const [mapCenter, setMapCenter] = React.useState({ lat: 38.8283, lng: -98.5795 });
  const [mapZoom, setMapZoom] = React.useState(5);


  const [geoReady, setGeoReady] = React.useState(false);
  //grab location
  React.useEffect(() => {
    (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setMapZoom(12); // zoom to user location
          setGeoReady(true); // geolocation succeeded
        },
        (err) => {
          console.warn("Geolocation failed or denied", err);
          setGeoReady(true); 
        }
      );
    } else { // geolocation not supported
      setGeoReady(true);
    }
  }, []);
  

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
        position: 'fixed',
        top: 10,
        right: 10,
        zIndex: 2000,
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
      {value === 0   && geoReady  && <MapView
            savedCenter={mapCenter}
            savedZoom={mapZoom}
            onMapMove={(center, zoom) => {
              setMapCenter(center);
              setMapZoom(zoom);
            }}
          />}
      {value === 1 && <Form />}
      {value === 2 && <ArchivePage />}
      {value === 3 && <p>blank </p>}
      

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
