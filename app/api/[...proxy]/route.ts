import { getAccessToken } from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';

const handler = async (request: NextRequest) => {
  let token: string | null = null;
  try {
    const response = new NextResponse();
    const { accessToken } = await getAccessToken(request, response);
    if (!accessToken) {
      throw new Error('Access token not found.');
    }
    token = accessToken;
  } catch (e) {
    console.error('Cannot get access token.');
    console.log(e);
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    // Extract the necessary components from the original request
    const originalURL = new URL(request.url);
    const basePath = process.env.NEXT_PUBLIC_BACKEND; // Your base path
    const newPath = originalURL.pathname.replace(/^\/api\/proxy\//, '/');
    const queryString = originalURL.search; // Query string
    const hash = originalURL.hash; // Hash

    // Construct the new URL using string format
    const newURLString = `${basePath}${newPath}${queryString}${hash}`;
    const newURL = new URL(newURLString);

    const headers = new Headers(request.headers);
    headers.delete('content-length');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    // Next.js adapted the fetch implementation that forces caching on a success response. We don't want that.
    const body = request.body ? await request.text() : undefined;
    const response = await fetch(newURL.toString(), 
      {
        method: request.method,
        body: body,
        headers: headers,
      },
    );

    if (response.status === 401) {
      console.error(`Received 401 Unauthorized from backend API.`);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (e) {
    console.error(`Received 500 Internal Server Error from backend API.`);
    console.log(e);
    return new Response("Internal error", {
      status: 500,
    });
  }
};

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}

export async function DELETE(request: NextRequest) {
  return handler(request);
}

export async function PATCH(request: NextRequest) {
  return handler(request);
}

export async function PUT(request: NextRequest) {
  return handler(request);
}

export async function OPTIONS(request: NextRequest) {
  return handler(request);
}
