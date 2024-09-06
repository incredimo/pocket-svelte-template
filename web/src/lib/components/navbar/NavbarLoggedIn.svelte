<!-- .\src\lib\components\navbar\NavbarLoggedIn.svelte -->
<script lang="ts">
	import { user_store } from '$lib/stores/user.store';
	import * as DropdownMenu from '../ui/dropdown-menu';
	import { UserCircle } from 'lucide-svelte';
	import { Button } from '../ui/button';

	export let avatar: string | undefined;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" size="icon" class="overflow-hidden rounded-full" builders={[builder]}>
			<UserCircle class="h-6 w-6" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{$user_store?.username}</p>
				<p class="text-xs leading-none text-muted-foreground">{$user_store?.email}</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item href="/account/profile">Profile</DropdownMenu.Item>
			<DropdownMenu.Item href="/account/settings">Settings</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<form action="/account/logout" method="POST">
			<DropdownMenu.Item>
				<button type="submit">Log out</button>
			</DropdownMenu.Item>
		</form>
	</DropdownMenu.Content>
</DropdownMenu.Root>
