import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

import "./ProjectImagesPage.scss";
import { ImageWithTableBlock } from "../../components/ImageWithTableBlock";
import { MainImageAdder } from "../../components/MainImageAdder";
import { PlusButton } from "../../components/PlusButton";


export const ProjectImagesPage: React.FC = () => {
  const [imageWithTable, setImageWithTable] = useState([{ id: 1 }])

  const addNewItem = () => {
    setImageWithTable(prev => {
      const lastItem = prev.length - 1;
      const nextId = prev[lastItem].id + 1;

      return [...prev, { id: nextId }]
    })
  }

  return (
    <div className="projectImagesPage">
      <Header />
      <div className="projectImagesPage__container">
        <MainImageAdder />
        {imageWithTable.map(el =>
          (<ImageWithTableBlock key={el.id} />)
        )}
        <div className="projectImagesPage__plusButton">
          <PlusButton handler={addNewItem} />
          <p>Добавить фото</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
