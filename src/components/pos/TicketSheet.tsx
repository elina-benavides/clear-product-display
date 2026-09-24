import {
  ChevronDown,
  MessageSquareText,
  Plus,
  Save,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import {
  CUSTOMER,
  money,
  ticketLineTotal,
  type TicketLine,
} from "@/lib/pos-data";

interface TicketSheetProps {
  open: boolean;
  onClose: () => void;
  lines: TicketLine[];
  onChangeQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onCharge: () => void;
}

export function TicketSheet({
  open,
  onClose,
  lines,
  onChangeQty,
  onRemove,
  onSave,
  onCancel,
  onCharge,
}: TicketSheetProps) {
  if (!open) return null;

  const totalQty = lines.reduce((acc, l) => acc + l.qty, 0);
  const subtotal = lines.reduce((acc, line) => acc + ticketLineTotal(line), 0);

  return (
    <div className="fixed inset-0 z-20 mx-auto max-w-md">
      <button
        type="button"
        aria-label="Cerrar ticket"
        onClick={onClose}
        className="absolute inset-0 w-full bg-foreground/45"
      />
      <section className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="text-xl font-bold tracking-tight">Ticket</h2>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 px-4 pb-3 pt-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold">Ticket actual</p>
            <p className="text-xs text-muted-foreground">Code</p>
          </div>
          <button
            type="button"
            className="flex shrink-0 items-center gap-2 rounded-full border border-border py-2 pl-3 pr-2.5 text-[11px] font-semibold uppercase tracking-wide text-foreground"
          >
            <User className="size-3.5" />
            <span className="truncate">{CUSTOMER}</span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
        </div>

        {lines.length > 0 ? (
          <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 pb-3">
            {lines.map((line) => (
              <li
                key={line.id}
                className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-2.5 rounded-2xl border border-border bg-background px-3 py-2"
              >
                <img
                  src={line.image}
                  alt=""
                  loading="lazy"
                  className="row-span-3 size-10 rounded-xl object-cover"
                />
                <p className="line-clamp-2 min-w-0 text-sm font-medium leading-[1.2] text-foreground">
                  {line.name}
                </p>
                {line.note && (
                  <p className="col-start-2 mt-0.5 flex min-w-0 items-center gap-1 text-[11px] leading-tight text-muted-foreground">
                    <MessageSquareText className="size-3 shrink-0" />
                    <span className="truncate">{line.note}</span>
                  </p>
                )}
                <div className="col-start-2 mt-0.5 flex min-w-0 items-center gap-1.5">
                  <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
                    {money(
                      line.unitPrice * (1 - (line.discountPercent ?? 0) / 100),
                    )}{" "}
                    c/u
                  </span>
                  {line.discountPercent ? (
                    <span className="shrink-0 rounded bg-destructive/10 px-1 py-0.5 text-[10px] font-bold leading-none text-destructive">
                      -{line.discountPercent}%
                    </span>
                  ) : null}
                  <button
                    type="button"
                    aria-label={`Quitar ${line.name}`}
                    onClick={() => onRemove(line.id)}
                    className="ml-auto grid size-6 shrink-0 place-items-center rounded-lg border border-border text-destructive transition-colors hover:bg-destructive/10"
                  >
                    <X className="size-3" />
                  </button>
                  <span className="w-4 text-center text-sm font-semibold tabular-nums text-foreground">
                    {line.qty}
                  </span>
                  <button
                    type="button"
                    aria-label={`Agregar ${line.name}`}
                    onClick={() => onChangeQty(line.id, 1)}
                    className="grid size-6 shrink-0 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-accent"
                  >
                    <Plus className="size-3" />
                  </button>
                  <span className="ml-0.5 shrink-0 text-sm font-bold tabular-nums text-foreground">
                    {money(ticketLineTotal(line))}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-1 items-center justify-center px-4 pb-6">
            <p className="text-sm text-muted-foreground">
              El ticket está vacío. Agrega productos del catálogo.
            </p>
          </div>
        )}

        <div className="border-t border-border px-4 pb-4 pt-3">
          <button
            type="button"
            onClick={onSave}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <Save className="size-4" />
            Guardar pedido
          </button>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Subtotal ({totalQty} u.)
            </span>
            <span className="font-semibold tabular-nums text-foreground">
              {money(subtotal)}
            </span>
          </div>
          <div className="mt-0.5 flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wide text-muted-foreground">
              TOTAL
            </span>
            <span className="text-xl font-bold tabular-nums text-foreground">
              {money(subtotal)}
            </span>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_1.6fr] gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <X className="size-4" />
              Cancelar
            </button>
            <button
              type="button"
              onClick={onCharge}
              disabled={lines.length === 0}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-bold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <ShoppingCart className="size-4" />
              Cobrar {money(subtotal)}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
