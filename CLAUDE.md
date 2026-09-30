@AGENTS.md

# Property Photography Website

## Project

Build and maintain a premium independent property photography website for Jamie Doe, serving South Hampshire.

Primary service area:

- Fareham
- Gosport
- Portsmouth
- Southampton

Primary customers:

- Estate agents
- Independent property professionals
- Property managers

Secondary customers:

- Residential property sellers

The website's primary purpose is to generate photography enquiries and showcase the quality of the work.

## Core Brand Principle

The website should make visitors think:

> "I want my property to look like that."

NOT:

> "This photographer has a nice website."

The photography is the product.

The website should make the quality of the resulting property photography immediately obvious and desirable.

## Brand Direction

Modern + bold + editorial + architectural.

The visual identity should feel:

- Premium
- Contemporary
- Confident
- Sophisticated
- Approachable
- Photography-first
- Architectural/editorial

Avoid:

- Generic SaaS aesthetics
- Generic photographer websites
- Corporate estate-agent styling
- Excessive gradients
- Excessive cards
- Cheesy luxury aesthetics
- Overly decorative UI
- Stock photos of photographers or cameras
- Visual effects that compete with the photography

## Design Principles

Photography should dominate the visual hierarchy.

Prioritise:

- Large immersive images
- Strong typography
- Generous whitespace
- Intentional asymmetric layouts
- Editorial compositions
- Excellent image cropping
- Strong visual rhythm
- Subtle motion
- Minimal UI

The design should feel intentional rather than template-driven.

## Photography

Use high-quality architectural/property photography placeholders during development.

Preferred imagery:

- Interiors
- Living rooms
- Kitchens
- Bedrooms
- Bathrooms
- Exterior architecture
- Gardens
- Architectural details

Never use generic photographer/camera stock imagery as a substitute for property photography.

Images should demonstrate the result a client could achieve.

## Technical Stack

- Next.js
- App Router
- TypeScript
- Tailwind CSS
- Next/Image

Use modern Next.js patterns.

Prefer:

- Server Components
- Static rendering where appropriate
- Minimal client-side JavaScript
- Strong TypeScript types
- Reusable components
- Semantic HTML

Use Client Components only when interaction genuinely requires them.

## Architecture

Keep the project maintainable and content-driven.

Repeated content must not be hard-coded directly into page components.

Use a structured local content layer for V1.

Suggested structure:

content/
portfolio/
services/
locations/
testimonials/
blog/
site/

A new portfolio project, location, testimonial or blog post should require minimal changes to application code.

Build reusable page/component patterns rather than creating bespoke implementations for every page.

## Routes

Primary routes:

/
/portfolio
/portfolio/[slug]
/services
/services/property-photography
/pricing
/areas
/areas/fareham
/areas/gosport
/areas/portsmouth
/areas/southampton
/about
/contact
/blog
/blog/[slug]
/gallery/[slug]

Structure should remain flexible for future routes.

## Navigation

Primary navigation:

Portfolio
Services
Pricing
Areas
About
Contact

Primary CTA:

Enquire

Navigation should be simple and highly usable, particularly on mobile.

## Homepage

The homepage should communicate the value proposition immediately.

Core sections:

1. Hero
2. Selected Work
3. Services
4. Why Work With Us
5. Areas
6. Testimonials
7. Final enquiry CTA

Hero headline:

"Property photography for Hampshire."

Primary actions:

- View Portfolio
- Enquire

The homepage should prioritise photography over explanatory copy.

## Portfolio

Treat each property as a project/case study rather than simply a collection of images.

Portfolio projects should support:

- Title
- Slug
- Location
- Property type
- Description
- Featured image
- Image gallery
- Shoot details
- Optional testimonial

Portfolio layouts should feel editorial and immersive.

## Services

Initial service:

Property Photography

Future services may include:

- Property video
- Social content
- Twilight photography
- Floor plans
- 360 tours
- Drone photography
- Commercial/architectural photography

Do not build future services prematurely, but structure the system so they can be added easily.

## Pricing

Initial package structure:

- Essential
- Standard
- Premium
- Bespoke

Prices should be stored in structured content/data rather than scattered throughout components.

Do not invent permanent pricing when it has not been provided.

Use clearly identifiable placeholder values during development.

## About

Introduce Jamie Doe as the photographer behind the brand.

Position the business as:

- Independent
- Local
- Professional
- Property-focused
- Flexible
- Detail-oriented

Do not over-emphasise that this is a side business.

## Contact / Enquiry

The enquiry experience should feel effortless.

Fields:

- Name
- Email
- Phone
- Company
- Role
- Property address
- Property type
- Approximate size
- Bedrooms
- Service required
- Preferred date
- Preferred time
- Flexible date/time
- Additional information

V1 can use frontend validation and a mock submission flow.

Do not claim that enquiries are being stored or emailed unless a real backend integration exists.

Structure the form so a real submission service can be added later.

## Location Pages

Initial locations:

- Fareham
- Gosport
- Portsmouth
- Southampton

Location pages must contain genuinely useful localised content.

Do not create thin duplicated SEO pages.

## Client Gallery

Create a premium private-gallery experience at:

/gallery/[slug]

V1 functionality:

- Property title
- Image grid
- Fullscreen viewer
- Individual download
- Download all

Use local/mock data initially.

Design the architecture so authentication, storage and permissions can be introduced later.

## SEO

Implement strong technical SEO.

Include:

- Page metadata
- Descriptive titles
- Meta descriptions
- Open Graph metadata
- Semantic HTML
- Canonical URLs where appropriate
- Descriptive image alt text
- Appropriate structured data

Local SEO should support the South Hampshire service area.

## Performance

Performance is important.

Use:

- Next/Image
- Responsive image sizes
- Appropriate image formats
- Lazy loading for non-critical imagery
- Priority loading for hero/LCP imagery
- Minimal client JavaScript

Do not allow animation or visual effects to unnecessarily hurt performance.

## Accessibility

Follow good accessibility practices:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Accessible forms
- Appropriate contrast
- Meaningful alt text
- Reduced-motion support

Accessibility should not be sacrificed for visual design.

## Responsive Design

Mobile-first.

The website must feel intentionally designed at:

- Small mobile
- Standard mobile
- Tablet
- Desktop
- Large desktop

Do not simply stack desktop sections vertically on mobile.

Photography galleries and image compositions are particularly important on mobile.

## Motion

Use subtle motion to improve the experience.

Good examples:

- Image reveals
- Hover states
- Navigation transitions
- Gallery transitions
- Page transitions

Avoid:

- Excessive animation
- Distracting parallax
- Long animations
- Motion that delays interaction

Respect `prefers-reduced-motion`.

## Code Quality

Prefer:

- Simple solutions
- Reusable components
- Strong types
- Clear naming
- Small focused components
- Minimal dependencies

Avoid:

- Premature abstraction
- Overengineering
- Duplicated components
- Unnecessary libraries
- Large client-side bundles
- Hard-coded repeated content

## Development Philosophy

Do not build features simply because they could be useful.

V1 should focus on:

1. Exceptional visual presentation
2. Portfolio
3. Property photography service
4. Pricing
5. About
6. Enquiries
7. Local SEO
8. Basic client gallery

Future systems such as:

- Automated booking
- Calendar integration
- Authentication
- Payments
- Invoicing
- Automated email
- CMS
- Advanced client management

should be designed for later, not unnecessarily built now.

## Decision Rule

When making implementation decisions, ask:

1. Does this improve the client's experience?
2. Does this make the photography look better?
3. Does this make the site easier to maintain?
4. Does this improve enquiries/conversion?
5. Does this keep the architecture flexible?

Prefer the simplest solution that achieves the goal.

## Visual Source of Truth

When a Claude Design output, screenshot, mockup or visual reference is provided, treat it as the visual source of truth.

Do not redesign the interface unless explicitly asked.

Implement the visual hierarchy, spacing, typography, image treatment and interaction patterns as closely as practical.

## Current Development Stage

This is an initial V1 website.

Prioritise quality over feature quantity.

Do not build the entire future business platform before the core marketing website is excellent.
