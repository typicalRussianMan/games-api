import { StrictOmit } from '../utils/types/strict-omit';

type PagedListConstructor<T> = StrictOmit<PagedList<T>, 'meme'>;

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
  public meme: undefined | string;

  public constructor(data: PagedListConstructor<T>) {
    this.items = data.items;
    this.limit = data.limit;
    this.offset = data.offset;
    this.totalCount = data.totalCount;

    this.meme = this.items.length === 0 ? 'But nobody came...' : undefined;
  }
}
