const {exec} = require("child_process");
const fs = require("fs");

const getImgSize = (src) => {
    return new Promise((resolve, reject) => {
        const str = `identify -format "[%w, %h]" ${src}`;
        exec(str, (err, stdout, stderr) => {
            if (err || stderr) {
                console.log(err, stderr);
                reject();
            }
            resolve(JSON.parse(stdout));
        });
    });
};

const blurSymbols = async (avoidSymbols) => {
    const blur = 50;
    const extent = 100;
    const src = "resources/origin.assets/symbols/";
    const files = fs.readdirSync(src);
    await Promise.all(
        files
            .filter(file => !fs.lstatSync(`${src}${file}`).isDirectory())
            .filter(file => !avoidSymbols.includes(file))
            .map(async file => {
                console.log(file);
                // await blurSymbol({blur, extent}, file);
                await blurSymbol({ blur, extent }, file);

            }),
    );
};

const blurSymbol = async (config, filename) => {
    const src = `resources/origin.assets/symbols/${filename}`;
    const [sourceW, sourceH] = await getImgSize(src);
    const { blur, extent } = config;
    const outWidth = sourceW;
    const outHeight = sourceH + (extent * 2);

    const out = `resources/origin.assets/symbols/blur/${filename}`;
    const str = `magick "${src}" -background none -gravity Center -extent ${outWidth}x${outHeight} -motion-blur 0x${blur}+90 +repage "${out}"`;


    console.log(str);
    return new Promise((resolve, reject) => {
        exec(str, (err, stdout, stderr) => {
            if (err || stderr) {
                console.log(err, stderr);
                reject();
                return;
            }
            resolve();
        });
    });
};


void blurSymbols(['blank.png']);
