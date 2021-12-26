import { useState } from "react";
import Button from "./Button";
import { AuctionInput } from "./DrawNewLand.styles";

const DrawNewLand = ({ onClick }) => {
  const [auctionAmount, setAuctionInput] = useState();

  return (
    <div>
      <AuctionInput
        type="text"
        value={auctionAmount}
        maxLength={6}
        onChange={(e) => {
          setAuctionInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (
            ![8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57].includes(e.keyCode)
          ) {
            e.preventDefault();
          }
        }}
      />
      <Button
        onClick={() => {
          const val = parseInt(auctionAmount);
          if (!isNaN(val)) {
            onClick(val);
            setAuctionInput("");
          }
        }}
      >
        Draw New Land
      </Button>
    </div>
  );
};

export default DrawNewLand;
