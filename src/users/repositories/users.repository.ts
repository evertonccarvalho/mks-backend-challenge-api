import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common';

import { UserListDto } from '../dto/user-list.dto.ts';
import { EmailIsTakenError } from '../errors';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserListDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => new UserListDto(user));
  }

  async findOne(id: string): Promise<UserListDto> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserListDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserListDto> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingUser = await this.userRepository.findOne({
      where: { email: updateUserDto.email },
    });
    if (existingUser && existingUser.id !== id) {
      throw new EmailIsTakenError();
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);
    return new UserListDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }
}
