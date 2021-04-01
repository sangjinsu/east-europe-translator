import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HealthcheckerController } from './healthchecker/healthchecker.controller'
import configuration from './config/configuration'

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ load: [configuration] })],
  controllers: [AppController, HealthcheckerController],
  providers: [AppService],
})
export class AppModule {}
