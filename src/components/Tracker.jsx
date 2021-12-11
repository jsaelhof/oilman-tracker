import { useState } from "react";

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
    [L1_TO_3]: 50000,
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

const PHASE = {
  COLLECT_SALARY: 0,
  DRILL: 1,
  ADJUST_SALARY: 2,
};

const format = (val) => `$${val / 1000}k`;

const buildButton = (label, onClick, key, disabled = false) => (
  <button
    key={key}
    onClick={onClick}
    style={{
      margin: 8,
      minWidth: 100,
      whiteSpace: "normal",
    }}
    disabled={disabled}
  >
    {label}
  </button>
);

export const Tracker = ({ name }) => {
  const [phase, setPhase] = useState(PHASE.COLLECT_SALARY);
  const [cash, setCash] = useState(100000);
  const [salary, setSalary] = useState(5000);
  const [drillLevel, setDrillLevel] = useState();
  const [adjustmentInput, setAdjustmentInput] = useState("");

  const buildDrillButton = (level, surface) =>
    buildButton(
      <>
        <div>{level}</div>
        <div>${drillCosts[surface][level]}</div>
      </>,
      () => {
        setCash(cash - drillCosts[surface][level]);
        setDrillLevel({ level, surface });
        setPhase(PHASE.ADJUST_SALARY);
      },
      level,
      drillCosts[surface][level] > cash
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

      {phase === PHASE.COLLECT_SALARY && (
        <div>
          {buildButton("Collect Salary", () => {
            setCash(cash + salary);
            setPhase(PHASE.DRILL);
          })}
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

      {phase === PHASE.DRILL && (
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
            {buildButton("Back", () => {
              setPhase(PHASE.COLLECT_SALARY);
              setCash(cash - salary);
            })}
          </div>
        </>
      )}

      {phase === PHASE.ADJUST_SALARY && (
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
              ).map((level) =>
                buildButton(
                  <>
                    <div>Hit - {level}</div>
                    <div>${salaryAdjustments[drillLevel.surface][level]}</div>
                  </>,
                  () => {
                    setSalary(
                      salary + salaryAdjustments[drillLevel.surface][level]
                    );
                    setPhase(PHASE.COLLECT_SALARY);
                  }
                )
              )}
            </div>

            <div>
              {buildButton("Dry", () => {
                setPhase(PHASE.COLLECT_SALARY);
              })}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            {buildButton("Back", () => {
              setPhase(PHASE.DRILL);
              setCash(cash + drillCosts[drillLevel.surface][drillLevel.level]);
            })}
          </div>
        </>
      )}
    </div>
  );
};
