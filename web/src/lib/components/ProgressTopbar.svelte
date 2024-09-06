<!-- .\src\lib\components\ProgressTopbar.svelte -->
<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { navigating } from '$app/stores';
  
	const progress = tweened(0, { easing: cubicOut });
  
	$: {
	  if ($navigating) {
		progress.set(0.7, { duration: 5000 });
	  } else {
		progress.set(1, { duration: 500 }).then(() => {
		  progress.set(0, { duration: 0 });
		});
	  }
	}
  </script>
  
  <div class="progress-bar shadow-lg">
	<div class="progress-sliver rounded-r-2xl" style={`width: ${$progress * 100}%;`} />
	<div class="progress-glow" style={`width: ${$progress * 100}%;`} />
  </div>
  
  <style>
	.progress-bar {
	  z-index: 50;
	  position: fixed;
	  top: 0;
	  left: 0;
	  height: 6px;
	  width: 100%;
	  overflow: hidden;
	}
  
	.progress-sliver {
	  height: 100%;
	  background: linear-gradient(to right, #14b8a6, #2ecc71);
	  position: relative;
	  z-index: 1;
	}
  
	.progress-glow {
	  position: absolute;
	  top: 0;
	  left: 0;
	  height: 100%;
	  width: 100%;
	  background: linear-gradient(to right, rgba(20, 184, 166, 0.4), rgba(46, 204, 113, 0.4));
	  filter: blur(10px);
	  transform: translateX(-100%);
	  animation: glowAnimation 2s infinite;
	}
  
	@keyframes glowAnimation {
	  0% {
		transform: translateX(-100%);
	  }
	  100% {
		transform: translateX(100%);
	  }
	}
  </style>