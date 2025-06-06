import { AppShell, Burger, Button, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMantineColorScheme } from '@mantine/core';
import { Outlet } from "react-router-dom";

export default function Home() {
  const [opened, { toggle }] = useDisclosure();
 const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
        <AppShell.Header className="flex items-center justify-between px-4">
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div className="flex items-center gap-4">
            <h1 className="text-3xl font-semibold">Mantine UI</h1>
            <Button onClick={toggleColorScheme}>
              {colorScheme === "dark" ? "Light" : "Dark"} mode
            </Button>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <div className="flex flex-col gap-4">
           <NavLink href="/editor" label="Editor" />
        </div>
      </AppShell.Navbar>

      <AppShell.Main>
         <Outlet/>
      </AppShell.Main>
    </AppShell>
  );
}
