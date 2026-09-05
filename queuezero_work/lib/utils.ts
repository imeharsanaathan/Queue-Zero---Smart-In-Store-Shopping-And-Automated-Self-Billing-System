export const money = (value:number) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(value);
export const discount = (mrp?:number, price?:number) => mrp && price ? Math.max(0,Math.round((1-price/mrp)*100)) : 0;
export const brandIcon = (brand:string) => `https://cdn.simpleicons.org/${encodeURIComponent(brand.toLowerCase().replace(/[^a-z0-9]+/g,''))}`;
export const cx = (...v:(string|false|null|undefined)[]) => v.filter(Boolean).join(' ');
