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
import path from 'path';
import { v4 as uuid } from 'uuid';
import { AppService } from './app.service';

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
      const uploadPath = './tmp/uploads';
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
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return;
    this.appService.uploadFile(file);
  }
}
