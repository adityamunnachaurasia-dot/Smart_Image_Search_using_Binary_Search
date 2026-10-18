
import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('uploads');
fs.mkdirSync(dir, { recursive: true });

const filenames = [
  'seed-lion-1.jpg',
  'seed-lion-2.jpg',
  'seed-lion-3.jpg',
  'seed-tiger-1.jpg',
  'seed-elephant.jpg',
  'seed-mtn-1.jpg',
  'seed-forest.jpg',
  'seed-ocean.jpg',
  'seed-desert.jpg',
  'seed-car-1.jpg',
  'seed-car-2.jpg',
  'seed-bike-1.jpg',
  'seed-scooter.jpg',
  'seed-laptop.jpg',
  'seed-phone.jpg',
  'seed-server.jpg',
  'seed-robot.jpg',
  'seed-pasta.jpg',
  'seed-cake.jpg',
  'seed-sushi.jpg',
  'seed-glass.jpg',
  'seed-church.jpg',
  'seed-bridge.jpg',
  'seed-interior.jpg',
];

async function main() {
  for (const name of filenames) {
    const url = `https://picsum.photos/seed/${encodeURIComponent(name)}/640/480`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const image = Buffer.from(await response.arrayBuffer());
      fs.writeFileSync(path.join(dir, name), image);
      console.log(`Downloaded: ${name}`);
    } catch (error) {
      console.error(`Failed: ${name} — ${error.message}`);
    }
  }
}

main();
