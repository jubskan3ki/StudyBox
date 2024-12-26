import type { ReactNode } from 'react';

export type FormStep = {
    id: string;
    label: string;
    component: React.ComponentType<any>;
};

export class FormStepModel {
    private steps: FormStep[];

    constructor(steps: FormStep[]) {
        this.steps = steps;
    }

    getAllSteps(): FormStep[] {
        return this.steps;
    }
}

export type FormStepsProviderProps<T> = {
    children: ReactNode;
    initialData: T;
    formStepModel: FormStepModel;
    initialStep: string;
};
