import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

import "./ProjectImagesPage.scss";
import { ImageWithTableBlock, TableData } from "../../components/ImageWithTableBlock";
import { MainImageAdder } from "../../components/MainImageAdder";
import { PlusButton } from "../../components/PlusButton";
import { ButtonNext } from "../../components/ButtonNext";
import { uploadMainImage } from "../../utils/sendDataToGenerator";

export interface ProjectPhoto {
  [key: string]: File
}

export interface PictureWithTable {
  picture: File;
  tableData: TableData;
}


export const ProjectImagesPage: React.FC = React.memo(() => {
  // const { setMainProjectPhoto, setPictureWithTableArray } = picturesStore;
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [picturesWithTables, setPicturesWithTables] = useState<PictureWithTable[]>([])
  const [imageWithTable, setImageWithTable] = useState([{ id: 1 }])

  const addNewItem = () => {
    setImageWithTable(prev => {
      const lastItem = prev.length - 1;
      const nextId = prev[lastItem].id + 1;

      return [...prev, { id: nextId }]
    })
  }



  const storageSetter = () => {
    const angebotInfo = JSON.parse(sessionStorage.getItem('angebotType') || "")
    if (angebotInfo === "") {
      throw new Error('не існує ангебот інфо');
      return
    }

    const stringId = angebotInfo.angebotId.toString();

    if (mainImage && picturesWithTables.length > 0) {
      console.log(picturesWithTables);
      console.log(angebotInfo)
      uploadMainImage(mainImage, stringId, "mainImage");
      picturesWithTables.forEach(file => uploadMainImage(file.picture, stringId, "additionalImage"))
    }
  }

  return (
    <div className="projectImagesPage">
      <Header />
      <div className="projectImagesPage__container">
        <MainImageAdder setMainPictureOfObject={setMainImage} />
        {imageWithTable.map(el =>
          (<ImageWithTableBlock key={el.id} setPicturesWithTables={setPicturesWithTables} />)
        )}
        <div className="projectImagesPage__plusButton">
          <PlusButton handler={addNewItem} />
          <p>Добавить фото</p>
          <ButtonNext width={532} storageSetter={storageSetter} />
        </div>
      </div>
      <Footer />
    </div>
  );
})
