import { IStory } from '@storybook/angular'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { Cart, ActiveCartService } from '@spartacus/core'
import { CheckoutOrderSummaryComponent, CheckoutOrderSummaryModule } from '@spartacus/storefront'

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
  },
}

export default {
  title: 'Checkout/CheckoutOrderSummary',
  decorators: [setupSpartacus([CheckoutOrderSummaryModule], [ActiveCartServiceProvider])],
}

export const Default = (): IStory => ({
  component: CheckoutOrderSummaryComponent,
})
