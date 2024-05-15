// import { DynamicModule, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// interface DatabaseOptions {
//   type: 'prisma' | 'mongoose';
//   global?: boolean;
// }

// @Module({})
// export class PersistenceModule {
//   static async register({
//     global = false,
//   }: DatabaseOptions): Promise<DynamicModule> {
//     return {
//       global,
//       module: PersistenceModule,
//       imports: [TypeOrmModule],
//       exports: [TypeOrmModule],
//     };
//   }
// }
