import config from './auth_config'

async function createClient() {
  const auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  })
  return auth0Client
}

async function loginWithPopup(client, options) {
  try {
    await client.loginWithPopup(options)
  } catch (e) {
    console.error(e)
  }
}

function logout(client) {
  return client.logout()
}

export { createClient, loginWithPopup, logout }
