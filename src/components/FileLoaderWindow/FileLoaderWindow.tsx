import React, { useState } from "react";
import axios from "axios";
import dragSvg from "../../assets/dragIcon.svg";
import dragError from "../../assets/dragError.svg";
import dragInvalid from "../../assets/dragInvalid.svg";
import dragSuccess from "../../assets/dragSuccess.svg"
import docIcon from "../../assets/docIcon.svg";
import "./FileLoaderWindow.scss";
import classNames from "classnames";
import { dragLeaveHandler, dragStartHandler } from "../../utils/dragFunctions";

interface LoadedFile {
  name: string
  size: string
}

interface Props {
  setIsDisabled: (value: boolean) => void
}

export const FileLoaderWindow: React.FC<Props> = ({ setIsDisabled }) => {
  const [drag, setDrag] = useState(false);
  const [dragIcon, setDragIcon] = useState<string>(dragSvg);
  const [dragtext, setDragtext] = useState('Перетащите сюда DOCX файл');
  const [loadedFileInfo, setLoadedFileInfo] = useState<LoadedFile | null>(null);



  const onDragHandler = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    console.log(files[0])

    const allowedExtensions = ['.doc', '.docx'];
    const isFileValid = allowedExtensions.some(ext => files[0].name.endsWith(ext));

    if (!isFileValid) {
      console.log("Неприпустимий формат файлу. Будь ласка, оберіть файл з розширенням .doc або .docx.");
      setDragIcon(dragInvalid);
      setDragtext('Документ не соответствует шаблону')
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
      setDragIcon(dragSuccess);
      setDragtext('Данные были успешно загружены');
      setLoadedFileInfo({ name: files[0].name, size: "1.7MB" });
      setIsDisabled(false)
    } else {
      setDragIcon(dragError)
      setDragtext('При загрузке данных возникла ошибка. Пожалуйста, повторите попытку позже')
    }
    console.log(result)
    setDrag(false)
  }

  return (
    <div className="fileLoaderWindow__inner">

      <div className="fileLoaderWindow">
        <h3>Загрузите отчет PVSOL</h3>

        {drag
          ? <div
            onDragStart={(e) => dragStartHandler(e, setDrag)}
            onDragLeave={(e) => dragLeaveHandler(e, setDrag)}
            onDragOver={(e) => dragStartHandler(e, setDrag)}
            onDrop={(e) => onDragHandler(e)}
            className={classNames("dragWindow", { drag: drag })}
          >
            <img src={dragIcon} alt="draggggs" />
            <p>{dragtext}</p>
          </div>
          : <div
            onDragStart={(e) => dragStartHandler(e, setDrag)}
            onDragLeave={(e) => dragLeaveHandler(e, setDrag)}
            onDragOver={(e) => dragStartHandler(e, setDrag)}
            className={classNames("dragWindow", { drag: drag })}
          >
            <img src={dragIcon} alt="draggggs" />
            <p>{dragtext}</p>
          </div>
        }

        {loadedFileInfo && (
          <div className="loadedFile">
            <div className="loadedFile__icon">
              <img src={docIcon} alt="loaded file" />
            </div>
            <div className="loadedFile__info">
              <p className="file__name">{loadedFileInfo.name}</p>
              <p className="file__size">{loadedFileInfo.size}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
