import {NextResponse} from 'next/server'; import {cookies} from 'next/headers'; import {listOrders,userIdFromSession} from '@/lib/db';
export async function GET(){const uid=await userIdFromSession((await cookies()).get('qz_session')?.value);if(!uid)return NextResponse.json({error:'Authentication required'},{status:401});return NextResponse.json({orders:await listOrders(uid)});}
