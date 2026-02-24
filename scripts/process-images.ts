import sharp from "sharp";
import fs from "fs";
import path from "path";

const PORTFOLIO_DIR = path.join(process.cwd(), "app/portfolio");
const OUTPUT_DIR = path.join(process.cwd(), "public/photos");
const MANIFEST_PATH = path.join(process.cwd(), "lib/data/photo-manifest.json");

const WEB_MAX = 2400;
const THUMB_MAX = 800;
const WEB_QUALITY = 80;
const THUMB_QUALITY = 75;

interface PhotoManifest {
  [key: string]: {
    width: number;
    height: number;
    blurDataURL: string;
  };
}

// Map source dirs to output dirs
const DIR_MAP: Record<string, string> = {
  "1. Street & Architecture/1. Street photo": "street-architecture/street-photo",
  "2. Travel/1. Asia": "travel/asia-vietnam",
  "2. Travel/2. Australia & New-Zealand": "travel/australia-new-zealand",
  "2. Travel/3. France": "travel/france",
  "3. Portraits/1. Bremond Capela_s artist portraits ":
    "portraits/bremond-capela",
  "3. Portraits/2. Louis Mondonnet": "portraits/louis-mondonnet",
  "3. Portraits/5. Friends portraits": "portraits/friends",
  "4. Lifestyle-commercial/1. Romeo Stendman_s exhibition":
    "lifestyle-commercial/romeo-stendman",
  "4. Lifestyle-commercial/2. Cécile Mollon Deschamps_s website":
    "lifestyle-commercial/cecile-mollon-deschamps",
  "5. Projects/1. _Ecume_ exhibition/1. Photos": "projects/ecume",
  "5. Projects/2. Volcom x Nikon street photo contest/1. Photos":
    "projects/volcom-x-nikon",
};

function sanitizeFilename(name: string): string {
  const ext = path.extname(name).toLowerCase();
  const base = path.basename(name, path.extname(name));
  return (
    base
      .toLowerCase()
      .replace(/©️/g, "")
      .replace(/©/g, "")
      .replace(/@/g, "-")
      .replace(/[^a-z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") + (ext === ".tif" || ext === ".tiff" ? ".jpg" : ext)
  );
}

async function generateBlurPlaceholder(
  buffer: Buffer
): Promise<string> {
  const tiny = await sharp(buffer)
    .resize(10, 10, { fit: "inside" })
    .toFormat("png")
    .toBuffer();
  return `data:image/png;base64,${tiny.toString("base64")}`;
}

async function processImage(
  srcPath: string,
  outputDir: string,
  filename: string,
  manifest: PhotoManifest
) {
  const webDir = path.join(OUTPUT_DIR, outputDir);
  const thumbDir = path.join(OUTPUT_DIR, outputDir, "thumbs");
  fs.mkdirSync(webDir, { recursive: true });
  fs.mkdirSync(thumbDir, { recursive: true });

  const inputBuffer = fs.readFileSync(srcPath);
  const image = sharp(inputBuffer);
  const metadata = await image.metadata();
  const w = metadata.width || 0;
  const h = metadata.height || 0;

  // Web version
  const webPath = path.join(webDir, filename);
  if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
    await sharp(inputBuffer)
      .resize(WEB_MAX, WEB_MAX, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: WEB_QUALITY })
      .toFile(webPath);
  } else {
    await sharp(inputBuffer)
      .resize(WEB_MAX, WEB_MAX, { fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: WEB_QUALITY })
      .toFile(webPath);
  }

  // Thumbnail
  const thumbPath = path.join(thumbDir, filename);
  await sharp(inputBuffer)
    .resize(THUMB_MAX, THUMB_MAX, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: THUMB_QUALITY })
    .toFile(thumbPath);

  // Get processed dimensions
  const webMeta = await sharp(webPath).metadata();

  // Blur placeholder
  const blurDataURL = await generateBlurPlaceholder(inputBuffer);

  const publicPath = `/photos/${outputDir}/${filename}`;
  manifest[publicPath] = {
    width: webMeta.width || w,
    height: webMeta.height || h,
    blurDataURL,
  };

  console.log(`  ✓ ${publicPath}`);
}

async function main() {
  const manifest: PhotoManifest = {};
  const collectionsDir = path.join(PORTFOLIO_DIR, "2. Collections (portfolio)");

  console.log("Processing images...\n");

  for (const [srcSubdir, outDir] of Object.entries(DIR_MAP)) {
    const srcDir = path.join(collectionsDir, srcSubdir);
    if (!fs.existsSync(srcDir)) {
      console.log(`⚠ Skipping (not found): ${srcSubdir}`);
      continue;
    }

    const files = fs
      .readdirSync(srcDir)
      .filter((f) =>
        /\.(jpg|jpeg|tif|tiff|png|webp)$/i.test(f)
      );

    if (files.length === 0) {
      console.log(`⚠ Skipping (empty): ${srcSubdir}`);
      continue;
    }

    console.log(`\n📁 ${outDir} (${files.length} photos)`);

    for (const file of files) {
      const sanitized = sanitizeFilename(file);
      await processImage(
        path.join(srcDir, file),
        outDir,
        sanitized,
        manifest
      );
    }
  }

  // Write manifest
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\n✅ Done! ${Object.keys(manifest).length} images processed.`);
  console.log(`📄 Manifest saved to ${MANIFEST_PATH}`);
}

main().catch(console.error);
