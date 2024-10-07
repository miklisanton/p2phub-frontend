'use client';
import React from 'react';
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const opts = getOptions();
    return <Auth0Provider {...opts}>{children}</Auth0Provider>;
  } catch (error) {
    console.error(error);
    return <>{children}</>;
  }
}

const getOptions = (): Auth0ProviderOptions => {
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

  if (!domain || !clientId) {
    throw new Error("Missing Auth0 environment variables");
  }

  return {
    domain,
    clientId,
    authorizationParams: {
      redirect_uri: '/profile',
    }
  }
};
