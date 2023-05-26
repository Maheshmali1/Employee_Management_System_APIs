import { Employee,PersonalInfo, ProfessionalInfo } from '.';

export interface DBdata{
    erp: Employee[];
    personal: PersonalInfo[];
    professional:ProfessionalInfo[];
}
