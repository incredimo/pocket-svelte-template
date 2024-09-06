<script lang="ts">
  import { client, providerLogin } from "../pocketbase";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";

  const {
    authCollection = "users",
    passwordLogin = true,
    signupAllowed = true,
  } = $props();
  const coll = client.collection(authCollection);

  let form = {
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    admin: false,
  };
  
  let selectedTab = "signin";

  async function submit(e: SubmitEvent) {
    e.preventDefault();
    if (selectedTab === "signup") {
      await coll.create({ ...form });
    }
    // signin
    if (form.admin) {
      await client.admins.authWithPassword(form.email, form.password);
    } else {
      await coll.authWithPassword(form.email, form.password);
    }
  }
</script>

<Card.Root class="mx-auto max-w-sm p-6 space-y-6">
  <Card.Header>
    <Card.Title class="text-2xl">Authentication</Card.Title>
    <Card.Description>Enter your information to sign in or create an account</Card.Description>
  </Card.Header>
  <Card.Content>
    <form on:submit={submit} class="space-y-6">
      {#if passwordLogin}
        <Tabs.Root bind:value={selectedTab}>
          <Tabs.List class="grid w-full grid-cols-2">
            <Tabs.Trigger class="text-left" value="signin">Sign In</Tabs.Trigger>
            {#if signupAllowed}
              <Tabs.Trigger class="text-left" value="signup">Sign Up</Tabs.Trigger>
            {/if}
          </Tabs.List>
          <Tabs.Content value="signin" class="mt-6">
            <div class="grid gap-4">
              <div class="grid gap-2">
                <Label for="email">Email</Label>
                <Input id="email" type="email" placeholder="Email" bind:value={form.email} required class="border border-input" />
              </div>
              <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input id="password" type="password" placeholder="Password" bind:value={form.password} required class="border border-input" />
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox id="admin" bind:checked={form.admin} />
                <Label for="admin">Admin</Label>
              </div>
              <Button type="submit" class="w-full">Sign In</Button>
            </div>
          </Tabs.Content>
          {#if signupAllowed}
            <Tabs.Content value="signup" class="mt-6">
              <div class="grid gap-4">
                <div class="grid gap-2">
                  <Label for="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="Email" bind:value={form.email} required class="border border-input" />
                </div>
                <div class="grid gap-2">
                  <Label for="signup-password">Password</Label>
                  <Input id="signup-password" type="password" placeholder="Password" bind:value={form.password} required class="border border-input" />
                </div>
                <div class="grid gap-2">
                  <Label for="signup-confirm-password">Confirm Password</Label>
                  <Input id="signup-confirm-password" type="password" placeholder="Confirm Password" bind:value={form.passwordConfirm} required class="border border-input" />
                </div>
                <div class="grid gap-2">
                  <Label for="name">Name / Label</Label>
                  <Input id="name" type="text" placeholder="Name / Label" bind:value={form.name} required class="border border-input" />
                </div>
                <Button type="submit" class="w-full">Sign Up</Button>
              </div>
            </Tabs.Content>
          {/if}
        </Tabs.Root>
      {/if}
      {#await coll.listAuthMethods({ $autoCancel: false }) then methods}
        {#each methods.authProviders as p}
          <Button type="button" on:click={() => providerLogin(p, coll)} variant="outline" class="w-full mt-4">Sign-in with {p.name}</Button>
        {/each}
      {:catch}
        <!-- pocketbase not working -->
      {/await}
    </form>
  </Card.Content>
</Card.Root>