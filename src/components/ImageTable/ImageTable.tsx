import React, { useEffect, useState } from "react";
import "./ImageTable.scss";
import { TableRow } from "../TableRow";
import { PlusButton } from "../Inputs/PlusButton";
import { TableData } from "../ImageWithTableBlock";

interface Props {
  tableData: TableData | null
  setTableData: React.Dispatch<React.SetStateAction<TableData | null>>
}

export const ImageTable: React.FC<Props> = React.memo(({ setTableData, tableData }) => {

  const [rowNames, setRowNames] = useState(["Neigung", "Azimut", "Unterkonstruktion", "Modulanzahl"])

  const addRowToData = (rowName: string, objectValue: string) => {
    setTableData(prev => {
      // Перевірка, чи попередній стан є визначеним
      const newData: TableData = prev ? { ...prev } : {
        Neigung: '',
        Azimut: '',
        Unterkonstruktion: '',
        Modulanzahl: '',
        Modulaufständerung: ''
      };

      // Додавання або оновлення значення
      newData[rowName as keyof TableData] = objectValue;

      return newData;
    });
  };

  const addAdditionalRow = () => {
    rowNames.length === 4 && setRowNames(prev => [...prev, 'Modulaufständerung'])
  }

  useEffect(() => {
    console.log(tableData)
  }, [tableData])


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
})
