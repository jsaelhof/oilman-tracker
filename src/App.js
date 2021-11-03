import "./App.css";
import { Tracker } from "./components/Tracker";

function App() {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 24 }}>Oilman Tracker</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Tracker name="Jason" />
        <Tracker name="Lisa" />
        <Tracker name="Ashlyn" />
        <Tracker name="Cole" />
      </div>
    </div>
  );
}

export default App;
