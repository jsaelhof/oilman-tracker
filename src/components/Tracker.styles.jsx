import styled from "styled-components";

export const Player = styled.div`
  border: 1px solid grey;
  border-radius: 8px;
  padding: 16px;
  width: 240px;
  height: fit-content;
`;

export const PlayerName = styled.div`
  font-weight: bold;
`;

export const PlayerStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 0 24px;
`;

export const ActionsLayout = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
`;

export const TwoColumnLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ColumnLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
