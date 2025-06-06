import { Controller, Get, Param } from '@nestjs/common'
import { ExamplesService } from './examples.service'

@Controller('example')
export class ExamplesController {
    constructor (private readonly service: ExamplesService) {
    }
    @Get()
    examples () {
        return this.service.getAll()
    }

    @Get(':id')
    example (@Param('id') id: string) {
        return this.service.getById({
            id
        })
    }
}
