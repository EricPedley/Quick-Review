import {os} from '$lib/openscreen'
import cookie from 'cookie'
export async function get({url, request}) {
    const cookieObject = cookie.parse(request.headers.get('Cookie'))
    console.log(cookieObject)
    console.log(cookieObject.user)
    console.log(typeof cookieObject.user)
    const user = cookieObject.user&&JSON.parse(cookieObject.user)
    const scanId = url.searchParams.get('scanId')
    const scan = await os.scan(scanId).get();
    return {
        status: 200,
        body: {
            scan, user
        }
    }
}
