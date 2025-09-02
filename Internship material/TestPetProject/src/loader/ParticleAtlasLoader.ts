import { Assets, Texture } from "pixi.js";

export default class ParticleAtlasLoader {
    private static PARTICLE_TEXTURE_MAP: Map<String, Map<String, Texture>> = new Map<String, Map<String, Texture>>();

    public static async loadParticleAtlas(alias: string, path: string): Promise<void> {
        const texturesObject:Object = (await Assets.load(path)).textures;
        
        ParticleAtlasLoader.PARTICLE_TEXTURE_MAP.set(alias, new Map(Object.entries(texturesObject)));
    }

    public static getParticleTextures(alias: string): Texture[] {
        if (!ParticleAtlasLoader.PARTICLE_TEXTURE_MAP.has(alias)) {
            throw new Error(`Textures for particle ${alias} are not presented in the map`)
            
        }
        return [...ParticleAtlasLoader.PARTICLE_TEXTURE_MAP.get(alias)!.values()];
    }
}