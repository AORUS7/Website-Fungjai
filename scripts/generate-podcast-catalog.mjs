import { readdir, stat, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const videoRoot = path.join(root, 'public/video');
const groups = [
  ['love', 'loves', 'ความรัก'], ['friend', 'friends', 'เพื่อน'],
  ['family', 'family', 'ครอบครัว'], ['study', 'study', 'การเรียน'],
  ['work', 'works', 'การทำงาน'],
];
const catalog = [];
const warnings = [];
for (const [category, folder, label] of groups) {
  const originals = (await readdir(path.join(videoRoot, folder)).catch(() => []))
    .filter((name) => /\.(mp4|mov|m4v|webm|m4a)$/i.test(name));
  const webFiles = (await readdir(path.join(videoRoot, 'web', folder)).catch(() => []))
    .filter((name) => /\.mp4$/i.test(name));
  // Clones do not contain the ignored MOV sources. Keep their web copies discoverable.
  const files = [...originals, ...webFiles.filter((name) =>
    !originals.some((original) => path.parse(original).name === path.parse(name).name)
  )].sort((a, b) => a.localeCompare(b, 'th', { numeric: true }));
  for (const name of files) {
    const relative = `${folder}/${name}`;
    const converted = `web/${folder}/${name.replace(/\.[^.]+$/, '.mp4')}`;
    const hasConverted = await stat(path.join(videoRoot, converted)).then(() => true, () => false);
    const selected = hasConverted ? converted : relative;
    catalog.push({
      id: `${folder}/${path.parse(name).name}`, category,
      title: path.parse(name).name.replace(/^เรื่องที่\s*\d+\s*/, '').replace(/_$/, '').trim(),
      video: `/video/${selected.split('/').map(encodeURIComponent).join('/')}`,
      kind: /\.m4a$/i.test(name) ? 'audio' : 'video',
      source: originals.includes(name) ? relative : converted,
    });
    if (/\.mov$/i.test(name) && !hasConverted) warnings.push(`ยังไม่มี MP4: ${relative}`);
  }
  console.log(`${label}: ${files.length} ตอน`);
}
if (warnings.length && process.argv.includes('--require-web')) {
  throw new Error(`ต้องแปลงเป็น MP4 ก่อน build:\n${warnings.join('\n')}`);
}
await writeFile(path.join(root, 'src/data/podcast-media.json'), `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`รวม ${catalog.length} ตอน`);
for (const warning of warnings) console.warn(warning);
