import { IStory } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { boolean, number } from '@storybook/addon-knobs'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import {
  Address,
  Country,
  CardType,
  AddressValidation,
  UserPaymentService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
} from '@spartacus/core'
import { PaymentFormComponent, PaymentFormModule } from '@spartacus/storefront'

let loading: boolean

let addressVerificationResult: string
const CheckoutDeliveryServiceProvider = {
  provide: CheckoutDeliveryService,
  useClass: class CheckoutDeliveryServiceMock
    implements Partial<CheckoutDeliveryService> {
    getAddressVerificationResults = (): Observable<AddressValidation> =>
      of({ decision: addressVerificationResult })
    getDeliveryAddress = (): Observable<Address> =>
      of({
        firstName: 'Jensen',
        lastName: 'Osinski',
        line1: '9865 Hal Road',
        town: 'South Eddie',
        postalCode: 'MT 24603',
        country: { isocode: 'USA' },
      })
  },
}

const UserPaymentServiceProvider = {
  provide: UserPaymentService,
  useClass: class UserPaymentServiceMock
    implements Partial<UserPaymentService> {
    getAllBillingCountries = (): Observable<Country[]> =>
      of([{ isocode: 'de' }, { isocode: 'USA' }])
  },
}

const CheckoutPaymentServiceProvider = {
  provide: CheckoutPaymentService,
  useClass: class CheckoutPaymentServiceMock
    implements Partial<CheckoutPaymentService> {
    getSetPaymentDetailsResultProcess = (): Observable<unknown> =>
      of({ loading })
    getCardTypes = (): Observable<CardType[]> =>
      of([
        {
          code: 'visa',
          name: 'Visa',
        },
        {
          code: 'maestro',
          name: 'Maestro',
        },
        {
          code: 'amexp',
          name: 'American Express',
        },
        {
          code: 'master',
          name: 'Mastercard',
        },
      ])
    loadSupportedCardTypes = () => of([])
  },
}

export default {
  title: 'Checkout/PaymentForm',
  decorators: [
    setupSpartacus(
      [PaymentFormModule],
      [
        CheckoutPaymentServiceProvider,
        CheckoutDeliveryServiceProvider,
        UserPaymentServiceProvider,
      ]
    ),
  ],
}

export const Default = (): IStory => {
  addressVerificationResult = null
  loading = false
  return {
    component: PaymentFormComponent,
    props: {
      setAsDefaultField: boolean('setAsDefaultField', true),
      paymentMethodsCount: number('paymentMethodsCount', 0),
      setPaymentDetails: action('setPaymentDetails'),
      closeForm: action('closeForm'),
      goBack: action('goBack'),
    },
  }
}

export const ReviewSuggestedBillingAddress = (): IStory => {
  addressVerificationResult = 'REVIEW'
  loading = false
  return {
    component: PaymentFormComponent,
    props: {
      setAsDefaultField: boolean('setAsDefaultField', true),
      paymentMethodsCount: number('paymentMethodsCount', 0),
      setPaymentDetails: action('setPaymentDetails'),
      closeForm: action('closeForm'),
      goBack: action('goBack'),
    },
  }
}

export const Loading = (): IStory => {
  loading = true
  addressVerificationResult = null
  return {
    component: PaymentFormComponent,
  }
}
