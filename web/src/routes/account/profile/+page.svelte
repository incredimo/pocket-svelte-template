<!-- .\src\routes\account\profile\+page.svelte -->
<script lang="ts">
	import ChevronLeft from "lucide-svelte/icons/chevron-left";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import Copy from "lucide-svelte/icons/copy";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import File from "lucide-svelte/icons/file";
	import Home from "lucide-svelte/icons/home";
	import LineChart from "lucide-svelte/icons/line-chart";
	import ListFilter from "lucide-svelte/icons/list-filter";
	import EllipsisVertical from "lucide-svelte/icons/ellipsis-vertical";
	import Package from "lucide-svelte/icons/package";
	import Package2 from "lucide-svelte/icons/package-2";
	import PanelLeft from "lucide-svelte/icons/panel-left";
	import Search from "lucide-svelte/icons/search";
	import Settings from "lucide-svelte/icons/settings";
	import ShoppingCart from "lucide-svelte/icons/shopping-cart";
	import Truck from "lucide-svelte/icons/truck";
	import UsersRound from "lucide-svelte/icons/users-round";
	import UserIcon from "lucide-svelte/icons/user";
  
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import * as Pagination from "$lib/components/ui/pagination/index.js";
	import { Progress } from "$lib/components/ui/progress/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Table from "$lib/components/ui/table/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  </script>
  
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:px-6">
	  <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4">
		<div class="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
		  <!-- Profile Card -->
		  <Card.Root class="col-span-2 2xl:col-span-3">
			<Card.Header class="pb-3 flex items-center gap-4">
			  <UserIcon class="h-12 w-12 text-primary" />
			  <div>
				<Card.Title>Liam Johnson</Card.Title>
				<Card.Description class="text-sm text-muted-foreground">liam@example.com</Card.Description>
			  </div>
			  <div class="ml-auto">
				<Button size="sm" variant="outline" class="gap-1">
				  <Settings class="h-4 w-4" />
				  Edit Profile
				</Button>
			  </div>
			</Card.Header>
			<Card.Content class="grid gap-4">
			  <div class="grid gap-2">
				<h2 class="text-lg font-semibold">Profile Verification</h2>
				<p class="text-sm text-muted-foreground">Verify your profile to unlock all features.</p>
				<Progress value={60} aria-label="60% completed" class="my-2" />
				<ul class="list-disc list-inside">
				  <li class="text-sm text-muted-foreground">ID Document <Badge variant="secondary" class="ml-2">Pending</Badge></li>
				  <li class="text-sm text-muted-foreground">Proof of Address <Badge variant="secondary" class="ml-2">Pending</Badge></li>
				  <li class="text-sm text-muted-foreground">Email Verification <Badge variant="default" class="ml-2">Completed</Badge></li>
				</ul>
			  </div>
			</Card.Content>
		  </Card.Root>
  
		  <!-- Profile Overview Card -->
		  <Card.Root class="col-span-1  2xl:col-span-3">
			<Card.Header class="pb-3">
			  <Card.Title>Profile Overview</Card.Title>
			  <Card.Description class="max-w-lg text-balance leading-relaxed">
				Manage your profile information and settings.
			  </Card.Description>
			</Card.Header>
			<Card.Content>
			  <div class="grid gap-4">
				<div class="flex items-center gap-4">
				  <UserIcon class="h-8 w-8 text-primary" />
				  <div>
					<p class="text-sm font-medium">Username</p>
					<p class="text-muted-foreground">liam_johnson</p>
				  </div>
				</div>
				<div class="flex items-center gap-4">
				  <CreditCard class="h-8 w-8 text-primary" />
				  <div>
					<p class="text-sm font-medium">Payment Methods</p>
					<p class="text-muted-foreground">Visa ending in 4532</p>
				  </div>
				</div>
			  </div>
			</Card.Content>
		  </Card.Root>
  
		  <!-- This Week Card -->
		  <Card.Root class="col-span-1  2xl:col-span-3">
			<Card.Header class="pb-2">
			  <Card.Description>This Week</Card.Description>
			  <Card.Title class="text-4xl">$1329</Card.Title>
			</Card.Header>
			<Card.Content>
			  <div class="text-xs text-muted-foreground">+25% from last week</div>
			</Card.Content>
			<Card.Footer>
			  <Progress value={25} aria-label="25% increase" />
			</Card.Footer>
		  </Card.Root>
  
		  <!-- This Month Card -->
		  <Card.Root class="col-span-2 2xl:col-span-3">
			<Card.Header class="pb-2">
			  <Card.Description>This Month</Card.Description>
			  <Card.Title class="text-3xl">$5,329</Card.Title>
			</Card.Header>
			<Card.Content>
			  <div class="text-xs text-muted-foreground">+10% from last month</div>
			</Card.Content>
			<Card.Footer>
			  <Progress value={12} aria-label="12% increase" />
			</Card.Footer>
		  </Card.Root>
		</div>
  
		<div class="grid auto-rows-max items-start gap-4 lg:gap-8 lg:col-span-1 xl:col-span-1 2xl:col-span-2">
		  <Tabs.Root value="orders">
			<div class="flex items-center">
			  <Tabs.List>
				<Tabs.Trigger value="orders">Orders</Tabs.Trigger>
				<Tabs.Trigger value="activity">Activity</Tabs.Trigger>
				<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
			  </Tabs.List>
			  <div class="ml-auto flex items-center gap-2">
				<DropdownMenu.Root>
				  <DropdownMenu.Trigger asChild let:builder>
					<Button variant="outline" size="sm" class="h-7 gap-1 text-sm" builders={[builder]}>
					  <ListFilter class="h-3.5 w-3.5" />
					  <span class="sr-only sm:not-sr-only">Filter</span>
					</Button>
				  </DropdownMenu.Trigger>
				  <DropdownMenu.Content align="end">
					<DropdownMenu.Label>Filter by</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.CheckboxItem checked>Fulfilled</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem>Declined</DropdownMenu.CheckboxItem>
					<DropdownMenu.CheckboxItem>Refunded</DropdownMenu.CheckboxItem>
				  </DropdownMenu.Content>
				</DropdownMenu.Root>
				<Button size="sm" variant="outline" class="h-7 gap-1 text-sm">
				  <File class="h-3.5 w-3.5" />
				  <span class="sr-only sm:not-sr-only">Export</span>
				</Button>
			  </div>
			</div>
			<Tabs.Content value="orders">
			  <Card.Root>
				<Card.Header class="px-7">
				  <Card.Title>Orders</Card.Title>
				  <Card.Description>Recent orders from your store.</Card.Description>
				</Card.Header>
				<Card.Content>
				  <Table.Root>
					<Table.Header>
					  <Table.Row>
						<Table.Head>Customer</Table.Head>
						<Table.Head class="hidden sm:table-cell">Type</Table.Head>
						<Table.Head class="hidden sm:table-cell">Status</Table.Head>
						<Table.Head class="hidden md:table-cell">Date</Table.Head>
						<Table.Head class="text-right">Amount</Table.Head>
					  </Table.Row>
					</Table.Header>
					<Table.Body>
					  <Table.Row class="bg-accent">
						<Table.Cell>
						  <div class="font-medium">Liam Johnson</div>
						  <div class="hidden text-sm text-muted-foreground md:inline">liam@example.com</div>
						</Table.Cell>
						<Table.Cell class="hidden sm:table-cell">Sale</Table.Cell>
						<Table.Cell class="hidden sm:table-cell">
						  <Badge class="text-xs" variant="secondary">Fulfilled</Badge>
						</Table.Cell>
						<Table.Cell class="hidden md:table-cell">2023-06-23</Table.Cell>
						<Table.Cell class="text-right">$250.00</Table.Cell>
					  </Table.Row>
					  <Table.Row>
						<Table.Cell>
						  <div class="font-medium">Olivia Smith</div>
						  <div class="hidden text-sm text-muted-foreground md:inline">olivia@example.com</div>
						</Table.Cell>
						<Table.Cell class="hidden sm:table-cell">Refund</Table.Cell>
						<Table.Cell class="hidden sm:table-cell">
						  <Badge class="text-xs" variant="outline">Declined</Badge>
						</Table.Cell>
						<Table.Cell class="hidden md:table-cell">2023-06-24</Table.Cell>
						<Table.Cell class="text-right">$150.00</Table.Cell>
					  </Table.Row>
					  <!-- More rows -->
					</Table.Body>
				  </Table.Root>
				</Card.Content>
			  </Card.Root>
			</Tabs.Content>
			<Tabs.Content value="activity">
			  <!-- Content for Activity tab -->
			</Tabs.Content>
			<Tabs.Content value="settings">
			  <!-- Content for Settings tab -->
			</Tabs.Content>
		  </Tabs.Root>
		</div>
  
		<div>
		  <Card.Root class="overflow-hidden">
			<Card.Header class="flex flex-row items-start bg-muted/50">
			  <div class="grid gap-0.5">
				<Card.Title class="group flex items-center gap-2 text-lg">
				  Order Oe31b70H
				  <Button size="icon" variant="outline" class="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100">
					<Copy class="h-3 w-3" />
					<span class="sr-only">Copy Order ID</span>
				  </Button>
				</Card.Title>
				<Card.Description>Date: November 23, 2023</Card.Description>
			  </div>
			  <div class="ml-auto flex items-center gap-1">
				<Button size="sm" variant="outline" class="h-8 gap-1">
				  <Truck class="h-3.5 w-3.5" />
				  <span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">Track Order</span>
				</Button>
				<DropdownMenu.Root>
				  <DropdownMenu.Trigger asChild let:builder>
					<Button builders={[builder]} size="icon" variant="outline" class="h-8 w-8">
					  <EllipsisVertical class="h-3.5 w-3.5" />
					  <span class="sr-only">More</span>
					</Button>
				  </DropdownMenu.Trigger>
				  <DropdownMenu.Content align="end">
					<DropdownMenu.Item>Edit</DropdownMenu.Item>
					<DropdownMenu.Item>Export</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Trash</DropdownMenu.Item>
				  </DropdownMenu.Content>
				</DropdownMenu.Root>
			  </div>
			</Card.Header>
			<Card.Content class="p-6 text-sm">
			  <div class="grid gap-3">
				<div class="font-semibold">Order Details</div>
				<ul class="grid gap-3">
				  <li class="flex items-center justify-between">
					<span class="text-muted-foreground">Glimmer Lamps x <span>2</span></span>
					<span>$250.00</span>
				  </li>
				  <li class="flex items-center justify-between">
					<span class="text-muted-foreground">Aqua Filters x <span>1</span></span>
					<span>$49.00</span>
				  </li>
				</ul>
				<Separator class="my-2" />
				<ul class="grid gap-3">
				  <li class="flex items-center justify-between">
					<span class="text-muted-foreground">Subtotal</span>
					<span>$299.00</span>
				  </li>
				  <li class="flex items-center justify-between">
					<span class="text-muted-foreground">Shipping</span>
					<span>$5.00</span>
				  </li>
				  <li class="flex items-center justify-between">
					<span class="text-muted-foreground">Tax</span>
					<span>$25.00</span>
				  </li>
				  <li class="flex items-center justify-between font-semibold">
					<span class="text-muted-foreground">Total</span>
					<span>$329.00</span>
				  </li>
				</ul>
			  </div>
			  <Separator class="my-4" />
			  <div class="grid grid-cols-2 gap-4">
				<div class="grid gap-3">
				  <div class="font-semibold">Shipping Information</div>
				  <address class="grid gap-0.5 not-italic text-muted-foreground">
					<span>Liam Johnson</span>
					<span>1234 Main St.</span>
					<span>Anytown, CA 12345</span>
				  </address>
				</div>
				<div class="grid auto-rows-max gap-3">
				  <div class="font-semibold">Billing Information</div>
				  <div class="text-muted-foreground">Same as shipping address</div>
				</div>
			  </div>
			  <Separator class="my-4" />
			  <div class="grid gap-3">
				<div class="font-semibold">Customer Information</div>
				<dl class="grid gap-3">
				  <div class="flex items-center justify-between">
					<dt class="text-muted-foreground">Customer</dt>
					<dd>Liam Johnson</dd>
				  </div>
				  <div class="flex items-center justify-between">
					<dt class="text-muted-foreground">Email</dt>
					<dd>
					  <a href="mailto:liam@acme.com">liam@acme.com</a>
					</dd>
				  </div>
				  <div class="flex items-center justify-between">
					<dt class="text-muted-foreground">Phone</dt>
					<dd>
					  <a href="tel:+1234567890">+1 234 567 890</a>
					</dd>
				  </div>
				</dl>
			  </div>
			  <Separator class="my-4" />
			  <div class="grid gap-3">
				<div class="font-semibold">Payment Information</div>
				<dl class="grid gap-3">
				  <div class="flex items-center justify-between">
					<dt class="flex items-center gap-1 text-muted-foreground">
					  <CreditCard class="h-4 w-4" />
					  Visa
					</dt>
					<dd>**** **** **** 4532</dd>
				  </div>
				</dl>
			  </div>
			</Card.Content>
			<Card.Footer class="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
			  <div class="text-xs text-muted-foreground">
				Updated <time dateTime="2023-11-23">November 23, 2023</time>
			  </div>
			  <Pagination.Root count={10} class="ml-auto mr-0 w-auto">
				<Pagination.Content>
				  <Pagination.Item>
					<Button size="icon" variant="outline" class="h-6 w-6">
					  <ChevronLeft class="h-3.5 w-3.5" />
					  <span class="sr-only">Previous Order</span>
					</Button>
				  </Pagination.Item>
				  <Pagination.Item>
					<Button size="icon" variant="outline" class="h-6 w-6">
					  <ChevronRight class="h-3.5 w-3.5" />
					  <span class="sr-only">Next Order</span>
					</Button>
				  </Pagination.Item>
				</Pagination.Content>
			  </Pagination.Root>
			</Card.Footer>
		  </Card.Root>
		</div>
	  </main>
	</div>
  </div>
  