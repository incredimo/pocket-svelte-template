<!-- .\src\lib\components\IconTag.svelte -->
<!-- LocationTag.svelte -->
<script>
  export let label = 'Location';
</script>

<div class="flex items-center rounded-lg border-1.5 border-slate-200 px-2 py-1 h-6">
  <div class="icon-slot h-4 w-4 overflow-hidden flex items-center justify-center">
    <slot></slot>
  </div>
  <span class="text-gray-800 text-[11px] font-medium uppercase ml-1">{label}</span>
</div>

<style>
  .icon-slot {
    height: 1rem; /* 16px */
    width: 1rem; /* 16px */
    margin-right: 0.25rem; /* 4px */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-slot ::slotted(*) {
    height: 1rem; /* Ensure slotted content fits within the slot */
    width: 1rem; /* Ensure slotted content fits within the slot */
  }
</style>
