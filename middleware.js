import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the protected routes
const isProtectedRoute = createRouteMatcher(["/account"]);

export default clerkMiddleware(async (auth, req) => {
  // Protect the routes defined in the `isProtectedRoute` matcher
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
