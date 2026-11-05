import type { RefundQuoteResponseDto } from "@/dtos/tour-management/RefundQuoteResponseDto";
import { formatMoney } from "./format";

/** One sentence shown before confirming a cancellation; falls back when the quote could not be loaded. */
export function refundMessage(quote: RefundQuoteResponseDto | null, fallback: string): string {
  if (!quote) return fallback;
  const days = quote.daysUntilTour === 1 ? "1 day" : `${quote.daysUntilTour} days`;
  if (Number(quote.refund) <= 0) return `The tour starts in ${days}, so cancelling now refunds nothing. Your seat will be released.`;
  return `Cancel now and ${formatMoney(quote.refund)} of ${formatMoney(quote.paid)} (${quote.percent}%) returns to your wallet. The tour starts in ${days}.`;
}
