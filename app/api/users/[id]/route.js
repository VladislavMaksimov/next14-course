import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (_, { params }) => {
  try {
    await connectToDB();

    const user = await User.findById(params.id);
    if (!user) return new Response("User not found", { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user", { status: 500 });
  }
};
