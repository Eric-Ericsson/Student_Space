import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@components/firebase";

export const authOptions = {
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
              id: user.uid,
              name: user.displayName,
              email: user.email,
              image: '',
            }
          }
        } catch (error) {
          console.log('Authentication error:', error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signin: "/auth/signin",
  },

  // callbacks: {
  //   async redirect({ url, baseUrl, route, cookies }) {
  //     console.log('Current route:', route);
  
  //     // Check if the user is signing out
  //     if (route === '/auth/signout') {
  //       console.log('Redirecting after sign-out');
  //       // Redirect the user to the desired page after sign-out
  //       return '/'; // Replace '/' with the URL of the page you want to redirect to
  //     }
  
  //     // For all other cases, follow the default behavior
  //     // Allows relative callback URLs
  //     if (url.startsWith('/')) return `${baseUrl}${url}`;
  //     // Allows callback URLs on the same origin
  //     else if (new URL(url).origin === baseUrl) return url;
  //     return baseUrl;
  //   },
  

  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },

    async session({ session, token }) {
      session.user.uid = token.sub;
      session.user.username = session.user.name.split(' ').join('').toLowerCase();
      return session;
    },
  },
};

export default NextAuth(authOptions)

