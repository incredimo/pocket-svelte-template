<!-- .\src\lib\components\navbar\NavbarLoggedOut.svelte -->
<script>
	import { ActivityIcon, Box, Truck, UserCircle } from "lucide-svelte";


	import { Button } from "../ui/button";

</script>
<div class="flex-none">
	<Button href="/account/register" >
		<Box class="h-5 w-5" />
		<span class=" hidden md:inline px-3">Get Started</span>
	</Button>
	<Button href="/account/login" >
		<UserCircle class="h-5 w-5" /> 
		<span class=" hidden md:inline px-3">Login</span>
	</Button>
</div>
