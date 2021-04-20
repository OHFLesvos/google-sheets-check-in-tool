const getCredentials = () => ({
    client_email: process.env.VUE_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.VUE_APP_GOOGLE_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
})

export default {
    getCredentials
}
