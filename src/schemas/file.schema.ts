import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FileDocument = File & Document;

@Schema()
export class File {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  key: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, default: Date.now })
  createdAt: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);
