import React from "react";
import ManualAdjustment from "./ManualAdjustment";
import { Divider, Label } from "./ManualAdjustments.styles";

const ManualAdjustments = ({ onAdjustCash, onAdjustSalary }) => (
  <div>
    <Divider />
    <Label>Manual Adjustments</Label>
    <ManualAdjustment label="Cash" onChange={onAdjustCash} />
    <ManualAdjustment label="Salary" onChange={onAdjustSalary} />
  </div>
);

export default ManualAdjustments;
