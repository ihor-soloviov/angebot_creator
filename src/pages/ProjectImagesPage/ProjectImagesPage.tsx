import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

import "./ProjectImagesPage.scss";
import { dragLeaveHandler, dragStartHandler } from "../../utils/dragFunctions";


export const ProjectImagesPage: React.FC = () => {
  const [drag, setDrag] = useState(false)
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
