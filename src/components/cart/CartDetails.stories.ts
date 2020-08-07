import { IStory } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import {
  Cart,
  OrderEntry,
  PromotionResult,
  ActiveCartService,
  AuthService,
  SelectiveCartService,
} from '@spartacus/core'
import {
  CartDetailsComponent,
  CartDetailsModule,
  PromotionService,
} from '@spartacus/storefront'

const isUserLoggedIn = true

let cartEntries: OrderEntry[]
const defaultCartEntries: OrderEntry[] = [
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
          productPhoto: {
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
          productPhoto: {
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
          productPhoto: {
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

const ActiveCartServiceProvider = {
  provide: ActiveCartService,
  useClass: class ActiveCartServiceMock implements Partial<ActiveCartService> {
    removeEntry = action('ActiveCartService:removeEntry')
    updateEntry = action('ActiveCartService:updateEntry')
    getActiveCartId = (): Observable<string> => of('ActiveCartId')
    getActive = (): Observable<Cart> =>
      of({
        totalItems: 4,
        code: '0000179210',
      })
    getEntries = (): Observable<OrderEntry[]> => of(cartEntries)
    isStable = (): Observable<boolean> => of(true)
  },
}

const SelectiveCartServiceProvider = {
  provide: SelectiveCartService,
  useClass: class SelectiveCartServiceMock
    implements Partial<SelectiveCartService> {
    addEntry = action('SelectiveCartServiceProvider:addEntry')
    isEnabled = (): boolean => true
    getLoaded = (): Observable<boolean> => of(true)
  },
}

const PromotionServiceProvider = {
  provide: PromotionService,
  useClass: class PromotionServiceMock implements Partial<PromotionService> {
    getOrderPromotionsFromCart = (): Observable<PromotionResult[]> =>
      of(Array<PromotionResult>())
    getProductPromotionForEntry = (): Observable<PromotionResult[]> =>
      of(Array<PromotionResult>())
    getOrderPromotions = (): Observable<PromotionResult[]> =>
      of([
        { description: 'Buy over $100.00 get free shipping' },
        { description: 'Buy over $200.00 get $20.00 discount on cart' },
      ])
  },
}

const AuthServiceProvider = {
  provide: AuthService,
  useClass: class AuthServiceMock implements Partial<AuthService> {
    getOccUserId = (): Observable<string> => of('id')
    isUserLoggedIn = (): Observable<boolean> => of(isUserLoggedIn)
  },
}

export default {
  title: 'Cart/CartDetails',
  decorators: [
    setupSpartacus(
      [CartDetailsModule],
      [
        ActiveCartServiceProvider,
        PromotionServiceProvider,
        SelectiveCartServiceProvider,
        AuthServiceProvider,
      ]
    ),
  ],
}

export const Default = (): IStory => {
  cartEntries = defaultCartEntries
  return {
    component: CartDetailsComponent,
  }
}

export const EmptyCart = (): IStory => {
  cartEntries = []
  return {
    component: CartDetailsComponent,
  }
}
