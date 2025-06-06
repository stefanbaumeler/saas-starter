import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthGuard } from '../auth/auth.guard'

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor (private readonly service: UsersService) {
    }

    @Get(':id')
    example (@Param('id') id: string) {
        return this.service.getById({
            id
        })
    }
}
