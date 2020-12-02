<script lang="ts">
  import { onMount } from "svelte";
  import { stores } from "@sapper/app";
  import Drawer, { Content, Scrim, AppContent } from "@smui/drawer";
  import List, { Item, Text } from "@smui/list";
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  import A from "@smui/common/A.svelte";
  import "./_app.scss";

  import Nav from "../components/Nav.svelte";

  // export let segment: string;
  const { page } = stores();

  let mainContent: any;
  let miniWindow = false;
  let drawerOpen = false;
  const setMiniWindow = () => (miniWindow = window.innerWidth < 720);
  function pickSection(section) {
    drawerOpen = false;
    mainContent.scrollTop = 0;
    // Svelte/Sapper is not updated the components correctly, so I need this.
    sections.forEach((section) => section.component.$set({ activated: false }));
    section.component.$set({ activated: true });
    activeSection =
      "shortcut" in section
        ? sections.find((sec) => sec.route === section.shortcut)
        : section;
  }

  const sections = [
    { name: "none", href: "/" },
    { name: "aaa", href: "/aaa" },
    { name: "bbb", href: "/bbb" },
  ];

  let activeSection = sections.find(
    (section) => "href" in section && section.href === $page.path
  );

  // sections[0].component.$set({activated: true})
  onMount(setMiniWindow);
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<svelte:window on:resize={setMiniWindow} />
<TopAppBar variant="static" class="demo-top-app-bar">
  <Row>
    <Section>
      {#if miniWindow}
        <IconButton
          class="material-icons"
          on:click={() => (drawerOpen = !drawerOpen)}>
          menu
        </IconButton>
      {/if}
      <Title
        component={A}
        href="/"
        class="mdc-theme--primary"
        style={miniWindow ? 'padding-left: 0;' : ''}>
        Svelte Material UI
      </Title>
    </Section>
  </Row>
</TopAppBar>
<div class="drawer-container">
  <Drawer
    variant={miniWindow ? 'modal' : null}
    bind:open={drawerOpen}
    class="demo-drawer mdc-theme--secondary-bg {miniWindow ? 'demo-drawer-adjust' : ''}">
    <Content>
      <List>
        {#each sections as section (section.name)}
          <Item
            href={section.href}
            title={section.name}
            on:click={() => pickSection(section)}>
            <Text class="mdc-theme--on-secondary">{section.name}</Text>
          </Item>
        {/each}
      </List>
    </Content>
  </Drawer>
  {#if miniWindow}
    <Scrim />
  {/if}
  <AppContent class="demo-app-content">
    <!-- <Nav {segment} /> -->
    <main class="demo-main-content" bind:this={mainContent}>
      <slot />
    </main>
  </AppContent>
</div>
