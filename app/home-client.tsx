'use client';
import {useEffect,useMemo,useState} from 'react';
import {ArrowRight,ShoppingBag} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {SiteHeader} from '@/components/site-header';
import {Catalog} from '@/components/catalog';
import {CompareDrawer} from '@/components/compare-drawer';
import {ProductDetailsModal} from '@/components/product-details-modal';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Product,City,Store as StoreType} from '@/lib/data';
import {productsForStore} from '@/lib/data';
import {money} from '@/lib/utils';
import {useQueueStore} from '@/lib/store';
import {ProductCard} from '@/components/product-card';

export default function Home({user,city,store}:{user:{id:string;name:string;email:string;phone:string};city:City;store:StoreType}){
  const router=useRouter();
  const setCity=useQueueStore(s=>s.setCity),setStore=useQueueStore(s=>s.setStore),setFavorites=useQueueStore(s=>s.setFavorites),favoriteIds=useQueueStore(s=>s.favorites);
  const cartCount=useQueueStore(s=>s.cart.reduce((a,x)=>a+x.qty,0));
  const [compare,setCompare]=useState<Product|null>(null);
  const [selectedProduct,setSelectedProduct]=useState<Product|null>(null);
  useEffect(()=>{setCity(city);setStore(store)},[city.id,store.id]);
  useEffect(()=>{let alive=true;fetch(`/api/favorites?storeId=${encodeURIComponent(store.id)}`).then(r=>r.ok?r.json():null).then(d=>{if(alive&&d?.ok)setFavorites(d.productIds||[])}).catch(()=>{});return()=>{alive=false}},[store.id,setFavorites]);
  const featured=useMemo(()=>{const pool=productsForStore(store);const best=pool.filter(p=>p.bestSeller);return (best.length?best:pool).slice(0,4)},[store.id]);
  return <div className="min-h-screen bg-[#f7f9fc]">
    <SiteHeader user={user} onCart={()=>router.push('/cart')}/>
    <main className="mx-auto max-w-[1560px] px-3 pb-24 sm:px-5">
      <section className="pt-4">
        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-[1.4fr_.6fr]">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-600 to-emerald-500 p-3 text-white shadow-commercial sm:p-10">
            <Badge className="!bg-white/15 !text-white">SHOPPING AT {store.brand.toUpperCase()}</Badge>
            <h1 className="mt-3 text-2xl font-black leading-none sm:mt-5 sm:text-6xl">Shop smart.<br/><span className="text-yellow-300">Skip the queue.</span></h1>
            <p className="mt-3 hidden max-w-2xl text-sm leading-6 text-white/85 sm:mt-4 sm:block sm:text-base">{store.name}, {city.name}. Browse only this outlet's assortment and see the exact number of units available before you add to cart.</p>
            <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
              <Button size="lg" variant="success" onClick={()=>document.getElementById('shop')?.scrollIntoView({behavior:'smooth'})}>Shop now <ArrowRight className="h-5 w-5"/></Button>
              <Button size="lg" className="!bg-white !text-slate-950" onClick={()=>router.push('/cart')}><ShoppingBag className="h-5 w-5"/> Cart ({cartCount})</Button>
            </div>
          </div>
          <div className="rounded-3xl bg-yellow-300 p-3 text-slate-950 sm:p-6">
            <div className="text-[9px] font-black uppercase tracking-[.15em] sm:text-xs sm:tracking-[.2em]">Big deals today</div>
            <div className="mt-2 whitespace-normal break-normal text-xl font-black leading-tight sm:text-3xl">Bright offers. Fast checkout.</div>
            <div className="mt-2 whitespace-normal break-normal text-xs font-semibold leading-4 sm:mt-3 sm:text-sm sm:leading-normal">Prices and availability are locked to your selected store.</div>
          </div>
        </div>
      </section>
      <section className="py-3 sm:py-5">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="text-xs font-black uppercase tracking-[.2em] text-slate-400">Your store</div>
          <div className="mt-2 whitespace-normal break-normal text-lg font-black leading-5 sm:text-xl sm:leading-normal">{store.name}</div>
          <div className="mt-2 whitespace-normal break-normal text-sm leading-5 text-slate-500">{store.address}</div>
          <button onClick={()=>router.push('/city')} className="mt-4 whitespace-normal break-normal text-xs font-black text-blue-600">Change city / store</button>
        </div>
      </section>
      <section className="py-5">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div className="min-w-0"><Badge tone="amber">BEST SELLERS</Badge><h2 className="mt-2 whitespace-normal break-normal text-xl font-black leading-tight sm:text-2xl">Popular at {store.name}</h2></div>
          <div className="shrink-0 text-[10px] font-bold text-slate-400 sm:text-xs">4 outlet picks</div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
          {featured.map(p=><button key={p.id} type="button" onClick={()=>setSelectedProduct(p)} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-2.5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg sm:p-4">
            <div className="qz-featured-image-box rounded-xl bg-gradient-to-br from-slate-50 to-emerald-50 p-1.5 sm:rounded-2xl sm:p-2.5">
              {p.image?<img src={p.image} alt={p.name} loading="lazy" decoding="async" className="qz-featured-image"/>:<div className="grid h-full w-full place-items-center text-[10px] font-black text-slate-300">Product image</div>}
            </div>
            <div className="mt-2 qz-word-safe whitespace-normal break-normal text-[11px] font-black leading-4 sm:mt-3 sm:text-base sm:leading-5">{p.name}</div>
            <div className="mt-2 flex min-w-0 flex-wrap items-center justify-between gap-1.5 sm:mt-3">
              <div className="text-base font-black sm:text-lg">{money(p.price)}</div>
              <Badge tone="green" className="shrink-0">{p.stock} available</Badge>
            </div>
          </button>)}
        </div>
      </section>
      <section className="py-5">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div><Badge tone="green">YOUR FAVOURITES</Badge><h2 className="mt-2 text-xl font-black leading-tight sm:text-2xl">Favourite products at {store.name}</h2><p className="mt-1 text-xs text-slate-500 sm:text-sm">Saved to your QueueZero account for this selected store.</p></div>
          <div className="text-[10px] font-bold text-slate-400 sm:text-xs">{favoriteIds.length} saved</div>
        </div>
        {favoriteIds.length===0 ? <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center text-xs font-semibold text-slate-500 sm:p-7 sm:text-sm">Tap the heart on any product to save it here.</div> : <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">{productsForStore(store).filter(p=>favoriteIds.includes(p.id)).map(p=><ProductCard key={`fav-${p.id}`} product={p} onCompare={setCompare}/>)}</div>}
      </section>
      <Catalog onCompare={setCompare}/>
    </main>
    <ProductDetailsModal product={selectedProduct} onClose={()=>setSelectedProduct(null)}/>
    <CompareDrawer product={compare} onClose={()=>setCompare(null)}/>
  </div>;
}
