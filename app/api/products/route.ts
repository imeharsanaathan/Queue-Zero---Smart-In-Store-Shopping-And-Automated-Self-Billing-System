import {NextResponse} from 'next/server';
import {productsForStoreBrowse,stores,type BrowseCategory} from '@/lib/data';
import {inventoryForStore} from '@/lib/db';
export async function GET(req:Request){
 const {searchParams}=new URL(req.url); const q=(searchParams.get('q')||'').toLowerCase(); const category=searchParams.get('category')||'All'; const storeId=searchParams.get('storeId');
 if(!storeId)return NextResponse.json({data:[],count:0,error:'Store selection required.'},{status:400});
 const store=stores.find(s=>s.id===storeId); if(!store)return NextResponse.json({data:[],count:0,error:'Store not found.'},{status:404});
 const inventory=Object.fromEntries((await inventoryForStore(storeId)).map((x: {productId:string; stock:number})=>[x.productId,x.stock]));
 const browse=(category === 'All' ? 'All Categories' : category) as BrowseCategory;
 const data=productsForStoreBrowse(store,browse).map(p=>({...p,stock:inventory[p.id]??0})).filter(p=>!q||`${p.name} ${p.brand}`.toLowerCase().includes(q));
 return NextResponse.json({data,count:data.length,storeId});
}
