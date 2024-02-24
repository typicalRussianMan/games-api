
/** Paged list. */
export class PagedList<T> {

  /** Offset. */
  public readonly offset: number;

  /** Limit. */
  public readonly limit: number;

  /** Total item count. */
  public readonly totalCount: number;

  /** Items. */
  public readonly items: readonly T[];

  /** Just left it here. */
  public get meme(): undefined | string {
    if (this.items.length === 0) {
      return 'But nobody came...';
    }

    return undefined;
  }

  public constructor(data: PagedList<T>) {
    this.items = data.items;
    this.limit = data.limit;
    this.offset = data.offset;
    this.totalCount = data.totalCount;
  }
}
