import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {City,Product,Store} from './data';
type CartLine={product:Product;qty:number};
type QueueState={city:City|null;store:Store|null;cart:CartLine[];search:string;category:string;sort:string;mode:'pickup'|'delivery';dark:boolean;inventory:Record<string,number>;setCity:(city:City)=>void;setStore:(store:Store)=>Promise<void>;hydrateStore:(store:Store)=>Promise<void>;refreshInventory:()=>Promise<void>;stock:(p:Product)=>number;add:(p:Product,qty?:number)=>void;increment:(id:string)=>void;decrement:(id:string)=>void;remove:(id:string)=>void;clear:()=>void;setSearch:(v:string)=>void;setCategory:(v:string)=>void;setSort:(v:string)=>void;setMode:(v:'pickup'|'delivery')=>void;setDark:(v:boolean)=>void};
export const useQueueStore=create<QueueState>()(persist((set,get)=>({
 city:null,store:null,cart:[],search:'',category:'All',sort:'Popular',mode:'pickup',dark:false,inventory:{},
 setCity:(city)=>set({city,store:null,inventory:{},cart:[]}),
 setStore:async(store)=>{set({store,cart:[]});try{const r=await fetch(`/api/products?storeId=${encodeURIComponent(store.id)}`);const d=await r.json();set({inventory:Object.fromEntries((d.data||[]).map((p:Product)=>[p.id,p.stock]))})}catch{}},
 hydrateStore:async(store)=>{set({store});try{const r=await fetch(`/api/products?storeId=${encodeURIComponent(store.id)}`);const d=await r.json();set({inventory:Object.fromEntries((d.data||[]).map((p:Product)=>[p.id,p.stock]))})}catch{}},
 refreshInventory:async()=>{const store=get().store;if(!store)return;try{const r=await fetch(`/api/products?storeId=${encodeURIComponent(store.id)}`);const d=await r.json();set({inventory:Object.fromEntries((d.data||[]).map((p:Product)=>[p.id,p.stock]))})}catch{}},
 stock:(p)=>get().inventory[p.id]??p.stock,
 add:(p,requested=1)=>set(s=>{const max=s.inventory[p.id]??p.stock;const e=s.cart.find(x=>x.product.id===p.id);if(max<1)return s;const nextQty=Math.min(Math.max(1,requested),max);if(e&&e.qty>=max)return s;return {cart:e?s.cart.map(x=>x.product.id===p.id?{...x,qty:Math.min(max,x.qty+nextQty)}:x):[...s.cart,{product:p,qty:nextQty}]}}),
 increment:(id)=>set(s=>({cart:s.cart.map(x=>x.product.id===id?{...x,qty:Math.min(x.qty+1,s.inventory[id]??x.product.stock)}:x)})),
 decrement:(id)=>set(s=>({cart:s.cart.flatMap(x=>x.product.id===id?(x.qty<=1?[]:[{...x,qty:x.qty-1}]):[x])})),
 remove:(id)=>set(s=>({cart:s.cart.filter(x=>x.product.id!==id)})),
 clear:()=>set({cart:[]}),setSearch:(search)=>set({search}),setCategory:(category)=>set({category}),setSort:(sort)=>set({sort}),setMode:(mode)=>set({mode}),setDark:(dark)=>set({dark})
}),{name:'queuezero-session',partialize:s=>({city:s.city,store:s.store,cart:s.cart,search:s.search,category:s.category,sort:s.sort,mode:s.mode,dark:s.dark})}));
