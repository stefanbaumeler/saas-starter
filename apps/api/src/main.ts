import { Logger } from '@nestjs/common'
import { pool } from '@saas-starter/db'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import cookieParser from 'cookie-parser'
import fs from 'fs'
import path from 'path'

const bootstrap = async () => {
    await pool.connect()

    const app = await NestFactory.create(AppModule, {
        bodyParser: false,
        httpsOptions: process.env.NEXT_PUBLIC_API_PROTOCOL === 'https' ? {
            key: fs.readFileSync(path.join('./certificates/key.pem')),
            cert: fs.readFileSync(path.join('./certificates/cert.pem'))
        } : undefined
    })

    app.use(cookieParser())
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true
    })

    if (process.env.NEXT_PUBLIC_API_PORT) {
        await app.listen(process.env.NEXT_PUBLIC_API_PORT)

        Logger.log(`🚀 Application is running on: ${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}`)
    }
}

bootstrap()
