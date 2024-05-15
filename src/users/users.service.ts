import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UserListDto } from './dto/user-list.dto.ts';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findAll(): Promise<UserListDto[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<UserListDto> {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    return this.userRepository.remove(id);
  }
}
