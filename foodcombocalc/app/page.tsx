"use client";
import React, { useState } from "react";
import { Item, ComboItem, Combo } from "../classes";

export default function Home() {
  const Sside = new Item("Small Side", 3.5);
  const Mside = new Item("Medium Side", 4.5);
  const Lside = new Item("Large Side", 5.5);
  const Sdrink = new Item("Small Drink", 3);
  const Mdrink = new Item("Medium Drink", 4);
  const Ldrink = new Item("Large Drink", 5);
  const Sburger = new Item("Small Burger", 5);
  const Mburger = new Item("Medium Burger", 9);
  const Lburger = new Item("Large Burger", 15);
  const XLburger = new Item("Extra Large Burger", 20);

  const initial: Combo[] = [
    new Combo("King's Choice Bundle", "Burger King", 45.00, [
      new ComboItem(Lside, 2),
      new ComboItem(Ldrink, 1),
      new ComboItem(Mburger, 2),
      new ComboItem(Sburger, 4),
    ]),
    new Combo("BK Chicken Meal", "Burger King", 19.00, [
      new ComboItem(Mside, 1),
      new ComboItem(Mdrink, 1),
      new ComboItem(Mburger, 1),
      new ComboItem(Sburger, 1),
    ]),
    new Combo("Whopper Deal", "Burger King", 19.00, [
      new ComboItem(Mside, 1),
      new ComboItem(Mdrink, 1),
      new ComboItem(Mburger, 1),
      new ComboItem(Sburger, 1),
    ]),
    new Combo("King's Choice Deal", "Burger King", 15.00, [
      new ComboItem(Mside, 1),
      new ComboItem(Mdrink, 1),
      new ComboItem(Sburger, 2),
    ]),
    new Combo("BBQ Bacon Double Cheeseburger King Sampler", "Burger King", 14.95, [
      new ComboItem(Mside, 1),
      new ComboItem(Sside, 2),
      new ComboItem(Sdrink, 1),
      new ComboItem(Mburger, 1),
    ]),
    new Combo("Crispy Chicken King Sampler", "Burger King", 12.95, [
      new ComboItem(Mside, 1),
      new ComboItem(Sside, 2),
      new ComboItem(Sdrink, 1),
      new ComboItem(Sburger, 1),
    ]),
    new Combo("WHOPPER Jr King Sampler", "Burger King", 11.95, [
      new ComboItem(Mside, 1),
      new ComboItem(Sside, 2),
      new ComboItem(Sdrink, 1),
      new ComboItem(Sburger, 1),
    ]),
    new Combo("Creamy Mayo Cheeseburger King Sampler", "Burger King", 10.95, [
      new ComboItem(Mside, 1),
      new ComboItem(Sside, 2),
      new ComboItem(Sdrink, 1),
      new ComboItem(Sburger, 1),
    ]),
    new Combo("BBQ Rodeo King Sampler", "Burger King", 10.95, [
      new ComboItem(Mside, 1),
      new ComboItem(Sside, 2),
      new ComboItem(Sdrink, 1),
      new ComboItem(Sburger, 1),
    ]),

    new Combo("Family Fillup", "Wendy's", 39.00, [
      new ComboItem(Sside, 4),
      new ComboItem(Sdrink, 4),
      new ComboItem(Mburger, 2),
      new ComboItem(Sburger, 2),
    ]),
    new Combo("The Smash", "Wendy's", 14.00, [
      new ComboItem(Sside, 1),
      new ComboItem(Sdrink, 1),
      new ComboItem(Sburger, 2),
    ]),
    new Combo("Deluxe Cheeseburger Value Combo", "Wendy's", 7.90, [
      new ComboItem(Sside, 1),
      new ComboItem(Sdrink, 1),
      new ComboItem(Sburger, 1),
    ]),
    new Combo("Crispy Chicken Value Combo", "Wendy's", 7.40, [
      new ComboItem(Sside, 1),
      new ComboItem(Sdrink, 1),
      new ComboItem(Sburger, 1),
    ]),
  ];
  const [combos, setCombos] = useState<Combo[]>(initial);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<string>("");
  const [lineItems, setLineItems] = useState<Array<{ itemName: string; qty: number }>>([
    { itemName: "", qty: 1 },
  ]);

  const [brandFilter, setBrandFilter] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  function openAdd() {
    setEditingIndex(null);
    setName("");
    setBrand("");
    setPrice("");
    setLineItems([{ itemName: "", qty: 1 }]);
    setOpen(true);
  }

  function openEdit(i: number) {
    const c = combos[i];
    setEditingIndex(i);
    setName(c.name);
    setBrand(c.brand);
    setPrice(String(c.price));
    setLineItems(c.items.map(ci => ({ itemName: ci.item.name, qty: ci.qty })).concat([{ itemName: "", qty: 1 }]));
    setOpen(true);
  }

  function parseLinesToItems(): ComboItem[] {
    const arr: ComboItem[] = [];
    lineItems
      .map(li => ({ itemName: (li.itemName || "").trim(), qty: li.qty }))
      .filter(li => li.itemName && !Number.isNaN(li.qty))
      .forEach(li => {
        const found = [Sside, Sdrink, Mside, Mdrink, Lside, Ldrink, Sburger, Mburger, Lburger, XLburger].find(p => p.name === li.itemName);
        const item = found ? found : new Item(li.itemName, 0);
        arr.push(new ComboItem(item, li.qty));
      });
    return arr;
  }

  function save() {
    const items = parseLinesToItems();
    const priceNum = Number(price) || 0;
    const combo = new Combo(name, brand, priceNum, items);
    if (editingIndex === null) {
      setCombos(prev => [...prev, combo]);
    } else {
      setCombos(prev => prev.map((c, idx) => idx === editingIndex ? combo : c));
    }
    setOpen(false);
  }

  function remove(i: number) {
    setCombos(prev => prev.filter((_, idx) => idx !== i));
  }
  
  const filtered = combos.filter(c => {
    const byBrand = brandFilter ? c.brand.toLowerCase().includes(brandFilter.toLowerCase()) : true;
    const min = priceMin === "" ? -Infinity : Number(priceMin);
    const max = priceMax === "" ? Infinity : Number(priceMax);
    const byPrice = c.price >= min && c.price <= max;
    return byBrand && byPrice;
  });
  const sortedCombos = [...filtered].sort((a, b) => b.getRating() - a.getRating());

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">Food Combo Calculator</h1>
      </div>

      <div className="mb-4 flex items-center">
        <div className="flex gap-3 items-center">
        <select
          className="p-2 border rounded"
          value={brandFilter}
          onChange={e => setBrandFilter(e.target.value)}
        >
          <option value="">All brands</option>
          {[...new Set(combos.map(c => c.brand))].map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <input
          className="p-2 border rounded w-28"
          type="number"
          placeholder="Min price"
          value={priceMin}
          onChange={e => setPriceMin(e.target.value)}
        />
        <input
          className="p-2 border rounded w-28"
          type="number"
          placeholder="Max price"
          value={priceMax}
          onChange={e => setPriceMax(e.target.value)}
        />
        <button className="px-2 py-1 border rounded" onClick={() => { setBrandFilter(""); setPriceMin(""); setPriceMax(""); }}>
          Clear filters
        </button>
        </div>
        <div className="ml-auto">
          <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={openAdd}>Add Combo</button>
        </div>
      </div>

      <ul className="space-y-4">
        {sortedCombos.map((combo, idx) => (
          <li key={`${combo.name}-${combo.brand}-${idx}`} className="p-4 border rounded">
            <div className="font-semibold">{combo.name} — {combo.brand}</div>
            <ul className="pl-5 list-disc">
              {combo.items.map((ci, i) => (
                <li key={`${ci.item.name}-${i}`}>{ci.qty} × {ci.item.name} = ${ci.getTotal().toFixed(2)}</li>
              ))}
            </ul>
            <span className="font-bold"><div className="text-1xl mt-2">Price: ${combo.price.toFixed(2)} — Value: ${combo.calculateTotal().toFixed(2)} — Rating: {combo.getRating().toFixed(2)}</div></span>
            <div className="mt-2 flex gap-2">
              <button className="px-2 py-1 border rounded" onClick={() => openEdit(idx)}>Edit</button>
              <button className="px-2 py-1 border rounded" onClick={() => remove(idx)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded w-full max-w-3xl mx-4 max-h-[90vh] overflow-auto">
            <h3 className="text-lg font-semibold mb-2">{editingIndex === null ? "Add Combo" : "Edit Combo"}</h3>
            <input className="w-full mb-2 p-2 border" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
            <div className="mb-2">
              <select className="w-full p-2 border" value={brand} onChange={e => setBrand(e.target.value)}>
                <option value="">Select brand</option>
                {[...new Set(combos.map(c => c.brand))].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <input className="w-full p-2 border" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
            </div>

            <div className="mb-2 space-y-2">
              {lineItems.map((li, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <select
                    className="flex-1 p-2 border"
                    value={li.itemName}
                    onChange={e => {
                      const val = e.target.value;
                      setLineItems(prev => {
                        const next = prev.map((p, i) => i === idx ? { ...p, itemName: val } : p);
                        if (idx === prev.length - 1 && val) next.push({ itemName: "", qty: 1 });
                        return next;
                      });
                    }}
                  >
                    <option value="">Select item</option>
                    {[Sside, Sdrink, Mside, Mdrink, Lside, Ldrink, Sburger, Mburger, Lburger, XLburger].map(it => (
                      <option key={it.name} value={it.name}>{it.name} (${it.value})</option>
                    ))}
                  </select>
                  <input
                    className="w-20 p-2 border"
                    type="number"
                    min={1}
                    value={li.qty}
                    onChange={e => setLineItems(prev => prev.map((p, i) => i === idx ? { ...p, qty: Number(e.target.value) } : p))}
                  />
                  <button className="px-2 py-1 border rounded" onClick={() => setLineItems(prev => prev.filter((_, i) => i !== idx))}>Remove</button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-end">
              <button className="px-3 py-1 border rounded" onClick={() => setOpen(false)}>Cancel</button>
              <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={save}>Save</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
