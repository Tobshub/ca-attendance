import { MemberInfo } from "@/components/more-info";
import { api } from "@/utils/api";
import { AppBar, Button, Toolbar } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { type MouseEvent, useState } from "react";

const COLUMNS: GridColDef[] = [
  { field: "id", headerName: "N/O" },
  { field: "name", headerName: "Name", minWidth: 230 },
  {
    field: "sex",
    headerName: "Sex",
    width: 100,
    valueFormatter: ({ value }) => (value === "MALE" ? "M" : "F"),
  },
  { field: "phoneNum", headerName: "Phone No.", width: 150 },
  { field: "address", headerName: "Address", width: 300 },
];

const ServicePage: NextPage = () => {
  const router = useRouter();
  const service = api.service.getOne.useQuery({
    date: ParseServiceDate(router.query.date as string),
  });

  const [moreMemberInfoDialogOpen, setMoreMemberInfoDialogOpen] =
    useState(false);
  const [moreMemberInfoIndex, setMoreMemberInfoIndex] = useState(0);

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
      <header>
        <AppBar>
          <Toolbar sx={{ gap: "1rem" }}>
            <Button
              color="error"
              variant="outlined"
              onClick={() => router.back()}
            >
              BACK
            </Button>
            {service.data?.ok ? (
              <h1 style={{ padding: 0, margin: 0 }}>
                {service.data.value.name}
              </h1>
            ) : null}
          </Toolbar>
        </AppBar>
      </header>
      <Toolbar sx={{ mb: "2rem" }} />
      <main>
        {service.data?.ok ? (
          <>
            <em>{service.data.value.date.toLocaleDateString()}</em>
            <h2>Present Members</h2>
            <DataGrid
              sx={{ height: "fit-content" }}
              pageSizeOptions={[15, 30, 60, 90]}
              columns={COLUMNS}
              checkboxSelection
              rows={service.data.value.present.map((member, index) => ({
                ...member,
                id: index + 1,
              }))}
              slotProps={{
                cell: {
                  onContextMenu: handleContextEvent,
                },
              }}
            />
            {service.data.value.present[moreMemberInfoIndex] ? (
              <MemberInfo
                open={moreMemberInfoDialogOpen}
                handleClose={() => setMoreMemberInfoDialogOpen(false)}
                memberInfo={service.data.value.present[moreMemberInfoIndex]}
                refetchMembers={async () => {
                  await service.refetch().catch(null);
                }}
              />
            ) : null}
          </>
        ) : (
          "Not Found"
        )}
      </main>
    </>
  );
};

export default ServicePage;

// string format is dd-mm-yyyy
// and we need it in yyyy-mm-dd
function ParseServiceDate(dateStr: string | undefined) {
  dateStr = dateStr?.split("-").reverse().join("-");
  return dateStr ? new Date(dateStr) : null;
}
