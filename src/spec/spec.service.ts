import { Injectable } from '@nestjs/common';
import { CreateSpecDto } from './dto/create-spec.dto';
import { UpdateSpecDto } from './dto/update-spec.dto';

@Injectable()
export class SpecService {
  create(createSpecDto: CreateSpecDto) {
    return 'This action adds a new spec';
  }

  findAll() {
    return `This action returns all spec`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spec`;
  }

  update(id: number, updateSpecDto: UpdateSpecDto) {
    return `This action updates a #${id} spec`;
  }

  remove(id: number) {
    return `This action removes a #${id} spec`;
  }
}
