import {os} from '$lib/openscreen'
import cookie from 'cookie'
export async function get({url, request}) {
    const cookieObject = cookie.parse(request.headers.get('Cookie')||'')
    const user = JSON.parse(cookieObject?.user||'{}')
    const scanId = url.searchParams.get('scanId')
    const scan = await os.scan(scanId).get();
    return {
        status: 200,
        body: {
            scan, user
        }
    }
}
