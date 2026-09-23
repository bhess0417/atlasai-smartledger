import crypto from 'node:crypto';

export default async function handler(req, res) {
  const state = crypto.randomBytes(32).toString('hex');

  res.setHeader(
    'Set-Cookie',
    `google_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`
  );

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