document.addEventListener('DOMContentLoaded',()=>{
  const products=[
    {id:1,title:'Over-ear ANC Headphones',category:'headphones',specs:'40h Battery • ANC',price:299.99,badge:'Best Seller',image:'images/product-1.jpg',alt:'Over-ear ANC headphones with neon accents',rating:4.9,reviewCount:120,colors:['Black','Silver']},
    {id:2,title:'True Wireless Earbuds',category:'earbuds',specs:'30h Battery • Noise Cancelling',price:149.99,badge:'New Arrival',image:'images/product-2.jpg',alt:'True wireless earbuds with charging case',rating:4.7,reviewCount:85,colors:['White','Blue']},
    {id:3,title:'Studio Microphone',category:'speakers',specs:'USB • Cardioid',price:199.99,badge:'Sale -20%',image:'images/product-3.jpg',alt:'Studio microphone with sleek design',rating:4.8,reviewCount:60,colors:['Black']},
    {id:4,title:'Bluetooth Speaker',category:'speakers',specs:'20h Battery • Waterproof',price:99.99,badge:'Best Seller',image:'images/product-4.jpg',alt:'Portable Bluetooth speaker with neon glow',rating:4.6,reviewCount:200,colors:['Red','Black']},
    {id:5,title:'Smartwatch',category:'wearables',specs:'24h Battery • Heart Rate',price:249.99,badge:'New Arrival',image:'images/product-5.jpg',alt:'Smartwatch with OLED display',rating:4.5,reviewCount:45,colors:['Black','Gold']},
    {id:6,title:'Slim Mechanical Keyboard',category:'wearables',specs:'RGB • Blue Switches',price:129.99,badge:'Sale -20%',image:'images/product-6.jpg',alt:'Slim mechanical keyboard with RGB lighting',rating:4.4,reviewCount:70,colors:['Black','White']}
  ];
  let wishlist=new Set();
  let cart=[];
  let currentCategory='all';
  const productGrid=document.getElementById('productGrid');
  const searchInput=document.getElementById('search');
  const wishlistCount=document.getElementById('wishlistCount');
  const cartCount=document.getElementById('cartCount');
  const cartDrawer=document.getElementById('cartDrawer');
  const cartItemsList=document.getElementById('cartItems');
  const subtotalEl=document.getElementById('subtotal');
  const taxEl=document.getElementById('tax');
  const grandTotalEl=document.getElementById('grandTotal');
  const toastContainer=document.getElementById('toastContainer');
  const quickViewModal=document.getElementById('quickViewModal');
  const demoModal=document.getElementById('demoModal');
  const checkoutModal=document.getElementById('checkoutModal');
  const orderConfirmedModal=document.getElementById('orderConfirmedModal');
  const orderNumberEl=document.getElementById('orderNumber');
  const newsletterEmail=document.getElementById('newsletterEmail');
  const subscribeBtn=document.getElementById('subscribeBtn');
  const shopBestSellersBtn=document.getElementById('shopBestSellers');
  const watchDemoBtn=document.getElementById('watchDemo');
  const tabs=document.querySelectorAll('.filter-tabs .tab');
  function renderProducts(){
    const filterText=searchInput.value.toLowerCase();
    productGrid.innerHTML='';
    products.filter(p=>{
      const matchesCategory=currentCategory==='all'||p.category===currentCategory;
      const matchesSearch=p.title.toLowerCase().includes(filterText)||p.specs.toLowerCase().includes(filterText)||p.category.toLowerCase().includes(filterText);
      return matchesCategory&&matchesSearch;
    }).forEach(p=>{
      const card=document.createElement('div');card.className='product-card';
      const badge=document.createElement('div');badge.className='badge';badge.textContent=p.badge;card.appendChild(badge);
      const img=document.createElement('img');img.src=p.image;img.alt=p.alt;card.appendChild(img);
      const info=document.createElement('div');info.className='info';
      const rating=document.createElement('div');rating.className='rating';rating.textContent='★'.repeat(Math.round(p.rating))+` (${p.reviewCount})`;info.appendChild(rating);
      const title=document.createElement('div');title.className='title';title.textContent=p.title;info.appendChild(title);
      const specs=document.createElement('div');specs.className='specs';specs.textContent=p.specs;info.appendChild(specs);
      const price=document.createElement('div');price.className='price';price.textContent=`$${p.price.toFixed(2)}`;info.appendChild(price);
      const actions=document.createElement('div');actions.className='actions';
      const wishlistBtn=document.createElement('button');wishlistBtn.innerHTML='❤';wishlistBtn.title='Add to Wishlist';wishlistBtn.addEventListener('click',()=>{toggleWishlist(p.id,wishlistBtn);});
      const quickBtn=document.createElement('button');quickBtn.textContent='Quick View';quickBtn.addEventListener('click',()=>{openQuickView(p);});
      const addToCartBtn=document.createElement('button');addToCartBtn.textContent='Add to Cart';addToCartBtn.addEventListener('click',()=>{addToCart(p);});
      actions.appendChild(wishlistBtn);actions.appendChild(quickBtn);actions.appendChild(addToCartBtn);
      info.appendChild(actions);
      card.appendChild(info);
      productGrid.appendChild(card);
    });
  }
  function toggleWishlist(id,btn){
    if(wishlist.has(id)){wishlist.delete(id);btn.style.color='white';}else{wishlist.add(id);btn.style.color='red';}
    wishlistCount.textContent=wishlist.size;
    showToast('Wishlist updated!');
  }
  function addToCart(product){
    const existing=cart.find(item=>item.id===product.id);
    if(existing){existing.qty++;}else{cart.push({...product,qty:1});}
    cartCount.textContent=cart.reduce((sum,i)=>sum+i.qty,0);
    showToast('Item added to cart!');
  }
  function openCartDrawer(){cartDrawer.classList.add('open');renderCartItems();}
  function closeCartDrawer(){cartDrawer.classList.remove('open');}
  function renderCartItems(){
    cartItemsList.innerHTML='';
    cart.forEach(item=>{
      const li=document.createElement('li');
      const img=document.createElement('img');img.src=item.image;img.alt=item.alt;li.appendChild(img);
      const details=document.createElement('div');details.innerHTML=`<strong>${item.title}</strong><br>$${item.price.toFixed(2)} x <span class="qty">${item.qty}</span>`;li.appendChild(details);
      const controls=document.createElement('div');controls.className='controls';
      const dec=document.createElement('button');dec.textContent='-';dec.addEventListener('click',()=>{updateQty(item.id,-1);});
      const inc=document.createElement('button');inc.textContent='+';inc.addEventListener('click',()=>{updateQty(item.id,1);});
      const del=document.createElement('button');del.textContent='🗑';del.addEventListener('click',()=>{removeFromCart(item.id);});
      controls.appendChild(dec);controls.appendChild(inc);controls.appendChild(del);
      li.appendChild(controls);
      cartItemsList.appendChild(li);
    });
    updateCartSummary();
  }
  function updateQty(id,delta){
    const item=cart.find(i=>i.id===id);
    if(item){item.qty+=delta;if(item.qty<1){removeFromCart(id);}else{renderCartItems();}}
  }
  function removeFromCart(id){cart=cart.filter(i=>i.id!==id);renderCartItems();cartCount.textContent=cart.reduce((sum,i)=>sum+i.qty,0);}
  function updateCartSummary(){
    const subtotal=cart.reduce((sum,i)=>sum+ i.price*i.qty,0);
    const tax=subtotal*0.08;
    const grand=subtotal+tax;
    subtotalEl.textContent=subtotal.toFixed(2);
    taxEl.textContent=tax.toFixed(2);
    grandTotalEl.textContent=grand.toFixed(2);
  }
  function openQuickView(product){
    document.getElementById('quickViewImg').src=product.image;
    document.getElementById('quickViewTitle').textContent=product.title;
    document.getElementById('quickViewSpecs').textContent=product.specs;
    const colorOptions=document.getElementById('colorOptions');colorOptions.innerHTML='';product.colors.forEach(c=>{const btn=document.createElement('button');btn.textContent=c;btn.className='color-btn';colorOptions.appendChild(btn);});
    let qty=1;document.getElementById('qtyDisplay').textContent=qty;
    document.getElementById('increaseQty').onclick=()=>{qty++;document.getElementById('qtyDisplay').textContent=qty;};
    document.getElementById('decreaseQty').onclick=()=>{if(qty>1){qty--;document.getElementById('qtyDisplay').textContent=qty;}};
    document.getElementById('addToCartFromQuick').onclick=()=>{addToCart(product);quickViewModal.classList.remove('show');};
    quickViewModal.classList.add('show');
  }
  function closeQuickView(){quickViewModal.classList.remove('show');}
  function openDemo(){demoModal.classList.add('show');}
  function closeDemo(){demoModal.classList.remove('show');}
  function openCheckout(){checkoutModal.classList.add('show');}
  function closeCheckout(){checkoutModal.classList.remove('show');}
  function submitCheckout(e){e.preventDefault();const form=e.target;const data=new FormData(form);if(!data.get('name')||!data.get('email')||!data.get('address')){showToast('Please fill all required fields');return;}showToast('Processing...');setTimeout(()=>{cart=[];cartCount.textContent='0';cartDrawer.classList.remove('open');checkoutModal.classList.remove('show');orderNumberEl.textContent=Math.floor(Math.random()*9000+1000);orderConfirmedModal.classList.add('show');showToast('Order placed successfully!');},1000);}
  function closeOrderConfirmed(){orderConfirmedModal.classList.remove('show');}
  function showToast(message){const toast=document.createElement('div');toast.className='toast';toast.textContent=message;toastContainer.appendChild(toast);setTimeout(()=>{toast.remove();},3000);}
  function validateEmail(email){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);}
  function subscribe(){const email=newsletterEmail.value;if(validateEmail(email)){showToast('Welcome to NEXUS Insider VIP');newsletterEmail.value='';}else{showToast('Enter a valid email');}}
  // Event Listeners
  searchInput.addEventListener('input',renderProducts);
  tabs.forEach(tab=>{tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.remove('active'));tab.classList.add('active');currentCategory=tab.dataset.category;renderProducts();});});
  document.getElementById('wishlistIcon').addEventListener('click',()=>{wishlistCount.textContent=wishlist.size;});
  document.getElementById('cartIcon').addEventListener('click',openCartDrawer);
  document.getElementById('closeDrawer').addEventListener('click',closeCartDrawer);
  document.getElementById('checkoutBtn').addEventListener('click',openCheckout);
  document.getElementById('closeQuickView').addEventListener('click',closeQuickView);
  document.getElementById('closeDemo').addEventListener('click',closeDemo);
  document.getElementById('closeCheckout').addEventListener('click',closeCheckout);
  document.getElementById('closeOrderConfirmed').addEventListener('click',closeOrderConfirmed);
  document.getElementById('addToCartFromQuick').addEventListener('click',()=>{}); // handled in openQuickView
  document.getElementById('decreaseQty').addEventListener('click',()=>{}); // handled in openQuickView
  document.getElementById('increaseQty').addEventListener('click',()=>{}); // handled in openQuickView
  document.getElementById('shopBestSellers').addEventListener('click',()=>{document.querySelector('.product-grid').scrollIntoView({behavior:'smooth'});});
  watchDemoBtn.addEventListener('click',openDemo);
  subscribeBtn.addEventListener('click',subscribe);
  document.getElementById('checkoutForm').addEventListener('submit',submitCheckout);
  renderProducts();
});