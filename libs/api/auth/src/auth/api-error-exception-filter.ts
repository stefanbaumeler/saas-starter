import { Catch, type ArgumentsHost, type ExceptionFilter } from '@nestjs/common'
import { APIError } from 'better-auth/api'
import type { Response } from 'express'

@Catch(APIError)
export class APIErrorExceptionFilter implements ExceptionFilter {
    catch (exception: APIError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.statusCode
        const message = exception.body?.message

        response.status(status).json({
            statusCode: status,
            message
        })
    }
}
