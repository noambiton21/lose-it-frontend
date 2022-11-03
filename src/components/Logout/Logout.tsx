import React, { useCallback } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { sagaActions } from "../../sagas/sagaActions";
import { useTheme } from "@mui/material/styles";

const Logout = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleClickLogout = useCallback(() => {
    dispatch({
      type: sagaActions.LOGOUT,
    });
  },[dispatch]);

  return (
    <LogoutIcon
      sx={{
        mr: 10,
        cursor: "pointer",
        float: "right",
        "@media": {
          [theme.breakpoints.down("lg")]: {
            mr: 3,
          },
        },
      }}
      onClick={handleClickLogout}
    />
  );
};

export default Logout;
