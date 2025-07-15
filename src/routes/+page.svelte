<script lang="ts"> 
	import type { PageProps } from './$types';
  let { data }: PageProps = $props();

  let years = new Array(2030 - 1700 + 1)
    .fill(0)
    .map((_, i) => (1700 + i)).reverse();
</script>

<main class="max-w-[600px] w-full mx-auto p-4">
  <h1 class="text-4xl text-center pb-4">Baumes Coins</h1>

  <form method="post" enctype="multipart/form-data" action="?/add" class="flex flex-col gap-2">
    <label for="type" class="label">Type</label>
    <select id="type" name="type" class="input" required>
      <option value="" disabled selected>Select a type</option>
      <option value="penny">Penny</option>
      <option value="nickel">Nickel</option>
      <option value="dime">Dime</option>
      <option value="quarter">Quarter</option>
      <option value="half-dollar">Half Dollar</option>
      <option value="dollar">Dollar</option>
      <option value="other">Other</option>
    </select>
    <label for="year" class="label">Year</label>
    <select id="year" name="year" class="input" required>
      <option value="" disabled selected>Select a year</option>
      {#each years as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
    <label for="mint" class="label">Mint</label>
    <select id="mint" name="mint" class="input">
      <option value="" selected>None</option>
      <option value="P">P (Philadelphia)</option>
      <option value="D">D (Denver)</option>
      <option value="S">S (San Francisco)</option>
      <option value="W">W (West Point)</option>
      <option value="CC">CC (Carson City)</option>
      <option value="O">O (New Orleans)</option>
      <option value="other">Other</option>
    </select>
    <label for="country" class="label">Country</label>
    <select id="country" name="country" class="input" required>
      <option value="USA" selected>USA</option>
      <option value="Canada">Canada</option>
      <option value="Mexico">Mexico</option>
      <option value="UK">UK</option>
      <option value="Australia">Australia</option>
      <option value="other">Other</option>
    </select>
    <label for="notes" class="label">Notes</label>
    <textarea id="notes" name="notes" class="input"></textarea>
    <label for="imagef" class="label">Front</label>
    <input type="file" id="imagef" name="imagef" accept="image/*" class="input" capture required>
    <label for="imageb" class="label">Back</label>
    <input type="file" id="imageb" name="imageb" accept="image/*" class="input" capture required>

    <button type="submit" class="btn">Add Coin</button>
  </form>

  {#if data.coins && data.coins.length > 0}
    <h2 class="text-3xl pt-10">Coins List</h2>
    <div class="overflow-x-scroll max-w-full">
      <table class="table table-xs md:table-md">
        <thead>
          <tr>
            <th>Type</th>
            <th>Year</th>
            <th>Mint</th>
            <th>Country</th>
            <th>Notes</th>
            <th>Front</th>
            <th>Back</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {#each data.coins as coin}
            <tr>
              <td>{coin.type}</td>
              <td>{coin.year}</td>
              <td>{coin.mint}</td>
              <td>{coin.country}</td>
              <td>{coin.notes}</td>
              <td><a href='/images/{coin.imagef}'>Front</a></td>
              <td><a href='/images/{coin.imageb}'>Back</a></td>
              <td>
                <form method="post" action="?/rm" class="inline">
                  <input type="hidden" name="id" value={coin.id}>
                  <button type="submit" class="btn btn-xs" onclick={(e) => {
                    if (!confirm('Are you sure you want to delete this coin?')) {
                      e.preventDefault();
                    }
                  }}>Del</button>
                </form>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <p>No coins added yet.</p>
  {/if}
</main>
