import { Button } from "@mui/material";
import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import {
  AddMemberDialog,
  CreateServiceDialog,
} from "@/components/fullscreen-dialog";
import { useMemo, useState } from "react";
import { api } from "@/utils/api";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  MarkMembersDialog,
  UnmarkMembersDialog,
} from "@/components/un_mark-members-dialog";

const useAddMember = (
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

const useCreateService = (
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

const Home: NextPage = () => {
  const {
    addMemberDialogOpen,
    setAddMemberDialogOpen,
    addMemberMut,
    addMember,
  } = useAddMember({});
  const members = api.member.get.useQuery({});
  const services = api.service.get.useQuery({ limit: 4 });
  const {
    createServiceMut,
    createService,
    createServiceDialogOpen,
    setCreateServiceDialogOpen,
  } = useCreateService({
    onSuccess: (data) => {
      if (data.ok) {
        services.refetch().catch((_) => null);
      }
    },
  });
  const [service1, service2, service3, service4] = services.data?.value ?? [];

  // prettier-ignore
  const COLUMNS: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "N/O", },
      { field: "name", headerName: "Name", minWidth: 230, sortable: false },
      {
        field: "sex",
        headerName: "Sex",
        width: 100,
        valueFormatter: ({ value }) => (value === "MALE" ? "M" : "F"),
      },
      { field: "service1",  headerName: service1?.date?.toLocaleDateString("en-GB") ?? "Attendance 1", type: "boolean" },
      { field: "service2",  headerName: service2?.date?.toLocaleDateString("en-GB") ?? "Attendance 2", type: "boolean" },
      { field: "service3",  headerName: service3?.date?.toLocaleDateString("en-GB") ?? "Attendance 3", type: "boolean" },
      { field: "service4",  headerName: service4?.date?.toLocaleDateString("en-GB") ?? "Attendance 4", type: "boolean" },
    ],
    [service1?.date, service2?.date, service3?.date, service4?.date]
  );

  const [selectedMembersIndex, setSelectedMembersIndex] = useState<number[]>(
    []
  );
  const [markMembersDialogOpen, setMarkMembersDialogOpen] = useState(false);
  const [unmarkMembersDialogOpen, setUnmarkMembersDialogOpen] = useState(false);
  const markMembersMut = api.service.markMembers.useMutation();
  const unmarkMembersMut = api.service.unmarkMembers.useMutation({
    onSuccess: (data) => console.log(data),
    onError: (err) => console.error(err),
  });
  const handleMarkingMembers = async (serviceId: number) => {
    if (members.data) {
      const selectedMembers = selectedMembersIndex
        .map((i) => members.data.value[i - 1]?.id)
        .filter((member) => member !== undefined) as number[];
      const success = await markMembersMut
        .mutateAsync({ id: serviceId, members: selectedMembers })
        .then((data) => data.ok)
        .catch((_) => false);
      return success;
    }
    return false;
  };
  const handleUnmarkingMembers = async (serviceId: number) => {
    if (members.data) {
      const selectedMembers = selectedMembersIndex
        .map((i) => members.data.value[i - 1]?.id)
        .filter((member) => member !== undefined) as number[];
      const success = await unmarkMembersMut
        .mutateAsync({ id: serviceId, members: selectedMembers })
        .then((data) => data.ok)
        .catch((_) => false);
      return success;
    }
    return false;
  };
  return (
    <>
      <Head>
        <title>Calvary Assembly Ikoyi</title>
        <meta name="description" content="Mark church members attendance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Button
          sx={{ my: 1, mx: 1 }}
          variant="contained"
          onClick={() => setAddMemberDialogOpen(true)}
        >
          ADD MEMBERS
        </Button>
        <Button
          sx={{ my: 1, mx: 1 }}
          variant="contained"
          onClick={() => setCreateServiceDialogOpen(true)}
        >
          CREATE SERVICE
        </Button>
        <Button
          disabled={selectedMembersIndex.length < 1}
          onClick={() => setMarkMembersDialogOpen(true)}
        >
          MARK SELECTED AS PRESENT
        </Button>
        <Button
          disabled={selectedMembersIndex.length < 1}
          onClick={() => setUnmarkMembersDialogOpen(true)}
        >
          MARK SELECTED AS ABSENT
        </Button>
        <AddMemberDialog
          open={addMemberDialogOpen}
          handleClose={() => setAddMemberDialogOpen(false)}
          addMember={addMember}
          mutation={addMemberMut}
        />
        <CreateServiceDialog
          open={createServiceDialogOpen}
          handleClose={() => setCreateServiceDialogOpen(false)}
          createService={createService}
          mutation={createServiceMut}
        />
        <MarkMembersDialog
          open={markMembersDialogOpen}
          handleClose={() => setMarkMembersDialogOpen(false)}
          refetchMembers={() => {
            members.refetch().catch((_) => null);
          }}
          selectedMembersCount={selectedMembersIndex.length}
          services={services.data?.value ?? []}
          handleMarkingMembers={handleMarkingMembers}
          mutation={markMembersMut}
        />
        <UnmarkMembersDialog
          open={unmarkMembersDialogOpen}
          handleClose={() => setUnmarkMembersDialogOpen(false)}
          refetchMembers={() => {
            members.refetch().catch((_) => null);
          }}
          selectedMembersCount={selectedMembersIndex.length}
          services={services.data?.value ?? []}
          handleUnmarkingMembers={handleUnmarkingMembers}
          mutation={unmarkMembersMut}
        />
        <DataGrid
          onRowSelectionModelChange={(selection) =>
            setSelectedMembersIndex(selection as number[])
          }
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 30 } },
          }}
          pageSizeOptions={[15, 30, 60, 90]}
          rows={
            members.data?.value.map((member, index) => {
              // prettier-ignore
              const tx = {
                ...member,
                id: index + 1,
                service1: service1 ? member.present.find(present => present.id === service1.id) : false,
                service2: service2 ? member.present.find(present => present.id === service2.id) : false,
                service3: service3 ? member.present.find(present => present.id === service3.id) : false,
                service4: service4 ? member.present.find(present => present.id === service4.id) : false,
              };
              return tx;
            }) ?? []
          }
          columns={COLUMNS}
          checkboxSelection
        />
      </main>
    </>
  );
};

export default Home;
