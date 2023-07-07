import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],

  pages: {
    signin: "/auth/signin"
  },

  callbacks: {
    async redirect(url, baseUrl) {
      // Check if the redirect URL is on the same domain
      if (typeof url === 'string' && url.startsWith(baseUrl)) {
        return url;
      }
      // Redirect to the default URL if it's not on the same domain
      return '/';
    },
  },
};

export default NextAuth(authOptions)

