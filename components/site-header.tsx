'use client';
import {Search,MapPin,ShoppingCart,UserRound,LogOut,PackageCheck,ChevronDown} from 'lucide-react';
import {BrandMark} from './brand-mark';
import {Button} from './ui/button';
import {useQueueStore} from '@/lib/store';
import {useRouter} from 'next/navigation';
import {toast} from 'sonner';

export function SiteHeader({user,onCart}:{user:{name:string;email:string;phone:string};onCart:()=>void}){
  const router=useRouter();
  const{city,store,setSearch,search,category,setCategory}=useQueueStore();
  const cartCount=useQueueStore(s=>s.cart.reduce((a,x)=>a+x.qty,0));

  async function logout(){
    await fetch('/api/auth/logout',{method:'POST'});
    toast.success('Signed out securely');
    try{localStorage.removeItem('queuezero-session')}catch{}
    window.location.assign('/login');
  }

  const goOrders=()=>router.push('/orders');
  const accountMenu=(mobile=false)=>(
    <details className={`group relative ${mobile?'w-full':'shrink-0'}`}>
      <summary className={`flex cursor-pointer list-none items-center justify-center gap-2 rounded-xl text-sm font-bold hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${mobile?'min-h-11 w-full border border-slate-200 px-3 bg-white':'px-3 py-2'}`}>
        <UserRound className="h-4 w-4"/>
        <span>Hi, {user.name.split(' ')[0]}</span>
        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180"/>
      </summary>
      <div className={`${mobile?'left-0 right-0 w-full':'right-0 w-64'} absolute top-[calc(100%+6px)] z-50 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl`}>
        <div className="rounded-xl bg-slate-50 p-3">
          <div className="text-[10px] font-bold text-slate-400">SIGNED IN AS</div>
          <div className="mt-1 font-black">{user.name}</div>
          <div className="mt-1 truncate text-xs text-slate-500">{user.email||user.phone}</div>
        </div>
        <button onClick={goOrders} className="mt-2 flex min-h-11 w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold hover:bg-slate-50">
          <PackageCheck className="h-4 w-4 text-blue-600"/>My orders
        </button>
        <button onClick={logout} className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50">
          <LogOut className="h-4 w-4"/>Sign out
        </button>
      </div>
    </details>
  );

  return <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,.06)]">
    <div className="mx-auto max-w-[1560px] px-3 sm:px-5">
      <div className="flex flex-wrap items-center gap-2 py-2.5 sm:flex-nowrap sm:gap-3">
        <div className="shrink-0"><BrandMark compact/></div>
        <div className="order-1 flex min-w-0 max-w-[48%] shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 sm:order-none sm:max-w-none sm:min-w-[280px] sm:px-3">
          <MapPin className="h-5 w-5 text-emerald-600"/>
          <div className="min-w-0"><div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Shopping at</div><div className="qz-word-safe text-xs font-black leading-4 sm:text-sm">{store?.name}</div></div>
        </div>
        <div className="relative order-2 min-w-0 basis-full flex-1 sm:order-none sm:basis-auto">
          <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products, brands and more..." className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm font-medium outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 sm:pr-4"/>
        </div>
        <div className="order-1 ml-auto shrink-0 sm:order-none sm:ml-0">{accountMenu(false)}</div>
        <Button className="order-1 shrink-0" size="sm" variant="success" onClick={onCart} aria-label={`Cart${cartCount?` with ${cartCount} items`:''}`}>
          <ShoppingCart className="h-4 w-4"/><span>Cart</span><span className="grid min-w-5 place-items-center rounded-full bg-white px-1 text-[10px] text-emerald-700">{cartCount}</span>
        </Button>
      </div>

      <div className="flex min-w-0 gap-1 overflow-x-auto border-t border-slate-100 py-2 no-scrollbar sm:items-center sm:gap-2">
        {['All Categories','Best Sellers','Electronics','Groceries','Fashion','Home & Kitchen','Beauty','Toys & More'].map(x=><button key={x} onClick={()=>{setCategory(x==='All Categories'?'All':x);document.getElementById('shop')?.scrollIntoView({behavior:'smooth'});}} className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-2 text-[10px] font-extrabold leading-none sm:px-3 sm:text-xs sm:leading-normal ${category===(x==='All Categories'?'All':x)?'bg-blue-600 text-white':'text-slate-600 hover:bg-slate-100'}`}>{x}</button>)}
        <div className="ml-auto hidden min-w-0 shrink-0 text-right text-[10px] font-bold leading-4 text-emerald-700 sm:block sm:text-[11px]">{city?.name} • {store?.brand} • {store?.kind}</div>
        <button onClick={()=>router.push('/city')} className="hidden shrink-0 rounded-full px-3 py-1.5 text-xs font-black text-blue-600 hover:bg-blue-50 sm:block">Change store</button>
      </div>

    </div>
  </header>;
}
