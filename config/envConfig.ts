import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    NEXT_PUBLIC_API_URL: z.string().default('http://localhost:8000:api')
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
    console.error('❌ Invalid environment variables:')
    console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2))
    process.exit(1)
}

export const env = parsed.data
export type Env = typeof env