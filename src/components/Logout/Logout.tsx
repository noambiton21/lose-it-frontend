import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { sagaActions } from "../../sagas/sagaActions";

const Logout = () => {
  const dispatch = useDispatch();
  const handleClickLogout = () => {
    dispatch({
      type: sagaActions.LOGOUT,
    });
  };

  return <LogoutIcon sx={{ ml: 5 }} onClick={handleClickLogout} />;
};

export default Logout;
