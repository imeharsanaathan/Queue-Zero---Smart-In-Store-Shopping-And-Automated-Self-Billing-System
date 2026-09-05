import {NextResponse} from 'next/server';
export async function POST(){const res=NextResponse.json({ok:true});for(const name of ['qz_session','qz_city','qz_store'])res.cookies.set(name,'',{httpOnly:true,expires:new Date(0),path:'/'});return res;}
