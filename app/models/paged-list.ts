
/** Paged list. */
export class PagedList<T> {

  /** Offset. */
  public readonly offset: number;

  /** Limit. */
  public readonly limit: number;

  /** Items. */
  public readonly items: readonly T[];

  public constructor(data: PagedList<T>) {
    this.items = data.items;
    this.limit = data.limit;
    this.offset = data.offset;
  }
}
