import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectToDB();

    const url = new URL(request.url);
    const params = new URLSearchParams(url.searchParams);

    const promptFilter = params.get("prompt");
    const tagFilter = params.get("tag");
    const creatorFilter = params.get("creator");
    const mode = params.get("mode");

    let prompts;

    if (mode === "exact" && tagFilter && !promptFilter && !creatorFilter) {
      prompts = await Prompt.find({
        tag: tagFilter,
      }).populate("creator");
      return new Response(JSON.stringify(prompts), { status: 200 });
    }

    prompts = await Prompt.find({
      $or: [
        { prompt: { $regex: promptFilter ?? "", $options: "i" } },
        { tag: { $regex: tagFilter ?? "", $options: "i" } },
        {
          creator: {
            username: { $regex: creatorFilter ?? "", $options: "i" },
          },
        },
      ],
    }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
