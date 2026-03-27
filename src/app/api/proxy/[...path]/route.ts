import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// ✅ FIX: use proper backend env
const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Requested-With",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

async function handleRequest(req: NextRequest, method: string) {
  const { pathname } = new URL(req.url);

  // ✅ remove /api/proxy
  const backendPath = pathname.replace("/api/proxy", "");

  // ✅ correct URL build
  const backendUrl = `${BACKEND_API_URL}${backendPath}${req.nextUrl.search}`;

  console.log(`🚀 Proxying ${method} →`, backendUrl);

  try {
    const headers = new Headers();

    // ✅ FIX: add ngrok bypass
    headers.set("ngrok-skip-browser-warning", "true");

    req.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();

      if (
        lowerKey !== "host" &&
        lowerKey !== "connection" &&
        lowerKey !== "authorization" &&
        lowerKey !== "cookie" &&
        !lowerKey.startsWith("cf-") &&
        !lowerKey.startsWith("x-forwarded-")
      ) {
        headers.set(key, value);
      }
    });

    // ✅ session (optional)
    const session = await getServerSession(authOptions);

    if (session?.accessToken) {
      headers.set("Authorization", `Bearer ${session.accessToken}`);
      console.log("✅ Added Authorization");
    }

    const fetchOptions: RequestInit = {
      method,
      headers,
      cache: "no-store",
      redirect: "follow", // ✅ FIX: handle 307
    };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      const contentType = req.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        const body = await req.json();
        fetchOptions.body = JSON.stringify(body);
      } else {
        fetchOptions.body = await req.text();
      }
    }

    const response = await fetch(backendUrl, fetchOptions);

    const contentType = response.headers.get("content-type") || "";
    const responseHeaders = new Headers(corsHeaders);

    // ✅ debug (important)
    console.log("Status:", response.status);

    if (contentType.includes("application/json")) {
      const data = await response.json();
      return NextResponse.json(data, {
        status: response.status,
        headers: responseHeaders,
      });
    } else {
      const text = await response.text();

      // ❗ detect ngrok HTML
      if (text.includes("ngrok")) {
        console.error("❌ NGROK BLOCKED REQUEST");
      }

      return new NextResponse(text, {
        status: response.status,
        headers: responseHeaders,
      });
    }
  } catch (error) {
    console.error("❌ Proxy error:", error);

    return NextResponse.json(
      {
        message: "Proxy error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502, headers: corsHeaders }
    );
  }
}

export async function GET(req: NextRequest) {
  return handleRequest(req, "GET");
}

export async function POST(req: NextRequest) {
  return handleRequest(req, "POST");
}

export async function PUT(req: NextRequest) {
  return handleRequest(req, "PUT");
}

export async function PATCH(req: NextRequest) {
  return handleRequest(req, "PATCH");
}

export async function DELETE(req: NextRequest) {
  return handleRequest(req, "DELETE");
}