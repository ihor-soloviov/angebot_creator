import React, { useState } from 'react'
import ServiceWrapper from '../ServiceWrapper/ServiceWrapper'
import PriceInput from '../../Inputs/PriceInput/PriceInput';
import "./EditableService.scss"

interface Props {
  title: string,
  description: string | undefined,
  price: number,
  key: string,
}
const EditableService: React.FC<Props> = ({ title, description, price, key }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className='editable-service' key={key}>
      <ServiceWrapper title={title} description={description} >
        <PriceInput currentPrice={+price} />
      </ServiceWrapper>
    </div>
  )
}

export default EditableService
