import React, { useState } from 'react';
import { QUESTIONNAIRE_STEPS } from '../../constants';
import QuestionnaireStepOne from './QuestionnaireStepOne';
import QuestionnaireStepTwo from './QuestionnaireStepTwo';

export default function QuestionnaireStateManager() {
  // Initialize our state
  const [currentStep, setCurrentStep] = useState(
    QUESTIONNAIRE_STEPS.lifestylePlanning
  );
  const componentToRender = (theCurrentStep) => {
    switch (theCurrentStep.stepName) {
      case QUESTIONNAIRE_STEPS.lifestylePlanning.stepName:
        return QuestionnaireStepOne;
      case QUESTIONNAIRE_STEPS.currentLifestyle.stepName:
        return QuestionnaireStepTwo;
      default:
        console.error('Invalid currentStep');
        return null;
    }
  };
  const CurrentStepComponent = componentToRender(currentStep);
  return (
    <CurrentStepComponent
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
    />
  );
}
