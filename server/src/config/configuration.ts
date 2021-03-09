export default () => ({
  papago: {
    translateUrl: process.env.PAPAGO_TRANSLATE_URL,
    ClientId: process.env.PAPAGO_CLIENT_ID,
    ClientSecret: process.env.PAPAGO_CLIENT_SECRET,
  },
})
