import { Module } from '@nestjs/common'
import { ExamplesController } from './examples.controller'
import { ExamplesResolver } from './examples.resolver'
import { ExamplesRepository } from './examples.repository'
import { ExamplesService } from './examples.service'
import { ClsModule } from 'nestjs-cls'
import { drizzleProvider } from '@saas-starter/db'

@Module({
    imports: [ClsModule],
    controllers: [ExamplesController],
    providers: [
        ExamplesRepository,
        ExamplesResolver,
        ExamplesService,
        ...drizzleProvider
    ]
})
export class ExamplesModule {
}
