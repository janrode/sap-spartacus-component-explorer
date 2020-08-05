import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { OrderEntry } from '@spartacus/core'
import { CartItemListComponent, CartSharedModule } from '@spartacus/storefront'
import { boolean, object } from '@storybook/addon-knobs'

export default {
  title: 'Cart/CartItemList',
  decorators: [setupSpartacus([CartSharedModule])],
}

const items: OrderEntry[] = [
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

export const Default = (): IStory => ({
  component: CartItemListComponent,
  props: {
    readonly: boolean('readonly', false),
    hasHeader: boolean('hasHeader', true),
    items: object('items', items),
    cartIsLoading: boolean('cartIsLoading', false),
  },
})
