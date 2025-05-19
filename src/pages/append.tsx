import React, { useState, useEffect, useRef } from "react";
import { IgrSpreadsheet } from "igniteui-react-spreadsheet";
import { ExcelUtility } from "../ExcelUtility";

export default function Edit() {
  const spreadsheetRef = useRef<IgrSpreadsheet>(null);
  const [cell, setCell] = useState("A1");
  const [value, setValue] = useState("");

  useEffect(() => {
    ExcelUtility.loadFromUrl("react-excel-file.xlsx").then((workbook) => {
      spreadsheetRef.current!.workbook = workbook;
    });
  }, []);
  const handleUpdate = () => {
    if (spreadsheetRef.current) {
      const workbook = spreadsheetRef.current.workbook;
      const sheet = workbook.worksheets(0);

      const match = cell.match(/^([A-Z]+)(\d+)$/);
      if (!match) {
        alert("正しいセルの形式を入力してください");
        return;
      }

      const col = match[1].charCodeAt(0) - 65;
      const row = parseInt(match[2], 10) - 1;
      sheet.rows(row).cells(col).value = value;
    }
  };
  const handleSave = () => {
    if (spreadsheetRef.current) {
      ExcelUtility.save(spreadsheetRef.current.workbook, "react-excel-file");
    }
  };

  return (
    <>
      <h2>Excel編集</h2>
      <div style={{ height: "700px", width: "1000px" }}>
        <IgrSpreadsheet height="100%" ref={spreadsheetRef} />
      </div>
      <input
        type="text"
        placeholder="セル (例: A1)"
        value={cell}
        onChange={(e) => setCell(e.target.value)}
      />
      <input
        type="text"
        placeholder="入力する値"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleUpdate}>Excelに値を入力</button>
      <button onClick={handleSave}>Excelを保存</button>
    </>
  );
}
