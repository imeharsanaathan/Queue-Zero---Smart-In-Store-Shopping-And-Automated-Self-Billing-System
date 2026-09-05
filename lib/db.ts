import crypto from 'node:crypto';
import { allProducts, productsForStore, stores } from './data';
import { getSupabaseAdmin } from './supabase';

export type DbUser={id:string;name:string;email:string;phone:string;passwordHash:string;salt:string;createdAt:string};
export type DbSession={token:string;userId:string;expiresAt:string};
export type InventoryRow={storeId:string;productId:string;stock:number;baseStock:number;restockAt:string|null};
export type OrderItem={id:string;name:string;qty:number;price:number};
export type DbOrder={id:string;userId:string;storeId:string;storeName:string;mode:'pickup'|'delivery';items:OrderItem[];subtotal:number;gst:number;delivery:number;total:number;status:'PAID';createdAt:string;verification:string};
export type PaymentSession={id:string;userId:string;storeId:string;storeName:string;mode:'pickup'|'delivery';items:OrderItem[];subtotal:number;gst:number;delivery:number;total:number;status:'PENDING'|'PAID';createdAt:string};

type UserRow={id:string;name:string;email:string|null;phone:string|null;password_hash:string;salt:string;created_at:string};
type SessionRow={token:string;user_id:string;expires_at:string};
type InventoryDbRow={store_id:string;product_id:string;stock:number;base_stock:number;restock_at:string|null};
type PaymentRow={id:string;user_id:string;store_id:string;store_name:string;mode:'pickup'|'delivery';items:OrderItem[]|unknown;subtotal:number;gst:number;delivery:number;total:number;status:'PENDING'|'PAID';created_at:string};
type OrderRow={id:string;user_id:string;store_id:string;store_name:string;mode:'pickup'|'delivery';items:OrderItem[]|unknown;subtotal:number;gst:number;delivery:number;total:number;status:'PAID';created_at:string;verification:string};

const emailKey=(v='')=>v.trim().toLowerCase();
const phoneKey=(v='')=>v.replace(/\D/g,'');
const now=()=>new Date();
const asItems=(value:OrderItem[]|unknown)=>Array.isArray(value)?value as OrderItem[]:[];
const toUser=(u:UserRow):DbUser=>({id:u.id,name:u.name,email:u.email??'',phone:u.phone??'',passwordHash:u.password_hash,salt:u.salt,createdAt:u.created_at});
const toSession=(s:SessionRow):DbSession=>({token:s.token,userId:s.user_id,expiresAt:s.expires_at});
const toInventory=(r:InventoryDbRow):InventoryRow=>({storeId:r.store_id,productId:r.product_id,stock:r.stock,baseStock:r.base_stock,restockAt:r.restock_at});
const toPayment=(p:PaymentRow):PaymentSession=>({id:p.id,userId:p.user_id,storeId:p.store_id,storeName:p.store_name,mode:p.mode,items:asItems(p.items),subtotal:p.subtotal,gst:p.gst,delivery:p.delivery,total:p.total,status:p.status,createdAt:p.created_at});
const toOrder=(o:OrderRow):DbOrder=>({id:o.id,userId:o.user_id,storeId:o.store_id,storeName:o.store_name,mode:o.mode,items:asItems(o.items),subtotal:o.subtotal,gst:o.gst,delivery:o.delivery,total:o.total,status:o.status,createdAt:o.created_at,verification:o.verification});
const safeUser=(u:DbUser)=>({id:u.id,name:u.name,email:u.email,phone:u.phone});

function fail(operation:string,error:unknown):never {
  const message=error && typeof error==='object' && 'message' in error ? String((error as {message?:unknown}).message) : String(error);
  throw new Error(`${operation}: ${message}`);
}

export function hashPassword(password:string,salt=crypto.randomBytes(16).toString('hex')){
  return {hash:crypto.scryptSync(password,salt,64).toString('hex'),salt};
}

export function verifyPassword(password:string,hash:string,salt:string){
  const computed=crypto.scryptSync(password,salt,64).toString('hex');
  if(computed.length!==hash.length) return false;
  return crypto.timingSafeEqual(Buffer.from(computed,'utf8'),Buffer.from(hash,'utf8'));
}

export async function createUser(input:{name:string;email?:string;phone?:string;password:string}){
  const db=getSupabaseAdmin();
  const email=emailKey(input.email),phone=phoneKey(input.phone);
  if(!input.name.trim()) throw new Error('Full name is required.');
  if(!input.password||input.password.length<8) throw new Error('Password must be at least 8 characters.');
  if(!email&&!phone) throw new Error('Email or phone is required.');
  try {
    if(email){const {data,error}=await db.from('qz_users').select('id').eq('email',email).maybeSingle();if(error)fail('User lookup failed',error);if(data)throw new Error('An account with this email already exists. Sign in instead.');}
    if(phone){const {data,error}=await db.from('qz_users').select('id').eq('phone',phone).maybeSingle();if(error)fail('User lookup failed',error);if(data)throw new Error('An account with this phone number already exists. Sign in instead.');}
    const {hash,salt}=hashPassword(input.password);
    const user:DbUser={id:`user_${crypto.randomUUID()}`,name:input.name.trim(),email,phone,passwordHash:hash,salt,createdAt:now().toISOString()};
    const {error}=await db.from('qz_users').insert({id:user.id,name:user.name,email:user.email||null,phone:user.phone||null,password_hash:user.passwordHash,salt:user.salt,created_at:user.createdAt});
    if(error){ if(error.code==='23505') throw new Error('An account with those details already exists. Sign in instead.'); fail('Account creation failed',error); }
    return safeUser(user);
  } catch(e){ if(e instanceof Error) throw e; return fail('Account creation failed',e); }
}

export async function loginUser(input:{email?:string;phone?:string;password:string}){
  const db=getSupabaseAdmin();
  const email=emailKey(input.email),phone=phoneKey(input.phone);
  try {
    let query=db.from('qz_users').select('id,name,email,phone,password_hash,salt,created_at');
    if(email) query=query.eq('email',email); else if(phone) query=query.eq('phone',phone); else throw new Error('Email or phone is required.');
    const {data,error}=await query.maybeSingle();
    if(error)fail('Login lookup failed',error);
    const u=data as UserRow|null;
    if(!u||!verifyPassword(input.password,u.password_hash,u.salt)) throw new Error('Invalid credentials.');
    return safeUser(toUser(u));
  } catch(e){ if(e instanceof Error) throw e; return fail('Login failed',e); }
}

export async function createSession(userId:string){
  const db=getSupabaseAdmin();
  const token=crypto.randomBytes(32).toString('hex');
  const expiresAt=new Date(Date.now()+30*86400000).toISOString();
  try {
    await db.from('qz_sessions').delete().lt('expires_at',now().toISOString());
    const {error}=await db.from('qz_sessions').insert({token,user_id:userId,expires_at:expiresAt});
    if(error)fail('Session creation failed',error);
    return token;
  } catch(e){return fail('Session creation failed',e);}
}

export async function userFromSession(token?:string){
  const userId=await userIdFromSession(token); if(!userId)return null;
  const db=getSupabaseAdmin();
  const {data,error}=await db.from('qz_users').select('id,name,email,phone,password_hash,salt,created_at').eq('id',userId).maybeSingle();
  if(error)fail('Session user lookup failed',error);
  return data?safeUser(toUser(data as UserRow)):null;
}

export async function userIdFromSession(token?:string){
  if(!token)return null;
  const db=getSupabaseAdmin();
  await db.from('qz_sessions').delete().lt('expires_at',now().toISOString());
  const {data,error}=await db.from('qz_sessions').select('user_id').eq('token',token).gt('expires_at',now().toISOString()).maybeSingle();
  if(error)fail('Session lookup failed',error);
  return data?.user_id??null;
}

function applyRestock(row:InventoryRow){
  if(row.stock===0&&row.restockAt&&new Date(row.restockAt)<=now()){row.stock=row.baseStock;row.restockAt=null;return true}
  return false;
}

export async function inventoryForStore(storeId:string){
  const db=getSupabaseAdmin();
  try {
    let {data,error}=await db.from('qz_inventory').select('store_id,product_id,stock,base_stock,restock_at').eq('store_id',storeId);
    if(error)fail('Inventory lookup failed',error);
    const existing=new Set((data??[]).map(x=>String((x as InventoryDbRow).product_id)));
    const missing=allProducts.filter(p=>!existing.has(p.id)).map(p=>({store_id:storeId,product_id:p.id,stock:p.stock,base_stock:p.stock,restock_at:null}));
    if(missing.length){
      const {error:seedError}=await db.from('qz_inventory').upsert(missing,{onConflict:'store_id,product_id'});
      if(seedError)fail('Inventory initialization failed',seedError);
      const refreshed=await db.from('qz_inventory').select('store_id,product_id,stock,base_stock,restock_at').eq('store_id',storeId);
      if(refreshed.error)fail('Inventory refresh failed',refreshed.error);
      data=refreshed.data;
    }
    const rows=(data??[]).map(x=>toInventory(x as InventoryDbRow));
    for(const row of rows){
      if(applyRestock(row)){
        const {error:updateError}=await db.from('qz_inventory').update({stock:row.stock,restock_at:row.restockAt}).eq('store_id',row.storeId).eq('product_id',row.productId);
        if(updateError)fail('Inventory restock failed',updateError);
      }
    }
    return rows;
  } catch(e){return fail('Inventory lookup failed',e);}
}

export async function createPaymentSession(userId:string,input:{storeId:string;mode:'pickup'|'delivery';items:{id:string;qty:number}[]}){
  const db=getSupabaseAdmin();
  const store=stores.find(s=>s.id===input.storeId);
  if(!store)throw new Error('Store not found.');
  if(!input.items?.length)throw new Error('Your cart is empty.');
  try {
    const invRows=await inventoryForStore(input.storeId);
    const rows:OrderItem[]=[];
    const allowedIds=new Set(productsForStore(store).map(p=>p.id));
    for(const raw of input.items){
      const qty=Number(raw.qty);
      if(!Number.isInteger(qty)||qty<1||qty>99)throw new Error('Invalid quantity.');
      const product=allProducts.find(p=>p.id===raw.id);
      if(!product)throw new Error('Product not found.');
      if(!allowedIds.has(product.id))throw new Error(`${product.name} is not sold by ${store.name}.`);
      const storeProduct=productsForStore(store).find(p=>p.id===product.id);
      if(!storeProduct)throw new Error(`${product.name} is not sold by ${store.name}.`);
      const inv=invRows.find(x=>x.storeId===input.storeId&&x.productId===product.id);
      if(!inv)throw new Error(`Inventory unavailable for ${product.name}.`);
      if(inv.stock<qty)throw new Error(`${product.name} has only ${inv.stock} unit(s) available.`);
      rows.push({id:storeProduct.id,name:storeProduct.name,qty,price:storeProduct.price});
    }
    const subtotal=rows.reduce((a,x)=>a+x.price*x.qty,0);
    const gst=Math.round(subtotal*.05);
    const delivery=input.mode==='delivery'?49:0;
    const total=subtotal+gst+delivery;
    const p:PaymentSession={id:`pay_${crypto.randomUUID()}`,userId,storeId:store.id,storeName:store.name,mode:input.mode,items:rows,subtotal,gst,delivery,total,status:'PENDING',createdAt:now().toISOString()};
    const {error}=await db.from('qz_payments').insert({id:p.id,user_id:p.userId,store_id:p.storeId,store_name:p.storeName,mode:p.mode,items:p.items,subtotal:p.subtotal,gst:p.gst,delivery:p.delivery,total:p.total,status:p.status,created_at:p.createdAt});
    if(error)fail('Payment session creation failed',error);
    return p;
  } catch(e){ if(e instanceof Error)throw e; return fail('Payment session creation failed',e); }
}

export async function getPaymentSession(id:string){
  const db=getSupabaseAdmin();
  const {data,error}=await db.from('qz_payments').select('*').eq('id',id).maybeSingle();
  if(error)fail('Payment session lookup failed',error);
  return data?toPayment(data as PaymentRow):null;
}

export async function completePayment(id:string,userId:string){
  const db=getSupabaseAdmin();
  try {
    const payment=await getPaymentSession(id);
    if(!payment)throw new Error('Payment session not found.');
    if(payment.userId!==userId)throw new Error('Unauthorized payment session.');
    if(payment.status==='PAID'){
      const {data,error}=await db.from('qz_orders').select('*').eq('user_id',userId).eq('store_id',payment.storeId).eq('created_at',payment.createdAt).maybeSingle();
      if(error)fail('Paid order lookup failed',error);
      return data?toOrder(data as OrderRow):null;
    }
    for(const item of payment.items){
      const {data,error}=await db.from('qz_inventory').select('store_id,product_id,stock,base_stock,restock_at').eq('store_id',payment.storeId).eq('product_id',item.id).maybeSingle();
      if(error)fail('Inventory check failed',error);
      if(!data)throw new Error(`Inventory missing for ${item.name}.`);
      const row=toInventory(data as InventoryDbRow);
      if(applyRestock(row)){
        const {error:updateError}=await db.from('qz_inventory').update({stock:row.stock,restock_at:row.restockAt}).eq('store_id',row.storeId).eq('product_id',row.productId);
        if(updateError)fail('Inventory restock failed',updateError);
      }
      if(row.stock<item.qty)throw new Error(`${item.name} now has only ${row.stock} unit(s) available.`);
    }
    for(const item of payment.items){
      const {data,error}=await db.from('qz_inventory').select('stock,base_stock,restock_at').eq('store_id',payment.storeId).eq('product_id',item.id).maybeSingle();
      if(error)fail('Inventory update lookup failed',error);
      if(!data)throw new Error(`Inventory missing for ${item.name}.`);
      const stock=Math.max(0,Number(data.stock)-item.qty);
      const restockAt=stock===0?new Date(Date.now()+30000).toISOString():data.restock_at;
      const {error:updateError}=await db.from('qz_inventory').update({stock,restock_at:restockAt}).eq('store_id',payment.storeId).eq('product_id',item.id);
      if(updateError)fail('Inventory update failed',updateError);
    }
    const order:DbOrder={id:`QZ-${Date.now().toString(36).toUpperCase()}`,userId,storeId:payment.storeId,storeName:payment.storeName,mode:payment.mode,items:payment.items,subtotal:payment.subtotal,gst:payment.gst,delivery:payment.delivery,total:payment.total,status:'PAID',createdAt:payment.createdAt,verification:`QZ|${Date.now()}|${crypto.randomBytes(8).toString('hex').toUpperCase()}`};
    const {error:orderError}=await db.from('qz_orders').insert({id:order.id,user_id:order.userId,store_id:order.storeId,store_name:order.storeName,mode:order.mode,items:order.items,subtotal:order.subtotal,gst:order.gst,delivery:order.delivery,total:order.total,status:order.status,created_at:order.createdAt,verification:order.verification});
    if(orderError)fail('Order creation failed',orderError);
    const {error:paymentError}=await db.from('qz_payments').update({status:'PAID'}).eq('id',id).eq('user_id',userId).eq('status','PENDING');
    if(paymentError)fail('Payment completion failed',paymentError);
    return order;
  } catch(e){ if(e instanceof Error)throw e; return fail('Payment completion failed',e); }
}

export async function listOrders(userId:string){
  const db=getSupabaseAdmin();
  const {data,error}=await db.from('qz_orders').select('*').eq('user_id',userId).order('created_at',{ascending:false});
  if(error)fail('Order lookup failed',error);
  return (data??[]).map(x=>toOrder(x as OrderRow));
}
