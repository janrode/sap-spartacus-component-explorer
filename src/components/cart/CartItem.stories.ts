import { IStory } from '@storybook/angular'
import { boolean, object } from '@storybook/addon-knobs'
import { Observable, of } from 'rxjs'
import { FormControl } from '@angular/forms'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { OrderEntry, PromotionResult } from '@spartacus/core'
import { CartItemComponent, CartSharedModule, PromotionService } from '@spartacus/storefront'

const PromotionServiceProvider = {
  provide: PromotionService,
  useClass: class PromotionServiceMock implements Partial<PromotionService> {
    getProductPromotionForEntry = (): Observable<PromotionResult[]> => {
      return of([{ description: 'AppliedProductPromotion1' }, { description: 'AppliedProductPromotion2' }])
    }
  },
}

export default {
  title: 'Cart/CartItem',
  decorators: [setupSpartacus([CartSharedModule], [PromotionServiceProvider])],
}

const item: OrderEntry = {
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
    baseOptions: [
      {
        selected: {
          variantOptionQualifiers: [
            { name: 'color', value: 'green' },
            { name: 'size', value: 'large' },
          ],
        },
      },
    ],
    code: '8653-80123-74124',
    images: {
      PRIMARY: {
        thumbnail: {
          url: 'https://placehold.jp/150x150.png?text=product-thumb',
        },
      },
    },
    name: 'Incredible Soft Sausages',
    purchasable: true,
    stock: {
      stockLevel: 666,
      stockLevelStatus: 'inStock',
    },
  },
}

export const Default = (): IStory => ({
  component: CartItemComponent,
  props: {
    compact: boolean('compact', false),
    item: object('item', item),
    readonly: boolean('readonly', false),
    options: object('options', {
      isSaveForLater: false,
      optionalBtn: null,
    }),
    quantityControl: new FormControl('21'),
  },
})

export const Compact = (): IStory => ({
  component: CartItemComponent,
  props: {
    compact: boolean('compact', true),
    item: object('item', item),
    quantityControl: new FormControl('21'),
  },
})

export const SaveForLater = (): IStory => ({
  component: CartItemComponent,
  props: {
    item: object('item', item),
    options: object('options', {
      isSaveForLater: true,
      optionalBtn: null,
    }),
    quantityControl: new FormControl('21'),
  },
})
