<script lang="ts">
	import { onDestroy } from "svelte";

	import { UserCircle } from "lucide-svelte";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";

    import { authModel, client } from "$lib/pocketbase";

	async function logout() {
		client.authStore.clear();
	}
</script>

<div class="flex items-center space-x-4">
	{#if $authModel}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					variant="outline"
					size="icon"
					class="overflow-hidden rounded-full"
					builders={[builder]}
				>
					{#if $authModel.avatar}
						<Avatar.Root>
							<Avatar.Image
								src={client.getFileUrl($authModel, $authModel.avatar)}
								alt="User avatar"
							/>
							<Avatar.Fallback>
								<UserCircle class="h-6 w-6" />
							</Avatar.Fallback>
						</Avatar.Root>
					{:else}
						<UserCircle class="h-6 w-6" />
					{/if}
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="end">
				<DropdownMenu.Label class="font-normal">
					<div class="flex flex-col space-y-1">
						<p class="text-sm font-medium leading-none">
							{$authModel?.name || $authModel?.username || $authModel?.email}
						</p>
						<p class="text-xs leading-none text-muted-foreground">
							{$authModel?.email}
						</p>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item href="/account/profile">
						Profile
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Billing
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						Settings
					</DropdownMenu.Item>
					<DropdownMenu.Item>New Team</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item on:click={logout}>
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{:else}
		<Button href="/account/login" variant="outline" size="sm">
			Sign in
		</Button>

			<Button href="/account/register" size="sm">
				Sign up
			</Button>
	
	{/if}
</div>