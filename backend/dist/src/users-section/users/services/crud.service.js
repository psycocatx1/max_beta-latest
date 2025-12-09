"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersCrudService = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../../libs/prisma/src");
const argon2 = require("argon2");
let UsersCrudService = class UsersCrudService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(where, check_only = false) {
        const user = await this.prisma.user.findUnique({
            where,
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                phone_number: true,
                image: true,
                created: true,
                updated: true,
                role: true,
                is_banned: true,
                locale_id: true,
                locale: {
                    select: {
                        name: true,
                        symbol: true,
                    },
                },
            },
        });
        if (!user && !check_only) {
            throw new common_1.NotFoundException("Пользователь не найден");
        }
        return user;
    }
    async update(where, updateUserDto) {
        if (!where || Object.keys(where).length === 0) {
            throw new common_1.BadRequestException("Не указаны параметры поиска пользователя для обновления");
        }
        await this.findOne(where);
        const data = { ...updateUserDto };
        if (data.password) {
            data.hashed_password = await this.hashPassword(data.password);
            delete data.password;
        }
        if ("email" in data && data.email) {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existingUser && existingUser.id !== where.id) {
                throw new common_1.BadRequestException("Этот email уже занят");
            }
        }
        const updatedUser = await this.prisma.user.update({
            where,
            data,
            select: {
                id: true,
                email: true,
                first_name: true,
                last_name: true,
                phone_number: true,
                image: true,
                created: true,
                updated: true,
                role: true,
                is_banned: true,
                locale_id: true,
                locale: {
                    select: {
                        name: true,
                        symbol: true,
                    },
                },
            },
        });
        return updatedUser;
    }
    async hashPassword(password) {
        return await argon2.hash(password);
    }
};
exports.UsersCrudService = UsersCrudService;
exports.UsersCrudService = UsersCrudService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], UsersCrudService);
//# sourceMappingURL=crud.service.js.map