import { IStory } from '@storybook/angular'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { PageContext, RouterState, RoutingService } from '@spartacus/core'
import { CheckoutProgressComponent, CheckoutProgressModule } from '@spartacus/storefront'

const RoutingServiceProvider = {
  provide: RoutingService,
  useClass: class RoutingServiceMock implements Partial<RoutingService> {
    getPageContext = (): Observable<PageContext> => of({ id: '/checkout/payment-details' })
    getRouterState = (): Observable<RouterState> =>
      of({
        navigationId: 1,
        state: {
          url: 'shop.com/checkout/payment-details',
          context: { id: '/checkout/payment-details' },
          queryParams: [],
          params: [],
          cmsRequired: false,
        },
      })
  },
}

export default {
  title: 'Checkout/CheckoutProgress',
  decorators: [setupSpartacus([CheckoutProgressModule], [RoutingServiceProvider])],
}

export const Default = (): IStory => ({
  component: CheckoutProgressComponent,
})
