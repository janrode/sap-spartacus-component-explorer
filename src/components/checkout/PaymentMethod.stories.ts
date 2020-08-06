import { IStory } from '@storybook/angular'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import {
  Cart,
  Address,
  Country,
  CardType,
  PaymentDetails,
  AddressValidation,
  ActiveCartService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  UserPaymentService,
} from '@spartacus/core'
import { PaymentMethodComponent, PaymentMethodModule } from '@spartacus/storefront'

let loading: boolean

const CheckoutDeliveryServiceProvider = {
  provide: CheckoutDeliveryService,
  useClass: class CheckoutDeliveryServiceMock implements Partial<CheckoutDeliveryService> {
    getAddressVerificationResults = (): Observable<AddressValidation | string> =>
      of({ decision: 'ACCEPT' })
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
  useClass: class UserPaymentServiceMock implements Partial<UserPaymentService> {
    getPaymentMethodsLoading = (): Observable<boolean> => of(loading)
    loadPaymentMethods = (): void => {}
    getPaymentMethods = (): Observable<PaymentDetails[]> =>
      of([
        {
          id: '1',
          defaultPayment: true,
          accountHolderName: 'James Holden',
          cardNumber: '**** **** **** *123',
          cardType: { code: 'visa' },
          expiryMonth: '05',
          expiryYear: '2025',
        },
        {
          id: '2',
          defaultPayment: false,
          accountHolderName: 'Jane Holden',
          cardNumber: '**** **** **** *456',
          cardType: { code: 'master' },
          expiryMonth: '01',
          expiryYear: '2020',
        },
      ])
    getAllBillingCountries = (): Observable<Country[]> =>
      of([{ isocode: 'de' }, { isocode: 'USA' }])
  },
}

const CheckoutPaymentServiceProvider = {
  provide: CheckoutPaymentService,
  useClass: class CheckoutPaymentServiceMock implements Partial<CheckoutPaymentService> {
    getSetPaymentDetailsResultProcess = (): Observable<unknown> => of({ loading })
    paymentProcessSuccess = (): void => {}
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
    getPaymentDetails = (): Observable<PaymentDetails> => of({ id: '1' })
    setPaymentDetails = (): void => {}
    loadSupportedCardTypes = (): void => {}
  },
}

const ActiveCartServiceProvider = {
  provide: ActiveCartService,
  useClass: class ActiveCartServiceMock implements Partial<ActiveCartService> {
    getActiveCartId = (): Observable<string> => of('ActiveCartId')
    getActive = (): Observable<Cart> => of({})
    isGuestCart = (): boolean => false
  },
}

export default {
  title: 'Checkout/PaymentMethod',
  decorators: [
    setupSpartacus(
      [PaymentMethodModule],
      [
        CheckoutPaymentServiceProvider,
        CheckoutDeliveryServiceProvider,
        UserPaymentServiceProvider,
        ActiveCartServiceProvider,
      ]
    ),
  ],
}

export const Default = (): IStory => {
  loading = false
  return {
    component: PaymentMethodComponent,
  }
}

export const Loading = (): IStory => {
  loading = true
  return {
    component: PaymentMethodComponent,
  }
}
