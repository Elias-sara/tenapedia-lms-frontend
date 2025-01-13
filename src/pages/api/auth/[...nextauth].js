import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axiosInstance from '../../../../utils/axiosConfig';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await axiosInstance.post('/api/auth/login', {
            email: credentials.email,
            password: credentials.password
          });

          if (response.data) {
            return {
              id: response.data.user._id,
              name: response.data.user.name,
              email: response.data.user.email,
              accessToken: response.data.token
            };
          }
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    }
  },
  pages: {
    signIn: '/auth/login',
  }
};

export default NextAuth(authOptions);
