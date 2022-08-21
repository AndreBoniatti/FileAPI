import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  constructor(name: string, size: number, key: string, url: string) {
    this.name = name;
    this.size = size;
    this.key = key;
    this.url = url;
  }

  @ApiProperty()
  name: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  key: string;

  @ApiProperty()
  url: string;
}
