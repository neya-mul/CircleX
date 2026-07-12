import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from './lib/auth'

// This function can be marked `async` if using `await` inside
export async function proxy(request: any) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))

    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/details/:path', '/add-posts', '/analytics', '/manage-posts', '/profile'],
}