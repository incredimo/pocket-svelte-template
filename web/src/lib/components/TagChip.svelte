<!-- .\src\lib\components\TagChip.svelte -->
<!-- TagChip -->
<!-- Small colorfull pills with nice font and vibrant colors -->
<script>
  export let color = 'blue';
  export let label = 'Tag';
</script>


<span class="tag-chip" style="background-color: {color}">
  {label}
</span>

<style>

    /* good fornts for small text */

    @import url('https://fonts.googleapis.com/css2?family=Saira:wght@500&display=swap');
  
  .tag-chip {
    display: inline-block;
    padding: 0.1rem 0.3rem;    
    border-radius: 0.3rem;
    color: white;
    font-size: 0.7rem;
    text-transform: uppercase;
    font-family: 'Saira', sans-serif;
    text-align: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.571);
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.338);
    margin: 0.1rem;
    transition: all 200ms;
    
  }

    .tag-chip:hover {
        cursor: pointer;
        
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.486);
    }



</style>
