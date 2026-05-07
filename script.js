// classes
class item {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}
class comboItem {
  constructor(item, qty) {
    this.item = item;
    this.qty = qty;
  }
  getTotal() { return this.qty * (this.item.value || 0); }
}
class combo {
  constructor(name, brand = "", price = 0, items = []) {
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.items = items;
    this.score = this.getRating();
  }
  calculateTotal() { return (this.items || []).reduce((s, ci) => s + (ci.getTotal ? ci.getTotal() : 0), 0); }
  getRating() { return (this.calculateTotal() - this.price) / this.price * 100; }
}

// Primarily edit the baselist and items here if extending the project, to say other locations; the rest of the code will automatically adjust and doesn't require editing
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
      { "item": { "name": "Large Side", "value": 5.5 }, "qty": 2 }
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
      { "item": { "name": "Wicked Wing", "value": 3 }, "qty": 20 }
    ]
  }
];

// items
const standardItems = [
  new item('Small Side', 3.5),
  new item('Medium Side', 4.5),
  new item('Large Side', 5.5),
  new item('Small Drink', 3),
  new item('Medium Drink', 4),
  new item('Large Drink', 5),
  new item('Small Burger', 5),
  new item('Medium Burger', 9),
  new item('Large Burger', 14),
  new item('Extra Large Burger', 20),
  new item('Wicked Wing', 3),
  new item('Secret Recipe Chicken', 5)
];

// app state
let lists = [];
let order = [];
let selectedList = null;
let combos = [];

// references
const keyLists = 'fcc_lists';
const keyOrder = 'fcc_order';
const listsElement = document.getElementById('lists');
const combosElement = document.getElementById('combos');
const brandFilterElement = document.getElementById('brand-filter');
const priceMinElement = document.getElementById('price-min');
const priceMaxElement = document.getElementById('price-max');
const clearFiltersButton = document.getElementById('clear-filters');
const createListButton = document.getElementById('create-list');
const importFileInput = document.getElementById('import-file');
const openAddButton = document.getElementById('open-add');

const modalElement = document.getElementById('modal');
const modalTitleElement = document.getElementById('modal-title');
const comboNameInput = document.getElementById('c-name');
const comboBrandInput = document.getElementById('c-brand');
const comboPriceInput = document.getElementById('c-price');
const lineItemsElement = document.getElementById('line-items');

const saveComboButton = document.getElementById('save-combo');
const cancelButton = document.getElementById('cancel');

// helper functions
function getKeys() {
  return Object.keys(localStorage)
    .filter(k => k.startsWith('fcc_list_'))
    .map(k => k.replace(/^fcc_list_/, ''))
    .filter(f => f.endsWith('.json') && !f.startsWith('_'));
}

function parseCombos(jsonText) {
  const parsed = JSON.parse(jsonText || '[]');
  return (parsed || []).map(comboData => new combo(
    comboData.name,
    comboData.brand || '',
    Number(comboData.price) || 0,
    (comboData.items || []).map(itemData => new comboItem(
      new item(itemData.item?.name || itemData.name || '', itemData.item?.value || itemData.value || 0),
      Number(itemData.qty || 1)
    ))
  ));
}

function updateFilter() {
  const currentBrand = brandFilterElement.value;
  const brands = [...new Set(combos.map(combo => combo.brand))];
  brandFilterElement.innerHTML = '';
  const allBrandsOption = document.createElement('option'); allBrandsOption.value = ''; allBrandsOption.textContent = 'All brands';
  brandFilterElement.appendChild(allBrandsOption);
  brands.forEach(brand => {
    const option = document.createElement('option'); option.value = brand; option.textContent = brand;
    brandFilterElement.appendChild(option);
  });
  if (brands.includes(currentBrand)) brandFilterElement.value = currentBrand;
}

// storage functions
function saveLists() {
  localStorage.setItem(keyLists, JSON.stringify(lists));
  localStorage.setItem(keyOrder, JSON.stringify(order));
}

function loadLists() {
  order = JSON.parse(localStorage.getItem(keyOrder) || '[]');
  const files = getKeys();
  const built = files.map(filename => {
    const match = filename.match(/^(\d+)\.json$/);
    return { filename: filename, displayName: match ? `List ${match[1]}` : filename.replace(/\.json$/, '') };
  });
  if (built.length === 0) { lists = []; return; }
  let result;
  if (Array.isArray(order) && order.length > 0) {
    const filenameToListMap = new Map(built.map(list => [list.filename, list]));
    const ordered = order.map(filename => filenameToListMap.get(filename)).filter(Boolean);
    const remaining = built.filter(list => !order.includes(list.filename));
    result = [...ordered, ...remaining];
  } else {
    result = built;
  }
  lists = result.filter((list, index, array) => array.findIndex(other => other.filename === list.filename) === index);
}

function saveSelectedList(updatedCombos) {
  if (!selectedList) return;
  const payload = (typeof updatedCombos === 'undefined' ? combos : updatedCombos).map(combo => ({
    name: combo.name, brand: combo.brand, price: combo.price,
    items: combo.items.map(comboItem => ({ item: { name: comboItem.item.name, value: comboItem.item.value }, qty: comboItem.qty }))
  }));
  localStorage.setItem('fcc_list_' + selectedList, JSON.stringify(payload));
}

// list management functions
function getNextFilename() {
  const existing = getKeys();
  const numbers = existing.map(filename => { const match = filename.match(/^(\d+)\.json$/); return match ? Number(match[1]) : null; }).filter(number => number !== null);
  const usedNumbers = new Set(numbers);
  let candidateNumber = 1;
  while (usedNumbers.has(candidateNumber)) candidateNumber++;
  return `${candidateNumber}.json`;
}

function createList() {
  const filename = getNextFilename();
  localStorage.setItem('fcc_list_' + filename, JSON.stringify(baseList, null, 2));
  if (!order.includes(filename)) order.push(filename);
  saveLists();
  loadLists();
  renderLists();
}

function isValidList(data) {
  if (!Array.isArray(data)) return false;
  return data.every(combo =>
    combo && typeof combo.name === 'string' && combo.name.trim() !== '' &&
    typeof combo.price === 'number' && combo.price > 0 &&
    Array.isArray(combo.items)
  );
}

function importFile(file) {
  const reader = new FileReader();
  reader.onload = function () {
    try {
      const content = JSON.parse(reader.result);
      if (!isValidList(content)) {
        alert('Invalid JSON.');
        return;
      }
      const baseName = file.name.replace(/\.json$/i, '');
      let filename = baseName + '.json';
      const existing = getKeys();
      if (existing.includes(filename)) {
        let counter = 2;
        while (existing.includes(baseName + ' (' + counter + ').json')) counter++;
        filename = baseName + ' (' + counter + ').json';
      }
      localStorage.setItem('fcc_list_' + filename, JSON.stringify(content, null, 2));
      if (!order.includes(filename)) order.push(filename);
      saveLists();
      loadLists();
      renderLists();
    } catch (e) { alert('Invalid JSON.'); }
  };
  reader.readAsText(file);
}

function exportList(filename) {
  const jsonText = localStorage.getItem('fcc_list_' + filename) || '[]';
  const blob = new Blob([jsonText], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a'); link.href = url; link.download = filename;
  document.body.appendChild(link); link.click(); link.remove();
  URL.revokeObjectURL(url);
}

function deleteList(filename) {
  if (!confirm('Delete ' + filename + '?')) return;
  lists = lists.filter(list => list.filename !== filename);
  order = order.filter(file => file !== filename);
  localStorage.removeItem('fcc_list_' + filename);
  if (selectedList === filename) { selectedList = null; combos = []; }
  saveLists(); renderLists(); renderCombos();
}

function renameList(filename) {
  const newNameInput = prompt('Rename list.');
  if (!newNameInput) return;
  const newName = newNameInput.endsWith('.json') ? newNameInput : newNameInput + '.json';
  const existing = getKeys();
  if (existing.includes(newName)) return alert('Name already exists.');
  const content = localStorage.getItem('fcc_list_' + filename);
  if (content == null) return alert('Source not found');
  localStorage.setItem('fcc_list_' + newName, content);
  localStorage.removeItem('fcc_list_' + filename);
  lists = lists.map(list => list.filename === filename ? { filename: newName, displayName: newName.replace(/\.json$/, '') } : list);
  order = order.map(file => file === filename ? newName : file);
  if (selectedList === filename) selectedList = newName;
  saveLists();
  renderLists();
}

function moveList(index, direction) {
  const newIndex = index + direction; if (newIndex < 0 || newIndex >= lists.length) return;
  const temp = lists[index]; lists[index] = lists[newIndex]; lists[newIndex] = temp;
  order = lists.map(list => list.filename);
  saveLists(); renderLists();
}

function selectList(filename) {
  selectedList = filename;
  const jsonText = localStorage.getItem('fcc_list_' + filename) || '[]';
  combos = parseCombos(jsonText);
  updateFilter();
  renderLists();
  renderCombos();
}

// combo modal functions
function editCombo(index) {
  editingIndex = index;
  const combo = combos[index];
  modalTitleElement.textContent = 'Edit Combo';
  comboNameInput.value = combo.name; comboBrandInput.value = combo.brand; comboPriceInput.value = combo.price;
  lineItemsElement.innerHTML = '';
  combo.items.forEach(item => addItem(item.item.name, item.qty));
  addItem('', 1);
  modalElement.classList.remove('hidden');
}

function addCombo() {
  editingIndex = null;
  modalTitleElement.textContent = 'Add Combo';
  comboNameInput.value = ''; comboBrandInput.value = ''; comboPriceInput.value = '';
  lineItemsElement.innerHTML = '';
  addItem('', 1);
  modalElement.classList.remove('hidden');
}

function addItem(itemName = '', quantity = 1) {
  const lineItemDiv = document.createElement('div'); lineItemDiv.className = 'line-item';
  const selectWrapper = document.createElement('div'); selectWrapper.className = 'custom-select'; selectWrapper.style.position = 'relative';
  const selectButton = document.createElement('button'); selectButton.type = 'button'; selectButton.className = 'btn'; selectButton.textContent = itemName || 'Select item'; selectButton.style.minWidth = '220px';
  const optionsPopup = document.createElement('ul');
  optionsPopup.className = 'custom-select-popup';
  Object.assign(optionsPopup.style, { position: 'absolute', left: '0', top: '100%', zIndex: '999', background: 'white', border: '1px solid #e6e7eb', borderRadius: '8px', padding: '6px 0', margin: '6px 0 0 0', listStyle: 'none', minWidth: '220px', maxHeight: '220px', overflow: 'auto', display: 'none' });

  const addOption = (label, value, price) => {
    const optionLi = document.createElement('li'); optionLi.textContent = label; optionLi.className = 'custom-select-option';
    Object.assign(optionLi.style, { padding: '6px 12px', cursor: 'pointer' });
    optionLi.onmouseenter = () => optionLi.style.background = '#f3f4f6';
    optionLi.onmouseleave = () => optionLi.style.background = '';
    optionLi.onclick = () => {
      selectButton.textContent = value;
      selectWrapper.dataset.value = value;
      if (lineItemsElement.lastElementChild === lineItemDiv) addItem('', 1);
      optionsPopup.style.display = 'none';
      if (optionsPopup.parentNode === document.body) document.body.removeChild(optionsPopup);
      isPopupOpen = false;
    };
    if (typeof price === 'number') {
      const priceSpan = document.createElement('span');
      Object.assign(priceSpan.style, { float: 'right', opacity: '0.8' });
      priceSpan.textContent = ` $${price.toFixed(2)}`;
      optionLi.appendChild(priceSpan);
    }
    optionsPopup.appendChild(optionLi);
  };

  standardItems.forEach(standardItem => addOption(standardItem.name, standardItem.name, standardItem.value));

  let isPopupOpen = false;
  selectButton.onclick = (e) => {
    e.stopPropagation();
    if (!isPopupOpen) {
      const buttonRect = selectButton.getBoundingClientRect();
      optionsPopup.style.position = 'fixed';
      optionsPopup.style.left = buttonRect.left + 'px';
      optionsPopup.style.top = buttonRect.bottom + 'px';
      optionsPopup.style.display = 'block';
      document.body.appendChild(optionsPopup);
      isPopupOpen = true;
    } else {
      optionsPopup.style.display = 'none';
      if (optionsPopup.parentNode === document.body) document.body.removeChild(optionsPopup);
      isPopupOpen = false;
    }
  };
  document.addEventListener('click', () => {
    if (isPopupOpen) {
      optionsPopup.style.display = 'none';
      if (optionsPopup.parentNode === document.body) document.body.removeChild(optionsPopup);
      isPopupOpen = false;
    }
  });

  const quantityInput = document.createElement('input'); quantityInput.type = 'number'; quantityInput.min = '0'; quantityInput.className = 'qty-input'; quantityInput.value = quantity;
  const deleteButton = document.createElement('button'); deleteButton.className = 'btn small-btn'; deleteButton.textContent = '×'; deleteButton.onclick = () => lineItemDiv.remove();

  selectWrapper.appendChild(selectButton); selectWrapper.appendChild(optionsPopup);
  lineItemDiv.appendChild(selectWrapper); lineItemDiv.appendChild(quantityInput); lineItemDiv.appendChild(deleteButton);
  lineItemsElement.appendChild(lineItemDiv);
}

cancelButton.onclick = () => modalElement.classList.add('hidden');

saveComboButton.onclick = () => {
  const comboName = comboNameInput.value.trim();
  const comboBrand = comboBrandInput.value.trim();
  const comboPrice = Number(comboPriceInput.value);
  if (comboPrice <= 0) { alert('Invalid Price.'); return; }
  const comboItems = [];
  [...lineItemsElement.querySelectorAll('.line-item')].forEach(lineItem => {
    const itemInput = lineItem.querySelector('input.item-input');
    const quantityInput = lineItem.querySelector('input.qty-input');
    const selectButton = lineItem.querySelector('button.btn');
    const qty = quantityInput ? Number(quantityInput.value) || 0 : 0;
    let itemName = '';
    if (itemInput) itemName = itemInput.value.trim();
    else if (selectButton && selectButton.textContent && selectButton.textContent !== 'Select item') itemName = selectButton.textContent.trim();
    if (!itemName) return;
    const standardItem = standardItems.find(item => item.name === itemName);
    comboItems.push(new comboItem(standardItem ? standardItem : new item(itemName, 0), qty));
  });
  const newCombo = new combo(comboName, comboBrand, comboPrice, comboItems);
  if (editingIndex === null) combos.push(newCombo); else combos[editingIndex] = newCombo;
  modalElement.classList.add('hidden');
  saveSelectedList();
  renderCombos();
};

// rendering functions
function renderLists() {
  listsElement.innerHTML = '';
  lists.forEach((list, index) => {
    const listItem = document.createElement('li');
    const nameDiv = document.createElement('div'); nameDiv.textContent = list.displayName; nameDiv.style.cursor = 'pointer'; nameDiv.onclick = () => selectList(list.filename);
    const actionsDiv = document.createElement('div'); actionsDiv.style.display = 'flex'; actionsDiv.style.gap = '4px';
    [
      makeSmall('Rename', () => renameList(list.filename)),
      makeSmall('↑', () => moveList(index, -1)),
      makeSmall('↓', () => moveList(index, 1)),
      makeSmall('Export', () => exportList(list.filename)),
      makeSmall('Del', () => deleteList(list.filename))
    ].forEach(button => actionsDiv.appendChild(button));
    listItem.appendChild(nameDiv); listItem.appendChild(actionsDiv);
    if (selectedList === list.filename) listItem.style.background = '#e8f0ff';
    listsElement.appendChild(listItem);
  });
}

function renderCombos() {
  combosElement.innerHTML = '';
  if (!Array.isArray(lists) || lists.length === 0) return;
  const brandFilterValue = brandFilterElement.value || '';
  const minPrice = priceMinElement.value === '' ? -Infinity : Number(priceMinElement.value);
  const maxPrice = priceMaxElement.value === '' ? Infinity : Number(priceMaxElement.value);
  const filteredCombos = combos
    .map((combo, originalIndex) => ({ combo, originalIndex }))
    .filter(({ combo }) =>
      (brandFilterValue ? combo.brand.toLowerCase().includes(brandFilterValue.toLowerCase()) : true) &&
      combo.price >= minPrice && combo.price <= maxPrice
    )
    .sort((a, b) => b.combo.getRating() - a.combo.getRating());
  filteredCombos.forEach(({ combo: currentCombo, originalIndex }) => {
    const comboLi = document.createElement('li');
    const titleDiv = document.createElement('div'); titleDiv.className = 'combo-title'; titleDiv.textContent = currentCombo.name + ' — ' + currentCombo.brand;
    const itemsUl = document.createElement('ul'); itemsUl.style.paddingLeft = '1rem';
    currentCombo.items.forEach(comboItem => {
      const itemLi = document.createElement('li');
      itemLi.textContent = `${comboItem.qty} × ${comboItem.item.name} = $${(comboItem.getTotal ? comboItem.getTotal() : 0).toFixed(2)}`;
      itemsUl.appendChild(itemLi);
    });
    const infoDiv = document.createElement('div'); infoDiv.className = 'info';
    infoDiv.innerHTML = `Price: $${currentCombo.price.toFixed(2)} — Value: $${currentCombo.calculateTotal().toFixed(2)} — Rating: ${currentCombo.getRating().toFixed(2)}`;
    const actionsDiv = document.createElement('div'); actionsDiv.style.marginTop = '8px'; actionsDiv.style.display = 'flex'; actionsDiv.style.gap = '6px';
    const editButton = document.createElement('button'); editButton.className = 'btn'; editButton.textContent = 'Edit'; editButton.onclick = () => editCombo(originalIndex);
    const deleteButton = document.createElement('button'); deleteButton.className = 'btn'; deleteButton.textContent = 'Delete'; deleteButton.onclick = () => { combos.splice(originalIndex, 1); saveSelectedList(); renderCombos(); };
    actionsDiv.appendChild(editButton); actionsDiv.appendChild(deleteButton);
    comboLi.appendChild(titleDiv); comboLi.appendChild(itemsUl); comboLi.appendChild(infoDiv); comboLi.appendChild(actionsDiv);
    combosElement.appendChild(comboLi);
  });
}

function makeSmall(buttonText, onClickHandler) {
  const button = document.createElement('button'); button.textContent = buttonText; button.className = 'btn small-btn'; button.onclick = onClickHandler; return button;
}

brandFilterElement.onchange = renderCombos;
priceMinElement.oninput = renderCombos;
priceMaxElement.oninput = renderCombos;
clearFiltersButton.onclick = () => { brandFilterElement.value = ''; priceMinElement.value = ''; priceMaxElement.value = ''; renderCombos(); };
createListButton.onclick = createList;
importFileInput.onchange = (e) => { const file = e.target.files[0]; if (file) importFile(file); e.target.value = ''; };
openAddButton.onclick = addCombo;

// initialization
loadLists();
if (!Array.isArray(lists) || lists.length === 0) {
  combos = [];
  selectedList = null;
} else {
  selectedList = lists[0].filename;
  combos = parseCombos(localStorage.getItem('fcc_list_' + selectedList) || '[]');
  updateFilter();
}
renderLists();
renderCombos();