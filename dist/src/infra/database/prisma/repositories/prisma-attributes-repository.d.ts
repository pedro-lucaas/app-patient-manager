import { Attribute } from "@application/entities/attribute/attribute";
import { AttributesRepository } from "@application/repositories/attributes-repository";
import { PrismaService } from "../prisma.service";
export declare class PrismaAttributesRepository implements AttributesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(attributes: Attribute): Promise<void>;
    findByName(attributeName: string): Promise<Attribute>;
    findAll(): Promise<Attribute[]>;
    delete(attributeName: string): Promise<void>;
}
