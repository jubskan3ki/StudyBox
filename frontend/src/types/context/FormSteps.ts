import type { FormStepModel } from '~/types/models/FormStepModel';

export interface FormStepsContextType<T> {
    currentStep: string;
    setCurrentStep: (step: string) => void;
    formData: T;
    setFormData: (data: T) => void;
    formStepModel: FormStepModel;
    nextStep: () => void;
    prevStep: () => void;
}
