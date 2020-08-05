import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { Cart } from '@spartacus/core'
import { CartSharedModule, OrderSummaryComponent } from '@spartacus/storefront'

export default {
  title: 'Cart/OrderSummary',
  decorators: [setupSpartacus([CartSharedModule])],
}

const cart: Cart = {
  subTotal: {
    formattedValue: '524,53€',
  },
  deliveryCost: {
    formattedValue: null,
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
}

export const Default = (): IStory => {
  cart.deliveryCost.formattedValue = '100 €'
  return {
    component: OrderSummaryComponent,
    props: {
      cart,
    },
  }
}

export const UnknownDeliveryCost = (): IStory => {
  cart.deliveryCost.formattedValue = null
  return {
    component: OrderSummaryComponent,
    props: {
      cart,
    },
  }
}
