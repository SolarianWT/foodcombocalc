 "use client";
import React, { useEffect, useState } from "react";
import { Item, ComboItem, Combo } from "../classes";
import baseList from "../data/baseList.json";

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
  const secret = new Item("Secret Recipe Chicken", 5);
  const wicked = new Item("Wicked Wing", 3);

  function jsonToCombos(arr: any[]): Combo[] {
    return (arr || []).map(a => {
      const items = (a.items || []).map((it: any) => new ComboItem(new Item(it.item.name, it.item.value || 0), it.qty));
      return new Combo(a.name, a.brand || "", Number(a.price) || 0, items);
    });
  }

  const [combos, setCombos] = useState<Combo[]>(() => jsonToCombos(baseList as any));
  const [lists, setLists] = useState<{ filename: string; displayName: string }[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);
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
        const found = [Sside, Sdrink, Mside, Mdrink, Lside, Ldrink, Sburger, Mburger, Lburger, XLburger, secret, wicked].find(p => p.name === li.itemName);
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
      const next = [...combos, combo];
      setCombos(next);
      saveSelectedList(next);
    } else {
      const next = combos.map((c, idx) => idx === editingIndex ? combo : c);
      setCombos(next);
      saveSelectedList(next);
    }
    setOpen(false);
  }

  function remove(i: number) {
    const next = combos.filter((_, idx) => idx !== i);
    setCombos(next);
    saveSelectedList(next);
  }
  
  // Build display list preserving original indices so actions target correct items
  const displayCombos = combos
    .map((c, idx) => ({ combo: c, idx }))
    .filter(({ combo }) => {
      const byBrand = brandFilter ? combo.brand.toLowerCase().includes(brandFilter.toLowerCase()) : true;
      const min = priceMin === "" ? -Infinity : Number(priceMin);
      const max = priceMax === "" ? Infinity : Number(priceMax);
      const byPrice = combo.price >= min && combo.price <= max;
      return byBrand && byPrice;
    })
    .sort((a, b) => b.combo.getRating() - a.combo.getRating());

  useEffect(() => {
    fetchLists();
  }, []);

  async function fetchLists() {
    const res = await fetch("/api/lists");
    const data = await res.json();
    // defensive: ignore internal files beginning with '_'
    const filteredData = (data || []).filter((d: any) => !d.filename?.startsWith("_"));
    const orderRes = await fetch("/api/lists/order");
    const order = await orderRes.json();
    if (order && Array.isArray(order)) {
      const map = new Map(filteredData.map((d: any) => [d.filename, d]));
      const ordered = order.map((f: string) => map.get(f)).filter(Boolean);
      const remaining = filteredData.filter((d: any) => !order.includes(d.filename));
      const all = [...ordered, ...remaining];
      // dedupe by filename preserving order
      const deduped = all.filter((v: any, i: number, a: any[]) => a.findIndex(x => x.filename === v.filename) === i);
      setLists(deduped);
      if (all.length === 0) {
        setSelectedList(null);
        setCombos([]);
      }
    } else {
      const deduped = filteredData.filter((v: any, i: number, a: any[]) => a.findIndex(x => x.filename === v.filename) === i);
      setLists(deduped);
      if (deduped.length === 0) {
        setSelectedList(null);
        setCombos([]);
      }
    }
  }

  function combosToJson(arr: Combo[]) {
    return arr.map(c => ({
      name: c.name,
      brand: c.brand,
      price: c.price,
      items: (c.items || []).map(ci => ({ item: { name: ci.item.name, value: ci.item.value }, qty: ci.qty })),
    }));
  }

  async function saveSelectedList(updatedCombos?: Combo[]) {
    if (!selectedList) return;
    const payload = combosToJson(typeof updatedCombos !== 'undefined' ? updatedCombos : combos);
    try {
      await fetch(`/api/lists/${encodeURIComponent(selectedList)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: payload }),
      });
    } catch (e) {
      console.error('Failed to save selected list', e);
    }
  }

  async function createList() {
    const res = await fetch("/api/lists", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content: baseList }) });
    const data = await res.json().catch(() => null);
    const filename = data?.filename;
    // append to order so new list appears at the bottom (avoid duplicates)
    try {
      const orderRes = await fetch('/api/lists/order');
      const order = await orderRes.json().catch(() => null) || [];
      if (filename && !order.includes(filename)) {
        order.push(filename);
        await fetch('/api/lists/order', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
      }
    } catch (e) {
      // ignore order errors
    }
    await fetchLists();
  }

  async function importFile(file: File) {
    const txt = await file.text();
    try {
      const content = JSON.parse(txt);
      const res = await fetch("/api/lists", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ content }) });
      const data = await res.json().catch(() => null);
      const filename = data?.filename;
      try {
        const orderRes = await fetch('/api/lists/order');
        const order = await orderRes.json().catch(() => null) || [];
        if (filename && !order.includes(filename)) {
          order.push(filename);
          await fetch('/api/lists/order', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
        }
      } catch (e) {}
      await fetchLists();
    } catch (e) {
      alert("Invalid JSON file");
    }
  }

  async function deleteList(filename: string) {
    if (!confirm("Delete list " + filename + "?")) return;
    await fetch(`/api/lists/${encodeURIComponent(filename)}`, { method: "DELETE" });
    await fetchLists();
    if (selectedList === filename) {
      setSelectedList(null);
      setCombos(jsonToCombos(baseList as any));
    }
  }

  async function exportList(filename: string) {
    const res = await fetch(`/api/lists/${encodeURIComponent(filename)}?download=1`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function selectList(filename: string) {
    setSelectedList(filename);
    const res = await fetch(`/api/lists/${encodeURIComponent(filename)}`);
    if (res.ok) {
      const data = await res.json();
      setCombos(jsonToCombos(data));
    } else {
      alert("Failed to load list");
    }
  }

  async function renameList(filename: string, newNameRaw: string) {
    const newName = newNameRaw.endsWith(".json") ? newNameRaw : newNameRaw + ".json";
    await fetch(`/api/lists/${encodeURIComponent(filename)}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ newName }) });
    await fetchLists();
    if (selectedList === filename) setSelectedList(newName);
  }

  async function reorderLists(newOrder: string[]) {
    await fetch(`/api/lists/order`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newOrder) });
    await fetchLists();
  }

  function moveIndex(i: number, dir: -1 | 1) {
    const next = [...lists];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    const tmp = next[i];
    next[i] = next[j];
    next[j] = tmp;
    setLists(next);
    reorderLists(next.map(n => n.filename));
  }

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <aside className="w-full md:w-[26rem] max-h-[70vh] md:max-h-[90vh] h-auto overflow-auto card">
          <div className="mb-3 flex gap-2 items-center">
            <label className="btn btn-ghost cursor-pointer">
              Import list
              <input type="file" accept="application/json" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) importFile(f); }} />
            </label>
            <button className="btn btn-ghost" onClick={createList}>Add list</button>
          </div>
          <ul className="space-y-2">
            {lists.map((l, idx) => (
              <li key={l.filename} className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-2 ${selectedList === l.filename ? 'bg-blue-50' : ''}`}>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate cursor-pointer" onClick={() => selectList(l.filename)}>{l.displayName}</div>
                </div>
                <div className="flex gap-1 mt-2 md:mt-0 flex-wrap md:flex-nowrap">
                  <button title="rename" className="btn btn-ghost px-2 py-1 text-sm" onClick={async () => {
                    const input = prompt('Rename list (enter new filename, without extension) or cancel');
                    if (!input) return;
                    const newName = input.endsWith('.json') ? input : `${input}.json`;
                    try {
                      const res = await fetch(`/api/lists/${encodeURIComponent(l.filename)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ newName }) });
                      if (!res.ok) throw new Error((await res.text()) || 'rename failed');
                      await fetchLists();
                    } catch (err) {
                      alert('Rename failed: ' + err);
                    }
                  }}>Rename</button>
                  <button title="move up" className="btn btn-ghost px-2 py-1 text-sm" onClick={() => moveIndex(idx, -1)}>↑</button>
                  <button title="move down" className="btn btn-ghost px-2 py-1 text-sm" onClick={() => moveIndex(idx, 1)}>↓</button>
                  <button title="export" className="btn btn-ghost px-2 py-1 text-sm" onClick={async () => {
                    try {
                      const res = await fetch(`/api/lists/${encodeURIComponent(l.filename)}?download=1`);
                      if (!res.ok) throw new Error('export failed');
                      const blob = await res.blob();
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = l.filename;
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                      URL.revokeObjectURL(url);
                    } catch (err) {
                      alert('Export failed: ' + err);
                    }
                  }}>Export</button>
                  <button title="delete" className="btn btn-ghost px-2 py-1 text-sm" onClick={async () => {
                    if (!confirm('Delete list ' + l.filename + '?')) return;
                    try {
                      const res = await fetch(`/api/lists/${encodeURIComponent(l.filename)}`, { method: 'DELETE' });
                      if (!res.ok) {
                        const text = await res.text();
                        throw new Error(text || 'delete failed');
                      }
                      await fetchLists();
                      if (selectedList === l.filename) {
                        setSelectedList(null);
                        setCombos(jsonToCombos(baseList as any));
                      }
                    } catch (err) {
                      alert('Delete failed: ' + err);
                    }
                  }}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </aside>

            <section className="flex-1 pr-4 md:pr-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">Food Combo Calculator</h1>
          </div>

          <div className="mb-4">
            <div className="md:flex md:items-center md:justify-between">
              <div className="w-full md:w-auto">
                <div className="flex gap-3 items-center flex-nowrap md:flex-wrap overflow-x-auto whitespace-nowrap">
                <select
                  className="p-2 border rounded bg-white flex-shrink-0 w-32 md:w-auto"
                  value={brandFilter}
                  onChange={e => setBrandFilter(e.target.value)}
                >
                  <option value="">All brands</option>
                  {[...new Set(combos.map(c => c.brand))].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <input
                  className="p-2 border rounded w-28 bg-white"
                  type="number"
                  placeholder="Min price"
                  value={priceMin}
                  onChange={e => setPriceMin(e.target.value)}
                />
                <input
                  className="p-2 border rounded w-28 bg-white"
                  type="number"
                  placeholder="Max price"
                  value={priceMax}
                  onChange={e => setPriceMax(e.target.value)}
                />
                <button className="btn btn-ghost hidden md:inline-flex ml-2" onClick={() => { setBrandFilter(""); setPriceMin(""); setPriceMax(""); }}>
                  Clear filters
                </button>
              </div>
            </div>

              <div className="w-full md:w-auto mt-2 md:mt-0 flex items-center justify-between md:justify-end gap-2">
                <button className="btn btn-ghost md:hidden" onClick={() => { setBrandFilter(""); setPriceMin(""); setPriceMax(""); }}>
                  Clear filters
                </button>
                <button className="btn btn-primary" onClick={openAdd}>Add combo</button>
              </div>
            </div>
          </div>

          {lists.length > 0 && (
            <ul className="space-y-4">
              {displayCombos.map(({ combo, idx: origIdx }, displayIdx) => (
                <li key={`${combo.name}-${combo.brand}-${origIdx}`} className="card">
                <div className="font-semibold">{combo.name} — {combo.brand}</div>
                <ul className="pl-5 list-disc">
                  {combo.items.map((ci, i) => (
                    <li key={`${ci.item.name}-${i}`}>{ci.qty} × {ci.item.name} = ${ci.getTotal().toFixed(2)}</li>
                  ))}
                </ul>
                <span className="font-bold"><div className="text-lg mt-2">Price: ${combo.price.toFixed(2)} — Value: ${combo.calculateTotal().toFixed(2)} — Rating: {combo.getRating().toFixed(2)}</div></span>
                <div className="mt-2 flex gap-2">
                  <button className="btn btn-ghost" onClick={() => openEdit(origIdx)}>Edit</button>
                  <button className="btn btn-ghost" onClick={() => remove(origIdx)}>Delete</button>
                </div>
              </li>
              ))}
            </ul>
          )}

          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="modal w-full max-w-3xl mx-4 max-h-[90vh] overflow-auto">
                <h3 className="text-lg font-semibold mb-2">{editingIndex === null ? "Add Combo" : "Edit Combo"}</h3>
                  <input className="w-full mb-2 p-2 border rounded bg-white" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                  <div className="mb-2">
                    <input className="w-full p-2 border rounded bg-white" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Brand" />
                  </div>
                  <div className="mb-2">
                    <input className="w-full p-2 border rounded bg-white" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
                  </div>

                <div className="mb-2 space-y-2">
                  {lineItems.map((li, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <select
                        className="flex-1 p-2 border rounded bg-white"
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
                        {[Sside, Sdrink, Mside, Mdrink, Lside, Ldrink, Sburger, Mburger, Lburger, XLburger, secret, wicked].map(it => (
                          <option key={it.name} value={it.name}>{it.name} (${it.value})</option>
                        ))}
                      </select>
                      <input
                        className="w-20 p-2 border rounded bg-white"
                        type="number"
                        min={1}
                        value={li.qty}
                        onChange={e => setLineItems(prev => prev.map((p, i) => i === idx ? { ...p, qty: Number(e.target.value) } : p))}
                      />
                      <button className="btn btn-ghost" onClick={() => setLineItems(prev => prev.filter((_, i) => i !== idx))}>Remove</button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 justify-end">
                  <button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
                  <button className="btn btn-success" onClick={save}>Save</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}