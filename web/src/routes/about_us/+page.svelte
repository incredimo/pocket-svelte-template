<!-- .\src\routes\about_us\+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Globe, ShieldCheck, Layers, Heart, BarChart2, Briefcase, Info } from 'lucide-svelte/icons';
	import { Button } from '$lib/components/ui/button/index.js';
  
	let animateHeader = false;
	let animateStory = false;
	let animateValues = false;
	let animateMission = false;
	let animateStats = false;
  
	function handleScroll() {
	  const scrollPosition = window.scrollY;
	  const headerHeight = 600;
	  const storyHeight = 1200;
	  const valuesHeight = 1800;
	  const missionHeight = 2400;
	  const statsHeight = 3000;
  
	  if (scrollPosition > headerHeight) {
		animateHeader = true;
	  }
  
	  if (scrollPosition > storyHeight) {
		animateStory = true;
	  }
  
	  if (scrollPosition > valuesHeight) {
		animateValues = true;
	  }
  
	  if (scrollPosition > missionHeight) {
		animateMission = true;
	  }
  
	  if (scrollPosition > statsHeight) {
		animateStats = true;
	  }
	}
  
	onMount(() => {
	  window.addEventListener('scroll', handleScroll);
	});
  </script>
  
  <div class="min-h-screen bg-white">
	<main>
  
	  <!-- Title with background image and parallax effect -->
	  <section class="title bg-gray-900 py-48 relative" style="background-image: url('images/abu_dhabi.jpg'); background-size: cover; background-position: center; background-attachment: fixed;">
		<div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
		  <h1 class="text-5xl font-bold text-white sm:text-6xl md:text-5xl {animateHeader ? 'animate-fade-in-up' : ''}">
			A Little Bit About Us
		  </h1>
		</div>
		
	  </section>
  
	  <section class="hero bg-gray-50 py-32 transition-all duration-500" style="height: auto;">
		<div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<div class="flex flex-col justify-center">
			  <h2 class="text-3xl font-semibold text-gray-800 {animateHeader ? 'animate-fade-in-up' : ''}">
				Sustainable Scrap Management for a Greener Future
			  </h2>
			  <p class="mt-4 max-w-xl text-lg text-gray-600 sm:text-xl {animateHeader ? 'animate-fade-in-up animate-delay-200' : ''}">
				Ecoscrap.ae strives to provide a secure, transparent, and eco-friendly platform for scrap trading, fostering a sustainable and ethical marketplace.
				We prioritize environmental sustainability and ethical business practices while providing a seamless experience for scrap traders and recyclers.
				By leveraging the power of digital technology, we aim to revolutionize the scrap industry in the UAE and beyond.
				The platform is designed to facilitate secure transactions, promote recycling, and reduce waste, ultimately contributing to a greener future.
				At Ecoscrap.ae, we are committed to making a positive impact on the environment and the community by promoting sustainable practices and responsible waste management.
			  </p>
			</div>
			<div class="flex justify-center lg:justify-end">
			  <img src="images/scrap_yard.jpg" alt="Scrap Yard" class="h-96 w-96 object-cover rounded-lg shadow-lg" />
			</div>
		  </div>
		</div>
	  </section>
  
	  <section class="stats bg-gray-900 py-32">
		<div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		  <h2 class="text-3xl font-semibold text-white text-center mb-8 ">
			Where We Stand Today
		  </h2>
		  <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 text-center">
			<div class="rounded-lg bg-white p-6 shadow-md  animate-delay-200">
			  <BarChart2 class="h-12 w-12 text-green-600 mb-4 mx-auto" />
			  <h3 class="text-xl font-semibold text-gray-800">10 Million Tons</h3>
			  <p class="mt-2 text-gray-600">
				Scrap generated annually in the UAE.
			  </p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-md  animate-delay-400">
			  <BarChart2 class="h-12 w-12 text-green-600 mb-4 mx-auto" />
			  <h3 class="text-xl font-semibold text-gray-800">30%</h3>
			  <p class="mt-2 text-gray-600">
				Increase in recycling rates over the past decade.
			  </p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-md  animate-delay-600">
			  <BarChart2 class="h-12 w-12 text-green-600 mb-4 mx-auto" />
			  <h3 class="text-xl font-semibold text-gray-800">50%</h3>
			  <p class="mt-2 text-gray-600">
				Potential increase in scrap value with better management.
			  </p>
			</div>
			<div class="rounded-lg bg-white p-6 shadow-md  animate-delay-800">
			  <BarChart2 class="h-12 w-12 text-green-600 mb-4 mx-auto" />
			  <h3 class="text-xl font-semibold text-gray-800">20%</h3>
			  <p class="mt-2 text-gray-600">
				Reduction in carbon emissions with recycling.
			  </p>
			</div>
		  </div>
		</div>
	  </section>
  
	  <section class="story bg-white py-32">
		<div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
			<div class="flex justify-center lg:justify-start">
			  <img src="images/cracks_in_ground.jpg" alt="Our Story" class="h-96 w-96 object-cover rounded-lg shadow-lg" />
			</div>
			<div class="flex flex-col justify-center">
			  <h2 class="text-3xl font-semibold text-gray-800 {animateStory ? 'animate-fade-in-up' : ''}">
				Our Story
			  </h2>
			  <p class="mt-6 text-lg text-gray-600 mb-4 {animateStory ? 'animate-fade-in-up animate-delay-200' : ''}">
				Ecoscrap was conceived from a deep concern for the growing waste and inefficiency in the scrap industry. Our founders, seeing the potential for digital transformation, embarked on a journey to create a platform that would revolutionize scrap trading and management in the UAE.
			  </p>
			  <p class="text-lg text-gray-600 {animateStory ? 'animate-fade-in-up animate-delay-400' : ''}">
				Based in Masdar City, one of the most eco-friendly accelerator projects in the UAE, Ecoscrap.ae benefits from being at the forefront of sustainable innovation. This unique location provides us with the perfect environment to foster our mission of creating a greener future.
			  </p>
			</div>
		  </div>
		</div>
	  </section>
  
	  <section class="mission bg-gray-50 py-32">
		<div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
		  <h2 class="text-3xl font-semibold text-gray-800 mb-8 {animateMission ? 'animate-fade-in-up' : ''}">
			Our Mission
		  </h2>
		  <p class="text-lg text-gray-600 {animateMission ? 'animate-fade-in-up animate-delay-200' : ''}">
			Our mission is to provide a secure, transparent, and eco-friendly platform for scrap trading, fostering a sustainable and ethical marketplace.
		  </p>
		</div>
	  </section>
  
	  <section class="values bg-white py-32">
		<div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
		  <h2 class="text-3xl font-semibold text-gray-800 mb-12 {animateValues ? 'animate-fade-in-up' : ''}">
			Our Core Values
		  </h2>
		  <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg bg-gray-50 p-6 shadow-md {animateValues ? 'animate-fade-in-up animate-delay-200' : ''}">
			  <ShieldCheck class="h-12 w-12 text-green-600 mb-4 mx-auto" />
			  <h3 class="text-xl font-semibold text-gray-800">Security</h3>
			  <p class="mt-2 text-gray-600">
				Ensuring secure transactions with advanced security measures and verified participants.
			  </p>
			</div>
			<div class="rounded-lg bg-gray-50 p-6 shadow-md {animateValues ? 'animate-fade-in-up animate-delay-400' : ''}">
			  <Globe class="h-12 w-12 text-green-600 mb-4 mx-auto" />
			  <h3 class="text-xl font-semibold text-gray-800">Sustainability</h3>
			  <p class="mt-2 text-gray-600">
				Committed to eco-friendly practices that promote environmental sustainability.
			  </p>
			</div>
			<div class="rounded-lg bg-gray-50 p-6 shadow-md {animateValues ? 'animate-fade-in-up animate-delay-600' : ''}">
			  <Layers class="h-12 w-12 text-green-600 mb-4 mx-auto" />
			  <h3 class="text-xl font-semibold text-gray-800">Innovation</h3>
			  <p class="mt-2 text-gray-600">
				Continuously innovating to provide the best solutions for scrap management.
			  </p>
			</div>
			<div class="rounded-lg bg-gray-50 p-6 shadow-md {animateValues ? 'animate-fade-in-up animate-delay-800' : ''}">
			  <Heart class="h-12 w-12 text-green-600 mb-4 mx-auto" />
			  <h3 class="text-xl font-semibold text-gray-800">Community</h3>
			  <p class="mt-2 text-gray-600">
				Building a strong, inclusive community of like-minded individuals.
			  </p>
			</div>
		  </div>
		</div>
	  </section>
  
	  <section class="cta bg-green-600 py-16">
		<div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
		  <h2 class="text-3xl font-semibold text-white mb-4">
			Join Us in Making a Difference
		  </h2>
		  <p class="text-lg text-white mb-8">
			Be part of a community dedicated to sustainability and ethical practices in the scrap industry.
		  </p>
		  <Button class="bg-white text-green-600 hover:bg-gray-100">Contact Us</Button>
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
  
	.animate-delay-400 {
	  animation-delay: 0.4s;
	}
  
	.animate-delay-600 {
	  animation-delay: 0.6s;
	}
  
	.animate-delay-800 {
	  animation-delay: 0.8s;
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
  
	.title {
	  background-attachment: fixed;
	}
  </style>
  