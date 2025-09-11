// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // if no token, redirect to login
  },
});

export const config = {
  matcher: ["/chats/:path*", "/dashboard/:path*"],
};
