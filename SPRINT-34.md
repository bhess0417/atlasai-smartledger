# Sprint 34 — Real Account Foundation

Built from the stable Sprint 33 + Sprint 33.0.1 production baseline.

## Objective

Move Atlas AI SmartLedger from a browser-only demo account model toward a real, secure user account architecture without disrupting the working Sprint 33 application.

## Sprint 34 Scope

- Preserve the current production UI and AtlasAIUSA branding
- Preserve Atlas Connect and all Sprint 31–33 functionality
- Replace the demo-only sign-in concept with a real authentication foundation
- Establish persistent user identity across browser sessions
- Prepare protected application access for authenticated users
- Separate authentication state from demo/company workspace data
- Preserve Presentation Mode for demonstrations
- Keep the current production deployment operational throughout development

## Architecture Rules

- `src/main.js` remains the active application JavaScript
- `src/style.css` remains the active production stylesheet
- `index.html` remains the active application entry point
- Do not deploy duplicate recovery files such as `index(4).html`, `style(3).css`, or `package(3).json`
- Do not overwrite the Sprint 33.0.1 production baseline without verification
- New functionality must be additive and reversible

## Sprint 34 Milestones

1. Select and configure the authentication/backend platform
2. Add required project dependencies
3. Configure environment variables securely
4. Implement account creation
5. Implement sign in
6. Implement sign out
7. Restore authenticated sessions
8. Protect authenticated application access
9. Preserve Presentation Mode separately from authenticated accounts
10. Test production build and Vercel deployment
11. Verify atlasaiusa.com production behavior

## Definition of Done

Sprint 34 is complete when a real user can create an account, sign in securely, refresh or reopen the application without losing the authenticated session, sign out, and return later to sign in again without breaking the existing SmartLedger experience.

## Baseline

Sprint 33 + Sprint 33.0.1 is the protected production baseline.
