import {Texture} from "@pixi/core";
import {Assets} from "@pixi/assets";

export default class StrictResourcesHelper {
    static getAnTexture(textureId: string): Texture | null {
        return Assets.cache.has(textureId) ? Assets.cache.get(textureId) : null;
    }

    static getSomeTexture(textureId: string): Texture {
        return Assets.get(textureId);
    }

    static getTexture(spriteSheetId: string, textureId: string): Texture {
        return Assets.get(spriteSheetId).texture[textureId];
    }

    static getSingleTexture(textureId: string): Texture {
        return Assets.get(textureId);
    }

    static async getAnimation(spritesheetId: string, animationId: string): Promise<Texture[]> {
        return (await Assets.load(spritesheetId)).animation[animationId];
    }
}
