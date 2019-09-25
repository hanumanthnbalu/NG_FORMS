import { ISkill } from './Iskill';

export interface IEmployee {
    id: number;
    fullName: string;
    email: string;
    phone?: number;
    contactPreference: string;
    skills: ISkill[];
}
