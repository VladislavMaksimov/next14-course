import { Schema, model, models } from "mongoose";
import { MongooseFindByReference } from "mongoose-find-by-reference";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

PromptSchema.plugin(MongooseFindByReference);

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
