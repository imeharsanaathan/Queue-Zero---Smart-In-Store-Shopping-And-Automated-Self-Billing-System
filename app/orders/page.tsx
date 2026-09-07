import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {userFromSession,listOrders} from '@/lib/db';
import type {DbOrder,OrderItem} from '@/lib/db';
import {money} from '@/lib/utils';
import {PackageCheck,ArrowLeft} from 'lucide-react';
import Link from 'next/link';
import {BrandMark} from '@/components/brand-mark';

export default async function OrdersPage(){
  const c=await cookies();
  const user=await userFromSession(c.get('qz_session')?.value);
  if(!user) redirect('/login');
  const orders=await listOrders(user.id);
  return <main className="min-h-screen bg-[#f7f9fc]">
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-600"><ArrowLeft className="h-4 w-4"/>Back to shopping</Link>
        <BrandMark compact/><div className="w-24"/>
      </div>
    </header>
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <div><div className="text-xs font-black uppercase tracking-[.2em] text-blue-600">Customer account</div><h1 className="mt-2 text-4xl font-black">My orders</h1><p className="mt-2 text-sm text-slate-500">Recent paid orders placed on QueueZero.</p></div>
      {orders.length===0 ? <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center"><PackageCheck className="mx-auto h-10 w-10 text-slate-300"/><div className="mt-4 text-lg font-black">No orders yet</div><div className="mt-1 text-sm text-slate-500">Complete a payment and your order history will appear here.</div></div> : <div className="mt-8 space-y-4">
        {orders.map((order:DbOrder)=><article key={order.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><div className="text-xs font-black uppercase tracking-wider text-blue-600">{order.id}</div><div className="mt-1 text-lg font-black">{order.storeName}</div><div className="mt-1 text-xs text-slate-500">{new Date(order.createdAt).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'})} • {order.mode==='pickup'?'Self pickup':'Store delivery'}</div></div><div className="text-left sm:text-right"><div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-700 inline-flex">PAID</div><div className="mt-2 text-2xl font-black">{money(order.total)}</div></div></div>
          <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">{order.items.map((item:OrderItem)=><div key={`${order.id}-${item.id}`} className="flex justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm"><span className="font-semibold">{item.name} × {item.qty}</span><span className="font-black">{money(item.price*item.qty)}</span></div>)}</div>
        </article>)}
      </div>}
    </div>
  </main>;
}
