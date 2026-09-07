import { NextResponse } from 'next/server'; import { cities, stores } from '@/lib/data';
export async function GET(req:Request){ const city=new URL(req.url).searchParams.get('city'); return NextResponse.json({cities,stores:city?stores.filter(s=>s.cityId===city):stores}); }
