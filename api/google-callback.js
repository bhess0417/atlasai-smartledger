export default async function handler(req, res) {
  const { code, error, state } = req.query;
 const cookieState = req.headers.cookie?.match(/(?:^|;\s*)google_oauth_state=([^;]+)/)?.[1];
 const sessionToken = decodeURIComponent(req.headers.cookie?.match(/(?:^|;\s*)smartledger_oauth_session=([^;]+)/)?.[1] || '');
 if (!sessionToken) return res.status(401).send('SmartLedger session missing.');
 const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
 const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 console.error('DIAGNOSTIC SUPABASE HOST:', new URL(SUPABASE_URL).hostname);
 SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

 const userResponse = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${sessionToken}` }
    });
    if (!userResponse.ok) return res.status(401).send('Invalid SmartLedger session.');
    const user = await userResponse.json();
    if (!user?.id) return res.status(401).send('SmartLedger user not found.');
  if (!state || !cookieState || state !== cookieState) {
  return res.status(403).send('Invalid OAuth state.');
}

  if (error) {
    return res.redirect('/?gmail=denied');
  }

  if (!code) {
    return res.status(400).send('Missing Google authorization code.');
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'https://smartledger.atlasaiusa.com/api/google-callback',
        grant_type: 'authorization_code'
      })
    });

    const tokens = await tokenResponse.json();


    if (!tokenResponse.ok) {
      console.error('Google token exchange failed:', tokenResponse.status, tokens.error, tokens.error_description);
      return res.redirect('/?gmail=error');
    }
   const saveResponse = await fetch(`${SUPABASE_URL}/rest/v1/gmail_connections?on_conflict=user_id`, {
  method: 'POST',
  headers: {
    apikey: SUPABASE_SERVICE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal'
  },
  body: JSON.stringify({
    user_id: user.id,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_at: new Date(Date.now() + (tokens.expires_in || 3600) * 1000).toISOString()
  })
});

if (!saveResponse.ok) {
  console.error('Gmail token storage failed:', saveResponse.status, await saveResponse.text());
  return res.redirect('/?gmail=error');
}

return res.redirect('/?gmail=connected');
  } catch (error) {
    console.error('Gmail OAuth callback failed');
    return res.redirect('/?gmail=error');
  }
}