import { useState } from "react";
import {
  drillCosts,
  FULL_DEPTH,
  L1,
  L2,
  L3,
  L1_TO_3,
  OFF_SHORE,
  ON_LAND,
  phase,
  salaryAdjustments,
} from "../constants/game";
import { format } from "../utils/format";
import BackButton from "./BackButton";
import Button from "./Button";
import CashButton from "./CashButton";

export const Tracker = ({ name }) => {
  const [gamePhase, setGamePhase] = useState(phase.COLLECT_SALARY);
  const [cash, setCash] = useState(100000);
  const [salary, setSalary] = useState(5000);
  const [drillLevel, setDrillLevel] = useState();
  const [adjustmentInput, setAdjustmentInput] = useState("");

  const buildDrillButton = (level, surface) => (
    <CashButton
      level={level}
      cash={drillCosts[surface][level]}
      onClick={() => {
        setCash(cash - drillCosts[surface][level]);
        setDrillLevel({ level, surface });
        setGamePhase(phase.ADJUST_SALARY);
      }}
      disabled={drillCosts[surface][level] > cash}
    />
  );

  return (
    <div
      style={{
        border: "1px solid grey",
        borderRadius: 8,
        padding: 16,
        width: 240,
        height: "fit-content",
      }}
    >
      <div style={{ fontWeight: "bold" }}>{name}</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          margin: "16px 0 24px",
        }}
      >
        <div>Cash: {format(cash)}</div>
        <div>Salary: {format(salary)}</div>
        <div>Net Worth: {format(cash + salary * 10)}</div>
      </div>

      {gamePhase === phase.COLLECT_SALARY && (
        <div>
          <Button
            onClick={() => {
              setCash(cash + salary);
              setGamePhase(phase.DRILL);
            }}
          >
            Collect Salary
          </Button>
          <div style={{ fontSize: 12, margin: "24px 0 4px" }}>Adjust Cash</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              value={adjustmentInput}
              maxLength={6}
              style={{ width: 50 }}
              onChange={(e) => {
                setAdjustmentInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (
                  ![8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57].includes(
                    e.keyCode
                  )
                ) {
                  e.preventDefault();
                }
              }}
            />
            <input
              type="button"
              value="-"
              onClick={() => {
                setCash(cash - parseInt(adjustmentInput));
                setAdjustmentInput("");
              }}
            />
            <input
              type="button"
              value="+"
              onClick={() => {
                setCash(cash + parseInt(adjustmentInput));
                setAdjustmentInput("");
              }}
            />
          </div>
        </div>
      )}

      {gamePhase === phase.DRILL && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>{ON_LAND}</div>
              {Object.keys(drillCosts[ON_LAND]).map((level) =>
                buildDrillButton(level, ON_LAND)
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
              {Object.keys(drillCosts[OFF_SHORE]).map((level) =>
                buildDrillButton(level, OFF_SHORE)
              )}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <BackButton
              onClick={() => {
                setGamePhase(phase.COLLECT_SALARY);
                setCash(cash - salary);
              }}
            />
          </div>
        </>
      )}

      {gamePhase === phase.ADJUST_SALARY && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/* 
            If the player is drilling 1st-to-3rd or Full Depth, then they can hit any of the 
            three levels and get the corresponding salary. In this case, show 3 buttons.
           */}
            <div>
              {([L1_TO_3, FULL_DEPTH].includes(drillLevel.level)
                ? [L1, L2, L3]
                : [drillLevel.level]
              ).map((level) => (
                <CashButton
                  level={`Hit - ${level}`}
                  cash={salaryAdjustments[drillLevel.surface][level]}
                  onClick={() => {
                    setSalary(
                      salary + salaryAdjustments[drillLevel.surface][level]
                    );
                    setGamePhase(phase.COLLECT_SALARY);
                  }}
                />
              ))}
            </div>

            <div>
              <Button
                onClick={() => {
                  setGamePhase(phase.COLLECT_SALARY);
                }}
              >
                Dry
              </Button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <BackButton
              onClick={() => {
                setGamePhase(phase.DRILL);
                setCash(
                  cash + drillCosts[drillLevel.surface][drillLevel.level]
                );
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
