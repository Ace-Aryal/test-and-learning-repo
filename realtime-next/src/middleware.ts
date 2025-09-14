import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      console.log("middleware triggered for token:", token);
      return !!token;
    },
  },
});
export const config = {
  matcher: ["/dashboard/:path*", "/chats/:path*"],
};
