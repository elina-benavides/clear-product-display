import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ClipboardList,
  LogOut,
  Menu,
  Moon,
  ScanLine,
  Search,
  ShoppingCart,
  Sun,
  Wallet,
} from "lucide-react";
import {
  CATEGORIES,
  CUSTOMER,
  PRODUCTS,
  money,
  ticketLineTotal,
  type Category,
  type TicketLine,
} from "@/lib/pos-data";
import { TicketSheet } from "@/components/pos/TicketSheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Facturador — Punto de venta" },
      {
        name: "description",
        content:
          "Facturador móvil para tomar pedidos: escanea o busca productos, arma el ticket y cobra al instante.",
      },
      { property: "og:title", content: "Facturador — Punto de venta" },
      {
        property: "og:description",
        content:
          "Facturador móvil para tomar pedidos: escanea o busca productos, arma el ticket y cobra al instante.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [lines, setLines] = useState<TicketLine[]>([
    {
      id: "tortillas-7",
      name: "7 Tortillas de Tiesto",
      unitPrice: 2.0,
      qty: 1,
      image: PRODUCTS[0]!.image,
      note: "Bien doraditas, por favor",
      discountPercent: 10,
    },
    {
      id: "agua-aromatica",
      name: "Agua Aromática de Hierba Luisa",
      unitPrice: 1.0,
      qty: 1,
      image: PRODUCTS[1]!.image,
    },
  ]);
  const [ticketOpen, setTicketOpen] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const totalQty = lines.reduce((acc, l) => acc + l.qty, 0);
  const subtotal = lines.reduce((acc, line) => acc + ticketLineTotal(line), 0);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const addToTicket = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.id === productId);
      if (existing) {
        return prev.map((l) =>
          l.id === productId ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          unitPrice: product.price,
          qty: 1,
          image: product.image,
        },
      ];
    });
    setToast(`${product.name} agregado al ticket`);
  };

  const changeQty = (id: string, delta: number) =>
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l)),
    );

  const removeLine = (id: string) =>
    setLines((prev) => prev.filter((l) => l.id !== id));

  const cancelOrder = () => {
    setLines([]);
    setTicketOpen(false);
    setToast("Pedido cancelado");
  };

  const charge = () => {
    setLines([]);
    setTicketOpen(false);
    setToast(`Venta completada por ${money(subtotal)}`);
  };

  const filtered = PRODUCTS.filter(
    (p) =>
      (!activeCategory || p.category === activeCategory) &&
      (query.trim() === "" ||
        p.name.toLowerCase().includes(query.trim().toLowerCase())),
  );

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label="Menú"
              className="grid size-9 place-items-center rounded-full transition-colors hover:bg-accent"
            >
              <Menu className="size-5" />
            </button>
            <h1 className="truncate text-lg font-bold tracking-tight">
              Facturador
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label="Cartera"
              className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <Wallet className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Modo oscuro"
              onClick={() => {
                setDark((d) => !d);
                document.documentElement.classList.toggle("dark");
              }}
              className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
            <button
              type="button"
              aria-label="Salir"
              className="grid size-9 place-items-center rounded-full text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 pb-28">
        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2">
          <label className="flex h-11 min-w-0 items-center gap-2 rounded-xl border border-border bg-card px-3">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Escanea o busca un producto..."
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          <button
            type="button"
            aria-label="Escanear código"
            className="grid size-11 place-items-center rounded-xl border border-border bg-card text-primary transition-colors hover:bg-accent"
          >
            <ScanLine className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Portapapeles"
            className="grid size-11 place-items-center rounded-xl border border-border bg-card text-foreground transition-colors hover:bg-accent"
          >
            <ClipboardList className="size-5" />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 pt-3 [scrollbar-width:none]">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(active ? null : cat)}
                className={
                  active
                    ? "shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                    : "shrink-0 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                }
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => addToTicket(p.id)}
              className="overflow-hidden rounded-2xl border border-border bg-card text-left transition-shadow hover:shadow-md"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <div className="px-3 py-2.5">
                <p className="line-clamp-2 min-h-10 text-sm font-medium leading-snug text-foreground">
                  {p.name}
                </p>
                <p className="mt-1 text-sm font-bold tabular-nums text-foreground">
                  {money(p.price)}
                </p>
              </div>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-2 py-8 text-center text-sm text-muted-foreground">
              Sin resultados para “{query}”.
            </p>
          )}
        </div>
      </main>

      {totalQty > 0 && !ticketOpen && (
        <div className="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-md px-4 pb-4">
          <button
            type="button"
            onClick={() => setTicketOpen(true)}
            className="flex h-14 w-full items-center justify-between rounded-2xl bg-primary px-4 text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
          >
            <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
              <ShoppingCart className="size-4" />
              Ticket ({totalQty})
            </span>
            <span className="text-base font-bold tabular-nums">
              {money(subtotal)}
            </span>
          </button>
        </div>
      )}

      <TicketSheet
        open={ticketOpen}
        onClose={() => setTicketOpen(false)}
        lines={lines}
        onChangeQty={changeQty}
        onRemove={removeLine}
        onSave={() => setToast("Pedido guardado")}
        onCancel={cancelOrder}
        onCharge={charge}
      />

      {toast && (
        <div className="fixed left-1/2 top-4 z-30 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
