import { handler } from './build/handler.js';
import express from 'express';
import * as path from 'path';

// Get absolute path to assets folder, "./data/assets" might work fine and you can remove this line/dep
const assetsPath = './data/images';

const app = express();

// Serve your "data/assets" folder
app.use('/images', express.static(assetsPath))

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);


app.listen(+(process.argv[2] ?? 5174), () => {
    console.log('listening on port ' + (process.argv[2] ?? 5174));
});

