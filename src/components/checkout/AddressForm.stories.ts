import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { AddressFormComponent, AddressFormModule } from '@spartacus/storefront'
import { action } from '@storybook/addon-actions'
import { boolean, text } from '@storybook/addon-knobs'
import {
  Country,
  Region,
  UserAddressService,
  UserService,
} from '@spartacus/core'
import { of } from 'rxjs'
import { IStory } from '@storybook/angular'

const UserAddressServiceProvider = {
  provide: UserAddressService,
  useClass: class UserAddressServiceMock
    implements Partial<UserAddressService> {
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
    getRegions() {
      return of(<Region[]>[
        {
          isocode: 'DE-BW',
          name: 'Baden-Württemberg',
        },
        {
          isocode: 'DE-BY',
          name: 'Bayern',
        },
      ])
    }
  },
}

const UserServiceProvider = {
  provide: UserService,
  useClass: class UserServiceMock implements Partial<UserService> {
    getTitles() {
      return of([
        { code: '1', name: 'Mrs.' },
        { code: '2', name: 'Mr.' },
      ])
    }
  },
}
export default {
  title: 'Checkout/AddressForm',
  decorators: [
    setupSpartacus(
      [AddressFormModule],
      [UserServiceProvider, UserAddressServiceProvider]
    ),
  ],
}

export const Default = (): IStory => ({
  component: AddressFormComponent,
  props: {
    addressData: {},
    actionBtnLabel: text('actionBtnLabel', 'actionBtnLabel'),
    cancelBtnLabel: text('cancelBtnLabel', 'cancelBtnLabel'),
    setAsDefaultField: boolean('setAsDefaultField', true),
    showTitleCode: boolean('showTitleCode', true),
    showCancelBtn: boolean('showCancelBtn', true),
    submitAddress: action('submitAddress'),
    backToAddress: action('backToAddress'),
  },
})

export const Filled = (): IStory => ({
  component: AddressFormComponent,
  props: {
    addressData: {
      companyName: 'companyName',
      country: {
        isocode: 'de',
        name: 'Germany',
      },
      defaultAddress: true,
      email: 'email',
      firstName: 'firstName',
      formattedAddress: 'formattedAddress',
      id: 'id',
      lastName: 'lastName',
      line1: 'line1',
      line2: 'line2',
      phone: 'phone',
      postalCode: 'postalCode',
      region: {
        isocode: 'de',
        name: 'Germany',
      },
      shippingAddress: true,
      title: 'Mrs.',
      titleCode: '1',
      town: 'town',
      visibleInAddressBook: true,
    },
    actionBtnLabel: text('actionBtnLabel', 'actionBtnLabel'),
    cancelBtnLabel: text('cancelBtnLabel', 'cancelBtnLabel'),
    setAsDefaultField: boolean('setAsDefaultField', true),
    showTitleCode: boolean('showTitleCode', true),
    showCancelBtn: boolean('showCancelBtn', true),
    submitAddress: action('submitAddress'),
    backToAddress: action('backToAddress'),
  },
})
