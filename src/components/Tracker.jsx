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
import AdjustCash from "./AdjustCash";
import BackButton from "./BackButton";
import Button from "./Button";
import CashButton from "./CashButton";
import {
  PlayerStats,
  Player,
  PlayerName,
  TwoColumnLayout,
  ColumnLayout,
  ActionsLayout,
} from "./Tracker.styles";

export const Tracker = ({ name }) => {
  const [gamePhase, setGamePhase] = useState(phase.COLLECT_SALARY);
  const [cash, setCash] = useState(100000);
  const [salary, setSalary] = useState(5000);
  const [drillLevel, setDrillLevel] = useState();

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
    <Player>
      <PlayerName>{name}</PlayerName>
      <PlayerStats>
        <div>Cash: {format(cash)}</div>
        <div>Salary: {format(salary)}</div>
        <div>Net Worth: {format(cash + salary * 10)}</div>
      </PlayerStats>

      {gamePhase === phase.COLLECT_SALARY && (
        <ActionsLayout>
          <Button
            onClick={() => {
              setCash(cash + salary);
              setGamePhase(phase.DRILL);
            }}
          >
            Collect Salary
          </Button>

          <AdjustCash onChange={(adjustment) => setCash(cash + adjustment)} />
        </ActionsLayout>
      )}

      {gamePhase === phase.DRILL && (
        <ActionsLayout>
          <TwoColumnLayout>
            <ColumnLayout>
              <div>{ON_LAND}</div>
              {Object.keys(drillCosts[ON_LAND]).map((level) =>
                buildDrillButton(level, ON_LAND)
              )}
            </ColumnLayout>

            <ColumnLayout>
              <div>{OFF_SHORE}</div>
              {Object.keys(drillCosts[OFF_SHORE]).map((level) =>
                buildDrillButton(level, OFF_SHORE)
              )}
            </ColumnLayout>
          </TwoColumnLayout>

          <BackButton
            onClick={() => {
              setGamePhase(phase.COLLECT_SALARY);
              setCash(cash - salary);
            }}
          />
        </ActionsLayout>
      )}

      {gamePhase === phase.ADJUST_SALARY && (
        <ActionsLayout>
          <TwoColumnLayout>
            {/* 
            If the player is drilling 1st-to-3rd or Full Depth, then they can hit any of the 
            three levels and get the corresponding salary. In this case, show 3 buttons.
           */}
            <ColumnLayout>
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
            </ColumnLayout>

            <ColumnLayout>
              <Button
                onClick={() => {
                  setGamePhase(phase.COLLECT_SALARY);
                }}
              >
                Dry
              </Button>
            </ColumnLayout>
          </TwoColumnLayout>

          <BackButton
            onClick={() => {
              setGamePhase(phase.DRILL);
              setCash(cash + drillCosts[drillLevel.surface][drillLevel.level]);
            }}
          />
        </ActionsLayout>
      )}
    </Player>
  );
};
