import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
import { Logger } from '../utils/log4js'

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('value:', value, 'metatype: ', metatype)
    if(!metatype || !this.toValidate(metatype)) {
      return value
    }
    // 将对象转换为Class来验证
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if(errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0]
      Logger.error(`Validation failed: ${msg}`)
      throw new BadRequestException(`Validation failed: ${msg}`)
    }
    return value
  }
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
