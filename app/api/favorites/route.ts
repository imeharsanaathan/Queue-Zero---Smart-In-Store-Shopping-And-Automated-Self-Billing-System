import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {userIdFromSession} from '@/lib/db';
import {productsForStore,stores} from '@/lib/data';
import {getSupabaseAdmin} from '@/lib/supabase';

async function authUser(){
  return userIdFromSession((await cookies()).get('qz_session')?.value);
}

export async function GET(req:Request){
  const userId=await authUser();
  if(!userId)return NextResponse.json({ok:false,error:'Authentication required.'},{status:401});
  const url=new URL(req.url);
  const storeId=url.searchParams.get('storeId')||'';
  if(!storeId)return NextResponse.json({ok:false,error:'Store is required.'},{status:400});
  const store=stores.find(s=>s.id===storeId);
  if(!store)return NextResponse.json({ok:false,error:'Store not found.'},{status:404});
  const db:any=getSupabaseAdmin();
  const {data,error}=await db.from('qz_favorites').select('product_id').eq('user_id',userId).eq('store_id',storeId).order('created_at',{ascending:false});
  if(error)return NextResponse.json({ok:false,error:'Unable to load favourites.'},{status:500});
  const allowed=new Set(productsForStore(store).map(p=>p.id));
  const productIds=(data??[]).map((x:any)=>String(x.product_id)).filter((id:string)=>allowed.has(id));
  return NextResponse.json({ok:true,productIds});
}

export async function POST(req:Request){
  const userId=await authUser();
  if(!userId)return NextResponse.json({ok:false,error:'Authentication required.'},{status:401});
  const body=await req.json().catch(()=>({}));
  const storeId=String(body.storeId||''),productId=String(body.productId||'');
  const store=stores.find(s=>s.id===storeId);
  if(!store||!productId)return NextResponse.json({ok:false,error:'Store and product are required.'},{status:400});
  if(!productsForStore(store).some(p=>p.id===productId))return NextResponse.json({ok:false,error:'Product is not available at this store.'},{status:400});
  const db:any=getSupabaseAdmin();
  const {error}=await db.from('qz_favorites').upsert({user_id:userId,store_id:storeId,product_id:productId,created_at:new Date().toISOString()},{onConflict:'user_id,store_id,product_id'});
  if(error)return NextResponse.json({ok:false,error:'Unable to save favourite.'},{status:500});
  return NextResponse.json({ok:true,favourite:true});
}

export async function DELETE(req:Request){
  const userId=await authUser();
  if(!userId)return NextResponse.json({ok:false,error:'Authentication required.'},{status:401});
  const body=await req.json().catch(()=>({}));
  const storeId=String(body.storeId||''),productId=String(body.productId||'');
  if(!storeId||!productId)return NextResponse.json({ok:false,error:'Store and product are required.'},{status:400});
  const db:any=getSupabaseAdmin();
  const {error}=await db.from('qz_favorites').delete().eq('user_id',userId).eq('store_id',storeId).eq('product_id',productId);
  if(error)return NextResponse.json({ok:false,error:'Unable to remove favourite.'},{status:500});
  return NextResponse.json({ok:true,favourite:false});
}
