import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

export type MealHeaderProps = {
  displayName: string;
  onClick: () => void;
  calories: number;
};

export const MealHeader = ({
  displayName,
  onClick,
  calories,
}: MealHeaderProps) => {
  return (
    <ListItem disableGutters onClick={onClick}>
      <ListItemButton>
        <ListItemAvatar>
          {calories > 0 ? (
            <CheckCircleIcon sx={{ color: "green" }} />
          ) : (
            <PendingActionsIcon />
          )}
        </ListItemAvatar>
        <ListItemText primary={displayName} />
        <Typography variant="caption">{calories ? calories : 0}</Typography>
      </ListItemButton>
    </ListItem>
  );
};
