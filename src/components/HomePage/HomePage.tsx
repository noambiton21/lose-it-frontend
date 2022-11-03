import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useUser } from "../../hooks/useCheckUser";
import { CalorieGoal } from "./CalorieGoal/CalorieGoal";
import { DailyTip } from "./DailyTip/DailyTip";
import { FloatingMenu } from "./FloatingMenu/FloatingMenu";
import { Meals } from "./Meals/Meals";
import { WeightChart } from "./WeightChart/WeightChart";
import { Workouts } from "./Workouts/Workouts";
import { useTheme } from "@mui/material/styles";
import Logout from "../Logout/Logout";
import useMediaQuery from "@mui/material/useMediaQuery";
import CardMedia from "@mui/material/CardMedia";

export const HomePage = () => {
  const { isLoggedIn, user } = useUser();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));

  const styles = {
    paperContainer: {
      width: "100%",
      background:
        "linear-gradient(to bottom, #cdcdcd, #d9d9d9, #e6e6e6, #f2f2f2, #ffffff)",
    },
  };

  useEffect(() => {
    if (user && !user.onboarded) {
      window.location.href = "/onboard";
    }
  }, [user]);

  return (
    isLoggedIn && (
      <Box style={styles.paperContainer}>
        <Box
          sx={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            width: "60%",
            margin: "0 auto",
            textAlign: "center",
            backgroundColor: "white",
            "@media": {
              [theme.breakpoints.down("lg")]: {
                width: "100%",
              },
            },
          }}
        >
          <CardMedia
            component="img"
            height="190"
            image={"/running.jpg"}
            alt={"cycling"}
          />
          <Box paddingTop="30px">
            <Typography variant={matches ? "h6" : "h4"} gutterBottom>
              Welcome back, {`${user.firstName} ${user.lastName}!`}
              <Logout />
            </Typography>
            <Box height="20px" />
            <Divider />
            <CalorieGoal />
            <Divider />
            <Box
              sx={{
                display: "flex",
                width: "90%",
                margin: "0 auto",
                "@media": {
                  [theme.breakpoints.down("lg")]: {
                    display: "block",
                  },
                },
              }}
            >
              <Meals />
              <Workouts />
            </Box>
            <WeightChart />
            <DailyTip />
            <FloatingMenu />
          </Box>
        </Box>
      </Box>
    )
  );
};
