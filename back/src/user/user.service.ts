import { Injectable, OnModuleInit  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import {userMock} from "./user.mock"

@Injectable()
export class UserService implements OnModuleInit{
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async onModuleInit() {
        const usersCount = await this.userModel.countDocuments().exec();
        if (usersCount === 0) {
            await this.addMockUsers();
        }
    }

    private async addMockUsers() {
        try {
            await this.userModel.create(userMock);
            console.info('Mock users added to the database.');
        } catch (error) {
            console.error('Failed to add mock users to the database:', error);
        }
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async create(user: Partial<User>): Promise<User> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
    }

    async update(id: string, updateUserDto: Partial<User>): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async delete(id: string): Promise<User | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
