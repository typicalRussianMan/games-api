import { Achievement } from './achievement';

/** Achievement full. */
export class AchievementFull extends Achievement {

  /** Whether if achievement is collected. */
  public readonly isCollected: boolean;

  public constructor(data: AchievementFull) {
    super(data);
    this.isCollected = data.isCollected;
  }
}
