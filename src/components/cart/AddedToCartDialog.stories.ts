import { IStory } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { Cart, PromotionResult, ActiveCartService } from '@spartacus/core'
import {
  AddedToCartDialogComponent,
  AddToCartModule,
  PromotionService,
} from '@spartacus/storefront'

const activeCart = of({
  deliveryItemsQuantity: 14,
  subTotal: { formattedValue: '140 €' },
})

const ActiveCartServiceProvider = {
  provide: ActiveCartService,
  useClass: class ActiveCartServiceMock implements Partial<ActiveCartService> {
    updateEntry = action('ActiveCartService:updateEntry')
    getActiveCartId = (): Observable<string> => of('id')
    getActive = (): Observable<Cart> => activeCart
  },
}

const PromotionServiceProvider = {
  provide: PromotionService,
  useClass: class PromotionServiceMock implements Partial<PromotionService> {
    getOrderPromotions = (): Observable<PromotionResult[]> =>
      of([
        { description: 'Buy over $100.00 get free shipping' },
        { description: 'Buy over $200.00 get $20.00 discount on cart' },
      ])
  },
}

export default {
  title: 'Cart/AddedToCartDialog',
  decorators: [
    setupSpartacus(
      [AddToCartModule],
      [ActiveCartServiceProvider, PromotionServiceProvider]
    ),
  ],
}

const defaultEntry = {
  entryNumber: 0,
  quantity: 7,
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
        url: 'https://placehold.jp/150x150.png?text=product-image',
      },
    },
    name: 'Handcrafted Metal Soap',
    purchasable: true,
    stock: {
      stockLevelStatus: 'inStock',
    },
  },
}
export const Default = (): IStory => ({
  component: AddedToCartDialogComponent,
  props: {
    quantity: 4,
    cart$: activeCart,
    loaded$: of(true),
    entry$: of(defaultEntry),
  },
})

export const IncrementQuantity = (): IStory => ({
  component: AddedToCartDialogComponent,
  props: {
    increment: 44,
    cart$: activeCart,
    loaded$: of(true),
    entry$: of(defaultEntry),
  },
})

export const Loading = (): IStory => ({
  component: AddedToCartDialogComponent,
  props: {
    loaded$: of(false),
  },
})
