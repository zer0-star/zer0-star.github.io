<script lang="ts">
  import Drawer, { Content } from "@smui/drawer";
  import List, { Item, Text } from "@smui/list";
  export let segment: string;
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

<Drawer variant={null}>
  <Content>
    <List>
      <Item href="/">none</Item>
      <Item href="/aaa">aaa</Item>
      <Item href="/bbb">bbb</Item>
    </List>
  </Content>
</Drawer>

<main>
  <slot />
  <h2>zer0-star</h2>
  {segment ?? 'noooo'}
</main>
