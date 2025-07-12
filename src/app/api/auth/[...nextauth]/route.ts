import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: "jwt", // Usar JWT para la sesión
        maxAge: 30 * 24 * 60 * 60 // 30 días
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            // Solo la primera vez que inicia sesión
            if (account && profile) {
                token.googleId = profile.sub; // Guardar el googleId en el token
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.googleId) {
                (session.user as any).googleId = token.googleId;
            }
            return session;
        }
    }
})

export { handler as GET, handler as POST };