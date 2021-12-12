import { useState } from "react";
import { AdjustmentInput, Controls, Label } from "./AdjustCash.styles";

const AdjustCash = ({ onChange }) => {
  const [adjustmentInput, setAdjustmentInput] = useState("");

  return (
    <>
      <Label>Adjust Cash</Label>
      <Controls>
        <AdjustmentInput
          type="text"
          value={adjustmentInput}
          maxLength={6}
          onChange={(e) => {
            setAdjustmentInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (
              ![8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57].includes(e.keyCode)
            ) {
              e.preventDefault();
            }
          }}
        />
        <input
          type="button"
          value="-"
          onClick={() => {
            onChange(-parseInt(adjustmentInput));
            setAdjustmentInput("");
          }}
        />
        <input
          type="button"
          value="+"
          onClick={() => {
            onChange(parseInt(adjustmentInput));
            setAdjustmentInput("");
          }}
        />
      </Controls>
    </>
  );
};

export default AdjustCash;
