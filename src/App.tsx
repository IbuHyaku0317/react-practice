import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Load from "./pages/load.tsx";
import Save from "./pages/save.tsx";
import { IgrExcelModule } from "igniteui-react-excel";
import { IgrSpreadsheetModule } from "igniteui-react-spreadsheet";
import Edit from "./pages/append.tsx";

import MyCalendar from "./pages/GantScheduler/Gant.tsx";
import Box from "./pages/box.jsx";
import Boxlike from "./pages/box.jsx";
IgrExcelModule.register();
IgrSpreadsheetModule.register();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Load />} />
        <Route path="/save" element={<Save />} />
        <Route path="/append" element={<Edit />} />
        <Route path="/aiueo" element={<MyCalendar />} />
        <Route path="/box" element={<Boxlike />} />
      </Routes>
    </Router>
  );
}

export default App;
