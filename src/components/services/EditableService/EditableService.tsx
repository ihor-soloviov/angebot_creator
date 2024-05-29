import React, { useState } from 'react'
import ServiceWrapper from '../ServiceWrapper/ServiceWrapper'
import PriceInput from '../../Inputs/PriceInput/PriceInput';
import checkDone from '../../../assets/admin/changedPrice.svg'
import "./EditableService.scss"
import { IndividualService } from '../../Calculator/calculator-types';

interface Props {
  title: string
  item: IndividualService
}
const EditableService: React.FC<Props> = ({ item: { title, description, price }, item }) => {
  const [isChanged, setIsChanged] = useState(false);

  const showSuccess = () => {
    setIsChanged(true);

    setTimeout(() => {
      setIsChanged(false)
    }, 5000);
  }

  console.log(item)

  return (
    <div className='editable-service'>
      <ServiceWrapper title={title} description={description} >
        <PriceInput item={item} currentPrice={+price} showSuccess={showSuccess} />
      </ServiceWrapper>
      {isChanged && <img src={checkDone} alt='done' />}
    </div>
  )
}

export default EditableService
