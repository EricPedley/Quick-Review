import { user, isAuthenticated, popupOpen } from './store'
import config from './auth_config'

async function createClient() {
  const auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  })

  return auth0Client
}

async function loginWithPopup(client, options) {
  popupOpen.set(true)
  try {
    await client.loginWithPopup(options)

    user.set(await client.getUser())
    isAuthenticated.set(true)
  } catch (e) {
    // eslint-disable-next-line
    console.error(e)
  } finally {
    popupOpen.set(false)
  }
}

function logout(client) {
  return client.logout()
}

const auth = {
  createClient,
  loginWithPopup,
  logout,
}

export default auth
