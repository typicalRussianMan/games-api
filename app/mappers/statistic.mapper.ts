import { StatisticDb } from '../database-models/statistic.db';
import { Statistic } from '../models/statistic';

import { IMapperToModel } from './mapper';

/** Statistic mapper. */
class StatisticMapper implements IMapperToModel<Statistic, StatisticDb> {

  /** @inheritdoc */
  public toModel(data: StatisticDb): Statistic {
    return new Statistic({
      gamesPlayed: data.games_played,
      userId: data.user_id,
    });
  }
}

/** Statistic mapper instance. */
export const statisticMapper = new StatisticMapper();
