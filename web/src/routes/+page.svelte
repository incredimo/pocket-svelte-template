<!-- .\src\routes\+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import {
	  Search,
	  Recycle,
	  ShieldCheck,
	  Truck,
	  Users,
	  HelpCircle,
	  Award,
	  BarChart
	} from 'lucide-svelte/icons';


	import { Button } from '$lib/components/ui/button';
	import Earth from '$lib/components/Banner.svelte';
  
	let animateHeader = false;
	let animateStats = false;
	let animateFeatures = false;
	let animateTestimonials = false;
  
	function handleScroll() {
	  const scrollPosition = window.scrollY;
	  const headerHeight = 600;
	  const statsHeight = 1200;
	  const featuresHeight = 1800;
	  const testimonialsHeight = 2400;
  
	  if (scrollPosition > headerHeight) {
		animateHeader = true;
	  }
  
	  if (scrollPosition > statsHeight) {
		animateStats = true;
	  }
  
	  if (scrollPosition > featuresHeight) {
		animateFeatures = true;
	  }
  
	  if (scrollPosition > testimonialsHeight) {
		animateTestimonials = true;
	  }
	}
  
	onMount(() => {
	  window.addEventListener('scroll', handleScroll);
	});
  </script>
  
  <div class="min-h-screen bg-white">
	<main>
	  <section class="hero bg-gray-100 py-32">
		<div class="mx-auto max-w-7xl px-4 sm:px-6">
		  <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
			<div class="flex flex-col justify-center">
			  <h1  class="text-4xl font-semibold text-gray-800 sm:text-4xl text-left">
				Sustainable Scrap Management for a Greener Future
			  </h1>
			  <p class="mt-4 max-w-xl text-md text-gray-600 sm:text-xl text-left">
				EcoScrap is a digital platform that connects buyers and sellers of scrap materials, promoting sustainable practices and responsible recycling in the UAE.
			</p>
			  <div class="mt-8 max-w-md {animateHeader ? 'animate-fade-in-up animate-delay-500' : ''}">
				<Button >Get Started</Button>
			  </div>
			</div>
			<div class="flex items-center justify-center">
			<Earth />
			</div>
		  </div>
		</div>
	  </section>
  
	  <section class="stats bg-white py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6">
		  <h2 class="text-3xl font-semibold text-gray-800 text-center mb-8">
			Why Choose Ecoscrap.ae?
		  </h2>
		  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg bg-white p-6 shadow-md">
			  <ShieldCheck class="h-6 w-6 text-green-600 mb-2" />
			  <h3 class="text-lg font-semibold text-gray-800">Secure and Trusted</h3>
			  <p class="mt-2 text-gray-600">
				Our platform uses advanced security measures and verifies all participants, ensuring a safe and reliable trading environment.
			  </p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-md">
			  <Truck class="h-6 w-6 text-green-600 mb-2" />
			  <h3 class="text-lg font-semibold text-gray-800">
				Efficient Logistics Solutions
			  </h3>
			  <p class="mt-2 text-gray-600">
				We offer optimized logistics solutions for scrap transportation, ensuring timely and cost-effective deliveries across the UAE.
			  </p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-md">
			  <Users class="h-6 w-6 text-green-600 mb-2" />
			  <h3 class="text-lg font-semibold text-gray-800">
				Inclusive Community
			  </h3>
			  <p class="mt-2 text-gray-600">
				Our platform fosters a diverse and inclusive community of scrap traders, promoting collaboration and knowledge sharing.
			  </p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-md">
			  <Recycle class="h-6 w-6 text-green-600 mb-2" />
			  <h3 class="text-lg font-semibold text-gray-800">
				Eco-Friendly Practices
			  </h3>
			  <p class="mt-2 text-gray-600">
				We prioritize sustainable practices and ensure that all scrap materials are recycled responsibly, minimizing environmental impact.
			  </p>
			</div>
		  </div>
		</div>
	  </section>
  
	  <section class="features bg-gray-100 py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6">
		  <h2 class="text-3xl font-semibold text-gray-800 text-center mb-12">
			Our Unique Features
		  </h2>
		  <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 {animateFeatures ? 'animate-fade-in-up' : ''}">
			<div class="rounded-lg bg-white p-6 shadow-md">
			  <div class="mb-4 flex items-center justify-center">
				<HelpCircle class="h-16 w-16 text-green-600" />
			  </div>
			  <h3 class="text-xl font-semibold text-gray-800">Smart Matching</h3>
			  <p class="mt-2 text-gray-600">
				Our intelligent algorithm matches buyers and sellers based on their specific needs and preferences, ensuring efficient and mutually beneficial transactions.
			  </p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-md">
			  <div class="mb-4 flex items-center justify-center">
				<Award class="h-16 w-16 text-green-600" />
			  </div>
			  <h3 class="text-xl font-semibold text-gray-800">Transparent Pricing</h3>
			  <p class="mt-2 text-gray-600">
				We ensure fair and transparent pricing for all scrap materials, promoting trust and confidence in the market.
			  </p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-md">
			  <div class="mb-4 flex items-center justify-center">
				<BarChart class="h-16 w-16 text-green-600" />
			  </div>
			  <h3 class="text-xl font-semibold text-gray-800">Analytics and Insights</h3>
			  <p class="mt-2 text-gray-600">
				Our platform provides valuable analytics and insights into market trends, helping you make informed decisions and stay ahead of the competition.
			  </p>
			</div>
		  </div>
		</div>
	  </section>
  
	  <section class="cta bg-green-600 py-16">
		<div class="mx-auto max-w-7xl px-4 sm:px-6">
		  <div class="text-center">
			<h2 class="text-3xl font-semibold text-white mb-4">
			  Join the Scrap Revolution Today
			</h2>
			<p class="text-lg text-white mb-8">
			  Sign up now and experience the future of scrap trading in the UAE.
			</p>
			<div class="flex justify-center">
			  <Button class="bg-white text-green-600 hover:bg-gray-100">Get Started</Button>
			</div>
		  </div>
		</div>
	  </section>
	</main>
  </div>
  
  <style>
	.animate-fade-in-up {
	  animation: fadeInUp 1s ease-out;
	}
  
	.animate-delay-200 {
	  animation-delay: 0.2s;
	}
  
	.animate-delay-500 {
	  animation-delay: 0.5s;
	}
  
	.animate-delay-700 {
	  animation-delay: 0.7s;
	}
  
	@keyframes fadeInUp {
	  from {
		opacity: 0;
		transform: translateY(20px);
	  }
	  to {
		opacity: 1;
		transform: translateY(0);
	  }
	}
  </style>
  