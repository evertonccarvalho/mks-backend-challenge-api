import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { ListUsersDto, UpdateUserDto } from '../http/users/dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findAll(): Promise<ListUsersDto[]> {
    return this.userRepository.findAll();
  }

  async findOne(id: string): Promise<ListUsersDto> {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    return this.userRepository.remove(id);
  }
}
