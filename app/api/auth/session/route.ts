import {NextResponse} from 'next/server'; import {cookies} from 'next/headers'; import {userFromSession} from '@/lib/db';
export async function GET(){const user=await userFromSession((await cookies()).get('qz_session')?.value);return NextResponse.json({authenticated:!!user,user});}
