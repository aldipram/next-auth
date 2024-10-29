import { db } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server"
import { z } from "zod";


const UserSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must have than 6 characters'),
  })

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { email, username, password } = UserSchema.parse(body);

        const existingUserByEmail = await db.user.findUnique({
            where: {
                email
            }
        });

        if (existingUserByEmail) {
            return NextResponse.json({
                user: null,
                message: "Email already exists"
            }, { status: 409 })
        };

        const existingUserByUsername = await db.user.findUnique({
            where: {
                username
            }
        });

        if (existingUserByUsername) {
            return NextResponse.json({
                user: null,
                message: "Username already exists"
            }, { status: 409 })
        };

        const hashedPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });

        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 })
    } catch (error) {
        console.log("[ERROR_CREATE_USER]", error);
        return NextResponse.json("Something went wrong", { status: 500 });
    }
}