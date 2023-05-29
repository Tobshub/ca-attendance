import { createTRPCRouter } from "../../trpc";
import { DeleteService } from "./controllers/delete-service";
import { GetOneService } from "./controllers/get-service";
import { GetServices } from "./controllers/get-services";
import {
  MarkMembersForService,
  UnMarkMembersForService,
} from "./controllers/mark-members";
import { NewService } from "./controllers/new-service";

export const serviceRouter = createTRPCRouter({
  new: NewService,
  get: GetServices,
  getOne: GetOneService,
  delete: DeleteService,
  markMembers: MarkMembersForService,
  unmarkMembers: UnMarkMembersForService,
});
