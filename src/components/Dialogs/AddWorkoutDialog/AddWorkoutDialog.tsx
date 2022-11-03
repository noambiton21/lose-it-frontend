import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { closeDialog } from "../../../features/user/dialogSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/typed-redux";
import { DatePicker } from "../../../shared-components/DatePicker";
import moment from "moment";
import { sagaActions } from "../../../sagas/sagaActions";
import { getUserWeight } from "../../../services/weightHistory.service";

const calculateCaloriesBurned = (gender, age, weight, heartRate, time) => {
  let caloriesThatBurned = 0;
  if (gender === "M") {
    caloriesThatBurned =
      (time * (0.6309 * heartRate + 0.1988 * weight + 0.2017 * age - 55.0969)) /
      4.184;
  } else {
    caloriesThatBurned =
      (time * (0.4472 * heartRate - 0.1263 * weight + 0.074 * age - 20.4022)) /
      4.184;
  }
  return Math.round(caloriesThatBurned);
};

export const AddWorkoutDialog = () => {
  const { isOpen } = useAppSelector((state) => state.dialog);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [heartRate, setHeartRate] = useState(0);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [weight, setWeight] = useState(1);
  const [timestamp, setTimestamp] = useState(moment().startOf("day"));
  const [activity, setActivity] = useState("");

  useEffect(() => {
    const fetchWeight = async () => {
      const userWeight = await getUserWeight();
      setWeight(userWeight);
    };
    fetchWeight();
  }, []);

  const handleChangeActivity = (event: SelectChangeEvent) => {
    setActivity(event.target.value as string);
  };

  const handleClose = useCallback(() => dispatch(closeDialog()), [dispatch]);
  const handleSave = useCallback(() => {
    const age = moment().diff(user.dateOfBirth, "years", true);
    const caloriesLost = calculateCaloriesBurned(
      user.gender,
      age,
      weight,
      heartRate,
      workoutTime
    );
    const date = timestamp.toDate().toLocaleDateString("en-GB");
    dispatch({
      type: sagaActions.ADD_WORKOUT,
      payload: {
        caloriesBurned: caloriesLost,
        date,
        activity,
        workoutTime,
        heartRate,
      },
    });
    dispatch(closeDialog());
  }, [dispatch, heartRate, timestamp, workoutTime]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Workout In</DialogTitle>
      <DialogContent>
        <Box height="20px" />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Activity</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={activity}
            label="Activity"
            onChange={handleChangeActivity}
          >
            <MenuItem value={"Walking"}>Walking</MenuItem>
            <MenuItem value={"Running"}>Running</MenuItem>
            <MenuItem value={"Cycling"}>Cycling</MenuItem>
            <MenuItem value={"Gym"}>Gym Activities</MenuItem>
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          label="Heart Rate (bpm)"
          type="number"
          fullWidth
          value={heartRate}
          onChange={(e) => setHeartRate(Number(e.target.value))}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          label="Time (minutes)"
          type="number"
          fullWidth
          value={workoutTime}
          onChange={(e) => setWorkoutTime(Number(e.target.value))}
          variant="standard"
        />

        <Box height="20px" />
        <DatePicker
          value={timestamp}
          onChange={setTimestamp}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
