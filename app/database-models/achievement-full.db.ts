/** Achievement full. */
export type AchievementFullDb = {

  /** ID. */
  readonly id: number;

  /** Title. */
  readonly title: string;

  /** Description. */
  readonly description: string;

  /** Whether is achievement collected. */
  readonly is_collected: 0 | 1;
};
