import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { closeDialog } from "../../../features/user/dialogSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/typed-redux";
import { Meal } from "./Meal/Meal";
import { MealHeader } from "./MealHeader/MealHeader";
import {DatePicker} from "../../../shared-components/DatePicker"
import moment from "moment";

export const MealLogDialog = () => {
  const { isOpen } = useAppSelector((state) => state.dialog);
  const { mealOptions } = useAppSelector((state) => state.meal);
  const [activeType, setActiveType] = useState("");
  const [dateOfMeal, setDateOfMeal] = useState(moment().startOf('day'));
  const dispatch = useAppDispatch();
  

  const handleClose = useCallback(() => dispatch(closeDialog()), [dispatch]);
console.log(dateOfMeal.toDate().toISOString().slice(0, 10));
  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth>
      <DialogTitle>Select a Meal</DialogTitle>
      
      <Divider />
      <DialogContent>
        {!activeType && (<>
          <DatePicker 
                    value={dateOfMeal}
                    onChange={setDateOfMeal}
                    label="Pick another day"
                />
                
          <Grid item xs={12} md={6}>
            <List>
              {mealOptions.map((mealOption, index) => (
                <div key={mealOption.type}>
                  {index > 0 && <Divider />}
                  <MealHeader
                    displayName={mealOption.displayName}
                    onClick={() => setActiveType(mealOption.type)}
                  />
                </div>
              ))}
            </List>
          </Grid>
          </>
        )}
        {activeType && (
          <Meal date={dateOfMeal.toDate().toISOString().slice(0, 10)} mealType={activeType} onDone={() => setActiveType("")} />
        )}
      </DialogContent>
    </Dialog>
  );
};
