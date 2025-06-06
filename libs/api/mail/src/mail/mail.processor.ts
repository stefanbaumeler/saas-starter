import { Process, Processor } from '@nestjs/bull'
import type { Job } from 'bull'
import * as nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

export type TMail = {
    from: string
    to: string
    subject: string
    html: string
}

@Processor('mail')
export class MailProcessor {
    private transporter

    constructor () {
        this.transporter = nodemailer.createTransport(
            {
                host: process.env.MAIL_HOST,
                port: parseInt(process.env.MAIL_PORT ?? ''),
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD
                }
            } as SMTPTransport.Options,
            {
                from: {
                    name: 'SAAS STARTER',
                    address: 'hello@saas.com'
                }
            } as SMTPTransport.Options
        )
    }

    @Process('send')
    async sendMail (job: Job<TMail>) {
        const {
            data
        } = job

        await this.transporter.sendMail(data)
    }
}
