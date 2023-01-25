import * as bcrypt from 'bcrypt';

export class Hasher {
  static hash(password: string): string {
    return bcrypt.hashSync(password, 8);
  }

  static compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}