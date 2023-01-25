import { Patient } from "@application/entities/patient/patient";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { Pagination } from "@helpers/Pagination";
import { PrismaService } from "../prisma.service";
export declare class PrismaPatientsRepository implements PatientsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(patient: Patient): Promise<void>;
    findById(patientId: string): Promise<Patient>;
    findByEmail(email: string): Promise<Patient>;
    findAll(page?: number, search?: string, attributeName?: string, sex?: string, userId?: string): Promise<Pagination<Patient>>;
    save(patient: Patient): Promise<void>;
    countPatientsByAttribute(attributeName: string, userId?: string): Promise<number>;
}
