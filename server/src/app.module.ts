import { HttpModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import configuration from './config/configuration'

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ load: [configuration] })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
