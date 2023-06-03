import { api } from "@/utils/api";
import { useState } from "react";

export const useAddMember = (
  mutationOptions: Parameters<typeof api.member.new.useMutation>[0]
) => {
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const addMemberMut = api.member.new.useMutation(mutationOptions);
  const addMember = async (data: {
    name: string;
    address?: string;
    phoneNum: string;
    sex: "MALE" | "FEMALE";
  }) => {
    const success = await addMemberMut
      .mutateAsync(data)
      .then((data) => data.ok)
      .catch((_) => false);
    return success;
  };
  return {
    addMemberDialogOpen,
    setAddMemberDialogOpen,
    addMemberMut,
    addMember,
  };
};

export const useCreateService = (
  mutationOptions: Parameters<typeof api.service.new.useMutation>[0]
) => {
  const [createServiceDialogOpen, setCreateServiceDialogOpen] = useState(false);
  const createServiceMut = api.service.new.useMutation(mutationOptions);

  const createService = async (data: { name: string; date: Date }) => {
    const success = await createServiceMut
      .mutateAsync(data)
      .then((data) => data.ok)
      .catch((_) => false);
    return success;
  };

  return {
    createServiceDialogOpen,
    setCreateServiceDialogOpen,
    createService,
    createServiceMut,
  };
};
