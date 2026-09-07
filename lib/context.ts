import {cookies} from 'next/headers';
import {cities, stores} from '@/lib/data';
export async function getShoppingContext(){
  const c=await cookies();
  const cityId=c.get('qz_city')?.value||null;
  const storeId=c.get('qz_store')?.value||null;
  const city=cities.find(x=>x.id===cityId)||null;
  const store=city&&storeId?stores.find(x=>x.id===storeId&&x.cityId===city.id)||null:null;
  return {city,store};
}
