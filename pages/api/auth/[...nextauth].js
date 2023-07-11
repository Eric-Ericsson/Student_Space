import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
// import Providers from 'next-auth/providers'
import CredentialsProvider from "next-auth/providers/credentials";
import { ProviderId, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@components/firebase";

export const authOptions = {

  // Configure one or more authentication providers
  // providers: [
  //   GoogleProvider({
  //     clientId: process.env.GOOGLE_CLIENT_ID,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //   }),
  //   // ...add more providers here
  // ],

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'custom',
      credentials: {},
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          if (user.email === email) {
            return {
              name: user.displayName, 
              email: user.email,
              image: null,
              uid: user.uid
            }
          }
        } catch (error) {
          console.log('Authentication error:', error);
          return null;
        }
      },
    }),
    // Add more providers here if needed
  ],

  pages: {
    signin: "/auth/signin",
    signup: "/auth/signup"
  },

  callbacks: {
    // async redirect(url, baseUrl) {
    //   // Check if the redirect URL is on the same domain
    //   if (typeof url === 'string' && url.startsWith(baseUrl)) {
    //     return url;
    //   }
    //   // Redirect to the default URL if it's not on the same domain
    //   return '/';
    // },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },

    async session({session, token}){
      session.user.username = session.user.name.split(' ').join('').toLowerCase();
      console.log(session);

      return session
    }
  },
};

export default NextAuth(authOptions)

