import { Test, TestingModule } from '@nestjs/testing'
import { HealthcheckerController } from './healthchecker.controller'

describe('HealthcheckerController', () => {
  let controller: HealthcheckerController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckerController],
    }).compile()

    controller = module.get<HealthcheckerController>(HealthcheckerController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
