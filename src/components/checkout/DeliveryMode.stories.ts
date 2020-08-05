import { IStory } from '@storybook/angular'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { DeliveryMode, CheckoutDeliveryService } from '@spartacus/core'
import { DeliveryModeComponent, DeliveryModeModule } from '@spartacus/storefront'

let deliveryModes: DeliveryMode[]
const supportedDeliveryModes: DeliveryMode[] = [
  {
    code: '1',
    name: 'Standard Delivery',
    deliveryCost: {
      formattedValue: '8,99€',
    },
    description: '3-5 business days',
  },
  {
    code: '2',
    name: 'Premium Delivery',
    deliveryCost: {
      formattedValue: '19,99€',
    },
    description: '1-2 business days',
  },
  {
    code: '3',
    name: 'Same Day Delivery',
    deliveryCost: {
      formattedValue: '100€',
    },
    description: 'Same business day if order is placed before 15.00',
  },
]

const CheckoutDeliveryServiceProvider = {
  provide: CheckoutDeliveryService,
  useClass: class CheckoutDeliveryServiceMock implements Partial<CheckoutDeliveryService> {
    getSupportedDeliveryModes = (): Observable<DeliveryMode[]> => of(deliveryModes)
    getSelectedDeliveryMode = (): Observable<DeliveryMode> => of(supportedDeliveryModes[1])
  },
}

export default {
  title: 'Checkout/DeliveryMode',
  decorators: [setupSpartacus([DeliveryModeModule], [CheckoutDeliveryServiceProvider])],
}

export const Default = (): IStory => {
  deliveryModes = supportedDeliveryModes
  return {
    component: DeliveryModeComponent,
  }
}

export const Loading = (): IStory => {
  deliveryModes = []
  return {
    component: DeliveryModeComponent,
  }
}
