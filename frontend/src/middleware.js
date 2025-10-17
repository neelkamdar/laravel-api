import { NextResponse } from "next/server";
import { selfData } from "./utils/axiosUtils/API";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("uat")?.value;
  const emailToken = request.cookies.get("ue")?.value;
  const otpToken = request.cookies.get("uo")?.value;

  if (path.split("/")[1] !== "auth" && !token) {
    return NextResponse.redirect(new URL(`/auth/login`, request.url));
  }

  // ✅ Redirect to dashboard if already authenticated and tries to access /auth/*
  if (path.split("/")[1] === "auth" && token) {
    return NextResponse.redirect(new URL(`/dashboard`, request.url));
  }

  // 👮 OTP verification check
  if (path === `/auth/otp-verification` && !emailToken) {
    return NextResponse.redirect(new URL(`/auth/login`, request.url));
  }

  // 🔐 Update password check
  if (path === `/auth/update-password` && (!otpToken || !emailToken)) {
    return NextResponse.redirect(new URL(`/auth/login`, request.url));
  }

  if (request.headers.get("x-redirected")) {
    return NextResponse.next();
  }

  if (token && !path.split("/dashboard")[1] && path !== "/403") {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      await fetch(process.env.URL + selfData, requestOptions);
    } catch (err) {
      console.error("selfData fetch failed:", err);
    }
  }

  return NextResponse.next(); // ✅ Always return something
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
