import { formatPrice } from "@/content/pricing";
import type { Extra } from "@/content/types";

/** Optional extras as ruled rows: name, detail, price. */
export function ExtrasTable({ extras }: { extras: Extra[] }) {
  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">Optional extras and prices</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Extra</th>
          <th scope="col">Detail</th>
          <th scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        {extras.map((extra) => {
          const { price } = extra;
          const later = price === "coming-later";
          return (
            <tr key={extra.name} className={`border-t border-rule last:border-b ${later ? "text-muted" : ""}`}>
              <th scope="row" className="py-5 pr-4 text-base font-semibold lg:min-h-[76px] lg:text-[17px]">
                {extra.name}
                <span className="mt-1 block text-sm font-normal text-taupe lg:hidden">{extra.detail}</span>
              </th>
              <td className="hidden py-5 pr-4 text-[15px] text-taupe lg:table-cell lg:w-[200px]">{extra.detail}</td>
              <td className={`py-5 text-right ${later ? "" : "font-semibold"} lg:w-[140px]`}>
                {price === "coming-later" ? "—" : formatPrice(price)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
