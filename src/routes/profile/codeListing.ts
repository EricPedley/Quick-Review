import { os } from '$lib/openscreen'
import { getDatabase, ref, onValue, get as dbGet } from 'firebase/database'
import { initializeApp } from 'firebase/app'
import cookie from 'cookie'
const firebaseConfig = {
  ...import.meta.env.VITE_FIREBASE_CREDENTIALS,
  databaseURL: import.meta.env.VITE_FIREBASE_URL,
}

async function getAssetIDs(id) {
  if(id==undefined) {
    return []
  }
  const app = initializeApp(firebaseConfig)
  const db = getDatabase(app)

  const userRef = ref(db, `users/${id}/assetIDs`)
  const snapshot = await dbGet(userRef)
  if(!snapshot.exists())
    return []
  const assetIDs = snapshot.val()

  return assetIDs
}

async function get({request}) {
  const user = JSON.parse(cookie.parse(request.headers.get('cookie')).user)
  const userId = user.email?.slice?.(0,user.email.indexOf('@')).replaceAll?.('.','dot')
  const assetIDs = await getAssetIDs(userId)
  const res = await Promise.all(
    assetIDs.map((assetID) => {
      return os.asset(assetID).get()
    })
  )

  return {
    body: {
      assetIDs: res,
    },
  }
}

export { get }
