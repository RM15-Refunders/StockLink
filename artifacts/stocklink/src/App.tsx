import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import { Activity, AlertTriangle, ArrowDownToLine, ArrowRight, Boxes, Check, ChevronRight, CircleHelp, Gauge, History, LayoutDashboard, Menu, Package, Plus, Search, Settings2, ShoppingBag, SlidersHorizontal, Truck, X } from 'lucide-react';

type Ingredient = { id: string; name: string; unit: string; stock: number; safety: number; daily: number; usage: string };
type OrderLine = { product: string; quantity: number };
type Order = { id: string; label: string; date: string; status: 'draft' | 'confirmed' | 'cancelled'; lines: OrderLine[] };
type DeliveryLine = { itemId: string; quantity: number };
type Delivery = { id: string; supplier: string; lines: DeliveryLine[]; date: string; status: 'open' | 'received' | 'cancelled' };
type Recommendation = { id: string; itemId: string; title: string; body: string; status: 'pending' | 'approved' | 'rejected' };
type Event = { id: string; timestamp: string; action: string; details: string };
type Store = { inventory: Ingredient[]; orders: Order[]; deliveries: Delivery[]; recommendations: Recommendation[]; events: Event[]; recipes: Record<string, Record<string, number>> };

const DAY = 86400000;
const dateOffset = (n: number) => new Date(Date.now() + n * DAY).toISOString().slice(0, 10);
const uid = () => Math.random().toString(36).slice(2, 9);
const products = ['Flat white', 'Iced latte', 'Long black'];
const recipeMap: Record<string, Record<string, number>> = {
 'Flat white': { milk: .18, beans: .018, cups: 0 },
 'Iced latte': { milk: .22, beans: .018, cups: 1 },
 'Long black': { milk: 0, beans: .018, cups: 1 },
};
const seed: Store = {
 inventory: [
  { id: 'milk', name: 'Fresh milk', unit: 'L', stock: 30, safety: 5, daily: 12, usage: 'Flat white: 0.18 L · Iced latte: 0.22 L' },
  { id: 'beans', name: 'Coffee beans', unit: 'kg', stock: 8.4, safety: 2, daily: 1.15, usage: 'Flat white: 0.018 kg · Long black: 0.018 kg' },
  { id: 'cups', name: 'Takeaway cups', unit: 'pcs', stock: 185, safety: 48, daily: 34, usage: 'Iced latte: 1 pc · Long black: 1 pc' },
 ],
 orders: [
  { id: 'ord-104', label: 'Walk-in · morning rush', date: dateOffset(0), status: 'confirmed', lines: [{ product: 'Long black', quantity: 24 }] },
  { id: 'ord-105', label: 'Office tray · Jalan Besar', date: dateOffset(1), status: 'confirmed', lines: [{ product: 'Long black', quantity: 12 }] },
  { id: 'ord-106', label: 'Weekend pop-up · draft', date: dateOffset(3), status: 'draft', lines: [{ product: 'Iced latte', quantity: 30 }] },
 ],
 deliveries: [
  { id: 'po-031', supplier: 'Fresh Fields Dairy (demo)', lines: [{ itemId: 'milk', quantity: 48 }], date: dateOffset(3), status: 'open' },
  { id: 'po-032', supplier: 'Batu Roasters (demo)', lines: [{ itemId: 'beans', quantity: 6 }, { itemId: 'cups', quantity: 100 }], date: dateOffset(5), status: 'open' },
 ],
 recommendations: [{ id: 'rec-milk', itemId: 'milk', title: 'Review the milk delivery timing', body: 'Milk is projected to fall below safety stock before the scheduled delivery. Consider requesting an earlier delivery or increasing the next quantity. No supplier action will be taken.', status: 'pending' }],
 events: [{ id: uid(), timestamp: new Date().toISOString(), action: 'Demo data loaded', details: 'Kopi Corner sample inventory, orders and deliveries are ready for review.' }],
 recipes: structuredClone(recipeMap),
};
const STORE_KEY = 'stocklink-demo-v1';
const nav = [
 { href: '/', name: 'Overview', icon: LayoutDashboard },
 { href: '/orders', name: 'Orders', icon: ShoppingBag },
 { href: '/inventory', name: 'Inventory', icon: Boxes },
 { href: '/deliveries', name: 'Deliveries', icon: Truck },
 { href: '/activity', name: 'Activity', icon: History },
];
const money = (n: number) => `RM ${n.toFixed(2)}`;
const niceDate = (s: string) => new Date(`${s}T12:00:00`).toLocaleDateString('en-MY', { day: 'numeric', month: 'short' });
const fmt = (n: number) => new Intl.NumberFormat('en-MY', { maximumFractionDigits: 3 }).format(n);
const getInitial = (): Store => {
 try { const stored = localStorage.getItem(STORE_KEY); if (stored) return JSON.parse(stored) as Store; } catch { /* use demo seed */ }
 return structuredClone(seed);
};

function App() {
 const [store, setStore] = useState<Store>(getInitial);
 const [location, setLocation] = useLocation();
 const [modal, setModal] = useState<{ type: 'order' | 'inventory' | 'adjust' | 'recipe'; id?: string } | null>(null);
 const [toast, setToast] = useState('');
 const [search, setSearch] = useState('');
 const [filter, setFilter] = useState('all');
 const [menuOpen, setMenuOpen] = useState(false);
 useEffect(() => { localStorage.setItem(STORE_KEY, JSON.stringify(store)); }, [store]);
 useEffect(() => { if (!toast) return; const t = window.setTimeout(() => setToast(''), 2800); return () => window.clearTimeout(t); }, [toast]);
 const log = (action: string, details: string) => ({ id: uid(), timestamp: new Date().toISOString(), action, details });
 const update = (fn: (s: Store) => Store) => setStore((s) => fn(s));
 const notify = (message: string) => setToast(message);
 const reset = () => { if (window.confirm('Reset StockLink to the original Kopi Corner demo data? Your browser-saved changes will be removed.')) { setStore(structuredClone(seed)); setSearch(''); setFilter('all'); notify('Demo data restored'); } };
 const itemById = (id: string) => store.inventory.find((i) => i.id === id);
 const recipeUsage = (itemId: string) => products.map((product) => {
  const amount = store.recipes[product]?.[itemId] ?? 0;
  return amount > 0 ? `${product}: ${fmt(amount)} ${itemById(itemId)?.unit} per drink` : '';
 }).filter(Boolean).join(' · ') || 'No recipe usage assigned';
 const demandForOrder = (order: Order) => {
  const d: Record<string, number> = {};
  order.lines.forEach((line) => Object.entries(store.recipes[line.product] ?? {}).forEach(([id, usage]) => { d[id] = (d[id] ?? 0) + usage * line.quantity; }));
  return d;
 };
 const forecastComponents = (item: Ingredient, day: number, includeSameDayDeliveries = true) => {
  const wholeDays = Math.floor(day);
  const fractionalDay = day - wholeDays;
  const today = dateOffset(0);
  let projected = item.stock;
  let orderDemand = 0;
  let deliveryQuantity = 0;
  for (let offset = 0; offset <= wholeDays; offset += 1) {
   const scheduledDate = dateOffset(offset);
   if (offset > 0) projected -= item.daily;
   const dayOrderDemand = store.orders.filter((o) => o.status === 'confirmed' && o.date === scheduledDate).reduce((sum, o) => sum + (demandForOrder(o)[item.id] ?? 0), 0);
   orderDemand += dayOrderDemand;
   projected -= dayOrderDemand;
   const sameDayArrivals = store.deliveries.filter((d) => d.status === 'open' && d.date === scheduledDate).reduce((sum, d) => sum + d.lines.filter((l) => l.itemId === item.id).reduce((total, line) => total + line.quantity, 0), 0);
   const overdueArrivals = offset === 0 ? store.deliveries.filter((d) => d.status === 'open' && d.date < today).reduce((sum, d) => sum + d.lines.filter((l) => l.itemId === item.id).reduce((total, line) => total + line.quantity, 0), 0) : 0;
   const arrivalsToApply = offset < wholeDays || includeSameDayDeliveries ? sameDayArrivals : 0;
   deliveryQuantity += arrivalsToApply + overdueArrivals;
   projected += arrivalsToApply + overdueArrivals;
  }
  projected -= item.daily * fractionalDay;
  return { orderDemand, deliveryQuantity, projected };
 };
 const forecastAt = (item: Ingredient, day: number) => forecastComponents(item, day).projected;
 const riskInfo = (item: Ingredient) => {
  let days = Infinity;
  let preDeliveryStock: number | null = null;
  for (let step = 0; step <= 140; step += 1) {
   const projectedDay = step / 20;
   const beforeSameDayDelivery = forecastComponents(item, projectedDay, false).projected;
   const afterSameDayDelivery = forecastAt(item, projectedDay);
   if (beforeSameDayDelivery < item.safety || afterSameDayDelivery < item.safety) {
    days = projectedDay;
    preDeliveryStock = beforeSameDayDelivery;
    break;
   }
  }
  const baselineDays = item.daily > 0 ? Math.max(0, (item.stock - item.safety) / item.daily) : Infinity;
  const nextDelivery = store.deliveries.filter((d) => d.status === 'open').flatMap((d) => d.lines.filter((l) => l.itemId === item.id).map(() => ({ date: d.date, quantity: d.lines.filter((l) => l.itemId === item.id).reduce((a, l) => a + l.quantity, 0) }))).sort((a, b) => a.date.localeCompare(b.date))[0];
  const lead = nextDelivery ? Math.max(0, Math.round((new Date(`${nextDelivery.date}T12:00:00`).getTime() - new Date(`${dateOffset(0)}T12:00:00`).getTime()) / DAY)) : null;
  const orderDemandBeforeDelivery = lead === null ? 0 : store.orders.filter((o) => o.status === 'confirmed' && o.date >= dateOffset(0) && o.date < nextDelivery!.date).reduce((sum, o) => sum + (demandForOrder(o)[item.id] ?? 0), 0);
  const before = lead === null ? null : item.stock - item.daily * lead - orderDemandBeforeDelivery;
  return { days, baselineDays, nextDelivery, lead, before, orderDemandBeforeDelivery, preDeliveryStock };
 };
 const saveOrder = (order: Order) => update((s) => {
  const exists = s.orders.some((o) => o.id === order.id);
  return { ...s, orders: exists ? s.orders.map((o) => o.id === order.id ? order : o) : [order, ...s.orders], events: [log(exists ? 'Order updated' : 'Order created', `${order.label} · ${order.status} · ${order.lines.map((l) => `${l.quantity} × ${l.product}`).join(', ')}`), ...s.events] };
 });
 const statusOrder = (order: Order, status: Order['status']) => {
  update((s) => ({ ...s, orders: s.orders.map((o) => o.id === order.id ? { ...o, status } : o), events: [log(status === 'confirmed' ? 'Order confirmed' : 'Order cancelled', `${order.label} is now ${status}. ${status === 'confirmed' ? 'Recipe-based ingredient demand is included in forecast.' : ''}`), ...s.events] }));
  notify(status === 'confirmed' ? 'Order confirmed; demand added to forecast' : 'Order cancelled');
 };
 const saveInventory = (item: Ingredient) => update((s) => ({ ...s, inventory: s.inventory.map((i) => i.id === item.id ? item : i), events: [log('Inventory assumptions updated', `${item.name}: on hand ${fmt(item.stock)} ${item.unit}, safety ${fmt(item.safety)} ${item.unit}, baseline ${fmt(item.daily)} ${item.unit}/day.`), ...s.events] }));
 const adjustStock = (id: string, delta: number, note: string) => {
  const item = itemById(id); if (!item) return;
  const next = Math.max(0, item.stock + delta);
  update((s) => ({ ...s, inventory: s.inventory.map((i) => i.id === id ? { ...i, stock: next } : i), events: [log('Stock adjusted', `${item.name} changed by ${delta >= 0 ? '+' : ''}${fmt(delta)} ${item.unit}${note ? ` · ${note}` : ''}. On hand: ${fmt(next)} ${item.unit}.`), ...s.events] }));
  notify('Stock level updated');
 };
 const receiveDelivery = (delivery: Delivery) => {
  update((s) => ({ ...s, deliveries: s.deliveries.map((d) => d.id === delivery.id ? { ...d, status: 'received' } : d), inventory: s.inventory.map((i) => ({ ...i, stock: i.stock + delivery.lines.filter((l) => l.itemId === i.id).reduce((a, l) => a + l.quantity, 0) })), events: [log('Delivery received', `${delivery.id} from ${delivery.supplier} received and quantities added to on-hand stock.`), ...s.events] }));
  notify('Delivery received; stock updated');
 };
 const cancelDelivery = (delivery: Delivery) => {
  if (!window.confirm(`Cancel ${delivery.id} from ${delivery.supplier}?`)) return;
  update((s) => ({ ...s, deliveries: s.deliveries.map((d) => d.id === delivery.id ? { ...d, status: 'cancelled' } : d), events: [log('Delivery cancelled', `${delivery.id} from ${delivery.supplier} marked cancelled; it no longer appears in forecast.`), ...s.events] }));
  notify('Delivery cancelled');
 };
 const decideRecommendation = (rec: Recommendation, status: 'approved' | 'rejected') => {
  update((s) => ({ ...s, recommendations: s.recommendations.map((r) => r.id === rec.id ? { ...r, status } : r), events: [log(`Recommendation ${status}`, `${rec.title}. Human decision recorded; no order or supplier message was sent.`), ...s.events] }));
  notify(status === 'approved' ? 'Recommendation marked approved for follow-up' : 'Recommendation rejected');
 };
 const routeName = nav.find((n) => n.href === location)?.name ?? 'StockLink';
 const header = (eyebrow: string, title: string, subtitle: string, actions?: ReactNode) => <div className="page-head"><div><div className="eyebrow">{eyebrow}</div><h1 className="page-title">{title}</h1><p className="page-subtitle">{subtitle}</p></div>{actions && <div className="actions">{actions}</div>}</div>;
 const button = (text: string, onClick: () => void, primary = false, icon?: ReactNode, testid = 'button-action') => <button data-testid={testid} className={`btn ${primary ? 'btn-primary' : ''}`} onClick={onClick}>{icon}{text}</button>;
 const orderDemandSummary = (order: Order) => {
  const demand = demandForOrder(order);
  return Object.entries(demand).filter(([, n]) => n > 0).map(([id, q]) => `${itemById(id)?.name ?? id} ${fmt(q)} ${itemById(id)?.unit ?? ''}`).join(' · ') || 'No recipe demand';
 };
 const latestDate = new Date().toLocaleDateString('en-MY', { weekday: 'long', day: 'numeric', month: 'long' });
 const timelineItems = store.inventory;

 function Overview() {
  const openDeliveries = store.deliveries.filter((d) => d.status === 'open');
  const riskItems = store.inventory.map((item) => ({ item, risk: riskInfo(item) })).filter(({ risk }) => risk.days <= 7);
  const confirmedCount = store.orders.filter((o) => o.status === 'confirmed').length;
  const valueEstimate = store.inventory.reduce((sum, i) => sum + i.stock * (i.id === 'milk' ? 4.8 : i.id === 'beans' ? 78 : .22), 0);
  return <>{header('KOPI CORNER · DAILY BRIEFING', 'Good morning, here’s the stock picture.', `A clear view of what needs attention · ${latestDate}`, button('Create an order', () => setModal({ type: 'order' }), true, <Plus size={16} />, 'button-create-order'))}
   <div className="grid kpi-grid">
    <div className="card"><div className="kpi-label">Items to watch <span className="kpi-icon"><AlertTriangle size={15}/></span></div><div className="kpi-value" data-testid="kpi-at-risk">{riskItems.length}</div><div className="kpi-note">Forecast below safety within 7 days</div></div>
    <div className="card"><div className="kpi-label">On-hand estimate <span className="kpi-icon"><Boxes size={15}/></span></div><div className="kpi-value">{money(valueEstimate)}</div><div className="kpi-note">Illustrative value, not a valuation</div></div>
    <div className="card"><div className="kpi-label">Confirmed orders <span className="kpi-icon"><ShoppingBag size={15}/></span></div><div className="kpi-value">{confirmedCount}</div><div className="kpi-note">Only confirmed orders affect demand</div></div>
    <div className="card"><div className="kpi-label">Incoming deliveries <span className="kpi-icon"><Truck size={15}/></span></div><div className="kpi-value">{openDeliveries.length}</div><div className="kpi-note">Scheduled purchase orders</div></div>
   </div>
   <div className="grid content-grid">
    <div>
     <div className="card chart-card"><div className="section-head"><div><h2 className="section-title">7-day stock outlook</h2><div className="section-caption">Baseline demand + confirmed orders − incoming deliveries</div></div><span className="pill pill-risk"><span className="status-dot"/> Risk shown below safety</span></div>
      <div className="chart-wrap"><StockChart items={timelineItems} forecastAt={forecastAt} /></div>
      <div className="timeline-legend"><span><i className="legend-dot" style={{ background: '#bd7448' }}/>Fresh milk</span><span><i className="legend-dot" style={{ background: '#39715f' }}/>Coffee beans</span><span><i className="legend-dot" style={{ background: '#c29a52' }}/>Takeaway cups</span></div>
      <p className="forecast-note">Each line is scaled to its own unit. The dashed marker is that ingredient’s safety stock; order demand is applied on its scheduled date.</p>
     </div>
     <div className="card risk-card"><div className="risk-head"><div><h2 className="section-title">At-risk items</h2><div className="section-caption">Plain-language timing, not just a warning</div></div><Link href="/inventory" className="btn btn-small btn-quiet" data-testid="link-view-inventory">Inventory <ArrowRight size={14}/></Link></div>
      {riskItems.length ? riskItems.map(({ item, risk }) => <div className="risk-item" key={item.id} data-testid={`risk-item-${item.id}`}><div className="risk-row"><div><div className="risk-name">{item.name} <span className="pill pill-risk" style={{ marginLeft: 6 }}>At risk</span></div><div className="risk-meta">On hand {fmt(item.stock)} {item.unit} · safety {fmt(item.safety)} {item.unit} · baseline {fmt(item.daily)} {item.unit}/day</div></div><div className="risk-number">{risk.days.toFixed(1)} days to safety</div></div>
       {item.id === 'milk' && risk.lead !== null ? <div className="plain-math" data-testid="milk-risk-arithmetic">Safety crossed in about {risk.days.toFixed(1)} days. At day {risk.lead}, before delivery: {fmt(item.stock)} − ({fmt(item.daily)} × {risk.lead}){risk.orderDemandBeforeDelivery > 0 ? ` − ${fmt(risk.orderDemandBeforeDelivery)} confirmed-order demand` : ''} = {fmt(risk.before ?? 0)} {item.unit}. Delivery of {fmt(risk.nextDelivery?.quantity ?? 0)} {item.unit} is due in {risk.lead} days, so demand creates a stockout gap before it arrives.</div> : <div className="plain-math">In the day-by-day forecast, stock first falls below safety in about {risk.days.toFixed(1)} days. Before any delivery due that day, projected stock is {fmt(risk.preDeliveryStock ?? 0)} {item.unit} versus {fmt(item.safety)} {item.unit} safety; confirmed-order demand and earlier deliveries are included.</div>}
       {store.recommendations.filter((r) => r.itemId === item.id && r.status === 'pending').map((r) => <div className="recommendation" key={r.id}><strong>Human review · {r.title}</strong><p>{r.body}</p><div className="actions">{button('Approve suggestion', () => decideRecommendation(r, 'approved'), true, <Check size={14}/>, `button-approve-${r.id}`)}{button('Reject', () => decideRecommendation(r, 'rejected'), false, <X size={14}/>, `button-reject-${r.id}`)}</div></div>)}
      </div>) : <div className="empty-state"><div className="empty-icon"><Check size={20}/></div><strong>Nothing needs attention</strong><div className="section-caption">Current stock stays above safety for the next 7 days.</div></div>}
     </div>
    </div>
    <div>
     <div className="card"><div className="section-head"><div><h2 className="section-title">Open deliveries</h2><div className="section-caption">Expected purchase orders</div></div><Link href="/deliveries" className="btn btn-small btn-quiet" data-testid="link-all-deliveries">All <ChevronRight size={14}/></Link></div>
      {openDeliveries.length ? openDeliveries.map((d) => <div className="delivery-row" key={d.id}><div><div className="delivery-title">{d.supplier}</div><div className="delivery-sub">{d.lines.map((l) => `${itemById(l.itemId)?.name ?? l.itemId} +${fmt(l.quantity)} ${itemById(l.itemId)?.unit ?? ''}`).join(' · ')}</div></div><span className="pill pill-pending">{niceDate(d.date)}</span></div>) : <div className="empty-state">No open deliveries</div>}
      <div style={{ marginTop: 12 }}>{button('Review deliveries', () => setLocation('/deliveries'), false, <Truck size={15}/>, 'button-review-deliveries')}</div>
     </div>
     <div className="card" style={{ marginTop: 16 }}><div className="section-head"><div><h2 className="section-title">Human in control</h2><div className="section-caption">Suggestions never place orders</div></div><CircleHelp size={17} color="#7a887f"/></div><p className="section-caption" style={{ lineHeight: 1.7 }}>StockLink uses your assumptions to flag timing risk. A person decides whether to act; approvals are logged, and no supplier is contacted.</p><Link href="/activity" className="btn btn-small btn-quiet" data-testid="link-activity">View decision log <ArrowRight size={14}/></Link></div>
    </div>
   </div>
  </>;
 }

 function OrdersPage() {
  const orders = store.orders.filter((o) => (filter === 'all' || o.status === filter) && `${o.label} ${o.id} ${o.status}`.toLowerCase().includes(search.toLowerCase()));
  return <>{header('KOPI CORNER · WORK QUEUE', 'Orders', 'Confirmed orders drive recipe-based ingredient demand.', button('New order', () => setModal({ type: 'order' }), true, <Plus size={16}/>, 'button-new-order'))}
   <div className="card table-card"><div className="table-toolbar"><div className="search-wrap"><Search size={15}/><input className="search" placeholder="Search orders…" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="input-search-orders"/></div><select className="select" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter orders" data-testid="select-order-filter"><option value="all">All orders</option><option value="confirmed">Confirmed</option><option value="draft">Draft</option><option value="cancelled">Cancelled</option></select></div>
    {!orders.length ? <Empty icon={<ShoppingBag size={19}/>} title="No matching orders" detail="Try a different search or create a new order." action={button('Create order', () => setModal({ type: 'order' }), true, <Plus size={14}/>, 'button-empty-create-order')}/> : <div className="table-scroll"><table><thead><tr><th>Order</th><th>Scheduled</th><th>Status</th><th>Ingredient demand</th><th>Actions</th></tr></thead><tbody>{orders.map((o) => <tr key={o.id} data-testid={`row-order-${o.id}`}><td><div className="row-title">{o.label}</div><div className="row-sub">{o.id}</div></td><td>{niceDate(o.date)}</td><td><span className={`pill ${o.status === 'confirmed' ? 'pill-safe' : o.status === 'draft' ? 'pill-pending' : 'pill-muted'}`}>{o.status}</span></td><td><span className="row-sub" data-testid={`order-demand-${o.id}`}>{o.status === 'draft' ? 'Draft · excluded from forecast' : orderDemandSummary(o)}</span></td><td><div className="list-actions">{o.status !== 'cancelled' && button('Edit', () => setModal({ type: 'order', id: o.id }), false, <Settings2 size={13}/>, `button-edit-${o.id}`)}{o.status === 'draft' && button('Confirm', () => statusOrder(o, 'confirmed'), true, <Check size={13}/>, `button-confirm-${o.id}`)}{o.status === 'confirmed' && button('Cancel', () => statusOrder(o, 'cancelled'), false, <X size={13}/>, `button-cancel-${o.id}`)}</div></td></tr>)}</tbody></table></div>}
   </div>
   <div className="card" style={{ marginTop: 16 }}><div className="section-head"><div><h2 className="section-title">Recipe assumptions</h2><div className="section-caption">Editable per-drink quantities used to calculate ingredient demand</div></div></div><div className="recipe-grid">{products.map((product) => <div className="recipe-card" key={product}><h4>{product}</h4>{Object.entries(store.recipes[product] ?? {}).filter(([, q]) => q > 0).map(([id, q]) => <div className="recipe-line" key={id}>{itemById(id)?.name}: {fmt(q)} {itemById(id)?.unit} per drink</div>)}<button className="btn btn-small btn-quiet" style={{ marginTop: 9 }} onClick={() => setModal({ type: 'recipe', id: product })} data-testid={`button-edit-recipe-${product.toLowerCase().replaceAll(' ', '-')}`}>Edit recipe</button></div>)}</div><p className="helper">Baseline daily demand remains in addition to confirmed order demand. Draft and cancelled orders are excluded.</p></div>
  </>;
 }

 function InventoryPage() {
  const items = store.inventory.filter((i) => {
   const atRisk = riskInfo(i).days <= 7;
   return (filter === 'all' || (filter === 'risk' ? atRisk : !atRisk)) && `${i.name} ${i.unit}`.toLowerCase().includes(search.toLowerCase());
  });
  return <>{header('KOPI CORNER · STOCK ROOM', 'Inventory', 'On-hand quantities, buffers and demand assumptions.', <span className="pill pill-safe"><span className="status-dot" style={{ background: '#47765a' }}/>Updated in this browser</span>)}
   <div className="card table-card"><div className="table-toolbar"><div className="search-wrap"><Search size={15}/><input className="search" placeholder="Search ingredients…" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="input-search-inventory"/></div><select className="select" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter inventory" data-testid="select-inventory-filter"><option value="all">All ingredients</option><option value="risk">At risk in 7 days</option><option value="safe">Above safety in 7 days</option></select></div>
     {!items.length ? <Empty icon={<Boxes size={19}/>} title="No ingredients found" detail="Adjust your filters or search another term."/> : <div className="table-scroll"><table><thead><tr><th>Ingredient</th><th>On hand</th><th>Safety stock</th><th>Baseline / day</th><th>7-day outlook</th><th>Actions</th></tr></thead><tbody>{items.map((i) => { const breakdown = forecastComponents(i, 7); const forecast = breakdown.projected; const risk = riskInfo(i); const atRisk = risk.days <= 7; const pct = Math.max(4, Math.min(100, i.stock / Math.max(i.safety * 2, 1) * 100)); return <tr key={i.id} data-testid={`row-inventory-${i.id}`}><td><div className="row-title">{i.name}</div><div className="row-sub">{recipeUsage(i.id)}</div></td><td><div className="stock-cell">{fmt(i.stock)} <span className="row-sub">{i.unit}</span></div><div className="progress"><span style={{ width: `${pct}%`, background: i.stock < i.safety ? '#b75d49' : '#d5964f' }}/></div></td><td>{fmt(i.safety)} {i.unit}</td><td>{fmt(i.daily)} {i.unit}</td><td><span className={`pill ${forecast < i.safety ? 'pill-risk' : 'pill-safe'}`}>{fmt(forecast)} {i.unit}</span><div className="row-sub" data-testid={`forecast-explanation-${i.id}`}>Day 7: {fmt(i.stock)} − ({fmt(i.daily)} × 7) − {fmt(breakdown.orderDemand)} confirmed-order demand + {fmt(breakdown.deliveryQuantity)} due deliveries = {fmt(forecast)} {i.unit}, {forecast < i.safety ? 'below' : 'above'} {fmt(i.safety)} {i.unit} safety.</div><div className="row-sub">{atRisk ? `Earlier in the day-by-day forecast, stock first falls below safety in about ${risk.days.toFixed(1)} days; same-day deliveries are counted after the pre-delivery check.` : `No day in the 7-day forecast falls below ${fmt(i.safety)} ${i.unit} safety.`}</div></td><td><div className="list-actions">{button('Adjust', () => setModal({ type: 'adjust', id: i.id }), false, <SlidersHorizontal size={13}/>, `button-adjust-${i.id}`)}{button('Edit rules', () => setModal({ type: 'inventory', id: i.id }), false, <Settings2 size={13}/>, `button-edit-rules-${i.id}`)}</div></td></tr>; })}</tbody></table></div>}
   </div>
   <div className="card" style={{ marginTop: 16 }}><div className="section-head"><div><h2 className="section-title">How this forecast works</h2><div className="section-caption">Transparent, editable assumptions</div></div><Gauge size={17} color="#557661"/></div><p className="section-caption" style={{ lineHeight: 1.7 }}>Projected on hand = current stock − baseline daily demand × days − confirmed order recipe demand + open delivery quantities due by that date. Draft orders are excluded. Safety stock is a warning threshold, not additional stock. Forecast is indicative and assumes deliveries arrive on schedule.</p></div>
  </>;
 }

 function DeliveriesPage() {
  const deliveries = store.deliveries.filter((d) => (filter === 'all' || d.status === filter) && `${d.id} ${d.supplier} ${d.lines.map((l) => itemById(l.itemId)?.name).join(' ')}`.toLowerCase().includes(search.toLowerCase()));
  return <>{header('KOPI CORNER · INBOUND', 'Deliveries', 'Track expected stock arrivals and record receipt by hand.', <span className="pill pill-pending">No supplier actions are automated</span>)}
   <div className="card table-card"><div className="table-toolbar"><div className="search-wrap"><Search size={15}/><input className="search" placeholder="Search deliveries or suppliers…" value={search} onChange={(e) => setSearch(e.target.value)} data-testid="input-search-deliveries"/></div><select className="select" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter deliveries" data-testid="select-delivery-filter"><option value="all">All deliveries</option><option value="open">Open</option><option value="received">Received</option><option value="cancelled">Cancelled</option></select></div>
    {!deliveries.length ? <Empty icon={<Truck size={19}/>} title="No deliveries match" detail="There are no deliveries for this filter."/> : <div className="table-scroll"><table><thead><tr><th>Purchase order</th><th>Supplier</th><th>Items & quantities</th><th>Expected date</th><th>Status</th><th>Actions</th></tr></thead><tbody>{deliveries.map((d) => <tr key={d.id} data-testid={`row-delivery-${d.id}`}><td><div className="row-title">{d.id}</div><div className="row-sub">Demo purchase order</div></td><td>{d.supplier}</td><td>{d.lines.map((l) => <div key={l.itemId}>{itemById(l.itemId)?.name ?? l.itemId} <strong>+{fmt(l.quantity)} {itemById(l.itemId)?.unit}</strong></div>)}</td><td>{niceDate(d.date)}</td><td><span className={`pill ${d.status === 'open' ? 'pill-pending' : d.status === 'received' ? 'pill-safe' : 'pill-muted'}`}>{d.status}</span></td><td>{d.status === 'open' ? <div className="list-actions">{button('Receive', () => { if (window.confirm(`Record all quantities on ${d.id} as received?`)) receiveDelivery(d); }, true, <ArrowDownToLine size={13}/>, `button-receive-${d.id}`)}{button('Cancel', () => cancelDelivery(d), false, <X size={13}/>, `button-cancel-delivery-${d.id}`)}</div> : <span className="row-sub">{d.status === 'received' ? 'Stock updated' : 'Excluded from forecast'}</span>}</td></tr>)}</tbody></table></div>}
   </div>
   <div className="card" style={{ marginTop: 16 }}><div className="section-head"><div><h2 className="section-title">Delivery handling</h2><div className="section-caption">A receive action records a demo event and adds quantity to stock</div></div></div><p className="section-caption" style={{ lineHeight: 1.7 }}>Only open deliveries are included in the future forecast. Marking one received adds its listed quantities to inventory and stops it being counted as incoming. Cancelled deliveries are excluded. This prototype does not contact suppliers or verify physical receipt.</p></div>
  </>;
 }

 function ActivityPage() {
  return <>{header('KOPI CORNER · AUDIT TRAIL', 'Activity', 'A timestamped record of demo changes and human decisions.')}
   <div className="card"><div className="section-head"><div><h2 className="section-title">Recent activity</h2><div className="section-caption">{store.events.length} recorded {store.events.length === 1 ? 'event' : 'events'} · stored locally in this browser</div></div><span className="pill pill-muted">Newest first</span></div>
    {store.events.length ? store.events.map((event) => <div className="activity-item" key={event.id} data-testid={`activity-event-${event.id}`}><div className="activity-dot"/><div><div className="activity-text"><strong>{event.action}</strong> — {event.details}</div></div><time className="activity-time">{new Date(event.timestamp).toLocaleString('en-MY', { dateStyle: 'medium', timeStyle: 'short' })}</time></div>) : <Empty icon={<Activity size={19}/>} title="No activity yet" detail="Changes and decisions will appear here."/>}
   </div>
   <div className="card" style={{ marginTop: 16 }}><div className="section-head"><div><h2 className="section-title">Recommendation decisions</h2><div className="section-caption">Suggestions remain human-reviewed</div></div></div>{store.recommendations.map((r) => <div className="list-row" key={r.id} data-testid={`recommendation-${r.id}`}><div><div className="delivery-title">{r.title}</div><div className="delivery-sub">{r.body}</div></div><span className={`pill ${r.status === 'pending' ? 'pill-pending' : r.status === 'approved' ? 'pill-safe' : 'pill-muted'}`}>{r.status}</span></div>)}</div>
  </>;
 }

 function OrderModal({ order, close }: { order?: Order; close: () => void }) {
  const [label, setLabel] = useState(order?.label ?? '');
  const [date, setDate] = useState(order?.date ?? dateOffset(0));
  const [lines, setLines] = useState<OrderLine[]>(order?.lines.map((l) => ({ ...l })) ?? [{ product: 'Flat white', quantity: 1 }]);
  const demand: Record<string, number> = {};
  lines.forEach((line) => Object.entries(store.recipes[line.product] ?? {}).forEach(([id, n]) => { demand[id] = (demand[id] ?? 0) + n * Math.max(0, line.quantity || 0); }));
  const submit = (e: FormEvent) => { e.preventDefault(); if (!label.trim() || !lines.length) return; saveOrder({ id: order?.id ?? `ord-${Math.floor(100 + Math.random() * 899)}`, label: label.trim(), date, status: order?.status ?? 'draft', lines: lines.filter((l) => l.quantity > 0) }); close(); notify(order ? 'Order updated' : 'Draft order created'); };
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}><form className="modal" onSubmit={submit} data-testid="form-order"><div className="modal-head"><div><div className="eyebrow">ORDER DETAILS</div><h2 className="modal-title">{order ? 'Edit order' : 'Create an order'}</h2></div><button type="button" className="icon-btn" aria-label="Close" onClick={close} data-testid="button-close-order-modal"><X size={17}/></button></div>
   <div className="form-grid"><div className="field"><label htmlFor="order-label">Order label</label><input id="order-label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Catering · weekday pickup" required data-testid="input-order-label"/></div><div className="field"><label htmlFor="order-date">Scheduled date</label><input id="order-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required data-testid="input-order-date"/></div></div>
   <div className="line-editor"><strong style={{ fontSize: 12 }}>Order lines</strong>{lines.map((line, index) => <div className="line-row" key={index}><div className="field"><label>Product</label><select value={line.product} onChange={(e) => setLines((prev) => prev.map((l, i) => i === index ? { ...l, product: e.target.value } : l))} data-testid={`select-product-${index}`}>{products.map((p) => <option key={p}>{p}</option>)}</select></div><div className="field"><label>Quantity</label><input type="number" min="1" step="1" value={line.quantity} onChange={(e) => setLines((prev) => prev.map((l, i) => i === index ? { ...l, quantity: Number(e.target.value) } : l))} data-testid={`input-quantity-${index}`}/></div><button className="icon-btn" type="button" aria-label="Remove line" onClick={() => setLines((prev) => prev.filter((_, i) => i !== index))} data-testid={`button-remove-line-${index}`}><X size={14}/></button></div>)}<button type="button" className="btn btn-small btn-quiet" style={{ marginTop: 10 }} onClick={() => setLines((prev) => [...prev, { product: products[0], quantity: 1 }])} data-testid="button-add-order-line"><Plus size={13}/>Add product</button></div>
   <div className="demand-box"><strong>Estimated ingredient demand</strong><br/>{Object.entries(demand).filter(([, n]) => n > 0).map(([id, n]) => `${itemById(id)?.name} ${fmt(n)} ${itemById(id)?.unit}`).join(' · ') || 'Add a product and quantity'}<div className="helper" style={{ marginTop: 5 }}>This order stays a draft unless you confirm it. Draft demand is excluded from forecast.</div></div>
   <div className="modal-footer"><button type="button" className="btn" onClick={close} data-testid="button-dismiss-order">Cancel</button><button type="submit" className="btn btn-primary" data-testid="button-save-order">{order ? 'Save changes' : 'Save as draft'}</button></div>
  </form></div>;
 }

 function InventoryModal({ item, close, adjust = false }: { item: Ingredient; close: () => void; adjust?: boolean }) {
  const [stock, setStock] = useState(`${item.stock}`);
  const [safety, setSafety] = useState(`${item.safety}`);
  const [daily, setDaily] = useState(`${item.daily}`);
  const [delta, setDelta] = useState('');
  const [note, setNote] = useState('');
  const submit = (e: FormEvent) => {
   e.preventDefault();
   if (adjust) { const amount = Number(delta); if (!amount) return; adjustStock(item.id, amount, note); }
   else { saveInventory({ ...item, stock: Math.max(0, Number(stock)), safety: Math.max(0, Number(safety)), daily: Math.max(0, Number(daily)) }); notify('Inventory assumptions saved'); }
   close();
  };
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}><form className="modal" onSubmit={submit}><div className="modal-head"><div><div className="eyebrow">{item.name.toUpperCase()}</div><h2 className="modal-title">{adjust ? 'Adjust on-hand stock' : 'Edit inventory assumptions'}</h2></div><button type="button" className="icon-btn" onClick={close} aria-label="Close"><X size={17}/></button></div>
   {adjust ? <><p className="page-subtitle">Current: <strong>{fmt(item.stock)} {item.unit}</strong>. Enter a positive amount for stock received or a negative amount for usage/waste.</p><div className="form-grid" style={{ marginTop: 17 }}><div className="field"><label htmlFor="adjust-qty">Change ({item.unit})</label><input id="adjust-qty" type="number" step="any" value={delta} onChange={(e) => setDelta(e.target.value)} placeholder="+5 or -2" required data-testid={`input-adjust-${item.id}`}/></div><div className="field"><label htmlFor="adjust-note">Reason (optional)</label><input id="adjust-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Count correction"/></div></div><p className="helper">Stock cannot be adjusted below zero. This action is recorded in Activity.</p></> :
   <div className="form-grid"><div className="field"><label htmlFor="edit-stock">Current stock ({item.unit})</label><input id="edit-stock" type="number" min="0" step="any" value={stock} onChange={(e) => setStock(e.target.value)} data-testid={`input-stock-${item.id}`}/></div><div className="field"><label htmlFor="edit-safety">Safety stock ({item.unit})</label><input id="edit-safety" type="number" min="0" step="any" value={safety} onChange={(e) => setSafety(e.target.value)} data-testid={`input-safety-${item.id}`}/></div><div className="field"><label htmlFor="edit-daily">Baseline daily demand ({item.unit}/day)</label><input id="edit-daily" type="number" min="0" step="any" value={daily} onChange={(e) => setDaily(e.target.value)} data-testid={`input-daily-${item.id}`}/></div><div className="field"><label>Recipe usage</label><div className="helper" style={{ padding: 10, background: '#f0efe8', borderRadius: 8 }}>{recipeUsage(item.id)}</div></div></div>}
   <div className="modal-footer"><button type="button" className="btn" onClick={close}>Cancel</button><button type="submit" className="btn btn-primary" data-testid={adjust ? `button-save-adjust-${item.id}` : `button-save-inventory-${item.id}`}>{adjust ? 'Save adjustment' : 'Save assumptions'}</button></div>
  </form></div>;
 }

 function RecipeModal({ product, close }: { product: string; close: () => void }) {
  const existing = store.recipes[product] ?? {};
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(store.inventory.map((item) => [item.id, `${existing[item.id] ?? 0}`])));
  const submit = (e: FormEvent) => {
   e.preventDefault();
   const recipe = Object.fromEntries(store.inventory.map((item) => [item.id, Math.max(0, Number(values[item.id] || 0))]));
   update((s) => ({ ...s, recipes: { ...s.recipes, [product]: recipe }, events: [log('Recipe updated', `${product} per-drink ingredient quantities were changed.`), ...s.events] }));
   close(); notify('Recipe assumptions updated');
  };
  return <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}><form className="modal" onSubmit={submit}><div className="modal-head"><div><div className="eyebrow">RECIPE ASSUMPTION</div><h2 className="modal-title">Edit {product}</h2></div><button type="button" className="icon-btn" onClick={close} aria-label="Close"><X size={17}/></button></div>
   <p className="page-subtitle">Set the ingredient quantity used for one drink. These quantities power order-demand calculations.</p><div className="form-grid" style={{ marginTop: 17 }}>{store.inventory.map((item) => <div className="field" key={item.id}><label htmlFor={`recipe-${item.id}`}>{item.name} ({item.unit} per drink)</label><input id={`recipe-${item.id}`} type="number" min="0" step="any" value={values[item.id]} onChange={(e) => setValues((v) => ({ ...v, [item.id]: e.target.value }))} data-testid={`input-recipe-${product.toLowerCase().replaceAll(' ', '-')}-${item.id}`}/></div>)}</div>
   <div className="modal-footer"><button type="button" className="btn" onClick={close}>Cancel</button><button type="submit" className="btn btn-primary" data-testid="button-save-recipe">Save recipe</button></div>
  </form></div>;
 }

 return <div className="app-shell">
  <aside className="sidebar">
   <div className="brand"><div className="brand-mark">S</div><div><div className="brand-name">StockLink</div><div className="brand-sub">Kopi Corner demo</div></div></div>
   <div className="nav-label">Workspace</div>{nav.map(({ href, name, icon: Icon }) => <Link href={href} key={href} className={`nav-link ${location === href ? 'active' : ''}`} data-testid={`nav-${name.toLowerCase()}`}><Icon size={17}/><span>{name}</span>{name === 'Activity' && <ChevronRight size={13} style={{ marginLeft: 'auto', opacity: .55 }}/>}</Link>)}
   <div className="side-bottom"><div className="workspace"><span>Workspace</span><strong>Kopi Corner</strong><span>Petaling Jaya · MY</span></div><div className="workspace" style={{ borderTop: 0, marginTop: 7, paddingTop: 5, fontSize: 10 }}>Local demo · your changes stay in this browser</div></div>
  </aside>
  <div className="main-area">
   <header className="topbar" style={{ position: 'sticky', top: 0, zIndex: 4 }}><div className="top-left"><button className="icon-btn menu-toggle" aria-label="Open navigation" onClick={() => setMenuOpen((v) => !v)} data-testid="button-mobile-menu"><Menu size={18}/></button><span className="topbar-title">{routeName}</span><span className="demo-label">Demo data · no live integrations</span></div><div className="top-meta"><span>Petaling Jaya, MY</span><span>{new Date().toLocaleDateString('en-MY', { day: 'numeric', month: 'short' })}</span><button className="reset-link" onClick={reset} data-testid="button-reset-demo">Reset to demo data</button></div></header>
   {menuOpen && <div className="mobile-nav" style={{ bottom: 'auto', top: 60, flexDirection: 'column', alignItems: 'stretch', padding: 12, boxShadow: '0 12px 20px #1235' }}>{nav.map(({ href, name, icon: Icon }) => <Link href={href} key={href} className={`nav-link ${location === href ? 'active' : ''}`} onClick={() => setMenuOpen(false)} data-testid={`mobile-nav-${name.toLowerCase()}`}><Icon size={17}/>{name}</Link>)}</div>}
   <main className="main-content"><Switch><Route path="/"><Overview/></Route><Route path="/orders"><OrdersPage/></Route><Route path="/inventory"><InventoryPage/></Route><Route path="/deliveries"><DeliveriesPage/></Route><Route path="/activity"><ActivityPage/></Route><Route><div className="card empty-state"><div className="empty-icon"><Package size={20}/></div><strong>Page not found</strong><p className="section-caption">That StockLink view is not available.</p><Link className="btn btn-primary" href="/">Back to overview</Link></div></Route></Switch></main>
  </div>
  <nav className="mobile-nav" aria-label="Main navigation">{nav.map(({ href, name, icon: Icon }) => <Link href={href} key={href} className={location === href ? 'active' : ''} data-testid={`mobile-tab-${name.toLowerCase()}`}><Icon size={17}/><span>{name}</span></Link>)}</nav>
  {modal?.type === 'order' && <OrderModal order={store.orders.find((o) => o.id === modal.id)} close={() => setModal(null)}/>}
  {modal?.type === 'inventory' && itemById(modal.id ?? '') && <InventoryModal item={itemById(modal.id ?? '')!} close={() => setModal(null)}/>}
  {modal?.type === 'adjust' && itemById(modal.id ?? '') && <InventoryModal item={itemById(modal.id ?? '')!} adjust close={() => setModal(null)}/>}
  {modal?.type === 'recipe' && <RecipeModal product={modal.id ?? products[0]} close={() => setModal(null)}/>}
  {toast && <div role="status" className="toast" data-testid="toast-feedback">{toast}</div>}
 </div>;
}

function Empty({ icon, title, detail, action }: { icon: ReactNode; title: string; detail: string; action?: ReactNode }) {
 return <div className="empty-state"><div className="empty-icon">{icon}</div><strong>{title}</strong><div className="section-caption" style={{ marginTop: 5 }}>{detail}</div>{action && <div style={{ marginTop: 15 }}>{action}</div>}</div>;
}

function StockChart({ items, forecastAt }: { items: Ingredient[]; forecastAt: (item: Ingredient, day: number) => number }) {
 const colors: Record<string, string> = { milk: '#bd7448', beans: '#39715f', cups: '#c29a52' };
 const x = (day: number) => 40 + day * 76;
 const y = (value: number, max: number) => 175 - (Math.max(0, Math.min(max, value)) / max) * 140;
 return <svg className="timeline" viewBox="0 0 590 205" role="img" aria-label="Seven day stock forecast chart">
  {[0, 1, 2, 3].map((i) => <g key={i}><line x1="36" x2="575" y1={34 + i * 45} y2={34 + i * 45} stroke="#ece9df" strokeDasharray="3 4"/><text x="4" y={38 + i * 45} className="timeline-label">{3 - i}</text></g>)}
  {Array.from({ length: 8 }, (_, day) => <text key={day} x={x(day)} y="199" textAnchor="middle" className="timeline-label">{day === 0 ? 'Today' : `+${day}d`}</text>)}
  {items.map((item) => {
   const vals = Array.from({ length: 8 }, (_, day) => forecastAt(item, day));
   const max = Math.max(item.stock, item.safety * 1.7, ...vals.filter((v) => v > 0)) * 1.12 || 1;
   const path = vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v, max)}`).join(' ');
   const safetyY = y(item.safety, max);
   return <g key={item.id} data-testid={`chart-line-${item.id}`}><line x1="38" x2="575" y1={safetyY} y2={safetyY} stroke={colors[item.id]} strokeOpacity=".3" strokeDasharray="4 5"/><path d={path} fill="none" stroke={colors[item.id]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>{vals.map((v, i) => <circle key={i} cx={x(i)} cy={y(v, max)} r={i === 0 ? 4 : 2.5} fill={colors[item.id]} stroke="#fff" strokeWidth="1.5"/>)}</g>;
  })}
 </svg>;
}

export default App;
