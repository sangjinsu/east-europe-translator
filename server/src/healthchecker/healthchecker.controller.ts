import { Controller, Get, HttpCode } from '@nestjs/common'

@Controller('/')
export class HealthcheckerController {
  @Get()
  @HttpCode(200)
  healthchecker() {
    return
  }
}
