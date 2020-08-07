import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import {
  ShippingAddressComponent,
  ShippingAddressModule,
} from '@spartacus/storefront'
import {
  Address,
  AddressValidation,
  CheckoutDeliveryService,
  Country,
  UserAddressService,
} from '@spartacus/core'
import { Observable, of } from 'rxjs'
import { IStory } from '@storybook/angular'
import { action } from '@storybook/addon-actions'

const isLoading = false
const addresses = [
  {
    id: '1',
    firstName: 'James',
    lastName: 'McElwain',
    line1: 'Karja 28',
    town: 'Selja',
    postalCode: '92177 ',
    country: { isocode: 'ET' },
    defaultAddress: true,
  },
  {
    id: '2',
    firstName: 'Jensen',
    lastName: 'Osinski',
    line1: '9865 Hal Road',
    town: 'South Eddie',
    postalCode: 'MT 24603',
    country: { isocode: 'USA' },
  },
  {
    id: '3',
    firstName: 'Winston ',
    lastName: 'A. Bryant',
    line1: '53 Ferrell Street',
    town: 'Barnesville',
    postalCode: 'MN 56514',
    country: { isocode: 'USA' },
  },
  {
    id: '4',
    firstName: 'Madeline  ',
    lastName: 'J. Harris',
    line1: '3048 Grant View Drive',
    town: 'Milwaukee',
    postalCode: 'WI 53218',
    country: { isocode: 'USA' },
  },
]
const UserAddressServiceProvider = {
  provide: UserAddressService,
  useClass: class UserAddressServiceMock
    implements Partial<UserAddressService> {
    getAddressesLoading = (): Observable<boolean> => of(isLoading)
    getAddresses = (): Observable<Address[]> => of(addresses)
    loadAddresses = () => {}
    getRegions = () => of([])
    getDeliveryCountries() {
      return of(<Country[]>[
        {
          isocode: 'de',
          name: 'Germany',
        },
        {
          isocode: 'us',
          name: 'America',
        },
      ])
    }
  },
}

const CheckoutDeliveryServiceProvider = {
  provide: CheckoutDeliveryService,
  useClass: class CheckoutDeliveryServiceMock
    implements Partial<CheckoutDeliveryService> {
    setDeliveryAddress = action('setDeliveryAddress ')
    getDeliveryAddress = (): Observable<Address> => of(addresses[0])
    clearAddressVerificationResults = () => {}
    getAddressVerificationResults = (): Observable<AddressValidation> =>
      of({ decision: 'SUCCESS' })
  },
}

export default {
  title: 'Checkout/ShippingAddress',
  decorators: [
    setupSpartacus(
      [ShippingAddressModule],
      [CheckoutDeliveryServiceProvider, UserAddressServiceProvider]
    ),
  ],
}

export const Default = (): IStory => ({
  component: ShippingAddressComponent,
})
