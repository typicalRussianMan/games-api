/** Mapper from DB to domain. */
export type IMapperToModel<TModel, TDb, TName extends string = 'model'> = {

  /** Maps database to domain. */
  [K in `to${Capitalize<TName>}`]: (data: TDb) => TModel;
};

/** Mapper from domain to DB. */
export type IMapperFromModel<TModel, TDb, TName extends string = 'model'> = {

  /** Maps domain to database model. */
  [K in `from${Capitalize<TName>}`]: (data: TModel) => TDb;
};

/** Mapper. */
export type IMapper<TModel, TDb, TName extends string = 'model'> =
  IMapperFromModel<TModel, TDb, TName> &
  IMapperToModel<TModel, TDb, TName>;
