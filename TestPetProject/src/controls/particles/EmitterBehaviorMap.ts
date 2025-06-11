import { BehaviorEntry } from "@pixi/particle-emitter";
import ParticleAtlasLoader from "app/loader/ParticleAtlasLoader";

export default class EmitterBehaviorMap {

  public readonly EMITTER_BEHAVIOR_MAP: Map<string, BehaviorEntry[]> = new Map<string, BehaviorEntry[]>([
    
      ["background", [
        {
          type: "moveSpeedStatic",
          config: {
            min: 500,
            max: 1700,
          },
        },
        {
          type: "scale",
          config: {
            scale: {
              list: [
                { time: 0, value: 1 },
                { time: 1, value: 1.2 },
              ],
            },
          },
        },
        {
          type: "rotation",
          config: {
            accel: 0,
            minSpeed: 0,
            maxSpeed: 0,
            minStart: 50,
            maxStart: 70,
          },
        },
        {
          type: "animatedRandom",
          config: {
            anims: [
              {
                framerate: 10,
                loop: false,
                textures:
                  ParticleAtlasLoader.getParticleTextures("leaves")
                ,
              },
            ],
          },
        },
        {
          type: "spawnShape",
          config: {
            type: "rect",
            data: { x: -800, y: -200, w: 2800, h: 200 },
          },
        },
      ],
    ]
    ])
}
