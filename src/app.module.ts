import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { S3Service } from './services/s3.service';
import { File, FileSchema } from './schemas/file.schema';
import { FilesService } from './services/files.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/files'),
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  controllers: [AppController],
  providers: [S3Service, FilesService],
})
export class AppModule {}
