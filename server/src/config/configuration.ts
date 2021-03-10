export default () => ({
  papago: {
    translateUrl: process.env.PAPAGO_TRANSLATE_URL,
    ClientId: process.env.PAPAGO_CLIENT_ID,
    ClientSecret: process.env.PAPAGO_CLIENT_SECRET,
  },
  kakao: {
    translateUrl: process.env.KAKAO_TRANSLATE_URL,
    apiKey: process.env.KAKAO_API_KEY,
  },
  google: {
    keyFileName: process.env.GOOGLE_KEY_FILE_NAME,
  },
})
