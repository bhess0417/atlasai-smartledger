
# Sprint 36 — Real Workspace Identity + User-Owned Data

## Goal

Replace the remaining demo-company identity in authenticated accounts with a real user-owned workspace identity and begin loading workspace data from Supabase.

## Sprint 36 Scope

- Load the authenticated user's workspace from Supabase
- Replace "Atlas AI Demo Company" with the user's real workspace name
- Keep Demo Mode completely separate from authenticated accounts
- Store workspace identity and settings in the Supabase workspaces table
- Restore the same workspace identity on future sign-ins
- Begin separating user-owned data from seeded demo data
- Preserve all working Sprint 34 authentication
- Preserve all working Sprint 35 workspace creation and persistence

## Definition of Done

Sprint 36 is complete when an authenticated Atlas AI user sees their own workspace identity instead of the demo company identity, that workspace identity is loaded from Supabase on sign-in, persists across future sessions, and Demo Mode remains completely separate.