import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<User> {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Post()
    async create(@Body() createUserDto: Partial<User>): Promise<User> {
        const user = await this.userService.create(createUserDto);
        if (!user) {
            throw new BadRequestException('Failed to create user');
        }
        return user;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: Partial<User>): Promise<User> {
        const updatedUser = await this.userService.update(id, updateUserDto);
        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }
        return updatedUser;
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        const deletedUser = await this.userService.delete(id);
        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }
        return deletedUser;
    }
}
