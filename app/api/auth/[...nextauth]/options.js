import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";

const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();

        try {
          const { email, password } = credentials;
          if (!email || !password)
            throw new Error("Email and Password are Required");

          const user = await UserModel.findOne({ email });
          if (!user)
            throw new Error("No user found with this email or username");

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          // console.log("isPasswordCorrect", isPasswordCorrect);
          if (!isPasswordCorrect) throw new Error("Incorrect Password");
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  collback: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.avatar = user?.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },

  secret: process.env.NEXT_AUTH_SECRET,
};

export { authOptions };
