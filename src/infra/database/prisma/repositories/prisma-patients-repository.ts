import { Patient } from "@application/entities/patient/patient";
import { PatientsRepository } from "@application/repositories/patients-repository";
import { PAGE_SIZE } from "@config/config";
import { Pagination } from "@helpers/Pagination";
import { Injectable } from "@nestjs/common";
import { PrismaPatientAttributesMapper } from "../mappers/prisma-patient-attributes-mapper";
import { PrismaPatientsMapper } from "../mappers/prisma-patients-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaPatientsRepository implements PatientsRepository {
  constructor(private readonly prisma: PrismaService) { }
  async create(patient: Patient): Promise<void> {
    await this.prisma.patient.create({
      data: {
        ...PrismaPatientsMapper.toPrisma(patient),
      },
    });
  }
  async findById(patientId: string): Promise<Patient> {
    return await this.prisma.patient.findUnique({
      where: {
        id: patientId,
      },
      include: { patientAttributes: true },
    })
      .then(PrismaPatientsMapper.toDomain);
  }
  async findByEmail(email: string): Promise<Patient> {
    return await this.prisma.patient.findUnique({
      where: {
        email,
      },
      include: { patientAttributes: true },
    }).then(PrismaPatientsMapper.toDomain);
  }
  async findAll(page: number = 1, search?: string, sex?: string, userId?: string): Promise<Pagination<Patient>> {
    const total = await this.prisma.patient.count();
    return await this.prisma.patient.findMany({
      where: {
        userId,
        OR: search && [
          { name: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
        ],
        sex: sex && {
          equals: sex,
        },
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { patientAttributes: true },
    }).then(patients => patients.map(PrismaPatientsMapper.toDomain))
      .then(patients => new Pagination<Patient>(patients, total, page));
  }

  async save(patient: Patient): Promise<void> {
    await this.prisma.patient.update({
      where: {
        id: patient.patientId,
      },
      data: {
        ...PrismaPatientsMapper.toPrisma(patient),
        patientAttributes: {
          deleteMany: {
            patientId: patient.patientId,
            name: {
              notIn: patient.attributes.map(a => a.name),
            }
          },
          upsert: patient.attributes.map(a => ({
            where: {
              patientId_name: {
                patientId: patient.patientId,
                name: a.name,
              },
            },
            create: PrismaPatientAttributesMapper.toPrisma(a),
            update: PrismaPatientAttributesMapper.toPrisma(a),
          })),
        },
      },
    });
  }
}