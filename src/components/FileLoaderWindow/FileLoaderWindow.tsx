import React, { useState } from "react";
import axios from "axios";
import dragSvg from "../../assets/dragIcon.svg";
import dragError from "../../assets/dragError.svg";
import dragInvalid from "../../assets/dragInvalid.svg";
import dragSuccess from "../../assets/dragSuccess.svg"
import "./FileLoaderWindow.scss";
import classNames from "classnames";

export const FileLoaderWindow: React.FC = () => {
  const [drag, setDrag] = useState(false);
  const [dragIcon, setDragIcon] = useState<string>(dragSvg);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true)
  }

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false)
  }

  const onDragHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];

    const allowedExtensions = ['.doc', '.docx'];
    const isFileValid = allowedExtensions.some(ext => files[0].name.endsWith(ext));

    if (!isFileValid) {
      console.log("Неприпустимий формат файлу. Будь ласка, оберіть файл з розширенням .doc або .docx.");
      setDragIcon(dragInvalid);
      setDrag(false);
      return;
    }

    const formData = new FormData();
    formData.append("docxFile", files[0])
    const result = await axios.post('http://185.25.119.143:8082/sendFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      }
    })

    if (result.status === 200) {
      setDragIcon(dragSuccess)
    } else {
      setDragIcon(dragError)
    }
    console.log(result)
    setDrag(false)
  }

  return (
    <div className="fileLoaderWindow">
      <h3>Загрузите отчет PVSOL</h3>

      {drag
        ? <div
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          onDrop={(e) => onDragHandler(e)}
          className={classNames("dragWindow", { drag: drag })}
        >
          <img src={dragIcon} alt="draggggs" />
        </div>
        : <div
          onDragStart={(e) => dragStartHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragOver={(e) => dragStartHandler(e)}
          className={classNames("dragWindow", { drag: drag })}
        >
          <img src={dragIcon} alt="draggggs" />
        </div>
      }
    </div>
  );
}
