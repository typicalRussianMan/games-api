import { AchievementFullDb } from './achievement-full.db';

import { UserDb } from './user.db';

/** Profile DB. */
export type ProfileDb = UserDb & {

  /** Achievements. */
  readonly achievements: string | AchievementFullDb[];
};
