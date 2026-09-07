'use client';
import {X,ShoppingCart,TrendingDown,CheckCircle2} from 'lucide-react';
import {Product} from '@/lib/data';
import {money,discount} from '@/lib/utils';
import {Badge} from './ui/badge';
import {Button} from './ui/button';

export function ProductDetailsModal({product,onClose,onAdd}:{product:Product|null;onClose:()=>void;onAdd?:()=>void}){
  if(!product)return null;
  const d=discount(product.mrp,product.price);
  return <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 p-3 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`${product.name} details`} onClick={onClose}>
    <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={e=>e.stopPropagation()}>
      <button type="button" aria-label="Close product details" onClick={onClose} className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/95 shadow ring-1 ring-slate-200"><X className="h-5 w-5"/></button>
      <div className="bg-gradient-to-br from-yellow-50 via-white to-emerald-50 p-5 sm:p-7">
        {product.image?<img src={product.image} alt={product.name} className="mx-auto block h-52 w-full max-w-sm rounded-2xl object-contain shadow-sm"/>:<div className="grid h-52 place-items-center rounded-2xl bg-white text-sm font-black text-slate-400">Product image</div>}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">{product.brand}</span>
          {product.bestSeller&&<Badge tone="amber">Best Seller</Badge>}
          {d>0&&<Badge tone="green">-{d}%</Badge>}
        </div>
        <h2 className="mt-3 break-words text-2xl font-black leading-tight text-slate-950">{product.name}</h2>
      </div>
      <div className="space-y-5 p-5 sm:p-7">
        <div className="flex items-end gap-3"><span className="text-3xl font-black">{money(product.price)}</span>{product.mrp&&<span className="pb-1 text-sm text-slate-400 line-through">{money(product.mrp)}</span>}</div>
        <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700"><CheckCircle2 className="h-5 w-5 shrink-0"/> {product.stock>0?`${product.stock} units available at your selected store`:'Currently unavailable at your selected store'}</div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4"><div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Category</div><div className="mt-1 break-words text-sm font-bold">{product.browseCategory||product.category}</div></div>
          <div className="rounded-2xl bg-slate-50 p-4"><div className="text-[10px] font-black uppercase tracking-wider text-slate-400">Savings</div><div className="mt-1 flex items-center gap-1 text-sm font-bold text-emerald-700"><TrendingDown className="h-4 w-4"/>{product.mrp?money(product.mrp-product.price):'—'}</div></div>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row"><Button variant="outline" className="w-full" onClick={onClose}>Close</Button>{onAdd&&<Button variant="success" className="w-full" onClick={onAdd} disabled={product.stock<1}><ShoppingCart className="h-4 w-4"/> Add to cart</Button>}</div>
      </div>
    </div>
  </div>;
}
