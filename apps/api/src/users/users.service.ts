import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtUser } from '../auth/jwt.strategy';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByAuth0Id(auth0Id: string) {
    return this.prisma.user.findUnique({
      where: { auth0Id },
    });
  }

  async createFromAuth0(jwtUser: JwtUser) {
    const name = jwtUser.name || jwtUser.email || 'User';
    const nameParts = name.split(' ');
    const firstName = nameParts[0] || 'User';
    const lastName = nameParts.slice(1).join(' ') || '';

    return this.prisma.user.create({
      data: {
        auth0Id: jwtUser.sub,
        email: jwtUser.email || `${jwtUser.sub}@example.com`,
        name,
        firstName,
        lastName,
        picture: jwtUser.picture,
        emailVerified: jwtUser.email_verified ? new Date() : null,
        role: 'STUDENT',
        lastLoginAt: new Date(),
      },
    });
  }

  async updateLastLogin(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  }
}