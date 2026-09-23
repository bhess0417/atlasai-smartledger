export default async function handler(req, res) {
  const { code, error, state } = req.query;
 const cookieState = req.headers.cookie?.match(/(?:^|;\s*)google_oauth_state=([^;]+)/)?.[1];
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
      console.error('Google token exchange failed');
      return res.redirect('/?gmail=error');
    }
    return res.redirect('/?gmail=connected');

    return res.redirect('/?gmail=connected');
  } catch (error) {
    console.error('Gmail OAuth callback failed');
    return res.redirect('/?gmail=error');
  }
}