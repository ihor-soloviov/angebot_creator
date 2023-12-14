import React, { useState } from "react";
import { ImageTable } from "../ImageTable";
import { dragLeaveHandler, dragStartHandler } from "../../utils/dragFunctions";
import classNames from "classnames";
import img from "../../assets/addMainImg.png"
import dragSuccess from "../../assets/dragSuccess.svg"
import "./ImageWithTableBlock.scss";

export const ImageWithTableBlock: React.FC = () => {
  const [drag, setDrag] = useState(false);
  const [icon, setIcon] = useState(img);
  const [dragtext, setDragtext] = useState('Перетяните изображение');

  const onDragHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];

    const allowedExtensions = ['.png', 'jpg'];
    const isFileValid = allowedExtensions.some(ext => files[0].name.endsWith(ext));

    if (!isFileValid) {
      console.log("Неприпустимий формат файлу. Будь ласка, оберіть файл з розширенням .png, jpg");
      setDrag(false);
      return;
    }

    const formData = new FormData();
    formData.append("mainImg", files[0])
    setIcon(dragSuccess)
    setDragtext('Фото успешно загружено')
    console.log(formData)
    setDrag(false)
  }

  return (
    <div className="imageWithTable">
      <ImageTable />
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
}
