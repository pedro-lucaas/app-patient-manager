import { Attribute } from "@application/entities/attribute/attribute";
export declare class PrismaAttributesMapper {
    static toPrisma(attribute: Attribute): {
        name: string;
    };
    static toDomain(raw: any): Attribute;
}
