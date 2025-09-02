import { Emitter, EmitterConfigV3 } from "@pixi/particle-emitter";
import MainControl from "../MainControl";
import { Container } from "pixi.js";

export default class ParticleEmitterControl extends MainControl {
  protected emitter: Emitter | undefined;
  private particleConfig: EmitterConfigV3;

  public constructor(container: Container, particleConfig: EmitterConfigV3) {
    super(container);
    this.particleConfig = particleConfig;
    this.compose();
  }

  protected compose(): void {
    this.emitter = new Emitter(this.container, this.particleConfig);
    this.emitter.autoUpdate = true;
  }

  public start(): void {
    if (this.emitter) this.emitter.emit = true;
  }

  public stop(): void {
    if (this.emitter) this.emitter.emit = false;
  }

  override dispose(): void {
    if (this.emitter) {
      this.emitter.destroy();
      this.emitter = undefined;
    }
    super.dispose();
  }
}
