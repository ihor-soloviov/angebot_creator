import React, { useEffect, useState } from 'react'
import { HttpMethod, fetchData } from '../../../api/modules'
import { CalculatorTitle } from '../../Calculator/CalculatorTitle'
import { ButtonNext } from '../../Buttons/ButtonNext'

interface Props {
  actualTitle: string,
  handleBackClick: () => void
}

const ChangeModuleWrapper: React.FC<Props> = ({ actualTitle, handleBackClick }) => {
  const [modules, setModules] = useState([])

  const setModulesFromServer = async () => {
    try {
      const url = `${import.meta.env.BASE_URL}/getAllModules`
      const modules = await fetchData(HttpMethod.GET, url)
      setModules(modules)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setModulesFromServer()
  }, [])


  return (
    <>

    </>
  )
}

export default ChangeModuleWrapper
