import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

interface MessageExample {
  primary: string;
  secondary: string;
  person: string;
}

const messageExamples: readonly MessageExample[] = [
  {
    primary: "Brunch this week?",
    secondary: "Let's grab a bite to eat",
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Birthday Gift",
    secondary: "Do you have a suggestion for a good present?",
    person: "/static/images/avatar/1.jpg",
  },
  // ... other messages
];

export default function Messages() {
  return (
    <List>
      {messageExamples.map(({ primary, secondary, person }, idx) => (
        <ListItemButton key={idx + person}>
          <ListItemAvatar>
            <Avatar src={person} />
          </ListItemAvatar>
          <ListItemText primary={primary} secondary={secondary} />
        </ListItemButton>
      ))}
    </List>
  );
}
