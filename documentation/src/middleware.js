import { NextResponse } from "next/server";

export async function middleware(request) {
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${request.cookies.get("uaf")?.value}`
  );
  let requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  let settingData = await (
    await fetch(process.env.URL + "/settings", requestOptions)
  )?.json();

  const path = request.nextUrl.pathname;
  if (request.cookies.has("maintenance") && path !== `/maintenance`) {
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${request.cookies.get("uaf")?.value}` 
    );
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    if (
      data?.values?.maintenance?.maintenance_mode &&
      path !== `/maintenance`
    ) {
      return NextResponse.redirect(new URL(`/maintenance`, request.url));
    } else {
      if (request.cookies.get("maintenance")) {
        return NextResponse.next();
      } else {
        const response = NextResponse.next();
        response.cookies.delete("maintenance");
        return NextResponse.redirect(new URL(`/`, request.url));
      }
    }
  }

  if (!request.cookies.has("maintenance") && path == `/maintenance`) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  const protectedRoutes = [
    `/account/dashboard`,
    `/account/notification`,
    `/account/wallet`,
    `/account/bank-details`,
    `/account/point`,
    `/account/refund`,
    `/account/order`,
    `/account/addresses`,
    `/wishlist`,
    `/compare`,
  ];

  if (protectedRoutes.includes(path) && !request.cookies.has("uaf")) {
    return NextResponse.redirect(new URL(`/auth/login`, request.url));
  }

  if (path == `/checkout` && !request.cookies.has("uaf")) {
    if (settingData?.values?.activation?.guest_checkout) {
      if (request.cookies.get("cartData")?.value == "digital") {
        return NextResponse.redirect(new URL(`/auth/login`, request.url));
      }
    } else {
      return NextResponse.redirect(new URL(`/auth/login`, request.url));
    }
  }

  if (path == `/auth/login` && request.cookies.has("uaf")) {
    return NextResponse.redirect(new URL(`/`, request.url));
  }

  if (path != `/auth/login`) {
    if (path == `/auth/otp-verification` && !request.cookies.has("ue")) {
      return NextResponse.redirect(new URL(`/auth/login`, request.url));
    }
    if (
      path == `/auth/update-password` &&
      (!request.cookies.has("uo") || !request.cookies.has("ue"))
    ) {
      return NextResponse.redirect(new URL(`/auth/login`, request.url));
    }
  }

  if (request.headers.get("x-redirected")) {
    // Request is already redirected, skip middleware
    return NextResponse.next();
  }
  // return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
