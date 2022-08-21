import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFileDto } from 'src/dto/create-file.dto';
import { File, FileDocument } from 'src/schemas/file.schema';

@Injectable()
export class FilesService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async create(createCatDto: CreateFileDto): Promise<File> {
    const createdCat = new this.fileModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<File[]> {
    return this.fileModel.find().exec();
  }
}
