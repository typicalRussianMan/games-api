import { selectProfile } from '../controller/database/sql';
import { allAsync } from '../controller/database/utils/all-async';
import { ProfileDb } from '../database-models/profile.db';
import { profileMapper } from '../mappers/profile.mapper';

import { AchievementFull } from './achievement-full';
import { User } from './user';

/** Profile. */
export class Profile extends User {

  /** Achievements. */
  public readonly achievements: readonly AchievementFull[];

  public constructor(data: Profile) {
    super(data);
    this.achievements = data.achievements;
  }

  /**
   * Gets profile by user id.
   * @param id ID.
   */
  public static async getProfileById(id: number): Promise<Profile> {
    const [profile] = await allAsync<ProfileDb>(selectProfile, [id]);
    return profileMapper.toModel(profile);
  }
}
