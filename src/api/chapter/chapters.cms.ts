import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CMS/Chapters')
@Controller('cms/chapters')
export class ChapterCMSController {
  @Post('')
  index() {
    return 'hello';
  }
}
