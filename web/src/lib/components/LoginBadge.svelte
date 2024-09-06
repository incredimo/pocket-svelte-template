<script lang="ts">
  import { onDestroy } from "svelte";
  import { authModel, client } from "../pocketbase";
  import Alerts, { alerts } from "./Alerts.svelte";
  import { Avatar } from "$lib/components/ui/avatar/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import LoginForm from "./LoginForm.svelte";

  const { signupAllowed = true } = $props();

  async function logout() {
    client.authStore.clear();
  }

  const unsubscribe = client.authStore.onChange((token, model) => {
    if (model) {
      const { name, username } = model;
      alerts.success(`Signed in as ${name || username || "Admin"}`, 5000);
    } else {
      alerts.success(`Signed out`, 5000);
    }
  }, false);

  onDestroy(() => {
    unsubscribe();
  });
</script>

{#if $authModel}
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button variant="ghost" class="flex items-center space-x-2">
        {#if $authModel.avatar}
          <Avatar>
            <img
              src={client.getFileUrl($authModel, $authModel.avatar)}
              alt="profile pic"
            />
          </Avatar>
        {/if}
        <span class="text-sm font-medium">
          {$authModel?.name || $authModel?.username || $authModel?.email}
        </span>
      </Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <div class="flex flex-col items-center space-y-4">
        {#if $authModel.avatar}
          <Avatar>
            <img
              src={client.getFileUrl($authModel, $authModel.avatar)}
              alt="profile pic"
            />
          </Avatar>
        {/if}
        <div class="text-center">
          <p class="text-lg font-medium leading-none">
            {$authModel?.name ?? $authModel?.username ?? $authModel?.email}
          </p>
        </div>
        <Button on:click={logout}>Sign Out</Button>
      </div>
    </Dialog.Content>
  </Dialog.Root>
{:else}
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <Button variant="outline">
        {signupAllowed ? "Sign In / Sign Up" : "Sign In"}
      </Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <Alerts />
      <LoginForm {signupAllowed} />
    </Dialog.Content>
  </Dialog.Root>
{/if}