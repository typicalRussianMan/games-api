import { AchievementFullDb } from '../database-models/achievement-full.db';
import { AchievementFull } from '../models/achievement-full';

import { IMapperToModel } from './mapper';

/** Achievement mapper. */
class AchievementFullMapper implements IMapperToModel<AchievementFull, AchievementFullDb> {

  /** @inheritdoc */
  public toModel(data: AchievementFullDb): AchievementFull {
    return new AchievementFull({
      description: data.description,
      id: data.id,
      isCollected: data.is_collected === 1,
      title: data.title,
    });
  }
}

/** Achievement full mapper instance. */
export const achievementFullMapper = new AchievementFullMapper();
