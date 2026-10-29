import React, { useMemo, useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, Plus, Minus, ArrowRight, Check, SlidersHorizontal, Eye } from 'lucide-react';

const products = [
  { id: 1, name: 'Classic White T-Shirt', category: 'Clothing', price: 1290, oldPrice: 1590, tag: 'BESTSELLER', desc: 'A soft everyday staple with an easy, relaxed fit.', color: 'White', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Everyday Blue Jeans', category: 'Clothing', price: 2990, desc: 'Easy-to-style denim made for everyday outfits.', color: 'Blue denim', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Casual Button Shirt', category: 'Clothing', price: 2490, desc: 'A versatile shirt for casual days and smart layering.', color: 'Neutral', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Everyday Hoodie', category: 'Clothing', price: 3290, desc: 'Comfortable, simple and easy to pair with denim.', color: 'Neutral', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'White Sneakers', category: 'Shoes', price: 3890, oldPrice: 4290, tag: 'POPULAR', desc: 'Clean everyday sneakers with a classic silhouette.', color: 'White', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Classic Flats', category: 'Shoes', price: 2790, desc: 'Simple flats that work from everyday errands to outings.', color: 'Tan', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'Everyday Tote Bag', category: 'Bags', price: 1990, desc: 'A roomy bag for carrying your daily essentials.', color: 'Tan', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85' },
  { id: 8, name: 'Shoulder Bag', category: 'Bags', price: 2590, tag: 'NEW', desc: 'A compact shoulder bag for day-to-day plans.', color: 'Brown', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85' },
  { id: 9, name: 'Classic Sunglasses', category: 'Glasses', price: 1490, desc: 'Timeless sunglasses with an easy-to-wear frame.', color: 'Black', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85' },
  { id: 10, name: 'Everyday Eyeglasses', category: 'Glasses', price: 1790, desc: 'A minimal frame to finish off your everyday look.', color: 'Black', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85' },
  { id: 11, name: 'Makeup Essentials', category: 'Beauty', price: 1890, desc: 'A small beauty edit for your everyday routine.', color: 'Mixed', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85' },
  { id: 12, name: 'Beauty Palette', category: 'Beauty', price: 1590, desc: 'A versatile palette for simple everyday looks.', color: 'Mixed', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85' }
];
const categories = ['All', 'Clothing', 'Shoes', 'Bags', 'Glasses', 'Beauty'];
const money = n => `Rs. ${n.toLocaleString('en-PK')}`;

function App() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState('');
  const [selected, setSelected] = useState(null);
  const [checkout, setCheckout] = useState(false);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [orderDone, setOrderDone] = useState(false);

  const shown = useMemo(() => {
    let list = products.filter(p => (category === 'All' || p.category === category) && `${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === 'low') list.sort((a,b) => a.price - b.price);
    if (sort === 'high') list.sort((a,b) => b.price - a.price);
    if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [category, search, sort]);

  const count = Object.values(cart).reduce((a,b) => a+b, 0);
  const total = products.reduce((sum,p) => sum + p.price * (cart[p.id] || 0), 0);
  const add = p => {
    setCart(prev => ({...prev, [p.id]: (prev[p.id] || 0) + 1}));
    setNotice(`${p.name} added to cart`);
    window.setTimeout(() => setNotice(''), 2200);
  };
  const changeQty = (id, delta) => setCart(prev => { const next = {...prev}; next[id] = (next[id] || 0) + delta; if (next[id] <= 0) delete next[id]; return next; });
  const toggleWish = id => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const chooseCategory = c => { setCategory(c); setMobileMenu(false); document.getElementById('shop')?.scrollIntoView({behavior:'smooth'}); };
  const placeOrder = e => { e.preventDefault(); setOrderDone(true); setCart({}); };

  return <div className="site">
    <div className="announcement">EVERYDAY STYLE, MADE SIMPLE <span>✦</span> FREE DELIVERY ON ORDERS OVER RS. 5,000</div>
    <header className="header">
      <button className="icon-btn mobile-only" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X/> : <Menu/>}</button>
      <a className="logo" href="#home">style<span>studio.</span></a>
      <nav className={mobileMenu ? 'nav nav-open' : 'nav'}>
        {categories.map(c => <button key={c} className={category===c?'nav-link active':'nav-link'} onClick={() => chooseCategory(c)}>{c}</button>)}
      </nav>
      <div className="header-actions">
        <label className="search-box"><Search size={17}/><input aria-label="Search products" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products..." /></label>
        <button className="icon-btn bag-button" aria-label="Open shopping cart" onClick={()=>setCartOpen(true)}><ShoppingBag/><span className="bag-count">{count}</span></button>
      </div>
    </header>
    <main id="home">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="dot"></span> THE EVERYDAY COLLECTION</p>
          <h1>Your style.<br/><em>Your everyday.</em></h1>
          <p className="hero-desc">Clothes, shoes, bags, glasses and beauty essentials — all in one simple place.</p>
          <button className="dark-button" onClick={()=>document.getElementById('shop').scrollIntoView({behavior:'smooth'})}>SHOP COLLECTION <ArrowRight size={17}/></button>
          <div className="hero-foot"><span>01 — 12</span><span>EVERYDAY FINDS, EASY STYLE</span></div>
        </div>
        <div className="hero-art">
          <img className="hero-image" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=90" alt="Fashion shopping and everyday style" />
          <div className="hero-card"><span>THE EVERYDAY</span><strong>EDIT.</strong><small>STYLE THAT FEELS LIKE YOU</small></div>
          <div className="hero-sticker">GOOD FINDS<br/>ONLY ✳</div>
        </div>
      </section>
      <section className="trust-row">
        <div><span>✳</span><p><b>Everyday clothing</b><small>Easy pieces to mix and match</small></p></div>
        <div><span>↗</span><p><b>Style essentials</b><small>Shoes, bags and glasses</small></p></div>
        <div><span>♡</span><p><b>A little beauty</b><small>Finishing touches for your look</small></p></div>
      </section>
      <section className="shop-section" id="shop">
        <div className="section-heading"><div><p className="eyebrow">SHOP BY CATEGORY</p><h2>Find your <em>favourites.</em></h2></div><p className="section-note">Simple essentials. Everyday prices.</p></div>
        <div className="category-tiles">
          {[
            {name:'Clothing', image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80'},
            {name:'Shoes', image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80'},
            {name:'Bags', image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80'},
            {name:'Glasses', image:'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=500&q=80'},
            {name:'Beauty', image:'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80'}
          ].map(c=><button className="category-tile" key={c.name} onClick={()=>chooseCategory(c.name)}><img src={c.image} alt={c.name} loading="lazy"/><span>{c.name}<ArrowRight size={16}/></span></button>)}
        </div>
        <div className="shop-toolbar">
          <div className="filters">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?'filter active-filter':'filter'}>{c}</button>)}</div>
          <label className="sort-label"><SlidersHorizontal size={15}/><span>Sort:</span><select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name: A–Z</option></select></label>
        </div>
        <div className="product-grid">
          {shown.map(p=><article className="product-card" key={p.id}>
            <div className="product-visual" onClick={()=>setSelected(p)} role="button" tabIndex="0" onKeyDown={e=>e.key==='Enter'&&setSelected(p)}>
              {p.tag && <span className="product-tag">{p.tag}</span>}
              <button className={wishlist.includes(p.id)?'wish-button wished':'wish-button'} aria-label="Add to wishlist" onClick={e=>{e.stopPropagation();toggleWish(p.id)}}><Heart size={18} fill={wishlist.includes(p.id)?'currentColor':'none'}/></button>
              <img src={p.image} alt={p.name} loading="lazy" onError={e=>{e.currentTarget.style.display='none';e.currentTarget.parentElement.classList.add('image-fallback');}}/>
              <span className="view-product"><Eye size={15}/> View details</span>
            </div>
            <div className="product-info"><button className="product-title-button" onClick={()=>setSelected(p)}><p className="product-category">{p.category}</p><h3>{p.name}</h3></button><p className="product-desc">{p.desc}</p><div className="price-row"><div><strong>{money(p.price)}</strong>{p.oldPrice&&<del>{money(p.oldPrice)}</del>}</div><button className="add-button" aria-label={`Add ${p.name} to cart`} onClick={()=>add(p)}><Plus size={18}/></button></div></div>
          </article>)}
        </div>
        {shown.length===0&&<div className="empty-results">No products found. Try another search.</div>}
      </section>
      <section className="newsletter"><div><p className="eyebrow">A LITTLE OF EVERYTHING</p><h2>Good basics.<br/><em>Good feeling.</em></h2><p>Explore easy-to-wear clothes, everyday shoes, bags, glasses and beauty picks.</p></div><button className="light-button" onClick={()=>{setCategory('All');setSearch('');document.getElementById('shop').scrollIntoView({behavior:'smooth'});}}>EXPLORE ALL <ArrowRight size={16}/></button></section>
    </main>
    <footer className="footer"><a className="logo" href="#home">style<span>studio.</span></a><p>Everyday essentials, thoughtfully picked.</p><small>© 2026 Style Studio · Student E-Commerce Project</small></footer>

    {selected&&<div className="overlay product-overlay" onMouseDown={e=>e.target===e.currentTarget&&setSelected(null)}>
      <section className="product-modal">
        <button className="modal-close icon-btn" aria-label="Close product details" onClick={()=>setSelected(null)}><X/></button>
        <img className="modal-image" src={selected.image} alt={selected.name}/>
        <div className="modal-details"><p className="eyebrow">{selected.category}</p><h2>{selected.name}</h2><strong className="modal-price">{money(selected.price)}</strong><p>{selected.desc}</p><p className="detail-line"><b>Colour:</b> {selected.color}</p><p className="detail-line"><b>Category:</b> {selected.category}</p><button className="dark-button full-button" onClick={()=>{add(selected);setSelected(null)}}><ShoppingBag size={17}/> ADD TO CART</button><button className="back-button" onClick={()=>toggleWish(selected.id)}><Heart size={16} fill={wishlist.includes(selected.id)?'currentColor':'none'}/> {wishlist.includes(selected.id)?'REMOVE FROM WISHLIST':'ADD TO WISHLIST'}</button></div>
      </section>
    </div>}

    {notice&&<div className="toast"><Check size={17}/>{notice}</div>}
    {cartOpen&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget){setCartOpen(false);setCheckout(false);setOrderDone(false);}}}>
      <aside className="cart-drawer">
        <div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>{checkout?'Checkout':'Shopping cart'} <span>({count})</span></h2></div><button className="icon-btn" aria-label="Close cart" onClick={()=>{setCartOpen(false);setCheckout(false);setOrderDone(false);}}><X/></button></div>
        {orderDone ? <div className="success-state"><div className="success-icon"><Check/></div><h3>Demo order complete!</h3><p>Thank you, {customer.name}. This is a student demo; no real payment or delivery has been processed.</p><button className="dark-button" onClick={()=>{setCartOpen(false);setCheckout(false);setOrderDone(false);}}>CONTINUE SHOPPING <ArrowRight size={16}/></button></div> :
        checkout ? <form className="checkout-form" onSubmit={placeOrder}><p className="demo-note">Demo checkout only — no real payment is taken.</p><label>Full name<input required value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})} placeholder="Your name"/></label><label>Phone number<input required type="tel" value={customer.phone} onChange={e=>setCustomer({...customer,phone:e.target.value})} placeholder="03xx xxxxxxx"/></label><label>Delivery address<textarea required value={customer.address} onChange={e=>setCustomer({...customer,address:e.target.value})} placeholder="Enter delivery address"/></label><div className="cart-total"><span>Order total</span><strong>{money(total)}</strong></div><button className="dark-button full-button" type="submit">PLACE DEMO ORDER <ArrowRight size={16}/></button><button type="button" className="back-button" onClick={()=>setCheckout(false)}>Back to cart</button></form> :
        <>{count===0?<div className="empty-cart"><ShoppingBag size={35}/><h3>Your cart is empty</h3><p>Add something you like from the collection.</p><button className="dark-button" onClick={()=>setCartOpen(false)}>EXPLORE PRODUCTS <ArrowRight size={16}/></button></div>:
        <><div className="cart-items">{products.filter(p=>cart[p.id]).map(p=><div className="cart-item" key={p.id}><img className="cart-thumb" src={p.image} alt={p.name}/><div className="cart-item-info"><h3>{p.name}</h3><strong>{money(p.price)}</strong><div className="quantity"><button aria-label="Decrease quantity" onClick={()=>changeQty(p.id,-1)}><Minus size={13}/></button><span>{cart[p.id]}</span><button aria-label="Increase quantity" onClick={()=>changeQty(p.id,1)}><Plus size={13}/></button></div></div><button className="remove-button" onClick={()=>setCart(prev=>{const n={...prev};delete n[p.id];return n;})}>Remove</button></div>)}</div><div className="drawer-bottom"><div className="cart-total"><span>Subtotal</span><strong>{money(total)}</strong></div><p className="shipping-note">Shipping calculated at checkout. Free delivery over Rs. 5,000.</p><button className="dark-button full-button" onClick={()=>setCheckout(true)}>CONTINUE TO CHECKOUT <ArrowRight size={16}/></button><button className="back-button" onClick={()=>setCartOpen(false)}>Continue shopping</button></div></>}
        </>}
      </aside>
    </div>}
  </div>;
}
export default App;
