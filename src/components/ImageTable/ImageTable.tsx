import React, { useEffect, useState } from "react";
import "./ImageTable.scss";
import { TableRow } from "../TableRow";
import { PlusButton } from "../PlusButton";

export interface TableData {
  Neigung: string
  Azimut: string
  Unterkonstruktion: string
  Modulanzahl: string
  Modulaufständerung?: string
}



export const ImageTable: React.FC = () => {
  const [tabelData, setTabelData] = useState<TableData | null>(null)
  const [rowNames, setRowNames] = useState(["Neigung", "Azimut", "Unterkonstruktion", "Modulanzahl"])

  const addRowToData = (rowName: string, objectValue: string) => {
    setTabelData(prev => {
      return { ...prev, [rowName]: objectValue }
    })
  }

  const addAdditionalRow = () => {
    rowNames.length === 4 && setRowNames(prev => [...prev, 'Modulaufständerung'])
  }

  useEffect(() => {
    console.log(tabelData)
  }, [tabelData])

  
  return (
    <div className="table__block">
      <div className="table-head">
        <p>Column 1</p>
        <p>Column 2</p>
      </div>
      {rowNames.map(rowName => (
        <TableRow key={rowName} rowName={rowName} addRow={addRowToData} />
      ))}
      <div className="table-button">
        <PlusButton handler={addAdditionalRow} />
        <p>Добавить поле</p>
      </div>
    </div>
  );
}
