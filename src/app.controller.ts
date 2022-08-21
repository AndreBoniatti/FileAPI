import {
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { CreateFileDto } from './dto/create-file.dto';
import { FilesService } from './services/files.service';
import { S3Service } from './services/s3.service';

export const multerOptions = {
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(`Unsupported file type`, HttpStatus.BAD_REQUEST),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = process.env.LOCAL_STORAGE;
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${uuid()}-${file.originalname}`);
    },
  }),
};

@Controller()
export class AppController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly filesService: FilesService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const dataSave: CreateFileDto = new CreateFileDto(
      file.originalname,
      file.size,
      file.filename,
      file.path,
    );
    return this.filesService.create(dataSave);
    // this.s3Service.uploadFile(file);
  }
}
