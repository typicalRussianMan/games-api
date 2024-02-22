import { Address } from '../../../models/address';
import { Company } from '../../../models/company';

const COMPANIES: readonly Company[] = [
  new Company({
    addresses: [
      new Address({
        lat: 56.014189,
        lng: 92.874995,
        title: 'Surikova St, 45',
      }),
      new Address({
        lat: 56.009320,
        lng: 92.856867,
        title: 'ул. Дзержинского',
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
        title: 'Kvant',
      }),
      new Address({
        lat: 56.015720,
        lng: 92.882221,
        title: 'ул. Парижской Комунны',
      }),
    ],
    id: 2,
    name: 'Benedict',
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
