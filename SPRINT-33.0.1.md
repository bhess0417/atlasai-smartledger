# Sprint 33.0.1 — Atlas Connect Layout Recovery

## Repair
The deployed Sprint 33 JavaScript referenced Atlas Connect CSS classes that were present in the staged `style(3).css` file but missing from the production `src/style.css` imported by Vite.

This recovery promotes the complete Sprint 33 stylesheet to `src/style.css`, restoring:
- Atlas Connect summary cards
- connector card grid
- connector metadata and permission panels
- communications and internet-signal layouts
- responsive Atlas Connect styling
- Sprint 33 AtlasAIUSA branding rules

No JavaScript behavior was changed.
