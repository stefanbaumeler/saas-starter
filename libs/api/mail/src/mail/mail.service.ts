import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import type { Queue } from 'bull'
import handlebars from 'handlebars'
import fs from 'fs'
import { I18nService } from 'nestjs-i18n'
import path from 'path'

@Injectable()
export class MailService {
    private readonly emailVerificationTemplate: handlebars.TemplateDelegate
    private readonly resetPasswordTemplate: handlebars.TemplateDelegate

    constructor (
        @InjectQueue('mail') private readonly emailQueue: Queue,
        private readonly i18n: I18nService
    ) {
        this.emailVerificationTemplate = this.loadTemplate('./templates/email-verification.hbs')
        this.resetPasswordTemplate = this.loadTemplate('./templates/reset-password.hbs')

        handlebars.registerPartial({
            header: this.loadTemplate('./partials/header.hbs'),
            footer: this.loadTemplate('./partials/footer.hbs'),
            head: this.loadTemplate('./partials/head.hbs')
        })
    }

    private loadTemplate (templateName: string): handlebars.TemplateDelegate {
        const templateSource = fs.readFileSync(path.join(__dirname, '../../../src/', templateName), 'utf8')

        handlebars.registerHelper('t', (str) => {
            const translated = this.i18n.t(`mail.${str}`)
            const escaped = handlebars.Utils.escapeExpression(translated)
            const text = escaped.replace(/(\r\n|\n|\r)/gm, '<br />')

            return new handlebars.SafeString(text)
        })

        return handlebars.compile(templateSource)
    }

    async sendResetPasswordMail (data: {
        to: string
        url: string
    }) {
        const job = await this.emailQueue.add('send', {
            ...data,
            subject: this.i18n.t('mail.RESET_PASSWORD_SUBJECT'),
            html: this.resetPasswordTemplate(data)
        })

        return {
            jobId: job.id
        }
    }

    async sendEmailVerificationMail (data: {
        to: string
        url: string
    }) {
        const job = await this.emailQueue.add('send', {
            ...data,
            subject: this.i18n.t('mail.VERIFY_EMAIL_SUBJECT'),
            html: this.emailVerificationTemplate(data)
        })

        return {
            jobId: job.id
        }
    }
}
