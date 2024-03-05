import { AchievementFullDb } from '../database-models/achievement-full.db';
import { ProfileDb } from '../database-models/profile.db';
import { Profile } from '../models/profile';

import { achievementFullMapper } from './achievement-full.mapper';
import { IMapperToModel } from './mapper';
import { userRoleMapper } from './user-role.mapper';

/** Profile mapper. */
class ProfileMapper implements IMapperToModel<Profile, ProfileDb> {

  /** @inheritdoc */
  public toModel(data: ProfileDb): Profile {
    const achievements = typeof data.achievements === 'string' ?
      JSON.parse(data.achievements) as AchievementFullDb[] :
      data.achievements;
    return new Profile({
      achievements: achievements.map(achievementFullMapper.toModel),
      avatar: data.avatar,
      email: data.email,
      firstName: data.first_name,
      id: data.id,
      lastName: data.last_name,
      role: userRoleMapper.toModel(data.role),
    });
  }
}

/** Profile mapper instance. */
export const profileMapper = new ProfileMapper();
