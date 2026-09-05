export type Store = {
  id: string; cityId: string; name: string; brand: string; address: string; kind: string; logoKey?: string;
};
export type City = { id: string; name: string; short: string; accent: string };
export type Product = {
  id: string; name: string; brand: string; category: 'Supermarket'|'Fashion'|'Hypermarket';
  price: number; mrp?: number; bestSeller?: boolean; stock: number; image?: string; badges?: string[];
  compare: Record<string, number>; storeLabel?: string;
};

export const cities: City[] = [
  {id:'hyd', name:'Hyderabad', short:'HYD', accent:'from-amber-400 to-emerald-500'},
  {id:'blr', name:'Bengaluru', short:'BLR', accent:'from-emerald-400 to-cyan-500'},
  {id:'mum', name:'Mumbai', short:'MUM', accent:'from-indigo-400 to-fuchsia-500'},
  {id:'del', name:'Delhi NCR', short:'DEL', accent:'from-blue-400 to-cyan-500'},
  {id:'che', name:'Chennai', short:'CHE', accent:'from-orange-400 to-rose-500'},
  {id:'pun', name:'Pune', short:'PUN', accent:'from-violet-400 to-indigo-500'},
  {id:'kol', name:'Kolkata', short:'KOL', accent:'from-pink-400 to-amber-400'},
  {id:'ahm', name:'Ahmedabad', short:'AHM', accent:'from-teal-400 to-lime-400'}
];

export const stores: Store[] = [
  ['hyd','LuLu Mall & Hypermarket','LuLu','Forum Sujana Mall Premises, KPHB Phase 6, Kukatpally, Hyderabad - 500072','Hypermarket'],
  ['hyd','Sarath City Capital Mall','Sarath City','Gachibowli - Miyapur Rd, Whitefields, Kondapur, Hyderabad - 500084','Shopping Mall'],
  ['hyd','Inorbit Mall','Inorbit','Mindspace IT Park, APIIC Software Layout, Madhapur / HITEC City, Hyderabad - 500081','Shopping Mall'],
  ['hyd','Nexus Hyderabad Mall','Nexus','Phase 9, Kukatpally Housing Board Colony, Kukatpally, Hyderabad - 500072','Shopping Mall'],
  ['hyd','DMart Kukatpally','DMart','Survey No 1009, KPHB 5th Phase Rd, Near Malaysian Township, Kukatpally, Hyderabad - 500072','Supermarket'],
  ['hyd','DMart Miyapur','DMart','Sri Rangapuram Colony, Near Miyapur Bus Depot, Miyapur, Hyderabad - 500049','Supermarket'],
  ['hyd','DMart LB Nagar','DMart','NH 65, Near LB Nagar Metro Station, Bahadurguda, LB Nagar, Hyderabad - 500074','Supermarket'],
  ['hyd','DMart Sanathnagar','DMart','277, Sanath Nagar Main Rd, Opp. Police Station, Sanathnagar, Hyderabad - 500018','Supermarket'],
  ['hyd','DMart Hyderguda','DMart','Main Road, Hyderguda-Basheer Bagh, Opp. Old MLA Quarters, Hyderguda, Hyderabad - 500029','Supermarket'],
  ['hyd','Reliance Trends Ameerpet','Trends','Vasavi MPM Grand, Ameerpet Main Road, Ameerpet, Hyderabad - 500036','Fashion'],
  ['hyd','Reliance Trends Gachibowli','Trends','Vaishnavi Cynosure, Survey No 18, Gachibowli, Hyderabad - 500032','Fashion'],
  ['hyd','Reliance Trends Himayatnagar','Trends','Main Road, Opp. Tanishq, Himayatnagar, Hyderabad - 500029','Fashion'],
  ['hyd','Reliance Trends Begumpet','Trends','Gumidelli Complex, Main Road, Begumpet, Hyderabad - 500016','Fashion'],
  ['hyd','Reliance Trends AS Rao Nagar','Trends','Asian Radhika Movieplex, ECIL X Roads, AS Rao Nagar, Hyderabad - 500062','Fashion'],
  ['hyd','SPAR Hypermarket Nacharam','SPAR','Mallikarjuna Nagar, Nacharam Main Rd, Nacharam, Hyderabad - 500076','Hypermarket'],
  ['blr','LuLu Global Malls & Hypermarket','LuLu','Rajajinagar Metro Station, Binnypet, Rajajinagar, Bengaluru - 560023','Hypermarket'],
  ['blr','Phoenix Marketcity','Phoenix','Whitefield Main Rd, Mahadevapura, Whitefield, Bengaluru - 560048','Shopping Mall'],
  ['blr','Orion Mall','Orion','Brigade Gateway, Dr Rajkumar Rd, Malleshwaram West, Bengaluru - 560055','Shopping Mall'],
  ['blr','DMart Indiranagar','DMart','100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru - 560038','Supermarket'],
  ['blr','DMart Electronic City','DMart','Phase 1, Near Toll Plaza, Electronic City, Bengaluru - 560100','Supermarket'],
  ['blr','Reliance Trends Koramangala','Trends','80 Feet Rd, 4th Block, Koramangala, Bengaluru - 560034','Fashion'],
  ['mum','Phoenix Palladium','Phoenix','462, Senapati Bapat Marg, Lower Parel, Mumbai - 400013','Shopping Mall'],
  ['mum','Infiniti Mall Malad','Infiniti','Link Rd, Mindspace, Malad West, Mumbai - 400064','Shopping Mall'],
  ['mum','DMart Powai','DMart','Central Ave, Hiranandani Gardens, Powai, Mumbai - 400076','Supermarket'],
  ['mum','DMart Malad West','DMart','New Link Rd, Evershine Nagar, Malad West, Mumbai - 400064','Supermarket'],
  ['mum','Reliance Trends Bandra','Trends','Linking Rd, Khar West, Bandra West, Mumbai - 400052','Fashion'],
  ['del','Select CITYWALK','Citywalk','A-3, District Centre, Saket, New Delhi - 110017','Shopping Mall'],
  ['del','Ambience Mall Gurugram','Ambience','NH-8, Ambience Island, DLF Phase 3, Gurugram, Haryana - 122002','Shopping Mall'],
  ['del','DLF Mall of India','DLF','Sector 18, Noida, Uttar Pradesh - 201301','Shopping Mall'],
  ['del','DMart Vaishali','DMart','Sector 4, Vaishali, Ghaziabad, Delhi NCR - 201010','Supermarket'],
  ['del','Reliance Trends South Ext','Trends','Ring Rd, South Extension II, New Delhi - 110049','Fashion'],
  ['che','Express Avenue Mall','Express Avenue','Whites Rd, Royapettah, Chennai - 600014','Shopping Mall'],
  ['che','Phoenix Marketcity Velachery','Phoenix','Velachery Rd, Velachery, Chennai - 600042','Shopping Mall'],
  ['che','DMart Virugambakkam','DMart','Arcot Rd, Virugambakkam, Chennai - 600092','Supermarket'],
  ['che','Reliance Trends Anna Nagar','Trends','2nd Ave, Near Roundtana, Anna Nagar, Chennai - 600040','Fashion'],
  ['pun','Phoenix Marketcity Viman Nagar','Phoenix','Nagar Rd, Clover Park, Viman Nagar, Pune - 411014','Shopping Mall'],
  ['pun','Seasons Mall Hadapsar','Seasons','Magarpatta City, Hadapsar, Pune - 411028','Shopping Mall'],
  ['pun','DMart Baner','DMart','Baner Rd, Near Westend Mall, Baner, Pune - 411045','Supermarket'],
  ['pun','Reliance Trends Aundh','Trends','ITI Rd, Anand Park, Aundh, Pune - 411007','Fashion'],
  ['kol','Quest Mall','Quest','33, Syed Amir Ali Ave, Park Circus, Beck Bagan, Kolkata - 700017','Shopping Mall'],
  ['kol','South City Mall','South City','375, Prince Anwar Shah Rd, Jadavpur, Kolkata - 700068','Shopping Mall'],
  ['kol','DMart New Town','DMart','Action Area I, New Town, Kolkata - 700156','Supermarket'],
  ['kol','Reliance Trends Salt Lake','Trends','Block DC, Sector 1, Salt Lake City, Kolkata - 700064','Fashion'],
  ['ahm','Alpha One Mall (Nexus Ahmedabad)','Nexus','Near Vastrapur Lake, Vastrapur, Ahmedabad - 380015','Shopping Mall'],
  ['ahm','Palladium Ahmedabad','Palladium','Sarkhej - Gandhinagar Hwy, Thaltej, Ahmedabad - 380054','Shopping Mall'],
  ['ahm','DMart Satellite','DMart','Ramdev Nagar Cross Rd, Satellite, Ahmedabad - 380015','Supermarket'],
  ['ahm','Reliance Trends CG Road','Trends','Super Mall, Near Navrangpura Bus Stop, CG Road, Ahmedabad - 380009','Shopping Mall / Fashion'],
].map((s, i) => ({ cityId:s[0], name:s[1], brand:s[2], address:s[3], kind:s[4], id:`store-${i+1}` }));

const imgs = [
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1585386959984-a41552231658?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1580915411954-282cb1d26638?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'
];

const products: Omit<Product,'category'>[] = [
  {id:'DM-ATT-01',name:'Aashirvaad Shuddh Chakki Atta 5kg',brand:'Aashirvaad',price:245,mrp:270,bestSeller:true,stock:42,image:imgs[1],compare:{DMart:245,LuLu:262,SPAR:255}},
  {id:'DM-OIL-02',name:'Fortune Sunlite Sunflower Oil 1L',brand:'Fortune',price:135,mrp:160,stock:85,image:imgs[2],compare:{DMart:135,LuLu:145,SPAR:140}},
  {id:'DM-MLK-03',name:'Amul Taaza Toned Milk 1L',brand:'Amul',price:56,bestSeller:true,stock:120,image:imgs[3],compare:{DMart:56,LuLu:56,SPAR:56}},
  {id:'DM-SLT-04',name:'Tata Salt Vacuum Evaporated 1kg',brand:'Tata',price:28,mrp:30,stock:210,image:imgs[4],compare:{DMart:28,LuLu:30,SPAR:29}},
  {id:'DM-RCE-05',name:'India Gate Basmati Rice Feast Rozzana 5kg',brand:'India Gate',price:420,mrp:510,stock:34,image:imgs[5],compare:{DMart:420,LuLu:460,SPAR:440}},
  {id:'DM-DET-06',name:'Surf Excel Easy Wash Detergent Powder 1kg',brand:'Surf Excel',price:140,mrp:160,stock:60,image:imgs[0],compare:{DMart:140,LuLu:152,SPAR:149}},
  {id:'DM-NDL-07',name:'Maggi 2-Minute Masala Noodles 12-Pack',brand:'Maggi',price:168,mrp:180,bestSeller:true,stock:150,image:imgs[6],compare:{DMart:168,LuLu:178,SPAR:173}},
  {id:'DM-CHK-08',name:'Cadbury Dairy Milk Silk 150g',brand:'Cadbury',price:160,mrp:175,stock:48,image:imgs[7],compare:{DMart:160,LuLu:175,SPAR:170}},
  {id:'DM-PST-09',name:'Colgate Strong Teeth Toothpaste 500g',brand:'Colgate',price:210,mrp:250,stock:75,image:imgs[8],compare:{DMart:210,LuLu:230,SPAR:220}},
  {id:'DM-SOP-10',name:'Dove Cream Beauty Bathing Bar (3x100g)',brand:'Dove',price:195,mrp:225,stock:90,image:imgs[9],compare:{DMart:195,LuLu:215,SPAR:205}},
  {id:'DM-VIM-11',name:'Vim Dishwash Gel Lemon 750ml',brand:'Vim',price:155,mrp:175,stock:65,image:imgs[2],compare:{DMart:155,LuLu:168,SPAR:160}},
  {id:'DM-BSC-12',name:'Britannia Good Day Cashew Cookies 600g',brand:'Britannia',price:120,mrp:140,stock:55,image:imgs[3],compare:{DMart:120,LuLu:135,SPAR:128}},
  {id:'DM-CHP-13',name:"Lays India's Magic Masala Family Pack 115g",brand:'Lays',price:45,mrp:50,stock:110,image:imgs[6],compare:{DMart:45,LuLu:50,SPAR:49}},
  {id:'DM-COF-14',name:'Nescafe Classic Instant Coffee 100g Glass Jar',brand:'Nescafe',price:320,mrp:360,stock:30,image:imgs[4],compare:{DMart:320,LuLu:340,SPAR:330}},
  {id:'DM-TEA-15',name:'Red Label Natural Care Tea 500g',brand:'Red Label',price:290,mrp:330,stock:45,image:imgs[5],compare:{DMart:290,LuLu:310,SPAR:299}},
  {id:'DM-HND-16',name:'Dettol Liquid Handwash Refill 1500ml',brand:'Dettol',price:240,mrp:280,stock:40,image:imgs[8],compare:{DMart:240,LuLu:265,SPAR:252}},
  {id:'DM-LZL-17',name:'Lizol Disinfectant Surface Cleaner Citrus 1L',brand:'Lizol',price:215,mrp:240,stock:50,image:imgs[9],compare:{DMart:215,LuLu:230,SPAR:222}},
  {id:'DM-CRN-18',name:"Kellogg's Corn Flakes Original 875g",brand:"Kellogg's",price:330,mrp:380,stock:25,image:imgs[1],compare:{DMart:330,LuLu:360,SPAR:345}},
  {id:'DM-SAF-19',name:'Saffola Gold Edible Oil 5L Jar',brand:'Saffola',price:780,mrp:890,stock:18,image:imgs[0],compare:{DMart:780,LuLu:830,SPAR:810}},
  {id:'DM-YGT-20',name:'Epigamia Greek Yogurt Strawberry 85g',brand:'Epigamia',price:60,stock:22,image:imgs[3],compare:{DMart:60,LuLu:60,SPAR:60}},
  {id:'TR-NSH-01',name:'NETPLAY Men Slim Fit Solid Formal Shirt',brand:'Netplay',price:899,mrp:1299,bestSeller:true,stock:15,image:imgs[9],compare:{Trends:899,MallOutlet:1099}},
  {id:'TR-AKR-02',name:'AVAASA MIX N MATCH Women Printed Straight Kurta',brand:'Avaasa',price:699,mrp:999,bestSeller:true,stock:24,image:imgs[4],compare:{Trends:699,MallOutlet:799}},
  {id:'TR-BTS-03',name:'POINT COVE Boys Graphic Print Crew-Neck T-Shirt',brand:'Point Cove',price:399,mrp:499,stock:30,image:imgs[6],compare:{Trends:399,MallOutlet:449}},
  {id:'TR-DJN-04',name:'DNMX Men Tapered Fit Distressed Jeans',brand:'DNMX',price:1299,mrp:1699,stock:12,image:imgs[7],compare:{Trends:1299,MallOutlet:1399}},
  {id:'TR-FDR-05',name:'FIG Women A-Line Midi Casual Dress',brand:'Fig',price:1199,mrp:1499,stock:10,image:imgs[8],compare:{Trends:1199,MallOutlet:1299}},
  {id:'TR-PTS-06',name:'PERFORMAX Men Rapid Dry Training T-Shirt',brand:'Performax',price:599,mrp:799,stock:40,image:imgs[9],compare:{Trends:599,MallOutlet:649}},
  {id:'TR-AAK-07',name:'AVAASA Women Cotton Anarkali Kurta',brand:'Avaasa',price:1499,mrp:1899,stock:8,image:imgs[4],compare:{Trends:1499,MallOutlet:1599}},
  {id:'TR-TSW-08',name:'TEAMSPIRIT Men Colourblocked Hooded Sweatshirt',brand:'Teamspirit',price:999,mrp:1299,stock:16,image:imgs[0],compare:{Trends:999,MallOutlet:1099}},
  {id:'TR-WJN-09',name:'DNMX Women High-Rise Skinny Fit Jeans',brand:'DNMX',price:1099,mrp:1399,stock:14,image:imgs[5],compare:{Trends:1099,MallOutlet:1199}},
  {id:'TR-CSH-10',name:'NETPLAY Men Checkered Casual Cotton Shirt',brand:'Netplay',price:799,mrp:999,stock:22,image:imgs[1],compare:{Trends:799,MallOutlet:849}},
  {id:'TR-GDR-11',name:'INF-FSD Girls Floral Print Tiered Dress',brand:'Inf-Fsd',price:649,mrp:799,stock:19,image:imgs[8],compare:{Trends:649,MallOutlet:699}},
  {id:'TR-APL-12',name:'AVAASA Women Palazzos with Drawstring',brand:'Avaasa',price:499,mrp:599,stock:35,image:imgs[3],compare:{Trends:499,MallOutlet:549}},
  {id:'TR-PTP-13',name:'PERFORMAX Men Track Pants with Zip Pockets',brand:'Performax',price:899,mrp:1099,stock:20,image:imgs[9],compare:{Trends:899,MallOutlet:949}},
  {id:'TR-GTS-14',name:'POINT COVE Girls Cotton Polo T-Shirt',brand:'Point Cove',price:449,mrp:549,stock:28,image:imgs[6],compare:{Trends:449,MallOutlet:489}},
  {id:'TR-NSW-15',name:'NETPLAY Men Textured Crew-Neck Sweater',brand:'Netplay',price:1299,mrp:1599,stock:11,image:imgs[0],compare:{Trends:1299,MallOutlet:1399}},
  {id:'TR-FTP-16',name:'FIG Women Solid Polo Neck Top',brand:'Fig',price:549,mrp:699,stock:25,image:imgs[4],compare:{Trends:549,MallOutlet:599}},
  {id:'TR-TJG-17',name:'TEAMSPIRIT Men Slim Fit Joggers',brand:'Teamspirit',price:799,mrp:999,stock:17,image:imgs[5],compare:{Trends:799,MallOutlet:899}},
  {id:'TR-ADP-18',name:'AVAASA Women Dupatta with Ethnic Border',brand:'Avaasa',price:299,mrp:399,stock:45,image:imgs[3],compare:{Trends:299,MallOutlet:329}},
  {id:'TR-DJK-19',name:'DNMX Men Denim Trucker Jacket',brand:'DNMX',price:1899,mrp:2299,stock:7,image:imgs[7],compare:{Trends:1899,MallOutlet:2049}},
  {id:'TR-WLG-20',name:'PERFORMAX Women High-Waist Sports Leggings',brand:'Performax',price:999,mrp:1299,stock:21,image:imgs[8],compare:{Trends:999,MallOutlet:1049}},
  {id:'LL-IPH-01',name:'Apple iPhone 15 128GB Black',brand:'Apple',price:65900,mrp:79900,bestSeller:true,stock:9,image:'https://images.unsplash.com/photo-1592286927505-c6f8f0e7b8ad?auto=format&fit=crop&w=900&q=80',compare:{LuLu:65900,Croma:66900}},
  {id:'LL-STV-02',name:'Samsung 43-inch 4K Ultra HD Smart TV',brand:'Samsung',price:28990,mrp:38900,stock:5,image:'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=80',compare:{LuLu:28990,SPAR:29490}},
  {id:'LL-AFR-03',name:'Philips Air Fryer HD9200/90 4.1 Litre',brand:'Philips',price:5499,mrp:7995,bestSeller:true,stock:14,image:'https://images.unsplash.com/photo-1604908177522-402f8bd7d0f2?auto=format&fit=crop&w=900&q=80',compare:{LuLu:5499,SPAR:5699}},
  {id:'LL-JBL-04',name:'JBL Flip 6 Portable Bluetooth Speaker',brand:'JBL',price:8999,mrp:11999,stock:12,image:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=80',compare:{LuLu:8999,SPAR:9299}},
  {id:'LL-SNY-05',name:'Sony WH-1000XM5 Noise Cancelling Headphones',brand:'Sony',price:26990,mrp:34990,stock:8,image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',compare:{LuLu:26990,SPAR:27990}},
  {id:'LL-KWI-06',name:'LuLu Fresh Imported Kiwi 3-Piece Pack',brand:'LuLu Fresh',price:120,stock:60,image:imgs[3],compare:{LuLu:120,SPAR:135}},
  {id:'LL-SLM-07',name:'LuLu Fresh Norwegian Salmon Fillet 250g',brand:'LuLu Fresh',price:650,stock:16,image:imgs[4],compare:{LuLu:650,SPAR:680}},
  {id:'LL-MXR-08',name:'Prestige Iris 750W Mixer Grinder',brand:'Prestige',price:2999,mrp:4295,stock:15,image:'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=80',compare:{LuLu:2999,SPAR:3100}},
  {id:'LL-OTG-09',name:'Bajaj Majesty 16 Litre OTG',brand:'Bajaj',price:3490,mrp:4500,stock:10,image:'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=900&q=80',compare:{LuLu:3490,SPAR:3690}},
  {id:'LL-APR-10',name:'Mi Smart Air Purifier 4 Lite',brand:'Xiaomi / Mi',price:9999,mrp:12999,stock:6,image:'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=900&q=80',compare:{LuLu:9999,SPAR:10499}},
  {id:'LL-BTL-11',name:'Milton Thermosteel 1000ml Bottle',brand:'Milton',price:849,mrp:999,stock:35,image:imgs[1],compare:{LuLu:849,DMart:799}},
  {id:'LL-LUG-12',name:'Safari Pentagon 3-Piece Trolley Luggage Set',brand:'Safari',price:5999,mrp:13500,stock:11,image:'https://images.unsplash.com/photo-1565026057447-bc90a0390837?auto=format&fit=crop&w=900&q=80',compare:{LuLu:5999,DMart:5799}},
  {id:'LL-EAR-13',name:'Boat Airdopes 141 TWS Earbuds',brand:'Boat',price:1199,mrp:4490,stock:40,image:'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=80',compare:{LuLu:1199,DMart:1099}},
  {id:'LL-PCK-14',name:'Prestige 3-Litre Pressure Cooker',brand:'Prestige',price:1250,mrp:1540,stock:22,image:imgs[4],compare:{LuLu:1250,DMart:1180}},
  {id:'LL-JUC-15',name:'Real Fruit Juice Cranberry 1L',brand:'Real',price:130,mrp:140,stock:50,image:imgs[2],compare:{LuLu:130,DMart:115}},
  {id:'LL-FRR-16',name:'Ferrero Rocher Premium Chocolates 16 Pcs',brand:'Ferrero Rocher',price:525,mrp:549,stock:30,image:imgs[7],compare:{LuLu:525,DMart:490}},
  {id:'LL-NVA-17',name:'Nivea Soft Refreshingly Soft Moisturizing Cream 300ml',brand:'Nivea',price:399,mrp:450,stock:25,image:imgs[5],compare:{LuLu:399,DMart:365}},
  {id:'LL-DYS-18',name:'Dyson Airwrap Multi-Styler',brand:'Dyson',price:45900,mrp:49900,stock:4,image:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',compare:{LuLu:45900,SPAR:46900}},
  {id:'LL-KBD-19',name:'HP Wireless Keyboard & Mouse Combo 230',brand:'HP',price:1299,mrp:1999,stock:18,image:'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',compare:{LuLu:1299,SPAR:1349}},
  {id:'LL-BLN-20',name:'Wonderchef Nutri-Blend 220W Blender',brand:'Wonderchef',price:2499,mrp:3800,stock:13,image:'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=80',compare:{LuLu:2499,SPAR:2599}}
];

export const allProducts: Product[] = [
  ...products.slice(0,20).map(p=>({...p,category:'Supermarket' as const})),
  ...products.slice(20,40).map(p=>({...p,category:'Fashion' as const})),
  ...products.slice(40).map(p=>({...p,category:'Hypermarket' as const}))
];

export function productsForStore(store: Store): Product[] {
  const kind = store.kind.toLowerCase();
  const category = kind.includes('fashion') ? 'Fashion' as const : (kind.includes('supermarket') ? 'Supermarket' as const : 'Hypermarket' as const);
  const eligible = allProducts.filter(p => p.category === category);
  // Deterministically rotate each store through the correct category pool so every outlet
  // has at least 10 products while different outlets do not all expose the same assortment.
  const seed = [...store.id].reduce((sum, ch, i) => sum + ch.charCodeAt(0) * (i + 1), 0);
  const count = Math.min(12, eligible.length);
  const selected: Product[] = [];
  for (let i = 0; i < count; i++) selected.push(eligible[(seed + i * 7) % eligible.length]);
  return selected.map(p => ({
    ...p,
    image: undefined,
    price: p.compare[store.brand] ?? Math.max(1, Math.round(p.price * (1 + (((seed + p.id.length) % 7) - 3) / 100))),
    storeLabel: store.name,
  }));
}

export const bestSellers = allProducts.filter(p=>p.bestSeller);
