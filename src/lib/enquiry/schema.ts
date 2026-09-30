import { packages } from "@/content/pricing";
import { availableServices } from "@/content/services";

/*
 * Enquiry form definition, shared by the client form and the server action
 * so validation rules live in one place.
 */

export const roles = ["Estate agent", "Property manager", "Homeowner", "Other"] as const;
export const propertyTypes = ["House", "Flat / apartment", "Bungalow", "New build", "Other"] as const;
export const bedroomOptions = ["Studio", "1", "2", "3", "4", "5+"] as const;
export const sizeOptions = [
  "Not sure",
  "Under 750 sq ft",
  "750–1,250 sq ft",
  "1,250–2,000 sq ft",
  "2,000–3,000 sq ft",
  "Over 3,000 sq ft",
] as const;
export const timeOptions = ["Morning", "Afternoon", "Evening", "Twilight"] as const;
export const serviceOptions = [...availableServices.map((service) => service.name), "Something else"];
export const packageOptions = [
  { value: "", label: "Not sure yet — recommend one" },
  ...packages.map((pkg) => ({ value: pkg.id, label: pkg.name })),
];

export type Enquiry = {
  role: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  propertyType: string;
  bedrooms: string;
  size: string;
  service: string;
  package: string;
  /** ISO dates, yyyy-mm-dd. */
  dates: string[];
  times: string[];
  flexible: boolean;
  message: string;
};

export type EnquiryField = keyof Enquiry;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: Enquiry = {
  role: "",
  name: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  propertyType: "",
  bedrooms: "",
  size: "",
  service: serviceOptions[0],
  package: "",
  dates: [],
  times: [],
  flexible: false,
  message: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[\d\s()-]{7,20}$/;
const MAX_MESSAGE = 2000;

export function validateEnquiry(input: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!roles.includes(input.role as (typeof roles)[number])) errors.role = "Let us know who you are.";
  if (input.name.trim().length < 2) errors.name = "Enter your name.";
  if (!input.email.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL.test(input.email.trim())) errors.email = "Enter an email address like name@example.com.";
  if (input.phone.trim() && !PHONE.test(input.phone.trim())) errors.phone = "Enter a valid phone number, or leave it blank.";
  if (input.address.trim().length < 3) errors.address = "Enter the property address or postcode.";
  if (!propertyTypes.includes(input.propertyType as (typeof propertyTypes)[number]))
    errors.propertyType = "Choose a property type.";
  if (input.dates.length === 0 && !input.flexible)
    errors.dates = "Pick at least one date, or tick “I’m flexible”.";
  if (input.message.length > MAX_MESSAGE) errors.message = `Keep this under ${MAX_MESSAGE} characters.`;
  return errors;
}

/** Plain-text summary, used for email hand-off and future notifications. */
export function summariseEnquiry(input: Enquiry, formatDate: (iso: string) => string): string {
  const pkg = packageOptions.find((option) => option.value === input.package)?.label;
  const lines: [string, string | undefined][] = [
    ["I'm a", input.role],
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone],
    ["Company", input.company],
    ["Property", input.address],
    ["Type", input.propertyType],
    ["Bedrooms", input.bedrooms],
    ["Approx. size", input.size],
    ["Service", input.service],
    ["Package", pkg],
    ["Dates", input.dates.map(formatDate).join(", ")],
    ["Times", input.times.join(", ")],
    ["Flexible", input.flexible ? "Yes" : undefined],
    ["Notes", input.message],
  ];
  return lines
    .filter(([, value]) => value && value.trim())
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}
