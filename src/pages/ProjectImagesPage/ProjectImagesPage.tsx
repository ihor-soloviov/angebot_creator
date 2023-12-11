import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import img from "../../assets/addMainImg.png"

import { dragLeaveHandler, dragStartHandler } from "../../utils/dragFunctions";
import classNames from "classnames";
import "./ProjectImagesPage.scss";


export const ProjectImagesPage: React.FC = () => {

  const [drag, setDrag] = useState(false);

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
    alert(formData)
    setDrag(false)
  }

  return (
    <div className="projectImagesPage">
      <Header />
      <div className="projectImagesPage__container">
        <div className="mainImageAdder">
          <h3>Загрузите изображение</h3>
          {drag
            ? <div
              onDragStart={(e) => dragStartHandler(e, setDrag)}
              onDragLeave={(e) => dragLeaveHandler(e, setDrag)}
              onDragOver={(e) => dragStartHandler(e, setDrag)}
              onDrop={(e) => onDragHandler(e)}
              className={classNames("dragWindow", { drag: drag })}

            >
              <img src={img} alt="..." />
              <p>Перетяните изображение</p>
            </div>
            : <div
              onDragStart={(e) => dragStartHandler(e, setDrag)}
              onDragLeave={(e) => dragLeaveHandler(e, setDrag)}
              onDragOver={(e) => dragStartHandler(e, setDrag)}
              className={classNames("dragWindow", { drag: drag })}
            >
              <img src={img} alt="..." />
              <p>Перетяните изображение</p>
            </div>
          }
        </div>
        <div className="imageWithTable">
          <div className="table__block">
            <div className="table-head">
              <p>Column 1</p>
              <p>Column 2</p>
            </div>
            <div className="table-row">
              <input type="text" placeholder="Text" />
              <input type="text" placeholder="Text" />
            </div>
            <div className="table-row">
              <input type="text" placeholder="Text" />
              <input type="text" placeholder="Text" />
            </div>
            <div className="table-row">
              <input type="text" placeholder="Text" />
              <input type="text" placeholder="Text" />
            </div>
            <div className="table-row">
              <input type="text" placeholder="Text" />
              <input type="text" placeholder="Text" />
            </div>
          </div>
          <div className="image__block">
            {drag
              ? <div
                onDragStart={(e) => dragStartHandler(e, setDrag)}
                onDragLeave={(e) => dragLeaveHandler(e, setDrag)}
                onDragOver={(e) => dragStartHandler(e, setDrag)}
                onDrop={(e) => onDragHandler(e)}
                className={classNames("dragWindow", { drag: drag })}

              >
                <img src={img} alt="..." />
                <p>Перетяните изображение</p>
              </div>
              : <div
                onDragStart={(e) => dragStartHandler(e, setDrag)}
                onDragLeave={(e) => dragLeaveHandler(e, setDrag)}
                onDragOver={(e) => dragStartHandler(e, setDrag)}
                className={classNames("dragWindow", { drag: drag })}
              >
                <img src={img} alt="..." />
                <p>Перетяните изображение</p>
              </div>
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
