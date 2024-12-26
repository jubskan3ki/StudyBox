import type { Organisation } from './OrganisationTypes';

export interface OrganisationsResponse {
    organisations: Organisation[];
    success: boolean;
    message: string;
}
