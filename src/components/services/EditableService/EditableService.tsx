import React, { useState } from 'react'
import ServiceWrapper from '../ServiceWrapper/ServiceWrapper'
import PriceInput from '../../Inputs/PriceInput/PriceInput';
import checkDone from '../../../assets/admin/changedPrice.svg'
import "./EditableService.scss"


interface Props {
  title: string,
  description: string | undefined,
  price: number,
  key: string,
}
const EditableService: React.FC<Props> = ({ title, description, price, key }) => {
  const [isChanged, setIsChanged] = useState(false);

  const showSuccess = () => {
    setIsChanged(true);

    setTimeout(() => {
      setIsChanged(false)
    }, 5000);
  }

  const updatePriceOnServer = async (newPrice: number) => {
    try {
      const response = fetch
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='editable-service' key={key}>
      <ServiceWrapper title={title} description={description} >
        <PriceInput currentPrice={+price} showSuccess={showSuccess} />
      </ServiceWrapper>
      {isChanged && <img src={checkDone} alt='done' />}
    </div>
  )
}

export default EditableService
