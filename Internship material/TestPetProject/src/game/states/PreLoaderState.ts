import {State} from "app/stateMachine/State";
import {TGameStates} from "app/game/states/TGameStates";
import {Assets} from "@pixi/assets";
import SpineLoader from "app/loader/SpineLoader";
import ParticleAtlasLoader from "app/loader/ParticleAtlasLoader";

export default class PreLoaderState extends State<TGameStates> {
    async run() {
        await Promise.all([
            Assets.load("assets/atlases/initial.json"),
            ParticleAtlasLoader.loadParticleAtlas("leaves", "assets/atlases/particles.json"),
            SpineLoader.preLoad(),
        ]);
        return this;
    }

    async deactivate(): Promise<void> {
        const elements = document.getElementsByClassName("spinner-box");
        if (elements.length > 0) {
            elements[0].parentNode?.removeChild(elements[0]);
        }
        await super.deactivate();
    }
}
