import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { AddressFormComponent, AddressFormModule } from '@spartacus/storefront'
import { action } from '@storybook/addon-actions'
import { boolean, text } from '@storybook/addon-knobs'
import { UserAddressService, UserService } from '@spartacus/core'
import { of } from 'rxjs'

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
  decorators: [setupSpartacus([AddressFormModule], [UserServiceProvider])],
}

export const Default = () => ({
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

export const Filled = () => ({
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
