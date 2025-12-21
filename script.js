   // classes
class Item {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}
class ComboItem {
  constructor(item, qty) {
    this.item = item;
    this.qty = qty;
  }
  getTotal() { return this.qty * (this.item.value || 0); }
}
class Combo {
  constructor(name, brand = "", price = 0, items = []) {
    this.name = name; this.brand = brand; this.price = price; this.items = items; this.score = this.getRating();
  }
  calculateTotal() { return (this.items || []).reduce((s, ci) => s + (ci.getTotal ? ci.getTotal() : 0), 0); }
  getRating() { return (this.calculateTotal() - this.price) / this.price * 100; }
}

// baselist
const baseList = [
  {
    "name": "King's Choice Bundle",
    "brand": "Burger King",
    "price": 45.0,
    "items": [
      { "item": { "name": "Large Side", "value": 5.5 }, "qty": 2 },
      { "item": { "name": "Large Drink", "value": 5 }, "qty": 1 },
      { "item": { "name": "Medium Burger", "value": 9 }, "qty": 2 },
      { "item": { "name": "Small Burger", "value": 5 }, "qty": 4 }
    ]
  },
  {
    "name": "Whopper Deal",
    "brand": "Burger King",
    "price": 19.0,
    "items": [
      { "item": { "name": "Medium Side", "value": 4.5 }, "qty": 1 },
      { "item": { "name": "Medium Drink", "value": 4 }, "qty": 1 },
      { "item": { "name": "Medium Burger", "value": 9 }, "qty": 1 },
      { "item": { "name": "Small Burger", "value": 5 }, "qty": 1 }
    ]
  },
  {
    "name": "King's Choice Deal",
    "brand": "Burger King",
    "price": 15.0,
    "items": [
      { "item": { "name": "Medium Side", "value": 4.5 }, "qty": 1 },
      { "item": { "name": "Medium Drink", "value": 4 }, "qty": 1 },
      { "item": { "name": "Small Burger", "value": 5 }, "qty": 2 }
    ]
  },
  {
    "name": "Whopper Regular Value Meal",
    "brand": "Burger King",
    "price": 14.75,
    "items": [
      { "item": { "name": "Medium Side", "value": 4.5 }, "qty": 1 },
      { "item": { "name": "Medium Drink", "value": 4 }, "qty": 1 },
      { "item": { "name": "Medium Burger", "value": 9 }, "qty": 1 }
    ]
  },
  {
    "name": "BBQ Rodeo King Sampler",
    "brand": "Burger King",
    "price": 10.95,
    "items": [
      { "item": { "name": "Medium Side", "value": 4.5 }, "qty": 1 },
      { "item": { "name": "Small Side", "value": 3.5 }, "qty": 2 },
      { "item": { "name": "Small Drink", "value": 3 }, "qty": 1 },
      { "item": { "name": "Small Burger", "value": 5 }, "qty": 1 }
    ]
  },
  {
    "name": "Family Fillup",
    "brand": "Wendy's",
    "price": 39.0,
    "items": [
      { "item": { "name": "Small Side", "value": 3.5 }, "qty": 4 },
      { "item": { "name": "Small Drink", "value": 3 }, "qty": 4 },
      { "item": { "name": "Medium Burger", "value": 9 }, "qty": 2 },
      { "item": { "name": "Small Burger", "value": 5 }, "qty": 2 }
    ]
  },
  {
    "name": "The Smash",
    "brand": "Wendy's",
    "price": 14.0,
    "items": [
      { "item": { "name": "Small Side", "value": 3.5 }, "qty": 1 },
      { "item": { "name": "Small Drink", "value": 3 }, "qty": 1 },
      { "item": { "name": "Small Burger", "value": 5 }, "qty": 2 }
    ]
  },
  {
    "name": "Medium Baconator Combo",
    "brand": "Wendy's",
    "price": 20.4,
    "items": [
      { "item": { "name": "Medium Side", "value": 4.5 }, "qty": 1 },
      { "item": { "name": "Medium Drink", "value": 4 }, "qty": 1 },
      { "item": { "name": "Large Burger", "value": 14 }, "qty": 1 }
    ]
  },
  {
    "name": "Crispy Chicken Value Combo",
    "brand": "Wendy's",
    "price": 7.4,
    "items": [
      { "item": { "name": "Small Side", "value": 3.5 }, "qty": 1 },
      { "item": { "name": "Small Drink", "value": 3 }, "qty": 1 },
      { "item": { "name": "Small Burger", "value": 5 }, "qty": 1 }
    ]
  },
  {
    "name": "Cheeseburger Value Combo",
    "brand": "Wendy's",
    "price": 6.0,
    "items": [
      { "item": { "name": "Small Side", "value": 3.5 }, "qty": 1 },
      { "item": { "name": "Small Burger", "value": 5 }, "qty": 1 }
    ]
  },
  {
    "name": "Cheeseburger Double Up",
    "brand": "McDonald's",
    "price": 10.5,
    "items": [
      { "item": { "name": "Small Side", "value": 3.5 }, "qty": 1 },
      { "item": { "name": "Small Drink", "value": 3 }, "qty": 1 },
      { "item": { "name": "Small Burger", "value": 5 }, "qty": 2 }
    ]
  },
  {
    "name": "Cheeseburger & Fries",
    "brand": "McDonald's",
    "price": 6.0,
    "items": [
      { "item": { "name": "Small Side", "value": 3.5 }, "qty": 1 },
      { "item": { "name": "Small Burger", "value": 5 }, "qty": 1 }
    ]
  },
  {
    "name": "Medium Big Mac Combo",
    "brand": "McDonald's",
    "price": 13.1,
    "items": [
      { "item": { "name": "Medium Side", "value": 4.5 }, "qty": 1 },
      { "item": { "name": "Medium Drink", "value": 4 }, "qty": 1 },
      { "item": { "name": "Medium Burger", "value": 9 }, "qty": 1 }
    ]
  },
  {
    "name": "Big Choice Deal",
    "brand": "McDonald's",
    "price": 25.0,
    "items": [
      { "item": { "name": "Medium Side", "value": 4.5 }, "qty": 4 },
      { "item": { "name": "Medium Burger", "value": 9 }, "qty": 2 }
    ]
  },
  {
    "name": "Classics Share Meal",
    "brand": "McDonald's",
    "price": 37.0,
    "items": [
      { "item": { "name": "Small Side", "value": 3.5 }, "qty": 2 },
      { "item": { "name": "Small Drink", "value": 3 }, "qty": 2 },
      { "item": { "name": "Medium Side", "value": 4.5 }, "qty": 2 },
      { "item": { "name": "Medium Drink", "value": 4 }, "qty": 2 },
      { "item": { "name": "Medium Burger", "value": 9 }, "qty": 3 },
      { "item": { "name": "Small Burger", "value": 5 }, "qty": 1 }
    ]
  },
  {
    "name": "Feast for Two",
    "brand": "KFC",
    "price": 24.99,
    "items": [
      { "item": { "name": "Secret Recipe Chicken", "value": 5 }, "qty": 4 },
      { "item": { "name": "Wicked Wing", "value": 3 }, "qty": 2 },
      { "item": { "name": "Large Side", "value": 5.5 }, "qty": 2 },
    ]
  },
  {
    "name": "3pc Quarter Pack",
    "brand": "KFC",
    "price": 18.49,
    "items": [
      { "item": { "name": "Secret Recipe Chicken", "value": 5 }, "qty": 3 },
      { "item": { "name": "Medium Side", "value": 4.5 }, "qty": 2 },
      { "item": { "name": "Medium Drink", "value": 4 }, "qty": 1 }
    ]
  },
  {
    "name": "Zinger Box Meal",
    "brand": "KFC",
    "price": 19.99,
    "items": [
      { "item": { "name": "Wicked Wing", "value": 3 }, "qty": 2 },
      { "item": { "name": "Medium Side", "value": 4.5 }, "qty": 2 },
      { "item": { "name": "Medium Burger", "value": 9 }, "qty": 1 },
      { "item": { "name": "Medium Drink", "value": 4 }, "qty": 1 }
    ]
  },
  {
    "name": "Superstars Box",
    "brand": "KFC",
    "price": 14.99,
    "items": [
      { "item": { "name": "Secret Recipe Chicken", "value": 5 }, "qty": 1 },
      { "item": { "name": "Wicked Wing", "value": 3 }, "qty": 1 },
      { "item": { "name": "Medium Side", "value": 4.5 }, "qty": 2 },
      { "item": { "name": "Small Side", "value": 3.5 }, "qty": 1 },
      { "item": { "name": "Medium Drink", "value": 4 }, "qty": 1 }
    ]
  },
  {
    "name": "20 Wicked Wings",
    "brand": "KFC",
    "price": 41.49,
    "items": [
      { "item": { "name": "Wicked Wing", "value": 3 }, "qty": 20 },
    ]
  },
];

// items
const STANDARD_ITEMS = [
  new Item('Small Side', 3.5),
  new Item('Medium Side', 4.5),
  new Item('Large Side', 5.5),
  new Item('Small Drink', 3),
  new Item('Medium Drink', 4),
  new Item('Large Drink', 5),
  new Item('Small Burger', 5),
  new Item('Medium Burger', 9),
  new Item('Large Burger', 14),
  new Item('Extra Large Burger', 20),
  new Item('Wicked Wing', 3),
  new Item('Secret Recipe Chicken', 5)
];

// Storage keys
const KEY_LISTS = 'fcc_lists';
const KEY_ORDER = 'fcc_order';

// App state
let lists = []; // {filename, displayName}
let order = [];
let selectedList = null;
let combos = [];

// DOM refs
const listsEl = document.getElementById('lists');
const combosEl = document.getElementById('combos');
const brandFilterEl = document.getElementById('brand-filter');
const priceMinEl = document.getElementById('price-min');
const priceMaxEl = document.getElementById('price-max');
const clearFiltersBtn = document.getElementById('clear-filters');
const createListBtn = document.getElementById('create-list');
const importFileInput = document.getElementById('import-file');
const openAddBtn = document.getElementById('open-add');

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const cName = document.getElementById('c-name');
const cBrand = document.getElementById('c-brand');
const cPrice = document.getElementById('c-price');
const lineItemsEl = document.getElementById('line-items');

const saveComboBtn = document.getElementById('save-combo');
const cancelBtn = document.getElementById('cancel');

function persistLists() { localStorage.setItem(KEY_LISTS, JSON.stringify(lists)); localStorage.setItem(KEY_ORDER, JSON.stringify(order)); }

function loadLists() {
  order = JSON.parse(localStorage.getItem(KEY_ORDER) || '[]');
  const allKeys = Object.keys(localStorage).filter(k => k.startsWith('fcc_list_'));
  const files = allKeys.map(k => k.replace(/^fcc_list_/, ''))
    .filter(f => f.endsWith('.json') && !f.startsWith('_'));
  const built = files.map(f => {
    const m = f.match(/^(\d+)\.json$/);
    return { filename: f, displayName: m ? `List ${m[1]}` : f.replace(/\.json$/, '') };
  });
  if (built.length === 0) {
    lists = [];
    return;
  }
  if (Array.isArray(order) && order.length > 0) {
    const map = new Map(built.map(l => [l.filename, l]));
    const ordered = order.map(f => map.get(f)).filter(Boolean);
    const remaining = built.filter(l => !order.includes(l.filename));
    const all = [...ordered, ...remaining];
    const deduped = all.filter((v, i, a) => a.findIndex(x => x.filename === v.filename) === i);
    lists = deduped;
  } else {
    const deduped = built.filter((v, i, a) => a.findIndex(x => x.filename === v.filename) === i);
    lists = deduped;
  }
}

function nextNumericFilename(existingFiles) {
  const nums = existingFiles.map(f => { const m = f.match(/^(\d+)\.json$/); return m ? Number(m[1]) : null; }).filter(n => n !== null);
  const used = new Set(nums);
  let candidate = 1;
  while (used.has(candidate)) candidate++;
  return `${candidate}.json`;
}

function uniqueNameCandidate(orig, existingFiles) {
  if (!existingFiles.includes(orig)) return orig;
  const m = orig.match(/^(.*?)(?:-(\d+))?(\.json)$/);
  const base = m ? m[1] : orig.replace(/\.json$/, '');
  const ext = m ? m[3] : '.json';
  let i = 1;
  while (true) {
    const name = `${base}-${i}${ext}`;
    if (!existingFiles.includes(name)) return name;
    i++;
  }
}

function saveSelectedList(updated) {
  if (!selectedList) return;
  const payload = (typeof updated === 'undefined' ? combos : updated).map(c => ({ name: c.name, brand: c.brand, price: c.price, items: c.items.map(ci => ({ item: { name: ci.item.name, value: ci.item.value }, qty: ci.qty })) }));
  localStorage.setItem('fcc_list_' + selectedList, JSON.stringify(payload));
}

function createList() {
  const existing = Object.keys(localStorage).filter(k => k.startsWith('fcc_list_')).map(k => k.replace(/^fcc_list_/, '')).filter(f => f.endsWith('.json') && !f.startsWith('_'));
  const filename = nextNumericFilename(existing);
  const safe = uniqueNameCandidate(filename, existing);
  localStorage.setItem('fcc_list_' + safe, JSON.stringify(baseList, null, 2));
  if (!order.includes(safe)) order.push(safe);
  persistLists();
  loadLists();
  renderLists();
}

function importFile(file) {
  const r = new FileReader();
  r.onload = function() {
    try {
      const content = JSON.parse(r.result);
      const existing = Object.keys(localStorage).filter(k => k.startsWith('fcc_list_')).map(k => k.replace(/^fcc_list_/, '')).filter(f => f.endsWith('.json') && !f.startsWith('_'));
      const candidate = nextNumericFilename(existing);
      const safe = uniqueNameCandidate(candidate, existing);
      localStorage.setItem('fcc_list_' + safe, JSON.stringify(content, null, 2));
      if (!order.includes(safe)) order.push(safe);
      persistLists();
      loadLists();
      renderLists();
    } catch (e) { alert('Invalid JSON'); }
  };
  r.readAsText(file);
}

function exportList(filename) {
  const txt = localStorage.getItem('fcc_list_' + filename) || '[]';
  const blob = new Blob([txt], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

function deleteList(filename) {
  if (!confirm('Delete ' + filename + '?')) return;
  lists = lists.filter(l => l.filename !== filename);
  order = order.filter(f => f !== filename);
  localStorage.removeItem('fcc_list_' + filename);
  if (selectedList === filename) { selectedList = null; combos = []; }
  persistLists(); renderLists(); renderCombos();
}

function renameList(filename) {
  const input = prompt('Rename list (enter new filename, without extension) or cancel');
  if (!input) return;
  const newName = input.endsWith('.json') ? input : input + '.json';
  const existing = Object.keys(localStorage).filter(k => k.startsWith('fcc_list_')).map(k => k.replace(/^fcc_list_/, ''));
  if (existing.includes(newName)) return alert('Rename failed: Target already exists');
  const content = localStorage.getItem('fcc_list_' + filename);
  if (content == null) return alert('Source not found');
  localStorage.setItem('fcc_list_' + newName, content);
  localStorage.removeItem('fcc_list_' + filename);
  lists = lists.map(l => l.filename === filename ? { filename: newName, displayName: newName.replace(/\.json$/, '') } : l);
  order = order.map(f => f === filename ? newName : f);
  if (selectedList === filename) selectedList = newName;
  persistLists(); loadLists(); renderLists();
}

function moveIndex(i, dir) {
  const j = i + dir; if (j < 0 || j >= lists.length) return;
  const tmp = lists[i]; lists[i] = lists[j]; lists[j] = tmp;
  order = lists.map(l => l.filename); persistLists(); renderLists();
}

function reorderLists(newOrder) {
  if (!Array.isArray(newOrder)) return;
  order = newOrder.slice();
  persistLists();
  loadLists();
  renderLists();
}

function selectList(filename) {
  selectedList = filename;
  const txt = localStorage.getItem('fcc_list_' + filename) || '[]';
  const parsed = JSON.parse(txt);
  combos = (parsed || []).map(c => new Combo(c.name, c.brand || '', Number(c.price) || 0, (c.items || []).map(it => new ComboItem(new Item(it.item?.name || it.name || '', it.item?.value || it.value || 0), Number(it.qty || 1)))));
  renderLists(); renderCombos();
}

function renderLists() {
  listsEl.innerHTML = '';
  lists.forEach((l, idx) => {
    const li = document.createElement('li');
    const name = document.createElement('div'); name.textContent = l.displayName; name.style.cursor = 'pointer'; name.onclick = () => selectList(l.filename);
    const actions = document.createElement('div'); actions.style.display = 'flex'; actions.style.gap = '4px';
    const renameBtn = makeSmall('Rename', () => renameList(l.filename));
    const upBtn = makeSmall('↑', () => moveIndex(idx, -1));
    const downBtn = makeSmall('↓', () => moveIndex(idx, 1));
    const exportBtn = makeSmall('Export', () => exportList(l.filename));
    const delBtn = makeSmall('Del', () => deleteList(l.filename));
    [renameBtn, upBtn, downBtn, exportBtn, delBtn].forEach(b => actions.appendChild(b));
    li.appendChild(name); li.appendChild(actions);
    if (selectedList === l.filename) li.style.background = '#e8f0ff';
    listsEl.appendChild(li);
  });
}

function makeSmall(text, onClick) { const b = document.createElement('button'); b.textContent = text; b.className = 'btn small-btn'; b.onclick = onClick; return b; }

function renderCombos() {
  combosEl.innerHTML = '';
  if (!Array.isArray(lists) || lists.length === 0) {
    return;
  }
  const brandFilter = brandFilterEl.value || '';
  const min = priceMinEl.value === '' ? -Infinity : Number(priceMinEl.value);
  const max = priceMaxEl.value === '' ? Infinity : Number(priceMaxEl.value);
  const display = combos.map((c, idx) => ({ combo: c, idx })).filter(({ combo }) => (brandFilter ? combo.brand.toLowerCase().includes(brandFilter.toLowerCase()) : true) && combo.price >= min && combo.price <= max).sort((a,b) => b.combo.getRating() - a.combo.getRating());
  const brands = [...new Set(combos.map(c => c.brand))];
  brandFilterEl.innerHTML = ''; const optAll = document.createElement('option'); optAll.value = ''; optAll.textContent = 'All brands'; brandFilterEl.appendChild(optAll);
  brands.forEach(b => { const o = document.createElement('option'); o.value = b; o.textContent = b; brandFilterEl.appendChild(o); });
  display.forEach(({ combo, idx: origIdx }) => {
    const li = document.createElement('li');
    const title = document.createElement('div'); title.className = 'combo-title'; title.textContent = combo.name + ' — ' + combo.brand;
    const ul = document.createElement('ul'); ul.style.paddingLeft = '1rem'; combo.items.forEach(ci => { const iel = document.createElement('li'); iel.textContent = `${ci.qty} × ${ci.item.name} = $${(ci.getTotal ? ci.getTotal() : 0).toFixed(2)}`; ul.appendChild(iel); });
    const info = document.createElement('div'); info.className = 'info'; info.innerHTML = `Price: $${combo.price.toFixed(2)} — Value: $${combo.calculateTotal().toFixed(2)} — Rating: ${combo.getRating().toFixed(2)}`;
    const actions = document.createElement('div'); actions.style.marginTop = '8px'; actions.style.display='flex'; actions.style.gap='6px';
    const editBtn = document.createElement('button'); editBtn.className='btn'; editBtn.textContent='Edit'; editBtn.onclick = () => openEdit(origIdx);
    const delBtn = document.createElement('button'); delBtn.className='btn'; delBtn.textContent='Delete'; delBtn.onclick = () => { combos.splice(origIdx,1); saveSelectedList(); renderCombos(); };
    actions.appendChild(editBtn); actions.appendChild(delBtn);
    li.appendChild(title); li.appendChild(ul); li.appendChild(info); li.appendChild(actions);
    combosEl.appendChild(li);
  });
}

function openEdit(i) {
  editingIndex = i; const c = combos[i]; modalTitle.textContent = 'Edit Combo'; cName.value = c.name; cBrand.value = c.brand; cPrice.value = c.price; lineItemsEl.innerHTML = '';
  c.items.forEach(it => addLineItem(it.item.name, it.qty));
  addLineItem('',1); modal.classList.remove('hidden');
}

function openAdd() { editingIndex = null; modalTitle.textContent = 'Add Combo'; cName.value=''; cBrand.value=''; cPrice.value=''; lineItemsEl.innerHTML=''; addLineItem('',1); modal.classList.remove('hidden'); }

function addLineItem(name='', qty=1) {
  const div = document.createElement('div'); div.className='line-item';
  const wrapper = document.createElement('div'); wrapper.className = 'custom-select'; wrapper.style.position = 'relative';
  const button = document.createElement('button'); button.type = 'button'; button.className = 'btn'; button.textContent = name || 'Select item'; button.style.minWidth = '220px';
  const popup = document.createElement('ul'); popup.className = 'custom-select-popup'; popup.style.position = 'absolute'; popup.style.left = '0'; popup.style.top = '100%'; popup.style.zIndex = '999'; popup.style.background = 'white'; popup.style.border = '1px solid #e6e7eb'; popup.style.borderRadius = '8px'; popup.style.padding = '6px 0'; popup.style.margin = '6px 0 0 0'; popup.style.listStyle = 'none'; popup.style.minWidth = '220px'; popup.style.maxHeight = '220px'; popup.style.overflow = 'auto'; popup.style.display = 'none';

  const addOption = (label, value, price) => {
    const li = document.createElement('li'); li.textContent = label; li.className = 'custom-select-option'; li.style.padding = '6px 12px'; li.style.cursor = 'pointer'; li.onmouseenter = () => li.style.background = '#f3f4f6'; li.onmouseleave = () => li.style.background = '';
    li.onclick = () => {
      if (value === '__custom__') {
        const input = document.createElement('input'); input.type = 'text'; input.placeholder = 'Item name'; input.className = 'item-input';
        wrapper.replaceWith(inputWrapper(input, qtyI, del));
        input.focus();
      } else {
        button.textContent = value;
        wrapper.dataset.value = value;
        const last = lineItemsEl.lastElementChild === div;
        if (last) addLineItem('', 1);
      }
      popup.style.display = 'none';
      if (popup.parentNode === document.body) popup.parentNode.removeChild(popup);
      isOpen = false;
    };
    if (typeof price === 'number') {
      const span = document.createElement('span'); span.style.float = 'right'; span.style.opacity = '0.8'; span.textContent = ` $${price.toFixed(2)}`;
      li.appendChild(span);
    }
    popup.appendChild(li);
  };

  addOption('', '', undefined);
  STANDARD_ITEMS.forEach(si => addOption(si.name, si.name, si.value));
  addOption('Custom...', '__custom__', undefined);

  let isOpen = false;
  button.onclick = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      const rect = button.getBoundingClientRect();
      popup.style.position = 'fixed';
      popup.style.left = rect.left + 'px';
      popup.style.top = rect.bottom + 'px';
      popup.style.display = 'block';
      document.body.appendChild(popup);
      isOpen = true;
    } else {
      popup.style.display = 'none';
      if (popup.parentNode === document.body) popup.parentNode.removeChild(popup);
      isOpen = false;
    }
  };
  document.addEventListener('click', () => { if (isOpen) { popup.style.display = 'none'; if (popup.parentNode === document.body) popup.parentNode.removeChild(popup); isOpen = false; } });

  const qtyI = document.createElement('input'); qtyI.type='number'; qtyI.min = '0'; qtyI.className = 'qty-input'; qtyI.value = qty;
  const del = document.createElement('button'); del.className='btn small-btn'; del.textContent='×'; del.onclick = () => div.remove();

  wrapper.appendChild(button); wrapper.appendChild(popup);
  div.appendChild(wrapper);
  div.appendChild(qtyI); div.appendChild(del);
  lineItemsEl.appendChild(div);

  function inputWrapper(inputEl, qtyEl, delEl) {
    const dd = document.createElement('div'); dd.className='line-item';
    dd.appendChild(inputEl); dd.appendChild(qtyEl); dd.appendChild(delEl);
    return dd;
  }
}

cancelBtn.onclick = () => modal.classList.add('hidden');

saveComboBtn.onclick = () => {
  const name = cName.value.trim(); const brand = cBrand.value.trim(); const price = Number(cPrice.value) || 0;
  const items = [];
  [...lineItemsEl.querySelectorAll('.line-item')].forEach(li => {
    const inputText = li.querySelector('input.item-input');
    const qtyInput = li.querySelector('input.qty-input');
    const btn = li.querySelector('button.btn');
    const q = qtyInput ? Number(qtyInput.value) || 0 : 0;
    let nm = '';
    if (inputText) nm = inputText.value.trim();
    else if (btn && btn.textContent && btn.textContent !== 'Select item') nm = btn.textContent.trim();
    if (!nm) return;
    const found = STANDARD_ITEMS.find(p => p.name === nm);
    const item = found ? found : new Item(nm, 0);
    items.push(new ComboItem(item, q));
  });
  const combo = new Combo(name, brand, price, items);
  if (editingIndex === null) combos.push(combo); else combos[editingIndex] = combo;
  modal.classList.add('hidden'); saveSelectedList(); renderCombos();
};

brandFilterEl.onchange = renderCombos; priceMinEl.oninput = renderCombos; priceMaxEl.oninput = renderCombos; clearFiltersBtn.onclick = () => { brandFilterEl.value=''; priceMinEl.value=''; priceMaxEl.value=''; renderCombos(); };
createListBtn.onclick = createList; importFileInput.onchange = (e) => { const f = e.target.files[0]; if (f) importFile(f); e.target.value=''; };
openAddBtn.onclick = openAdd;

loadLists(); renderLists();
if (!Array.isArray(lists) || lists.length === 0) {
  combos = [];
  selectedList = null;
} else {
  selectedList = lists[0].filename;
  const txt = localStorage.getItem('fcc_list_' + selectedList) || '[]';
  const parsed = JSON.parse(txt);
  combos = (parsed || []).map(c => new Combo(c.name, c.brand || '', Number(c.price) || 0, (c.items || []).map(it => new ComboItem(new Item(it.item?.name || it.name || '', it.item?.value || it.value || 0), Number(it.qty || 1)))));
}
renderCombos();