/** Statistic. */
export class Statistic {

  /** Play count. */
  public readonly gamesPlayed: number;

  /** User ID. */
  public readonly userId: number;

  public constructor(data: Statistic) {
    this.gamesPlayed = data.gamesPlayed;
    this.userId = data.userId;
  }
}
