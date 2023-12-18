import React, { useEffect, useState } from "react";
import { ImageTable } from "../ImageTable";
import { dragLeaveHandler, dragStartHandler } from "../../utils/dragFunctions";
import classNames from "classnames";
import img from "../../assets/addMainImg.png"
import dragSuccess from "../../assets/dragSuccess.svg"
import dragError from "../../assets/dragError.svg"
import "./ImageWithTableBlock.scss";
import { PictureWithTable } from "../../pages/ProjectImagesPage";

export interface TableData {
  Neigung: string
  Azimut: string
  Unterkonstruktion: string
  Modulanzahl: string
  Modulaufständerung?: string
}

interface Props {
  setPicturesWithTables: (value: PictureWithTable[] | ((prev: PictureWithTable[]) => PictureWithTable[])) => void;
}

export const ImageWithTableBlock: React.FC<Props> = React.memo(({ setPicturesWithTables }) => {
  const [drag, setDrag] = useState(false);
  const [icon, setIcon] = useState(img);
  const [dragtext, setDragtext] = useState('Перетяните изображение');
  const [addedImage, setAddedImage] = useState<File | null>(null)
  const [tableData, setTableData] = useState<TableData | null>(null)

  const onDragHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];

    const allowedExtensions = ['.png', '.PNG', 'JPG', 'jpg'];
    const isFileValid = allowedExtensions.some(ext => files[0].name.endsWith(ext));

    if (!isFileValid) {
      console.log("Неприпустимий формат файлу. Будь ласка, оберіть файл з розширенням .png, jpg");
      setDrag(false);
      setIcon(dragError)
      setDragtext("Неприпустимий формат файлу. Будь ласка, оберіть файл з розширенням .png, jpg")
      return;
    }

    setAddedImage(files[0])
    setIcon(dragSuccess)
    setDragtext('Фото успешно загружено')
    setDrag(false)
  }

  useEffect(() => {
    if (addedImage && tableData) {
      setPicturesWithTables(prev => [...prev, { picture: addedImage, tableData: tableData }])
    }
  }, [addedImage, tableData, setPicturesWithTables])


  return (
    <div className="imageWithTable">
      <ImageTable setTableData={setTableData} tableData={tableData} />
      <div className="image__block">
        {drag
          ? <div
            onDragStart={(e) => dragStartHandler(e, setDrag)}
            onDragLeave={(e) => dragLeaveHandler(e, setDrag)}
            onDragOver={(e) => dragStartHandler(e, setDrag)}
            onDrop={(e) => onDragHandler(e)}
            className={classNames("dragWindow", "dragWindow-small", { drag: drag })}

          >
            <img src={icon} alt="..." />
            <p>{dragtext}</p>
          </div>
          : <div
            onDragStart={(e) => dragStartHandler(e, setDrag)}
            onDragLeave={(e) => dragLeaveHandler(e, setDrag)}
            onDragOver={(e) => dragStartHandler(e, setDrag)}
            className={classNames("dragWindow", "dragWindow-small", { drag: drag })}
          >
            <img src={icon} alt="..." />
            <p>{dragtext}</p>
          </div>
        }
      </div>
    </div>
  );
})
