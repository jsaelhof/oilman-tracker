import { format } from "../utils/format";
import Button from "./Button";

const CashButton = ({ level, cash, ...props }) => (
  <Button key={level} {...props}>
    <>
      <div>{level}</div>
      <div>{format(cash)}</div>
    </>
  </Button>
);

export default CashButton;
