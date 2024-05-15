import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({ status: 404, description: 'Não encontrado' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
