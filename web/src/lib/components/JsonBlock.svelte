<!-- .\src\lib\components\JsonBlock.svelte -->
<script lang="ts">
  export let data: any;

  // Function to safely escape HTML characters
  function escapeHtml(unsafe: string): string {
    return unsafe.replace(/[&<>"']/g, function (match) {
      switch (match) {
        case '&':
          return '&amp;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '"':
          return '&quot;';
        case "'":
          return '&#039;';
        default:
          return match;
      }
    });
  }

  // Function to stringify data and apply syntax highlighting
  function stringifyAndHighlight(data: any): string {
    try {
      const json = (function stringify(value: any): string {
        if (value === null) return 'null';
        if (typeof value === 'number' || typeof value === 'boolean') return String(value);
        if (typeof value === 'string') return `"${value.replace(/"/g, '\\"')}"`;
        if (Array.isArray(value)) return `[${value.map(stringify).join(', ')}]`;
        if (typeof value === 'object' && value !== null) {
          return `{\n${Object.keys(value).map(key => `  "${key}": ${stringify(value[key])}`).join(',\n')}\n}`;
        }
        return 'null';
      })(data);

      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:\s*)?|true|false|null|\b\d+\b)/g, function (match) {
        let cls = 'number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'key';
          } else {
            cls = 'string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'boolean';
        } else if (/null/.test(match)) {
          cls = 'null';
        }
        return `<span class="${cls}">${escapeHtml(match)}</span>`;
      });
    } catch (error) {
      console.error('Error stringifying data:', error);
      return '<span class="error">Error stringifying data</span>';
    }
  }
</script>

<style>
  pre {
    padding: 10px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    font-family: monospace;
    overflow: auto;
    width: 100%;
    height: 100%;
    max-height: 90vh; /* Adjust based on your requirement */
  }
  .key {
    color: #d14;
  }
  .string {
    color: #1a1aa6;
  }
  .number {
    color: #008000;
  }
  .boolean {
    color: #a52a2a;
  }
  .null {
    color: #b5a642;
  }
  .error {
    color: #ff0000;
  }
</style>

<pre>{@html stringifyAndHighlight(data)}</pre>
