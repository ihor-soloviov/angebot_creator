import React, { useState } from "react";
import "./TableRow.scss";

interface Props {
  addRow: (rowName: string, objectValue: string) => void
  rowName: string
}


export const TableRow: React.FC<Props> = ({ rowName, addRow }) => {
  const [objectValue, setObjectValue] = useState('');

  const addValueToRowData = () => {
    addRow(rowName, objectValue)
  }


  return (
    <div className="table-row">
      <p>{rowName}</p>
      <input value={objectValue} onChange={(e) => setObjectValue(e.target.value)} onBlur={addValueToRowData} type="text" placeholder="Text" />
    </div>
  );
}
