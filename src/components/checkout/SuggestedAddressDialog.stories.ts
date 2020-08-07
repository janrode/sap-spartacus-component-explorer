import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import {
  AddressFormModule,
  SuggestedAddressDialogComponent,
} from '@spartacus/storefront'

export default {
  title: 'Checkout/SuggestedAddressDialog',
  decorators: [setupSpartacus([AddressFormModule])],
}

export const Default = (): IStory => ({
  component: SuggestedAddressDialogComponent,
  props: {
    suggestedAddresses: [
      {
        firstName: 'Armando',
        lastName: 'Thompson',
        line1: '2037 Madie Green',
        line2: '',
        town: 'Leschstad, KS',
        postalCode: '23025',
        region: { isocode: 'USA' },
      },
    ],
    enteredAddress: {
      firstName: 'Juliana ',
      lastName: 'Jeorga',
      line1: '9072 Casandra Vista',
      line2: '',
      town: 'East Amyaside, IL',
      postalCode: '10730',
      region: { isocode: 'USA' },
    },
  },
})
