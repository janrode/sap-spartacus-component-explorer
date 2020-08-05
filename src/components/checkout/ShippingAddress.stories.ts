import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { ShippingAddressComponent, ShippingAddressModule } from '@spartacus/storefront'
import { Address, AddressValidation, CheckoutDeliveryService, Country, UserAddressService } from '@spartacus/core'
import { Observable, of } from 'rxjs'

let isLoading = false
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
]
const UserAddressServiceProvider = {
  provide: UserAddressService,
  useClass: class UserAddressServiceMock implements Partial<UserAddressService> {
    getAddressesLoading = (): Observable<boolean> => of(isLoading)
    getAddresses = (): Observable<Address[]> => of(addresses)
  },
}

const CheckoutDeliveryServiceProvider = {
  provide: CheckoutDeliveryService,
  useClass: class CheckoutDeliveryServiceMock implements Partial<CheckoutDeliveryService> {
    getDeliveryAddress = (): Observable<Address> => of(addresses[0])
  },
}

export default {
  title: 'Checkout/ShippingAddress',
  decorators: [setupSpartacus([ShippingAddressModule], [CheckoutDeliveryServiceProvider, UserAddressServiceProvider])],
}

export const Default = () => ({
  component: ShippingAddressComponent,
})
