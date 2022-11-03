import {
  Box,
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

export type InformationCardProps = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

export const InformationCard = ({
  title,
  subtitle,
  imageUrl,
}: InformationCardProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        margin: "40px auto",
        width: "30%",
        justifyContent: "space-between",
        "@media": {
          [theme.breakpoints.down("lg")]: {
            width: "90%",
          },
        },
      }}
    >
      <Card sx={{ mb: 3 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt="Information Card Cover"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
