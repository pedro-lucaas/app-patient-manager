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
    console.log(patient.attributes);
    await this.prisma.patient.create({
      data: {
        ...PrismaPatientsMapper.toPrisma(patient),
        patientAttributes: {
          create: patient.attributes.map(PrismaPatientAttributesMapper.toPrisma),
        },
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
  async findAll(page: number = 1, search?: string, attributeName?: string, sex?: string, userId?: string): Promise<Pagination<Patient>> {
    const total = await this.prisma.patient.count();
    return await this.prisma.patient.findMany({
      where: {
        userId,
        OR: search && [
          { name: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } },
        ],
        patientAttributes: attributeName && {
          some: {
            name: attributeName,
            value: true,
          }
        },
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
          upsert: patient.attributes.map((attribute) => ({
            where: {
              patientId_name: {
                patientId: patient.patientId,
                name: attribute.name,
              },
            },
            update: PrismaPatientAttributesMapper.toPrisma(attribute),
            create: PrismaPatientAttributesMapper.toPrisma(attribute),
          })),
        },
      },
    });
  }
  async countPatientsByAttribute(attributeName: string, userId?: string): Promise<number> {
    return await this.prisma.patient.count({
      where: {
        patientAttributes: {
          some: {
            name: attributeName,
            value: true,
          }
        }
      }
    });

  }
}