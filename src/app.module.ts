import { Module } from '@nestjs/common';
import { PrismaGeneratorModule } from './prisma-generator/prisma-generator.module';

@Module({
    imports: [PrismaGeneratorModule],
})
export class AppModule {}
