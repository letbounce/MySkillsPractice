import { Container } from "pixi.js";
import ParticleEmitterControl from "./ParticleEmitterControl";
import { EmitterConfigV3 } from "@pixi/particle-emitter";
import { ResizableControl } from "../extensions/OnResizeExtension";
import { GameSize } from "app/model/GameModel";
import EmitterBehaviorMap from "./EmitterBehaviorMap";

export default class BackgroundParticleControl
  extends ParticleEmitterControl
  implements ResizableControl
{
  constructor() {
    const behaviorMap: EmitterBehaviorMap = new EmitterBehaviorMap();
    const backgroundParticleConfig: EmitterConfigV3 = {
      lifetime: { min: 20, max: 20 },
      frequency: 1,
      particlesPerWave: 5,
      maxParticles: 100,
      pos: { x: 0, y: 0 },
      autoUpdate: true,
      behaviors: behaviorMap.EMITTER_BEHAVIOR_MAP.get("background")!,
    };

    super(new Container(), backgroundParticleConfig);
  }

  resize(data: GameSize): void {
    this.emitter?.updateOwnerPos(0, 0);
  }
}
