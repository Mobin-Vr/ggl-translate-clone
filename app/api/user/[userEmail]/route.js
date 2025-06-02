import { getUserByEmail } from "@/app/_lib/data-services";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userEmail } = await params;

  try {
    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 },
      );
    }

    const user = await getUserByEmail(userEmail);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
