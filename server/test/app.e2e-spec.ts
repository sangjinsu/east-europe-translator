import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('E2E Tests for Translate Endpoint', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    await app.init()
  })

  it('/v1/translate/ko-en basic', () => {
    const send = { text: '안녕하세요' }
    const expected = {
      translation: ['Hello', 'Hi!', 'Hi'],
    }
    return request(app.getHttpServer())
      .post('/v1/translate/ko-en')
      .set('Accept', 'application/json')
      .send(send)
      .expect(HttpStatus.CREATED)
      .expect(expected)
  })

  it('/v1/translate/ko-en empty text', async () => {
    const send = { text: '' }

    const result = await request(app.getHttpServer())
      .post('/v1/translate/ko-en')
      .set('Accept', 'application/json')
      .send(send)

    expect(result.status).toBe(HttpStatus.BAD_REQUEST)
    expect(result.body.message[0]).toBe(
      'text must be longer than or equal to 1 characters',
    )
    expect(result.body.message[1]).toBe('text should not be empty')
  })

  it('/v1/translate/ko-en invalid property', async () => {
    const send = { bad: '' }

    const result = await request(app.getHttpServer())
      .post('/v1/translate/ko-en')
      .set('Accept', 'application/json')
      .send(send)

    expect(result.status).toBe(HttpStatus.BAD_REQUEST)
    expect(result.body.message.length).toBe(4)
  })

  it('/v1/translate/ko-en not string value', async () => {
    const send = { text: 5 }

    const result = await request(app.getHttpServer())
      .post('/v1/translate/ko-en')
      .set('Accept', 'application/json')
      .send(send)

    expect(result.status).toBe(HttpStatus.BAD_REQUEST)
    expect(result.body.message.length).toBe(2)
  })

  it('/v1/translate/ko-en over 3000 characters', async () => {
    const send = {
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sagittis tellus ac est ultrices, sed varius lacus commodo. Proin viverra, neque quis malesuada scelerisque, lorem ligula pellentesque augue, in euismod arcu massa nec nisi. Maecenas augue tellus, bibendum eget accumsan sed, pretium quis massa. Mauris ut tempus nulla, auctor convallis purus. Nunc fringilla sollicitudin nisi, a congue elit accumsan quis. Pellentesque porttitor ut leo ut bibendum. Vivamus consectetur tortor sit amet nisi egestas convallis. Nullam sollicitudin sagittis leo pretium aliquet. Mauris lectus sapien, blandit ut sagittis non, pretium eget dui. Ut eget erat consectetur, pretium orci eget, aliquam erat.\nDuis imperdiet metus non purus facilisis tristique. Ut elit mi, sollicitudin sit amet quam mollis, porttitor condimentum nisi. Etiam egestas eleifend purus, sit amet egestas elit tristique in. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In euismod cursus lacus. Donec lorem nisi, tincidunt eget porttitor ac, egestas et magna. Mauris tempor nibh ut sem lobortis, in eleifend tellus hendrerit. Vivamus turpis est, pulvinar ac diam ornare, ultrices rhoncus diam. Cras luctus porttitor sapien.\nInteger velit justo, dapibus a enim eget, faucibus varius libero. Donec auctor odio ut scelerisque fermentum. Vestibulum volutpat tincidunt enim, ac tristique arcu vestibulum sit amet. Duis quis leo a eros vestibulum vehicula eget vel mi. Ut tempor lectus nec vulputate suscipit. Nunc luctus odio velit, sit amet fermentum augue imperdiet in. Fusce leo lorem, maximus a urna ut, vehicula venenatis tellus. Sed fringilla nunc erat, a tincidunt mi iaculis a. Donec mauris leo, vehicula vitae enim non, posuere vehicula nulla.\nMorbi in orci purus. In sollicitudin tellus tellus, at elementum felis consectetur eget. Vestibulum ligula dui, vulputate eu pharetra vitae, lobortis ut odio. Curabitur feugiat lacinia est at consectetur. Suspendisse sapien arcu, accumsan ut porta eu, ultricies ut purus. Donec interdum hendrerit tellus at fringilla. Etiam finibus commodo lorem, a porta erat aliquet dictum. Sed ipsum dolor, sodales sed iaculis in, congue a quam. Nam vehicula vitae felis consequat placerat. Sed velit quam, tempor in maximus id, faucibus sed nibh.\nPellentesque condimentum elit vel elit eleifend, sit amet scelerisque quam tempus. Fusce sagittis sapien nec pellentesque pharetra. Suspendisse viverra placerat dolor. Donec nec orci et est sodales imperdiet in et tellus. In consequat sagittis efficitur. Nullam tortor neque, mollis eu elit vitae, sagittis fermentum ipsum. In id sapien est. Morbi augue ligula, sollicitudin id sem ac, venenatis lacinia lectus. Donec ac ultricies orci, eu convallis sem. Sed elementum, leo eget feugiat hendrerit, erat purus interdum metus, nec consectetur velit mauris vitae nibh. Curabitur sed orci luctus, dapibus nisl nec, varius tellus. In cursus ante ligula, eu commodo ante eleifend id. Sed in consectetur augue accumsan.',
    }

    const result = await request(app.getHttpServer())
      .post('/v1/translate/ko-en')
      .set('Accept', 'application/json')
      .send(send)

    expect(result.status).toBe(HttpStatus.BAD_REQUEST)
    expect(result.body.message.length).toBe(1)
    expect(result.body.message[0]).toBe(
      'text must be shorter than or equal to 3000 characters',
    )
  })
})
