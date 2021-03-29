import { HttpModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import configuration from './config/configuration'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot({ load: [configuration] })],
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  it('should be defined', () => {
    expect(appController).toBeDefined()
  })

  describe('koEnTranslate', () => {
    it('should return an array of Korean-English 3 translations in Object', async () => {
      const response = await appController.koEnTranslate({
        text: '안녕하세요',
      })
      expect(response).toBeInstanceOf(Object)

      const result = response.translation
      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBe(3)
    })
  })

  describe('koEnTranslate', () => {
    it('should return an array of Korean-English 3 translations in Object', async () => {
      const response = await appController.koEnTranslate({
        text: `안녕하세요.
        저는 홍길동입니다.`,
      })
      expect(response).toBeInstanceOf(Object)

      const result = response.translation
      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBe(3)
    })
  })

  describe('enRoTranslate', () => {
    it('should return an array of English-Romanian 1 translation in Object', async () => {
      const response = await appController.enRoTranslate({
        text: 'hi',
      })
      expect(response).toBeInstanceOf(Object)

      const result = response.translation
      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBe(1)
    })
  })

  describe('enRoTranslate', () => {
    it('should return an array of English-Romanian 1 translation in Object', async () => {
      const response = await appController.enRoTranslate({
        text: `hi.
        who are you?`,
      })
      expect(response).toBeInstanceOf(Object)

      const result = response.translation
      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBe(1)
    })
  })

  describe('enUkTranslate', () => {
    it('should return an array of English-Ukrainian 2 translations in Object', async () => {
      const response = await appController.enUkTranslate({
        text: 'hi',
      })
      expect(response).toBeInstanceOf(Object)

      const result = response.translation
      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBe(2)
    })
  })

  describe('enUkTranslate', () => {
    it('should return an array of English-Ukrainian 2 translations in Object', async () => {
      const response = await appController.enUkTranslate({
        text: `hi.
        who are you?`,
      })
      expect(response).toBeInstanceOf(Object)

      const result = response.translation
      expect(result).toBeInstanceOf(Array)
      expect(result.length).toBe(2)
    })
  })
})
