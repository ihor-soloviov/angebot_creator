import React, { useState } from 'react';

const App: React.FC = () => {
  const [producer, setProducer] = useState<string>('producer1');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const producerSteps: Record<string, React.FC<{ onNextStep: () => void }>[]> = {
    'producer1': [WelcomePage, AngebotTypePage, PvsolFilePage],
    'producer2': [WelcomePage, AngebotTypePage, PvsolFilePage /*, Додайте інші компоненти для producer2 */],
    // Додайте інші значення producer та їх кроки
  };

  const CurrentComponent = producerSteps[producer][currentStep];

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <main>
      {CurrentComponent && <CurrentComponent onNextStep={handleNextStep} />}
    </main>
  );
};

export default App;
