import { IStory } from '@storybook/angular'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { Cart, ActiveCartService, OrderEntry } from '@spartacus/core'
import { CartTotalsComponent, CartTotalsModule } from '@spartacus/storefront'

const ActiveCartServiceProvider = {
  provide: ActiveCartService,
  useClass: class ActiveCartServiceMock implements Partial<ActiveCartService> {
    getActiveCartId = (): Observable<string> => of('ActiveCartId')
    getActive = (): Observable<Cart> =>
      of({
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
    getEntries = (): Observable<OrderEntry[]> =>
      of([
        {
          entryNumber: 0,
        },
      ])
  },
}

export default {
  title: 'Cart/CartTotals',
  decorators: [setupSpartacus([CartTotalsModule], [ActiveCartServiceProvider])],
}

export const Default = (): IStory => ({
  component: CartTotalsComponent,
})
