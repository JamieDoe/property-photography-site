import { Suspense } from "react";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { EnquiryFormWithParams } from "@/components/contact/EnquiryFormWithParams";
import { Photo } from "@/components/media/Photo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Headline } from "@/components/ui/Headline";
import { contactCopy } from "@/content/pages";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Enquire about a shoot",
  description: contactCopy.metaDescription,
  path: "/contact",
  image: contactCopy.image,
});

export default function ContactPage() {
  const { email, phone, whatsapp } = site.contact;
  const intro = contactCopy.intro.replace("[X] hours", site.contact.replyTime);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      <section className="gutter grid gap-y-10 pb-20 pt-12 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-0 lg:pb-[120px] lg:pt-[100px]">
        <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-[30px]">
          <p className="eyebrow text-taupe">{contactCopy.eyebrow}</p>
          <Headline as="h1" headline={contactCopy.headline} className="animate-rise text-title" />
          <p className="body-copy lg:text-[19px]">{intro}</p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2">
          <Suspense fallback={<EnquiryForm email={email} />}>
            <EnquiryFormWithParams email={email} />
          </Suspense>
        </div>

        <aside aria-label="Other ways to get in touch" className="flex flex-col gap-5 lg:col-span-5 lg:mt-8">
          <div className="flex flex-col gap-3.5 border-t border-rule pt-[26px]">
            <p className="eyebrow text-taupe">Prefer to write?</p>
            <a href={`mailto:${email}`} className="text-xl font-semibold hover:text-rust">
              {email}
            </a>
            {phone && (
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-base text-taupe hover:text-ink">
                Call {phone}
              </a>
            )}
            {whatsapp && (
              <a href={`https://wa.me/${whatsapp}`} className="text-base text-taupe hover:text-ink">
                Message on WhatsApp
              </a>
            )}
          </div>
          <Photo
            photo={contactCopy.image}
            className="mt-5 hidden h-[360px] lg:block"
            sizes="(min-width: 1024px) 40vw, 1px"
          />
        </aside>
      </section>
    </>
  );
}
