import { useState } from "react";
import { map } from "lodash";
import { formatMoney } from "accounting-js";

const L1 = "Level 1";
const L2 = "Level 2";
const L3 = "Level 3";
const L1_TO_3 = "1st to 3rd";
const FULL_DEPTH = "Full Depth";
const ON_LAND = "On Land";
const OFF_SHORE = "Off Shore";

const drillCosts = {
  [ON_LAND]: {
    [L1]: 5000,
    [L2]: 15000,
    [L3]: 30000,
    [L1_TO_3]: 45000,
    [FULL_DEPTH]: 75000,
  },
  [OFF_SHORE]: {
    [L1]: 15000,
    [L2]: 30000,
    [L3]: 45000,
    [L1_TO_3]: 85000,
    [FULL_DEPTH]: 125000,
  },
};

const salaryAdjustments = {
  [ON_LAND]: {
    [L1]: 2000,
    [L2]: 5000,
    [L3]: 10000,
  },
  [OFF_SHORE]: {
    [L1]: 5000,
    [L2]: 10000,
    [L3]: 15000,
  },
};

const buildButton = (value, onClick, key, disabled = false) => (
  <input
    key={key}
    type="button"
    value={value}
    onClick={onClick}
    style={{ margin: 8, minWidth: 100 }}
    disabled={disabled}
  />
);

export const Tracker = ({ name }) => {
  const [phase, setPhase] = useState(0);
  const [cash, setCash] = useState(100000);
  const [salary, setSalary] = useState(5000);
  const [pendingAdjustment, setPendingAjustment] = useState();

  const buildDrillButton = (cost, level, adjustment) =>
    buildButton(
      `${level}`,
      () => {
        setCash(cash - cost);
        setPendingAjustment(adjustment);
        setPhase(2);
      },
      level,
      cost > cash
    );

  return (
    <div
      style={{
        border: "1px solid grey",
        borderRadius: 8,
        padding: 16,
        width: "fit-content",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{name}</div>
      <div style={{ display: "flex", gap: 16, margin: `${8}px 0 ${16}px` }}>
        <div>Cash: {formatMoney(cash)}</div>
        <div>Salary: {formatMoney(salary)}</div>
      </div>

      {phase === 0 && (
        <div>
          {buildButton("Collect Salary", () => {
            setCash(cash + salary);
            setPhase(1);
          })}
        </div>
      )}

      {phase === 1 && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>{ON_LAND}</div>
            {map(drillCosts[ON_LAND], (cost, level) =>
              buildDrillButton(cost, level, salaryAdjustments[ON_LAND][level])
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>{OFF_SHORE}</div>
            {map(drillCosts[OFF_SHORE], (cost, level) =>
              buildDrillButton(cost, level, salaryAdjustments[OFF_SHORE][level])
            )}
          </div>
        </div>
      )}

      {phase === 2 && (
        <div>
          <div>
            {buildButton("Hit", () => {
              setSalary(salary + pendingAdjustment);
              setPhase(0);
            })}

            {buildButton("Dry", () => {
              setPhase(0);
            })}
          </div>
        </div>
      )}
    </div>
  );
};
