import { Appointment, AppointmentStatus } from "@application/entities/appointment/appointment";
import { AppointmentsRepository } from "@application/repositories/appointments-repository";
import { PAGE_SIZE } from "@config/config";
import { Pagination } from "@helpers/Pagination";
import { Injectable } from "@nestjs/common";
import { PrismaAppointmentsFilesMapper } from "../mappers/prisma-appointments-files-mapper";
import { PrismaAppointmentsMapper } from "../mappers/prisma-appointments-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaAppointmentsRepository implements AppointmentsRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(appointment: Appointment): Promise<void> {
    await this.prisma.appointments.create({
      data: PrismaAppointmentsMapper.toPrisma(appointment),
    });
    for (const file of appointment.files) {
      await this.prisma.appointmentsFiles.create({
        data: PrismaAppointmentsFilesMapper.toPrisma(file),
      })
    }
  }
  async findByDate(initDate: Date, endDate: Date): Promise<Appointment | null> {
    return await this.prisma.appointments.findFirst({
      where: {
        OR: [
          {
            initDate: { gte: initDate, lte: endDate },
          },
          {
            endDate: { gte: initDate, lte: endDate },
          }
        ],
        status: { not: AppointmentStatus.CANCELED },
      },
      include: { patient: true },
    }).then(PrismaAppointmentsMapper.toDomain);
  }
  async findById(appointmentId: string): Promise<Appointment | null> {
    return await this.prisma.appointments.findUnique({
      where: {
        id: appointmentId,
      },
    }).then(PrismaAppointmentsMapper.toDomain);
  }
  async findStartedAppointment(): Promise<Appointment> {
    return await this.prisma.appointments.findFirst({
      where: {
        status: AppointmentStatus.STARTED,
      },
    }).then(PrismaAppointmentsMapper.toDomain);
  }
  async findManyByPatientId(patientId: string, page: number = 1, limit: number = PAGE_SIZE): Promise<Pagination<Appointment>> {
    const total = await this.prisma.appointments.count({
      where: {
        patientId,
      },
    });
    return await this.prisma.appointments.findMany({
      where: {
        patientId,
      },
      orderBy: {
        initDate: 'desc',
      },
      skip: (page - 1) * limit,
      take: limit,
      include: { AppointmentsFiles: true }
    }).then(appointments => appointments.map(PrismaAppointmentsMapper.toDomain))
      .then(appointments => new Pagination<Appointment>(appointments, total, page, limit));
  }
  async findMany(status?: AppointmentStatus, initDate?: Date, endDate?: Date): Promise<Appointment[]> {
    return await this.prisma.appointments.findMany({
      where: {
        status: status,
        OR: [
          {
            initDate: { gte: initDate, lte: endDate },
          },
          {
            endDate: { gte: initDate, lte: endDate },
          }
        ],
      },
      orderBy: {
        initDate: 'asc',
      },
      include: { AppointmentsFiles: true, patient: true }
    }).then(appointments => appointments.map(PrismaAppointmentsMapper.toDomain))
  }
  async delete(appointmentId: string): Promise<void> {
    await this.prisma.appointments.delete({
      where: {
        id: appointmentId,
      },
    });
  }
  async save(appointment: Appointment): Promise<void> {
    await this.prisma.appointments.update({
      where: {
        id: appointment.appointmentId,
      },
      data: PrismaAppointmentsMapper.toPrisma(appointment),
    });

    if (!appointment.files || appointment.files.length === 0) return

    for (const file of appointment.files) {
      await this.prisma.appointmentsFiles.upsert({
        where: {
          fileUrl: file.fileUrl,
        },
        create: PrismaAppointmentsFilesMapper.toPrisma(file),
        update: PrismaAppointmentsFilesMapper.toPrisma(file),
      })
    }
    await this.prisma.appointmentsFiles.deleteMany({
      where: {
        fileName: { notIn: appointment.files.map(file => file.fileName) },
      },
    });
  }
}