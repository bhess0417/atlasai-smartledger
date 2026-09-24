import crypto from 'node:crypto';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;   

export default async function handler(req, res) {
    const sessionToken = req.query.session;
    if (!sessionToken) return res.status(401).send('SmartLedger sign-in required.')
        const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${sessionToken}` }
    });
    if (!userResponse.ok) return res.status(401).send('Invalid SmartLedger session.');
    const user = await userResponse.json();
    if (!user?.id) return res.status(401).send('SmartLedger user not found.');–
  const state = crypto.randomBytes(32).toString('hex');
  

 res.setHeader('Set-Cookie', [
  `google_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
  `smartledger_oauth_session=${encodeURIComponent(sessionToken)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`
]);

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: 'https://smartledger.atlasaiusa.com/api/google-callback',
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
    access_type: 'offline',
    prompt: 'consent',
    state
  });

  return res.redirect(
    'https://accounts.google.com/o/oauth2/v2/auth?' + params.toString()
  );
}