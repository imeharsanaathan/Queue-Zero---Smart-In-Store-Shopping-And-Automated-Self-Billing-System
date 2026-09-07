'use client';
import {useState} from 'react';
import {ShoppingCart,Heart,GitCompare,Check,TrendingDown,Minus,Plus} from 'lucide-react';
import {motion} from 'framer-motion';
import type {Product} from '@/lib/data';
import {useQueueStore} from '@/lib/store';
import {money,discount} from '@/lib/utils';
import {Badge} from './ui/badge';
import {Button} from './ui/button';
import {toast} from 'sonner';
import {ProductDetailsModal} from './product-details-modal';

export function ProductCard({product,onCompare}:{product:Product;onCompare:(p:Product)=>void}){
  const [added,setAdded]=useState(false);
  const [qty,setQty]=useState(1);
  const [detailsOpen,setDetailsOpen]=useState(false);
  const add=useQueueStore(s=>s.add);
  const isFavorite=useQueueStore(s=>s.favorites.includes(product.id));
  const toggleFavorite=useQueueStore(s=>s.toggleFavorite);
  const d=discount(product.mrp,product.price);
  const max=Math.max(product.stock,1);
  const displayQty=Math.min(Math.max(qty,1),max);

  function addToCart(){
    if(product.stock<1)return;
    add(product,displayQty);
    setAdded(true);
    setDetailsOpen(false);
    toast.success(`${displayQty} × ${product.name} added to cart`);
    setTimeout(()=>setAdded(false),900);
  }

  return <>
    <motion.div whileHover={{y:-4}} className="group min-w-0 overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-xl">
      <div role="button" tabIndex={0} onClick={()=>setDetailsOpen(true)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' ')setDetailsOpen(true)}} className="block w-full min-w-0 cursor-pointer text-left" aria-label={`View details for ${product.name}`}>
        <div className="relative flex h-[150px] min-w-0 items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-emerald-50 p-2 sm:h-[210px] sm:p-4">
          {product.image?<img src={product.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain"/>:<div className="grid h-full w-full place-items-center rounded-xl bg-white/70 text-[10px] font-black text-slate-300">Product image</div>}
          <div className="absolute right-1.5 top-1.5 flex max-w-[55%] flex-wrap justify-end gap-1 sm:right-3 sm:top-3 sm:max-w-[75%] sm:gap-2">
            {product.bestSeller&&<Badge tone="amber">Best Seller</Badge>}
            {d>0&&<Badge tone="green">-{d}%</Badge>}
            <button type="button" aria-label={isFavorite?'Remove from favourites':`Add ${product.name} to favourites`} aria-pressed={isFavorite} onClick={async e=>{e.preventDefault();e.stopPropagation();const saved=await toggleFavorite(product.id);toast.success(saved?'Added to favourites':'Removed from favourites')}} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 transition hover:scale-105 sm:h-9 sm:w-9 ${isFavorite?'text-rose-500':'text-slate-500'}`}><Heart className={`h-4 w-4 sm:h-4.5 sm:w-4.5 ${isFavorite?'fill-current':''}`}/></button>
          </div>
        </div>
      </div>
      <div className="min-w-0 p-2.5 sm:p-4">
        <div className="flex min-w-0 flex-col items-stretch gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <span className="qz-word-safe w-fit max-w-full rounded-full bg-slate-950 px-2 py-1 text-[8px] font-black uppercase tracking-[.04em] text-white sm:px-2.5 sm:text-[10px]">{product.brand}</span>
          <Badge className="w-fit max-w-full shrink-0" tone={product.stock<8?'red':product.stock<20?'amber':'green'}>{product.stock} available</Badge>
        </div>
        <button type="button" onClick={()=>setDetailsOpen(true)} className="qz-word-safe mt-2 block w-full text-left text-[11px] font-extrabold leading-4 sm:mt-3 sm:text-sm sm:leading-5">{product.name}</button>
        <div className="mt-2 flex min-w-0 flex-wrap items-center gap-1 sm:mt-3 sm:gap-2"><span className="text-lg font-black sm:text-xl">{money(product.price)}</span>{product.mrp&&<span className="text-[10px] text-slate-400 line-through sm:text-xs">{money(product.mrp)}</span>}</div>
        <div className="qz-inline-safe mt-2 flex items-center gap-1 text-[9px] font-semibold leading-3 text-emerald-700 sm:text-[11px] sm:leading-normal"><TrendingDown className="h-3.5 w-3.5 shrink-0"/>Compare prices</div>
        <div className="mt-3 grid min-w-0 grid-cols-1 gap-2 sm:mt-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-2">
          <div className="flex w-full min-w-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 sm:w-auto" onClick={e=>e.stopPropagation()}>
            <button type="button" onClick={()=>setQty(x=>Math.max(1,x-1))} disabled={displayQty<=1} className="grid h-9 w-9 shrink-0 place-items-center hover:bg-white disabled:opacity-40 sm:h-10 sm:w-10"><Minus className="h-4 w-4"/></button>
            <input aria-label={`Quantity for ${product.name}`} type="number" min={1} max={max} value={displayQty} onChange={e=>setQty(Math.min(Math.max(Number(e.target.value)||1,1),max))} className="h-9 w-10 bg-transparent text-center text-xs font-black outline-none sm:h-10 sm:w-12 sm:text-sm"/>
            <button type="button" onClick={()=>setQty(x=>Math.min(max,x+1))} disabled={displayQty>=max} className="grid h-9 w-9 shrink-0 place-items-center hover:bg-white disabled:opacity-40 sm:h-10 sm:w-10"><Plus className="h-4 w-4"/></button>
          </div>
          <Button className="qz-mobile-action flex w-full min-w-0 items-center justify-center whitespace-nowrap overflow-visible px-0.5 text-[8px] leading-none sm:px-3 sm:text-xs sm:leading-normal gap-0.5 sm:gap-1" size="sm" variant={added?'success':'default'} disabled={added||product.stock<1} onClick={e=>{e.stopPropagation();addToCart()}}>{added?<Check className="hidden h-4 w-4 shrink-0 sm:block"/>:<ShoppingCart className="hidden h-4 w-4 shrink-0 sm:block"/>}<span className="qz-inline-safe block shrink-0 max-w-none">{product.stock<1?'Unavailable':added?'Added':'Add to cart'}</span></Button>
          <Button size="sm" variant="outline" className="qz-mobile-action flex w-full shrink-0 items-center justify-center whitespace-nowrap px-0.5 text-[8px] leading-none sm:w-auto sm:px-3 sm:text-xs sm:leading-normal gap-0.5 sm:gap-1" onClick={e=>{e.stopPropagation();onCompare(product)}} aria-label={`Compare ${product.name}`}><GitCompare className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"/><span className="block sm:hidden">Compare</span></Button>
        </div>
      </div>
    </motion.div>
    <ProductDetailsModal product={detailsOpen?product:null} onClose={()=>setDetailsOpen(false)} onAdd={addToCart}/>
  </>;
}
