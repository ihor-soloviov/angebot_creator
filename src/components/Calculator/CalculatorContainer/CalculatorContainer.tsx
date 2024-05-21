import React, { ReactNode } from 'react';

interface Props {
  additionalSection?: boolean
  children: ReactNode
}

const CalculatorContainer: React.FC<Props> = ({ additionalSection, children }) => {
  return (
    <div
      className="calculatorService__container"
      style={{ marginBottom: additionalSection ? "100px" : "0px" }}
    >
      {children}
    </div>
  )
}

export default CalculatorContainer
