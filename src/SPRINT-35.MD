# Sprint 35 — Account Workspace Foundation

## Goal

Turn Sprint 34 authentication into a real account workspace: authenticated users should enter their own persistent Atlas AI workspace instead of the demo workspace.

## Sprint 35 Scope

- Separate authenticated account workspaces from Demo Mode
- Give each authenticated user a persistent workspace identity
- Remove demo-company labeling from authenticated accounts
- Preserve the existing Demo Workspace as a separate presentation environment
- Store workspace information by authenticated Supabase user ID
- Restore the correct workspace when a user signs back in
- Prevent one user's workspace data from appearing in another user's account
- Preserve all working Sprint 34 authentication behavior

## Definition of Done

Sprint 35 is complete when a verified Atlas AI user can sign in, enter a workspace associated with their account rather than the demo workspace, sign out, return later, and recover that same workspace without affecting Demo Mode or another user's workspace.