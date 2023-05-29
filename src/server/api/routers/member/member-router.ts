import { createTRPCRouter } from "../../trpc";
import { GetMembers } from "./controllers/get-members";
import { NewMember } from "./controllers/new-member";

export const memberRouter = createTRPCRouter({
  new: NewMember,
  get: GetMembers,
  // TODO -- update member, get member, (un)mark member's attendance
});
