export const L1 = "Level 1";
export const L2 = "Level 2";
export const L3 = "Level 3";
export const L1_TO_3 = "1st to 3rd";
export const FULL_DEPTH = "Full Depth";
export const ON_LAND = "On Land";
export const OFF_SHORE = "Off Shore";

export const drillCosts = {
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

export const salaryAdjustments = {
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

export const phase = {
    COLLECT_SALARY: 0,
    DRILL: 1,
    ADJUST_SALARY: 2,
  };