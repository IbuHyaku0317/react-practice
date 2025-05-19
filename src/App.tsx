import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Load from "./pages/load.tsx";
import Save from "./pages/save.tsx";
import { IgrExcelModule } from "igniteui-react-excel";
import { IgrSpreadsheetModule } from "igniteui-react-spreadsheet";
import Edit from "./pages/append.tsx";

IgrExcelModule.register();
IgrSpreadsheetModule.register();

function App() {
  return (
    <Router>
      <Link to="/">読み込み</Link>
      <br />
      <Link to="/save">編集・出力</Link>
      <br />
      <Link to="/append">追加</Link>

      <Routes>
        <Route path="/" element={<Load />} />
        <Route path="/save" element={<Save />} />
        <Route path="/append" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
