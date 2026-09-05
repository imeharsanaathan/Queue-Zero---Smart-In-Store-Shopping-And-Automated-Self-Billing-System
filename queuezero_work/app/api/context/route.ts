import {NextResponse} from 'next/server';
import {cities,stores} from '@/lib/data';
import {userFromSession} from '@/lib/db';
import {cookies} from 'next/headers';
export async function POST(req:Request){
  const session=(await cookies()).get('qz_session')?.value;
  if(!(await userFromSession(session))) return NextResponse.json({ok:false,error:'Authentication required.'},{status:401});
  const body=await req.json().catch(()=>({}));
  const city=cities.find(c=>c.id===body.cityId);
  if(!city) return NextResponse.json({ok:false,error:'City not found.'},{status:400});
  const res=NextResponse.json({ok:true});
  res.cookies.set('qz_city',city.id,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:90*86400});
  if(body.storeId){
    const store=stores.find(s=>s.id===body.storeId&&s.cityId===city.id);
    if(!store) return NextResponse.json({ok:false,error:'Store does not belong to the selected city.'},{status:400});
    res.cookies.set('qz_store',store.id,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:90*86400});
  } else res.cookies.delete('qz_store');
  return res;
}
