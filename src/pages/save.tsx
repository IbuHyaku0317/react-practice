import {
  CellFill,
  Workbook,
  WorkbookFormat,
  WorkbookSaveOptions,
} from "igniteui-react-excel";
import { saveAs } from "file-saver";

export default function Save() {
  return (
    <>
      <h2>編集・出力</h2> <button>ダウンロード</button>
    </>
  );
}
