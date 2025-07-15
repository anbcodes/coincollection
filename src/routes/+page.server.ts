import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

import { unlink, writeFile } from 'fs/promises';

export const load: PageServerLoad = () => {
  // This function queries the sqlite database for the list of all the coins
  return {coins: db.prepare('SELECT * FROM coins').all() as Coin[]}; 
}

import type { Actions } from './$types';

export const actions = {
  rm: async (event) => {

    const formData = await event.request.formData();
    const id = formData.get('id')?.toString();
    if (!id) {
      throw new Error('ID is required');
    }
    // Delete the image file associated with the coin if it exists
    const coin = db.prepare('SELECT image FROM coins WHERE id = ?').get(id) as Coin | undefined;
    if (coin && coin.image) {
      const imagePath = `data/images/${coin.image}`;
      try {
        await unlink(imagePath); // Delete the image file
      } catch (error) {
        console.error(`Failed to delete image file: ${error}`);
      }
    }
    // Delete the coin with the specified ID from the database
    db.prepare('DELETE FROM coins WHERE id = ?').run(id);
  },
	add: async (event) => {
    const formData = await event.request.formData();
    const type = formData.get('type')?.toString() || 'NULL';
    const country = formData.get('country')?.toString() || 'NULL';
    const year = formData.get('year')?.toString() || 'NULL';
    const mint = formData.get('mint')?.toString() || 'NULL';
    const notes = formData.get('notes')?.toString() || 'NULL';
    const imagef = formData.get('imagef') as File | null;
    const imageb = formData.get('imageb') as File | null;
    if (!(imagef instanceof File) || !(imageb instanceof File)) {
      throw new Error('Image must be a file');
    }

    // Insert the new coin into the database
    let result = db.prepare('INSERT INTO coins (type, country, year, mint, notes) VALUES (?, ?, ?, ?, ?)')
      .run(type, country, year, mint, notes);

    // If an image is provided, save it to the public/images directory
      const nameF = `${result.lastInsertRowid}-f.${imagef.name.split('.').pop()}`;
      const imagePathF = `data/images/${nameF}`;
      const bufferF = await imagef.arrayBuffer();
      await writeFile(imagePathF, Buffer.from(bufferF));

      const nameB = `${result.lastInsertRowid}-b.${imageb.name.split('.').pop()}`;
      const imagePathB = `data/images/${nameB}`;
      const bufferB = await imageb.arrayBuffer();
      await writeFile(imagePathB, Buffer.from(bufferB));

      // Update the database with the image image
      db.prepare('UPDATE coins SET imagef = ?, imageb = ? WHERE id = ?')
        .run(nameF, nameB, result.lastInsertRowid);
	}
} satisfies Actions;

