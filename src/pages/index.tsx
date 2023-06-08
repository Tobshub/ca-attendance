import { Button, ListItemText, MenuItem, Toolbar } from "@mui/material";
import { type NextPage } from "next";
import Head from "next/head";
import { useMemo, useState, type MouseEvent } from "react";
import { api } from "@/utils/api";
import {
  DataGrid,
  GridToolbar,
  type GridColDef,
  type GridColumnMenuProps,
  GridColumnMenu,
  type GridColumnMenuItemProps,
} from "@mui/x-data-grid";
import { HeaderWithLogo } from "@/components/logo";
import {
  useAddMember,
  useCreateService,
  useAttendance,
} from "@/hooks/home-hooks";
import { TempBackDrop } from "@/components/backdrop";
import dynamic from "next/dynamic";
import Link from "next/link";
const AddMemberDialog = dynamic(
  () =>
    import("@/components/fullscreen-dialog").then((mod) => mod.AddMemberDialog),
  {
    loading: ({ isLoading }) => <TempBackDrop open={isLoading ?? false} />,
  }
);
const CreateServiceDialog = dynamic(
  () =>
    import("@/components/fullscreen-dialog").then(
      (mod) => mod.CreateServiceDialog
    ),
  { loading: ({ isLoading }) => <TempBackDrop open={isLoading ?? false} /> }
);
const MarkMembersDialog = dynamic(
  () =>
    import("@/components/un_mark-members-dialog").then(
      (mod) => mod.MarkMembersDialog
    ),
  { loading: ({ isLoading }) => <TempBackDrop open={isLoading ?? false} /> }
);
const UnmarkMembersDialog = dynamic(
  () =>
    import("@/components/un_mark-members-dialog").then(
      (mod) => mod.UnmarkMembersDialog
    ),
  { loading: ({ isLoading }) => <TempBackDrop open={isLoading ?? false} /> }
);
const MoreMemberInfo = dynamic(
  () => import("@/components/more-info").then((mod) => mod.MoreMemberInfo),
  { loading: ({ isLoading }) => <TempBackDrop open={isLoading ?? false} /> }
);

const ServiceInfoItem = (
  props: GridColumnMenuItemProps & { serviceDate: string }
) => {
  let { serviceDate } = props;
  serviceDate = serviceDate.split("/").join("-");
  return (
    <Link href={`/service/${serviceDate}`}>
      <MenuItem>
        <ListItemText>{props.customValue}</ListItemText>
      </MenuItem>
    </Link>
  );
};

const CustomColMenu = (props: GridColumnMenuProps) => {
  if (props.colDef.field?.includes("service")) {
    const name = props.colDef.headerName;
    return (
      <GridColumnMenu
        {...props}
        slots={{ columnMenuUserItem: ServiceInfoItem }}
        slotProps={{
          columnMenuUserItem: {
            displayOrder: 0,
            customValue: "Service Info",
            serviceDate: name,
          },
        }}
      />
    );
  } else {
    return <GridColumnMenu {...props} />;
  }
};

const Home: NextPage = () => {
  const members = api.member.get.useQuery({});
  const {
    addMemberDialogOpen,
    setAddMemberDialogOpen,
    addMemberMut,
    addMember,
  } = useAddMember({
    onSuccess: (data) => {
      if (data.ok) {
        members.refetch().catch(() => null);
      }
    },
  });
  const services = api.service.get.useQuery({ limit: 10 });
  const {
    createServiceMut,
    createService,
    createServiceDialogOpen,
    setCreateServiceDialogOpen,
  } = useCreateService({
    onSuccess: (data) => {
      if (data.ok) {
        services.refetch().catch(() => null);
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
      { field: "service1",  headerName: service1?.date?.toLocaleDateString("en-GB") ?? "Service 1", type: "boolean" },
      { field: "service2",  headerName: service2?.date?.toLocaleDateString("en-GB") ?? "Service 2", type: "boolean" },
      { field: "service3",  headerName: service3?.date?.toLocaleDateString("en-GB") ?? "Service 3", type: "boolean" },
      { field: "service4",  headerName: service4?.date?.toLocaleDateString("en-GB") ?? "Service 4", type: "boolean" },
    ],
    [service1?.date, service2?.date, service3?.date, service4?.date]
  );

  const {
    selectedMembersIndex,
    setSelectedMembersIndex,
    unmarkMembersDialogOpen,
    setUnmarkMembersDialogOpen,
    markMembersDialogOpen,
    setMarkMembersDialogOpen,
    handleMarkingMembers,
    handleUnmarkingMembers,
    markMembersMut,
    unmarkMembersMut,
  } = useAttendance(members.data?.value ?? []);

  const [moreMemberInfoDialogOpen, setMoreMemberInfoDialogOpen] =
    useState(false);
  const [moreMemberInfoIndex, setMoreMemberInfoIndex] = useState(1);
  const handleContextEvent = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const _row = e.currentTarget.parentElement?.dataset.id;
    if (_row) {
      const row = parseInt(_row) - 1;
      setMoreMemberInfoIndex(row);
      setMoreMemberInfoDialogOpen(true);
    }
  };

  return (
    <>
      <Head>
        <title>Calvary Assembly Ikoyi</title>
        <meta name="description" content="Mark church members attendance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <HeaderWithLogo />
      </header>
      <Toolbar />
      <main>
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
          sx={{ my: 1, mx: 1 }}
          variant="outlined"
          disabled={selectedMembersIndex.length < 1}
          onClick={() => setMarkMembersDialogOpen(true)}
        >
          MARK SELECTED AS PRESENT
        </Button>
        <Button
          sx={{ my: 1, mx: 1 }}
          variant="outlined"
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
            members.refetch().catch(() => null);
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
            members.refetch().catch(() => null);
          }}
          selectedMembersCount={selectedMembersIndex.length}
          services={services.data?.value ?? []}
          handleUnmarkingMembers={handleUnmarkingMembers}
          mutation={unmarkMembersMut}
        />
        <DataGrid
          sx={{ height: "fit-content" }}
          onRowSelectionModelChange={(selection) =>
            setSelectedMembersIndex(selection as number[])
          }
          slots={{ toolbar: GridToolbar, columnMenu: CustomColMenu }}
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
          slotProps={{
            cell: {
              onContextMenu: handleContextEvent,
            },
          }}
        />
        {members.data?.value[moreMemberInfoIndex] ? (
          <MoreMemberInfo
            open={moreMemberInfoDialogOpen}
            handleClose={() => setMoreMemberInfoDialogOpen(false)}
            memberInfo={members.data.value[moreMemberInfoIndex]}
            services={services.data?.value ?? []}
            refetchMembers={async () => {
              await members.refetch().catch(() => null);
            }}
          />
        ) : null}
      </main>
    </>
  );
};

export default Home;
