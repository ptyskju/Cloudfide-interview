import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class TimestampValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (Number.isNaN(value)) {
      throw new BadRequestException('Value must be an integer');
    }

    if (value < 0) {
      throw new BadRequestException('Value must be a positive integer');
    }

    if (Number.isNaN(new Date(+value).getTime())) {
      throw new BadRequestException('Value must be a timestamp');
    }

    return value;
  }
}
