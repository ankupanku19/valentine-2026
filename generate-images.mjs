import fs from 'fs';
import path from 'path';

const outputDir = './public/images';

const images = [
    {
        name: 'rose-day.png',
        prompt: 'Ultra realistic romantic couple portrait, young Indian man short curly dark hair trimmed beard, young Indian woman dark hair, dimly lit bedroom warm amber lamplight, he holds single blood-red rose between them, foreheads touching tenderly, noses almost brushing, her cheeks flushed warm, his gaze loving and intense, warm sidelight carving soft shadows on cheekbones, every skin detail visible, tight portrait framing chest to head, cinematic 85mm f1.4 shallow depth of field, photorealistic'
    },
    {
        name: 'propose-day.png',
        prompt: 'Ultra realistic emotional marriage proposal scene, young Indian man short curly dark hair beard kneeling, young Indian woman dark hair standing hands covering mouth in joyful surprise, tears of happiness glistening, beautiful candlelit room scattered candles warm flickering glow, he presents sparkling diamond ring in velvet box, vulnerable loving expression on his face, golden candlelight dancing across their faces, cinematic portrait 50mm lens, photorealistic hyper detailed'
    },
    {
        name: 'chocolate-day.png',
        prompt: 'Ultra realistic romantic couple sharing chocolate, young Indian man short curly dark hair trimmed beard, young Indian woman dark hair, cozy midnight kitchen warm amber lighting from open fridge, sitting close together on counter, he holds piece of dark chocolate near her lips playfully, she smiles reaching for it with teasing expression, warm golden light highlighting their faces, intimate playful atmosphere, box of chocolates nearby, cinematic 50mm portrait, photorealistic'
    },
    {
        name: 'teddy-day.png',
        prompt: 'Ultra realistic cozy couple portrait on plush sofa, young Indian man short curly dark hair beard, young Indian woman dark hair, dark living room warm firelight glow, she curled up in his lap cuddling close, large cream teddy bear between them, her face nestled against his neck contentedly, his arms wrapped protectively around her, firelight dancing over their faces creating warm shadows, peaceful intimate moment, cinematic 85mm portrait, photorealistic'
    },
    {
        name: 'promise-day.png',
        prompt: 'Ultra realistic intimate couple portrait moonlit balcony city lights below, young Indian man short curly dark hair trimmed beard, young Indian woman dark hair, standing pressed close together, hands interlocked tightly at chest level fingers intertwined, foreheads touching, noses touching, eyes gazing deeply into each other, moonlight and warm indoor light illuminating their faces, emotional tender moment, cinematic 50mm portrait, photorealistic'
    },
    {
        name: 'hug-day.png',
        prompt: 'Ultra realistic emotional couple embrace photograph, young Indian man short curly dark hair beard, young Indian woman dark hair petite, intense full embrace hug, his arms wrapped around her protectively, her face buried in his chest with peaceful expression eyes closed, warm soft bedside lamplight, tender private moment of comfort and love, every detail visible natural skin textures, cinematic 85mm portrait, photorealistic'
    },
    {
        name: 'kiss-day.png',
        prompt: 'Ultra realistic romantic couple kiss photograph, young Indian man short curly dark hair trimmed beard, young Indian woman dark hair, in a moody velvet-dark alcove, intimate passionate kiss foreheads touching lips meeting tenderly, her hands in his hair, his hand gently cupping her face, dramatic warm sidelight chiaroscuro lighting, flushed cheeks, eyes closed in bliss, deeply romantic atmosphere, cinematic 85mm f1.4 portrait, photorealistic'
    }
];

async function generateImage(imageInfo) {
    const encoded = encodeURIComponent(imageInfo.prompt);
    const seed = Math.floor(Math.random() * 100000);
    const url = `https://image.pollinations.ai/prompt/${encoded}?width=768&height=1024&model=flux&nologo=true&seed=${seed}`;
    const filepath = path.join(outputDir, imageInfo.name);

    console.log(`⏳ Generating: ${imageInfo.name}...`);
    try {
        const response = await fetch(url, {
            redirect: 'follow',
            signal: AbortSignal.timeout(180000)
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const buffer = Buffer.from(await response.arrayBuffer());

        if (buffer.length < 1000) {
            throw new Error(`Image too small (${buffer.length} bytes), likely an error`);
        }

        fs.writeFileSync(filepath, buffer);
        console.log(`✅ Saved: ${imageInfo.name} (${(buffer.length / 1024).toFixed(0)} KB)`);
    } catch (err) {
        console.error(`❌ Failed: ${imageInfo.name} — ${err.message}`);
    }

    // Small delay between requests to avoid rate limiting
    await new Promise(r => setTimeout(r, 3000));
}

console.log('🎨 Generating Valentine Day images via Pollinations.ai (Flux model)...\n');

for (const img of images) {
    await generateImage(img);
}

console.log('\n🎉 Done!');
