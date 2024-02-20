import { Address } from '../../../models/address';
import { CompanyFull } from '../../../models/company-full';

const COMPANIES: readonly CompanyFull[] = [
  new CompanyFull({
    addresses: [
      new Address({
        lat: 56.014189,
        lng: 92.874995,
        id: 0,
        title: 'Surikova St, 45',
      }),
    ],
    id: 0,
    name: 'Green house',
    ownerId: 5,
  }),
  new CompanyFull({
    addresses: [
      new Address({
        lat: 56.014413,
        lng: 92.855920,
        id: 0,
        title: 'Kvant',
      }),
    ],
    id: 1,
    name: 'Benedict',
    ownerId: 5,
  }),
];

/** Adds companies to database. */
export async function addCompanies(): Promise<void> {
  for (const company of COMPANIES) {

    // eslint-disable-next-line no-await-in-loop
    await CompanyFull.addToDatabase(company);

    for (const address of company.addresses) {
      // eslint-disable-next-line no-await-in-loop
      await Address.addToDatabase(address, company.id);
    }
  }
}
