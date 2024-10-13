import { dbConnect } from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await dbConnect();

  try {
    const { name, email, password, avatar } = await request.json();
    // console.log("Name :", name, "Email :", email, "Pass :", password);
    if ([name, email, password].some((field) => field?.trim() === "")) {
      return Response.json(
        { success: false, message: "All Field are Required" },
        { status: 400 }
      );
    }

    const existedUser = await UserModel.findOne({ email });

    if (existedUser) {
      return Response.json(
        { success: false, message: "This Email is already registered." },
        { status: 400 }
      );
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hasedPassword,
      avatar: avatar || "",
    });

    return Response.json(
      { success: true, message: "User registered successfully." },
      { status: 201 },
      user
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: `Failed to register user. Please try again. Becouse ${error?.message}`,
      },
      { status: 500 }
    );
  }
}
