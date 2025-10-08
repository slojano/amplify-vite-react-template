import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import MapIcon from "@mui/icons-material/Map";
import UploadIcon from "@mui/icons-material/Upload";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import ArchiveIcon from "@mui/icons-material/Archive";

interface Props {
  value: number;
  setValue: (val: number) => void;
}

export default function BottomNav({ value, setValue }: Props) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={(_, newVal) => setValue(newVal)}>
        <BottomNavigationAction label="Map" icon={<MapIcon />} />
        <BottomNavigationAction label="Upload" icon={<UploadIcon />} />
        <BottomNavigationAction label="Info" icon={<InfoOutlineIcon />} />
        <BottomNavigationAction label="Messages" icon={<ArchiveIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
