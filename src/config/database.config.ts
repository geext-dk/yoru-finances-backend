import { registerAs } from '@nestjs/config'

export default registerAs(
  'database',
  () =>
    ({
      port: parseInt(process.env['DATABASE_PORT'] || '') || 5432,
      db: process.env['DATABASE_DB'],
      host: process.env['DATABASE_HOST'],
      user: process.env['DATABASE_USER'],
      password: process.env['DATABASE_PASSWORD'],
      type: 'postgres',
    } as const),
)
