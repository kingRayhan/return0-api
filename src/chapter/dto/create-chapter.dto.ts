import { ApiProperty } from '@nestjs/swagger';

export class CreateChapterDto {
  @ApiProperty()
  public title: string;

  @ApiProperty()
  public order: number;

  @ApiProperty()
  public course: string;
}
