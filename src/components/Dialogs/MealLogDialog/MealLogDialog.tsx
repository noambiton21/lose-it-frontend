import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
} from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { closeDialog } from "../../../features/user/dialogSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/typed-redux";
import { Meal } from "./Meal/Meal";
import { MealHeader } from "./MealHeader/MealHeader";
import { DatePicker } from "../../../shared-components/DatePicker";
import { sagaActions } from "../../../sagas/sagaActions";

import moment from "moment";

export const MealLogDialog = () => {
  const { isOpen } = useAppSelector((state) => state.dialog);
  const { mealOptions } = useAppSelector((state) => state.meal);
  const [activeType, setActiveType] = useState("");
  const [dateOfMeal, setDateOfMeal] = useState(moment().startOf("day"));
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => dispatch(closeDialog()), [dispatch]);

  useEffect(() => {
    const date = dateOfMeal.toDate().toLocaleDateString("en-GB");
    dispatch({
      type: sagaActions.FETCH_MEAL_OPTIONS,
      payload: date,
    });
  }, [dispatch, dateOfMeal]);

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth>
      <DialogTitle>Select a Meal</DialogTitle>

      <Divider />
      <DialogContent>
        {!activeType && (
          <>
            <DatePicker
              value={dateOfMeal}
              onChange={setDateOfMeal}
              label="Pick another day"
            />

            <Grid item xs={12} md={6}>
              <List>
                {mealOptions.map((mealOption, index) => (
                  <div key={mealOption._doc.type}>
                    {index > 0 && <Divider />}
                    <MealHeader
                      calories={mealOption.totalCalories}
                      displayName={mealOption._doc.displayName}
                      onClick={() => setActiveType(mealOption._doc.type)}
                    />
                  </div>
                ))}
              </List>
            </Grid>
          </>
        )}
        {activeType && (
          <Meal
            date={dateOfMeal.toDate().toLocaleDateString("en-GB")}
            mealType={activeType}
            onDone={() => setActiveType("")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
