import { IStory } from '@storybook/angular'
import { boolean, object, text } from '@storybook/addon-knobs'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { ActiveCartService, OrderEntry, Cart } from '@spartacus/core'
import { AddToCartComponent, AddToCartModule } from '@spartacus/storefront'

const ActiveCartServiceProvider = {
  provide: ActiveCartService,
  useClass: class ActiveCartServiceMock implements Partial<ActiveCartService> {
    getActiveCartId = (): Observable<string> => of('id')
    getEntry = (): Observable<OrderEntry> =>
      of({
        quantity: 4,
        product: {
          images: {
            PRIMARY: {
              thumbnail: { url: 'https://placehold.jp/96x96.png?text=product' },
            },
          },
        },
        basePrice: { formattedValue: '10,50 €' },
        totalPrice: { formattedValue: '42 €' },
        updatable: true,
      })
    addEntry = (): void => {}
    updateEntry = (): void => {}
    getActive = (): Observable<Cart> =>
      of({
        deliveryItemsQuantity: 14,
        subTotal: { formattedValue: '140 €' },
      })
    isStable = (): Observable<boolean> => of(true)
  },
}

export default {
  title: 'Cart/AddToCart',
  decorators: [setupSpartacus([AddToCartModule], [ActiveCartServiceProvider])],
}

export const Default = (): IStory => ({
  component: AddToCartComponent,
  props: {
    productCode: text('productCode', '123-456-789'),
    showQuantity: boolean('showQuantity', true),
    product: object('product', {
      code: '123-456-789',
      stock: {
        stockLevelStatus: 'inStock',
        stockLevel: 12,
      },
    }),
  },
})

export const OutOfStock = (): IStory => ({
  component: AddToCartComponent,
  props: {
    productCode: text('productCode', '123-456-789'),
    showQuantity: boolean('showQuantity', true),
    product: object('product', {
      code: '123-456-789',
      stock: {
        stockLevelStatus: 'outOfStock',
        stockLevel: 0,
      },
    }),
  },
})
