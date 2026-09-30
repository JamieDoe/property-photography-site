"use client";

import { useRef, useState, useSyncExternalStore, useTransition } from "react";
import { submitEnquiry, type EnquiryResult } from "@/app/(site)/contact/actions";
import {
  type Enquiry,
  type EnquiryErrors,
  type EnquiryField,
  bedroomOptions,
  emptyEnquiry,
  packageOptions,
  propertyTypes,
  roles,
  serviceOptions,
  sizeOptions,
  summariseEnquiry,
  timeOptions,
  validateEnquiry,
} from "@/lib/enquiry/schema";

const DAYS_OFFERED = 14;

const inputClass =
  "h-14 w-full rounded-none border border-rule-strong bg-paper px-4 text-base text-ink placeholder:text-taupe/70 focus:border-ink focus:outline-2 focus:outline-offset-1 focus:outline-rust aria-invalid:border-rust";

const selectClass = `${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%2317150f' stroke-width='1.5'%3E%3Cpath d='M1 1.5l5 5 5-5'/%3E%3C/svg%3E")] bg-[position:right_18px_center] bg-no-repeat pr-11`;

/** Order the error summary follows, matching the form. */
const FIELD_ORDER: EnquiryField[] = ["role", "name", "email", "phone", "address", "propertyType", "dates", "message"];

const noopSubscribe = () => () => {};

function toIso(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function upcomingDays(count: number) {
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i + 1);
    return {
      iso: toIso(date),
      weekday: date.toLocaleDateString("en-GB", { weekday: "short" }),
      day: date.getDate(),
      label: date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
      month: date.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    };
  });
}

function formatIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
}

function Label({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: string }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold">
      {children} {optional && <span className="font-normal text-taupe">({optional})</span>}
    </label>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm font-medium text-rust">
      {message}
    </p>
  );
}

type EnquiryFormProps = {
  email: string;
  initialPackage?: string;
};

/**
 * Enquiry form with inline and summary validation. Submits to a server
 * action; the V1 delivery adapter is not connected, and the success state
 * says so honestly and offers an email hand-off instead.
 */
export function EnquiryForm({ email, initialPackage = "" }: EnquiryFormProps) {
  const [values, setValues] = useState<Enquiry>({
    ...emptyEnquiry,
    package: packageOptions.some((o) => o.value === initialPackage) ? initialPackage : "",
  });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const days = isClient ? upcomingDays(DAYS_OFFERED) : [];
  const months = [...new Set(days.map((d) => d.month))];

  const set = <K extends EnquiryField>(field: K, value: Enquiry[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field] || (field === "flexible" && errors.dates)) {
      setErrors((prev) => ({ ...prev, [field]: undefined, ...(field === "flexible" ? { dates: undefined } : {}) }));
    }
  };

  const toggle = (field: "dates" | "times", item: string) => {
    const current = values[field];
    set(field, current.includes(item) ? current.filter((x) => x !== item) : [...current, item]);
  };

  const describedBy = (field: EnquiryField, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : undefined].filter(Boolean).join(" ") || undefined;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFailed(false);
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    startTransition(async () => {
      try {
        const response = await submitEnquiry(values);
        if (response.status === "invalid") {
          setErrors(response.errors);
          requestAnimationFrame(() => summaryRef.current?.focus());
          return;
        }
        setResult(response);
        requestAnimationFrame(() => successRef.current?.focus());
      } catch {
        setFailed(true);
      }
    });
  };

  if (result?.status === "received") {
    const firstName = values.name.trim().split(/\s+/)[0];
    const body = summariseEnquiry(values, formatIso);
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      `Photography enquiry: ${values.address}`,
    )}&body=${encodeURIComponent(body)}`;

    return (
      <div ref={successRef} tabIndex={-1} role="status" className="flex flex-col gap-6 border-t border-ink pt-8 outline-none">
        <p className="eyebrow text-rust">{result.delivered ? "Enquiry sent" : "Almost there"}</p>
        <h2 className="display text-[44px] lg:text-[60px]">
          Thank you, <span className="accent">{firstName}.</span>
        </h2>
        {result.delivered ? (
          <p className="body-copy">
            Your enquiry is with Jamie. You&rsquo;ll get a reply with availability and a clear price shortly.
          </p>
        ) : (
          <>
            <p className="body-copy">
              Your details are ready, but online enquiries aren&rsquo;t switched on yet, so{" "}
              <strong className="font-semibold text-ink">nothing has been sent</strong>. Please email them and
              you&rsquo;ll get a reply with availability and a clear price.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={mailto} className="btn">
                Email this enquiry
              </a>
              <button type="button" onClick={() => setResult(null)} className="btn btn-outline">
                Edit details
              </button>
            </div>
            <pre className="whitespace-pre-wrap border border-rule bg-paper p-5 font-sans text-sm leading-relaxed text-body">
              {body}
            </pre>
          </>
        )}
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((field) => errors[field]);

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-7" aria-describedby="form-note">
      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="border-l-2 border-rust bg-paper p-5 outline-none"
        >
          <p className="font-semibold">
            Please check {errorList.length === 1 ? "one detail" : `${errorList.length} details`}:
          </p>
          <ul className="mt-2 flex flex-col gap-1 text-[15px]">
            {errorList.map((field) => (
              <li key={field}>
                <a href={`#${field}`} className="prose-link text-rust">
                  {errors[field]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="flex flex-col gap-2.5" aria-describedby={describedBy("role")}>
        <legend className="mb-2.5 text-sm font-semibold">I&rsquo;m a…</legend>
        <div className="flex flex-wrap gap-2">
          {roles.map((role, index) => (
            <label key={role} className="relative">
              <input
                id={index === 0 ? "role" : undefined}
                type="radio"
                name="role"
                value={role}
                checked={values.role === role}
                onChange={() => set("role", role)}
                className="peer sr-only"
              />
              <span className="flex h-[52px] cursor-pointer items-center border border-rule-strong px-5 text-[15px] font-medium transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:font-semibold peer-checked:text-limestone peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rust">
                {role}
              </span>
            </label>
          ))}
        </div>
        <ErrorText id="role-error" message={errors.role} />
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="name">Name</Label>
          <input
            id="name"
            className={inputClass}
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            required
          />
          <ErrorText id="name-error" message={errors.name} />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            type="email"
            className={inputClass}
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            required
          />
          <ErrorText id="email-error" message={errors.email} />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="phone" optional="optional">
            Phone
          </Label>
          <input
            id="phone"
            type="tel"
            className={inputClass}
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone")}
          />
          <ErrorText id="phone-error" message={errors.phone} />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="company" optional="if applicable">
            Company or agency
          </Label>
          <input
            id="company"
            className={inputClass}
            autoComplete="organization"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="address">Property address or postcode</Label>
        <input
          id="address"
          className={inputClass}
          autoComplete="street-address"
          placeholder="e.g. 14 Example Road, PO16"
          value={values.address}
          onChange={(e) => set("address", e.target.value)}
          aria-invalid={Boolean(errors.address)}
          aria-describedby={describedBy("address")}
          required
        />
        <ErrorText id="address-error" message={errors.address} />
      </div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
        <div className="col-span-2 flex flex-col gap-2.5 sm:col-span-1">
          <Label htmlFor="propertyType">Property type</Label>
          <select
            id="propertyType"
            className={selectClass}
            value={values.propertyType}
            onChange={(e) => set("propertyType", e.target.value)}
            aria-invalid={Boolean(errors.propertyType)}
            aria-describedby={describedBy("propertyType")}
            required
          >
            <option value="">Choose…</option>
            {propertyTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <ErrorText id="propertyType-error" message={errors.propertyType} />
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <select
            id="bedrooms"
            className={selectClass}
            value={values.bedrooms}
            onChange={(e) => set("bedrooms", e.target.value)}
          >
            <option value="">Choose…</option>
            {bedroomOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="size">Approximate size</Label>
          <select id="size" className={selectClass} value={values.size} onChange={(e) => set("size", e.target.value)}>
            <option value="">Choose…</option>
            {sizeOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="service">Service required</Label>
          <select
            id="service"
            className={selectClass}
            value={values.service}
            onChange={(e) => set("service", e.target.value)}
          >
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2.5">
          <Label htmlFor="package">Package</Label>
          <select
            id="package"
            className={selectClass}
            value={values.package}
            onChange={(e) => set("package", e.target.value)}
          >
            {packageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset
        id="dates"
        tabIndex={-1}
        aria-describedby={describedBy("dates", "dates-note")}
        className="flex scroll-mt-28 flex-col gap-3.5 outline-none"
      >
        <legend className="mb-3.5 flex w-full items-baseline justify-between gap-4 text-sm font-semibold">
          Dates that suit
          <span className="text-[13px] font-normal text-taupe" aria-live="polite">
            {values.dates.length === 0
              ? "Pick one or more"
              : `${values.dates.length} ${values.dates.length === 1 ? "date" : "dates"} selected`}
          </span>
        </legend>
        {months.length > 0 && <p className="eyebrow -mb-1 text-taupe">{months.join(" – ")}</p>}
        <div className="grid min-h-[150px] grid-cols-7 gap-1.5">
          {days.map((day) => {
            const on = values.dates.includes(day.iso);
            return (
              <label key={day.iso} className="relative">
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle("dates", day.iso)}
                  className="peer sr-only"
                  aria-label={day.label}
                />
                <span className="flex h-[72px] cursor-pointer flex-col items-center justify-center gap-1 border border-rule bg-paper transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:text-limestone peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rust">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.1em] sm:text-[11px]">
                    {day.weekday}
                  </span>
                  <span className="text-[17px] font-semibold sm:text-[19px]">{day.day}</span>
                </span>
              </label>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Times that suit">
          {timeOptions.map((time) => (
            <label key={time} className="relative">
              <input
                type="checkbox"
                checked={values.times.includes(time)}
                onChange={() => toggle("times", time)}
                className="peer sr-only"
              />
              <span className="flex h-11 cursor-pointer items-center border border-rule-strong px-5 text-[15px] font-medium transition-colors hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:font-semibold peer-checked:text-limestone peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rust">
                {time}
              </span>
            </label>
          ))}
        </div>
        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px]">
          <input
            type="checkbox"
            checked={values.flexible}
            onChange={(e) => set("flexible", e.target.checked)}
            className="size-5 accent-ink"
          />
          I&rsquo;m flexible on dates and times
        </label>
        <p id="dates-note" className="text-[13px] leading-normal text-taupe">
          The next two weeks are shown. Need a later date? Say so below. Availability is confirmed by reply.
        </p>
        <ErrorText id="dates-error" message={errors.dates} />
      </fieldset>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="message" optional="optional">
          Anything we should know?
        </Label>
        <textarea
          id="message"
          rows={5}
          className={`${inputClass} h-auto min-h-[140px] resize-y py-3.5`}
          placeholder="Listing link, access notes, rooms to prioritise…"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
        />
        <ErrorText id="message-error" message={errors.message} />
      </div>

      {failed && (
        <p role="alert" className="border-l-2 border-rust bg-paper p-4 text-[15px]">
          Something went wrong. Please try again, or email{" "}
          <a href={`mailto:${email}`} className="prose-link">
            {email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <button type="submit" className="btn" disabled={pending}>
          {pending ? "Checking…" : "Send enquiry"}
        </button>
        <p id="form-note" className="text-sm text-taupe">
          No obligation. We&rsquo;ll confirm before anything is booked.
        </p>
      </div>
    </form>
  );
}
