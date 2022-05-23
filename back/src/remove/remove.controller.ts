import { Controller, Delete, Param } from '@nestjs/common';
import { RemoveService } from './remove.service';

@Controller('remove')
export class RemoveController {
  constructor(private removeService: RemoveService) {}
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeService.remove(id);
  }
}
