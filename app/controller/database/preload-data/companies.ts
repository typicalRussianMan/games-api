import { Address } from '../../../models/address';
import { Company } from '../../../models/company';

const COMPANIES: readonly Company[] = [
  new Company({
    addresses: [
      new Address({
        lat: 56.014189,
        lng: 92.874995,
        title: 'Красноярск, ул. Сурикова, 45',
      }),
      new Address({
        lat: 56.009320,
        lng: 92.856867,
        title: 'Красноярск, ул. Карла Маркса, 147',
      }),
    ],
    id: 1,
    name: 'Green house',
    ownerId: 5,
  }),
  new Company({
    addresses: [
      new Address({
        lat: 56.014413,
        lng: 92.855920,
        title: 'Красноярск, ул. Красной Армии, 10 ст5',
      }),
      new Address({
        lat: 56.015720,
        lng: 92.882221,
        title: 'Красноярск, ул. Парижской Комунны, 42а',
      }),
    ],
    id: 2,
    name: 'Benedict',
    ownerId: 5,
  }),
  new Company({
    addresses: [
      new Address({
        lat: 56.038146,
        lng: 93.136343,
        title: 'Березовка, ул. Дружбы, 70',
      }),
    ],
    id: 3,
    name: 'Test company',
    ownerId: 5,
  }),
  new Company({
    addresses: [
      new Address({
        lat: 56.013432,
        lng: 92.870241,
        title: 'Красноярск, ул. Ленина, 69',
      }),
    ],
    id: 4,
    name: 'SibGAU',
    ownerId: 5,
  }),
];

/** Adds companies to database. */
export async function addCompanies(): Promise<void> {
  for (const company of COMPANIES) {

    // eslint-disable-next-line no-await-in-loop
    await Company.addToDatabase(company);

    for (const address of company.addresses) {
      // eslint-disable-next-line no-await-in-loop
      await Address.addToDatabase(address, company.id);
    }
  }
}
