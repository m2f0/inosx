# Spec: Featured Products

**Purpose:** Exibição de produtos em destaque na homepage do site INOSX. Cada card inclui badge, headline, descrição, feature badges, highlights, CTAs e mockup (iframe ou fallback).

## Requirements

### Requirement: Homepage displays featured product cards
The homepage SHALL display a sequence of featured product cards. Each card SHALL represent one product from the INOSX portfolio. The system SHALL include cards for: Messiax, SurveyFlow, PsychoX, DataGPT, and Ccoinx.

#### Scenario: User scrolls to products section
- **WHEN** user visits the homepage and scrolls to the products area
- **THEN** the system SHALL display at least five featured product cards in sequence

#### Scenario: Ccoinx card is present
- **WHEN** user views the featured products section
- **THEN** the system SHALL display a card for ccoinx.ai

### Requirement: Each featured card has required structure
Each featured product card SHALL include: a badge, headline, description, four feature badges, four highlight items, two CTA buttons (primary and secondary), and a visual mockup (iframe or fallback).

#### Scenario: Card displays all elements
- **WHEN** a featured product card is rendered
- **THEN** the system SHALL display badge, headline, description, four feature badges, four highlights, two CTAs, and mockup

#### Scenario: Ccoinx card uses feature badges
- **WHEN** the ccoinx.ai card is rendered
- **THEN** the system SHALL use the featured-features pattern (four feature badges) rather than sacred-texts

### Requirement: Ccoinx card links to product
The ccoinx.ai card primary CTA SHALL link to https://ccoinx.ai/converter. The secondary CTA SHALL link to https://ccoinx.ai. Both links SHALL use target="_blank" for external navigation.

#### Scenario: Primary CTA navigates to converter
- **WHEN** user clicks the primary CTA on the ccoinx card
- **THEN** the system SHALL navigate to https://ccoinx.ai/converter

#### Scenario: Secondary CTA navigates to homepage
- **WHEN** user clicks the secondary CTA on the ccoinx card
- **THEN** the system SHALL navigate to https://ccoinx.ai

### Requirement: Ccoinx mockup uses iframe with fallback
The ccoinx card mockup SHALL embed https://ccoinx.ai via iframe. When the iframe fails to load or is blocked, the system SHALL display a fallback visual with product name, subtitle, and a "Visit Site" link.

#### Scenario: Iframe loads successfully
- **WHEN** the ccoinx card mockup iframe loads successfully
- **THEN** the system SHALL display the ccoinx.ai page content within the mockup area

#### Scenario: Iframe blocked or fails
- **WHEN** the iframe fails to load (e.g., X-Frame-Options, network error)
- **THEN** the system SHALL display a fallback with ccoinx.ai branding and a link to https://ccoinx.ai

### Requirement: Featured products support i18n
All featured product card text SHALL be translatable. The system SHALL provide i18n keys for ccoinx in pt, en, and es. Keys SHALL follow the pattern `featured_ccoinx.*` and `products.ccoinx`, `products.ccoinx_desc`.

#### Scenario: Ccoinx card uses i18n keys
- **WHEN** the ccoinx card is rendered
- **THEN** the system SHALL use data-i18n attributes or equivalent for badge, headline, description, features, highlights, and CTAs

#### Scenario: Products catalog includes ccoinx
- **WHEN** the products catalog is referenced (e.g., navigation, product list)
- **THEN** the system SHALL include ccoinx with keys `products.ccoinx` and `products.ccoinx_desc` in pt.json, en.json, and es.json

### Requirement: Ccoinx card has distinct visual identity
The ccoinx card SHALL use the CSS class `featured-ccoinx` and SHALL have a green/amber color palette (#22c55e to #eab308) distinct from other product cards.

#### Scenario: Ccoinx card is styled
- **WHEN** the ccoinx card is rendered
- **THEN** the system SHALL apply `.featured-ccoinx` styles for container, badge, headline, buttons, and mockup border
