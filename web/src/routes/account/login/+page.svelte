<!-- .\src\routes\account\login\+page.svelte -->
<script lang="ts">
	import { client } from '$lib/pocketbase';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Alert } from '$lib/components/ui/alert';
    import { Checkbox } from '$lib/components/ui/checkbox';
    import { toast } from 'svelte-sonner';

 
  const coll = client.collection("users");

  let form = {
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    admin: false,
  };
  


  async function submit(e: SubmitEvent) {
    e.preventDefault();
 
    // signin
    if (form.admin) {
      await client.admins.authWithPassword(form.email, form.password);
    } else {
      try {
		const res = await coll.authWithPassword(form.email, form.password);
		if (res.token) {
			window.location.href = '/account/dashboard';
		}
		else {
			toast.error('Invalid email or password');
		}
	  } catch (error:any) {
			toast.error(error?.message?? "Oops! Something went wrong");
	  }


    }
  }
</script>

<div class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
	<div class="flex items-center justify-center py-12">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Login</h1>
				<p class="text-balance text-muted-foreground">
					Enter your email below to login to your account
				</p>
			</div>
			<form on:submit={submit} class="space-y-6">
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="m@example.com"
					
							bind:value={form.email}
							required
							class="border border-input"
						/>
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
					
						</div>
						<Input
							id="password"
							type="password"
		
							bind:value={form.password}
							placeholder="Password"
							required
							class="border border-input"
						/>
					</div>
				
					<div class="flex  justify-between items-center">
						
						<div>
							<Checkbox id="admin" bind:checked={form.admin} />
						<Label for="admin">Admin</Label>
						</div>

						<a href="##" class="ml-auto inline-block text-sm underline">
							Forgot your password?
						</a>
					</div>
					<Button type="submit" class="w-full">Login</Button>
					<Button variant="outline" class="w-full">Login with Google</Button>
				</div>
			</form>
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/account/register" class="underline"> Sign up </a>
			</div>
		</div>
	</div>
	<div class="hidden bg-muted lg:block">
		<img
			src="/images/placeholder.svg"
			alt="placeholder"
			width="1920"
			height="1080"
			class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
		/>
	</div>
</div>

 