import { IStory } from '@storybook/angular'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { Cart, ActiveCartService } from '@spartacus/core'
import { MiniCartComponent, MiniCartModule } from '@spartacus/storefront'

const ActiveCartServiceProvider = {
  provide: ActiveCartService,
  useClass: class ActiveCartServiceMock implements Partial<ActiveCartService> {
    getActiveCartId = (): Observable<string> => of('ActiveCartId')
    getActive = (): Observable<Cart> =>
      of({
        deliveryItemsQuantity: 5,
        totalPrice: {
          formattedValue: '1364€',
        },
      })
  },
}

export default {
  title: 'Cart/MiniCart',
  decorators: [setupSpartacus([MiniCartModule], [ActiveCartServiceProvider])],
}

export const Default = (): IStory => ({
  component: MiniCartComponent,
})
