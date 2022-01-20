import React, { useState } from 'react';
import { QUESTIONNAIRE_STEPS } from '../../constants';
import QuestionnaireStepOne from './QuestionnaireStepOne';
import QuestionnaireStepTwo from './QuestionnaireStepTwo';

export default function QuestionnaireStateManager() {
  // Initialize our state
  const [currentStep, setCurrentStep] = useState(
    QUESTIONNAIRE_STEPS.lifestylePlanning
  );

  /**
   * Formik controls the form state within each step but the form values
   * are also stored here when they move back and forh between steps
   * thus ensuring that they can go back to previous steps without losing state
   */
  const [completedStepValues, setCompletedStepValues] = useState({
    stepOne: {},
    stepTwo: {},
    stepThree: {},
    stepFour: {}
  });

  const setCompletedValuesForStep = ({ stepName, formValues }) => {
    setCompletedStepValues({
      ...completedStepValues,
      [stepName]: formValues
    });
  };

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
      setCompletedValuesForStep={setCompletedValuesForStep}
      completedStepValues={completedStepValues}
    />
  );
}
