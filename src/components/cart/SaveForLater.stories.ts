import { IStory } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import {
  Cart,
  Page,
  OrderEntry,
  CmsService,
  CmsComponent,
  CmsParagraphComponent,
  ActiveCartService,
  SelectiveCartService,
} from '@spartacus/core'
import { SaveForLaterComponent, SaveForLaterModule } from '@spartacus/storefront'

let cartEntries: OrderEntry[]
const defaultEntries: OrderEntry[] = [
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
        stockLevel: 734,
        stockLevelStatus: 'inStock',
      },
    },
  },
  {
    entryNumber: 1,
    updateable: true,
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
      purchasable: false,
      stock: {
        stockLevel: 12,
        stockLevelStatus: 'inStock',
      },
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
    addEntry = action('ActiveCartService:addEntry')
    removeEntry = action('ActiveCartService:removeEntry')
    getActiveCartId = (): Observable<string> => of('ActiveCartId')
    getActive = (): Observable<Cart> =>
      of({
        totalItems: 0,
        code: '0000179210',
      })
    isStable = (): Observable<boolean> => of(true)
  },
}

const SelectiveCartServiceProvider = {
  provide: SelectiveCartService,
  useClass: class SelectiveCartServiceMock implements Partial<SelectiveCartService> {
    removeEntry = action('SelectiveCartServiceProvider:removeEntry')
    getCart = (): Observable<Cart> =>
      of({
        totalItems: 3,
        code: '0000179210',
      })
    getEntries = (): Observable<OrderEntry[]> => of(cartEntries)
    isEnabled = (): boolean => true
    getLoaded = (): Observable<boolean> => of(true)
  },
}

const mockCmsComponent: CmsParagraphComponent = {
  content: '<p>Empty Cart Info (EmptyCartParagraphComponent)</p>',
}

const CmsServiceProvider = {
  provide: CmsService,
  useClass: class CmsServiceMock implements Partial<CmsService> {
    getComponentData = <T extends CmsComponent>(): Observable<T> => of(mockCmsComponent as T)
    getCurrentPage = (): Observable<Page> => of({})
  },
}

export default {
  title: 'Cart/SaveForLater',
  decorators: [
    setupSpartacus(
      [SaveForLaterModule],
      [ActiveCartServiceProvider, SelectiveCartServiceProvider, CmsServiceProvider]
    ),
  ],
}

export const Default = (): IStory => {
  cartEntries = defaultEntries
  return {
    component: SaveForLaterComponent,
  }
}
