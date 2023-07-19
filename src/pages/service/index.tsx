import { api } from "@/utils/api";
import { AppBar, Button, List, ListItem, Toolbar } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const ServiceList: NextPage = () => {
  const services = api.service.get.useQuery({ limit: 20 });
  const router = useRouter();
  return (
    <>
      <header style={{ position: "relative" }}>
        <AppBar position="absolute">
          <Toolbar sx={{ gap: "1rem" }}>
            <Button
              color="error"
              variant="outlined"
              onClick={() => router.back()}
            >
              BACK
            </Button>
            <h1>Services</h1>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Toolbar />
      </header>
      <main>
        <List>
          {services?.data?.ok
            ? services.data.value.map((service) => (
                <ServiceListItem
                  service={service}
                  key={service.date.toString()}
                />
              ))
            : null}
        </List>
      </main>
    </>
  );
};

export default ServiceList;

interface ServiceListItemProps {
  service: { date: Date; id: number; name: string; present: { id: number }[] };
}
function ServiceListItem({ service }: ServiceListItemProps) {
  return (
    <ListItem>
      <Link
        href={`/service/${service.date
          .toLocaleDateString("en-GB")
          .split("/")
          .join("-")}`}
      >
        <Button>
          {service.date.toLocaleDateString("en-GB")} : {service.name}
        </Button>
      </Link>
    </ListItem>
  );
}
