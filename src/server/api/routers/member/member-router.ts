import { createTRPCRouter } from "../../trpc";
import { FilterMembers } from "./controllers/filter-members";
import { GetOneMember } from "./controllers/get-member";
import { GetMembers } from "./controllers/get-members";
import { MarkMember, UnMarkMember } from "./controllers/mark-member";
import { NewMember } from "./controllers/new-member";
import { UpdateMember } from "./controllers/update-member";

export const memberRouter = createTRPCRouter({
  new: NewMember,
  get: GetMembers,
  getOne: GetOneMember,
  filter: FilterMembers,
  update: UpdateMember,
  mark: MarkMember,
  unmark: UnMarkMember,
});
