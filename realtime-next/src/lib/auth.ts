import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { NextAuthOptions } from "next-auth";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { redis } from "./db";
const getGoogleClient = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("Google client id not found");
  }
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientSecret) {
    throw new Error("Google secret is not found");
  }
  return { clientId, clientSecret };
};

export const authOptions: NextAuthOptions = {
  adapter: UpstashRedisAdapter(redis),
  providers: [
    GoogleProvider({
      clientId: getGoogleClient().clientId,
      clientSecret: getGoogleClient().clientSecret,
    }),
  ],
  session: {
    strategy: "jwt", // can also be "database" if needed
    maxAge: Date.now() + 1000 * 60 * 60 * 60 * 24 * 30,
  },
  callbacks: {
    async jwt({ token, user }) {
      // On first sign-in
      console.log(user, "user");
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      } else {
        // On subsequent requests, optionally refresh from Redis
        const dbUser = (await redis.get(`user:${token.id}`)) as User | null;
        console.log(dbUser, "db user");
        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.picture = dbUser.image;
        }
      }
      return token;
    },
    async session({ session, token }) {
      console.log("token", token);
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      console.log("session", session);
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
