import { GameBase } from '../../../models/game-base';

const GAMES: readonly GameBase[] = [
  new GameBase({
    categoryId: 3,
    companyId: 1,
    name: 'Doodle Green',
    posterUrl: 'https://cdn.mobygames.com/6b2b2572-ab7d-11ed-934f-02420a0001a0.webp',
    previewUrl: 'https://i.ytimg.com/vi/syVMW5i3OPU/hqdefault.jpg',
  }),
  new GameBase({
    categoryId: 5,
    companyId: 1,
    name: 'Green House Game',
    posterUrl: 'https://i.pcmag.com/imagery/articles/076IE7J0Fst6Frt9mXoS0Vd-2.fit_lim.size_1200x630.v1569487477.jpg',
    previewUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkXuM-T2w4G0uZiilMo-Lwwit7nb_2mXwvL_wRVCVHIRmXZpPF7Q63Rw0xw7XXkZZbT0k&usqp=CAU',
  }),
  new GameBase({
    categoryId: 10,
    companyId: 2,
    name: 'Catch Burger',
    posterUrl: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/c4dc286c30b8fbde45a0b5d4fe6f2146.png',
    previewUrl: 'https://i.pinimg.com/736x/5f/a0/10/5fa010564cd225539608d510b4de51f7.jpg',
  }),
  new GameBase({
    categoryId: 12,
    companyId: 3,
    name: 'Test game',
    posterUrl: 'test',
    previewUrl: 'test',
  }),
  new GameBase({
    categoryId: 8,
    companyId: 4,
    name: 'SibGAU Game',
    posterUrl: 'https://fastly.4sqi.net/img/general/600x600/3wgLbJl2QwvD0WiqrEKvOYYwWL-Dhb_epIlTBxeT4Lw.jpg',
    previewUrl: 'https://fdfp-sibsau.ru/wp-content/uploads/2019/08/f3fknjRyXPE.jpg',
  }),
];

/** Adds games to the database. */
export async function addGames(): Promise<void> {
  for (const game of GAMES) {

    // eslint-disable-next-line no-await-in-loop
    await GameBase.addToDatabase(game);
  }
}
