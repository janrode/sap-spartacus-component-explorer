import { IStory } from '@storybook/angular'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import {
  Cart,
  Address,
  Country,
  OrderEntry,
  DeliveryMode,
  PaymentDetails,
  PromotionResult,
  ActiveCartService,
  CheckoutDeliveryService,
  CheckoutPaymentService,
  UserAddressService,
} from '@spartacus/core'
import {
  PromotionService,
  ReviewSubmitComponent,
  ReviewSubmitModule,
} from '@spartacus/storefront'

const cartEntries: OrderEntry[] = [
  {
    entryNumber: 0,
    quantity: 2,
    updateable: true,
    basePrice: {
      formattedValue: '$541.34',
    },
    totalPrice: {
      formattedValue: '$1,624.02',
    },
    product: {
      code: 'product-code-8525-86754-24356',
      images: {
        PRIMARY: {
          thumbnail: {
            url: 'https://placehold.jp/150x150.png?text=product-image',
          },
        },
      },
      name: 'Handcrafted Metal Soap',
      purchasable: true,
      stock: {
        stockLevelStatus: 'inStock',
      },
    },
  },
  {
    entryNumber: 1,
    updateable: false,
    quantity: 3,
    basePrice: {
      formattedValue: '$189.00',
    },
    totalPrice: {
      formattedValue: '$567.00',
    },
    product: {
      code: '1992-693-7557-007',
      images: {
        PRIMARY: {
          thumbnail: {
            url: 'https://placehold.jp/150x150.png?text=product-image',
          },
        },
      },
      name: 'Refined Wooden Computer',
      purchasable: true,
    },
  },
  {
    entryNumber: 2,
    quantity: 21,
    updateable: true,
    basePrice: {
      formattedValue: '$1.00',
    },
    totalPrice: {
      formattedValue: '$21.00',
    },
    product: {
      code: '8653-80123-74124',
      images: {
        PRIMARY: {
          thumbnail: {
            url: 'https://placehold.jp/150x150.png?text=product-image',
          },
        },
      },
      name: 'Incredible Soft Sausages',
      purchasable: true,
      stock: {
        stockLevel: 26,
        stockLevelStatus: 'inStock',
      },
    },
  },
]

const CheckoutDeliveryServiceProvider = {
  provide: CheckoutDeliveryService,
  useClass: class CheckoutDeliveryServiceMock
    implements Partial<CheckoutDeliveryService> {
    getDeliveryAddress = (): Observable<Address> =>
      of({
        firstName: 'Jensen',
        lastName: 'Osinski',
        line1: '9865 Hal Road',
        town: 'South Eddie',
        postalCode: 'MT 24603',
        country: { isocode: 'USA' },
      })
    getSelectedDeliveryMode = (): Observable<DeliveryMode> =>
      of({
        code: '2',
        name: 'Premium Delivery',
        deliveryCost: {
          formattedValue: '19,99€',
        },
        description: '1-2 business days',
      })
    loadSupportedDeliveryModes = (): void => {}
  },
}

const CheckoutPaymentServiceProvider = {
  provide: CheckoutPaymentService,
  useClass: class CheckoutPaymentServiceMock
    implements Partial<CheckoutPaymentService> {
    getPaymentDetails = (): Observable<PaymentDetails> =>
      of({
        id: '1',
        defaultPayment: true,
        accountHolderName: 'James Holden',
        cardNumber: '**** **** **** *123',
        cardType: { code: 'visa' },
        expiryMonth: '05',
        expiryYear: '2025',
      })
  },
}

const UserAddressServiceProvider = {
  provide: UserAddressService,
  useClass: class UserAddressServiceMock
    implements Partial<UserAddressService> {
    getCountry = (): Observable<Country> =>
      of({ isocode: 'DE', name: 'Germany' })
    loadDeliveryCountries = (): void => {}
  },
}

const ActiveCartServiceProvider = {
  provide: ActiveCartService,
  useClass: class ActiveCartServiceMock implements Partial<ActiveCartService> {
    getActiveCartId = (): Observable<string> => of('ActiveCartId')
    getActive = (): Observable<Cart> =>
      of({
        totalItems: 4,
        code: '0000179210',
        subTotal: {
          formattedValue: '524,53€',
        },
        deliveryCost: {
          formattedValue: '100€',
        },
        totalTax: {
          formattedValue: '45,99€',
        },
        totalPriceWithTax: {
          formattedValue: '670,52€',
        },
        totalDiscounts: {
          value: 1,
          formattedValue: '10€',
        },
        net: true,
      })
    getEntries = (): Observable<OrderEntry[]> => of(cartEntries)
  },
}

const PromotionServiceProvider = {
  provide: PromotionService,
  useClass: class PromotionServiceMock implements Partial<PromotionService> {
    getProductPromotionForEntry = (): Observable<PromotionResult[]> =>
      of([{ description: '10% off, summer sale' }])
    getOrderPromotions = (): Observable<PromotionResult[]> =>
      of([
        { description: 'Buy over $100.00 get free shipping' },
        { description: 'Buy over $200.00 get $20.00 discount on cart' },
      ])
  },
}

export default {
  title: 'Checkout/ReviewSubmit',
  decorators: [
    setupSpartacus(
      [ReviewSubmitModule],
      [
        CheckoutDeliveryServiceProvider,
        CheckoutPaymentServiceProvider,
        UserAddressServiceProvider,
        ActiveCartServiceProvider,
        PromotionServiceProvider,
      ]
    ),
  ],
}

export const Default = (): IStory => ({
  component: ReviewSubmitComponent,
})
