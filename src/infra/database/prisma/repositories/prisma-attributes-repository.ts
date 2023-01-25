import { Attribute } from "@application/entities/attribute/attribute";
import { AttributesRepository } from "@application/repositories/attributes-repository";
import { Pagination } from "@helpers/Pagination";
import { Injectable } from "@nestjs/common";
import { PrismaAttributesMapper } from "../mappers/prisma-attributes-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaAttributesRepository implements AttributesRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(attributes: Attribute): Promise<void> {
    await this.prisma.attributes.create({
      data: {
        ...PrismaAttributesMapper.toPrisma(attributes),
      },
    });
  }
  async findByName(attributeName: string): Promise<Attribute> {
    return await this.prisma.attributes.findFirst(
      {
        where: {
          name: attributeName,
        },
        include: {
          patientAttributes: { where: { value: true } },
        },
      }
    ).then(PrismaAttributesMapper.toDomain);
  }
  async findAll(): Promise<Attribute[]> {
    return await this.prisma.attributes.findMany()
      .then(attributes => attributes.map(PrismaAttributesMapper.toDomain));
  }
  async delete(attributeName: string): Promise<void> {
    await this.prisma.patientAttributes.deleteMany({
      where: {
        name: attributeName,
      }
    });
    await this.prisma.attributes.delete({
      where: {
        name: attributeName,
      }
    });
  }
}