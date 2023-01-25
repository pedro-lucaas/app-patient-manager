import { PipeTransform, Injectable } from '@nestjs/common';
import { isDate } from 'date-fns';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string): Date {
    const val = new Date(value);
    if (!isDate(val)) {
      throw new Error('Invalid date');
    }
    return val;
  }
}