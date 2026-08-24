import { ORDER_STATUS_LABEL, ORDER_STATUS_STEPS } from "@/lib/constants";
import type { OrderStatus } from "@/lib/db/schema";

type HistoryItem = { status: OrderStatus; note: string | null; createdAt: string };

export function TrackingTimeline({
  currentStatus,
  history,
}: {
  currentStatus: OrderStatus;
  history: HistoryItem[];
}) {
  if (currentStatus === "dibatalkan") {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-5">
        <p className="font-semibold text-red-400">Servis Dibatalkan</p>
        <p className="mt-1 text-sm text-paper/70">
          Hubungi kami via WhatsApp untuk informasi lebih lanjut.
        </p>
      </div>
    );
  }

  const currentIndex = ORDER_STATUS_STEPS.indexOf(
    currentStatus as (typeof ORDER_STATUS_STEPS)[number]
  );
  const historyMap = new Map(history.map((h) => [h.status, h]));

  return (
    <ol className="relative border-l-2 border-white/10 pl-6">
      {ORDER_STATUS_STEPS.map((step, idx) => {
        const done = idx <= currentIndex;
        const entry = historyMap.get(step);
        return (
          <li key={step} className="mb-8 last:mb-0">
            <span
              className={`absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full ${
                done ? "bg-neon" : "border-2 border-white/20 bg-ink"
              }`}
            />
            <p className={`font-heading text-lg tracking-wide ${done ? "text-paper" : "text-paper/40"}`}>
              {ORDER_STATUS_LABEL[step]}
            </p>
            {entry ? (
              <>
                <p className="text-xs text-paper/50">
                  {new Date(entry.createdAt).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                {entry.note && <p className="mt-1 text-sm text-paper/70">{entry.note}</p>}
              </>
            ) : (
              done ? null : <p className="text-xs text-paper/30">Belum sampai tahap ini</p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
