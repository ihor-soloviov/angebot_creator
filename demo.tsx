import React, { useState } from 'react';

const WelcomePage: React.FC<{ onNextStep: () => void }> = ({ onNextStep }) => (
  <div>
    <h1>Welcome Page</h1>
    <button onClick={onNextStep}>Next</button>
  </div>
);

const AngebotTypePage: React.FC<{ onNextStep: () => void }> = ({ onNextStep }) => (
  <div>
    <h1>AngebotType Page</h1>
    <button onClick={onNextStep}>Next</button>
  </div>
);

const PvsolFilePage: React.FC<{ onNextStep: () => void }> = ({ onNextStep }) => (
  <div>
    <h1>PvsolFile Page</h1>
    <button onClick={onNextStep}>Next</button>
  </div>
);

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
