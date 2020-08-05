import { IStory } from '@storybook/angular'
import { boolean, object } from '@storybook/addon-knobs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { AppliedCouponsComponent } from '@spartacus/storefront'

export default {
  title: 'Cart/AppliedCoupons',
  decorators: [setupSpartacus([])],
}

const defaultVouchers = [
  {
    code: 'code1',
    name: 'name1',
    voucherCode: 'voucherCode1',
  },
  {
    code: 'code2',
    name: 'name2',
    voucherCode: 'voucherCode2',
  },
]
export const Default = (): IStory => ({
  component: AppliedCouponsComponent,
  props: {
    vouchers: object('vouchers', defaultVouchers),
    cartIsLoading: boolean('cartIsLoading', false),
    isReadOnly: boolean('isReadOnly', false),
  },
})

export const ReadOnly = (): IStory => ({
  component: AppliedCouponsComponent,
  props: {
    vouchers: object('vouchers', defaultVouchers),
    cartIsLoading: boolean('cartIsLoading', false),
    isReadOnly: boolean('isReadOnly', true),
  },
})

export const CartLoading = (): IStory => ({
  component: AppliedCouponsComponent,
  props: {
    cartIsLoading: boolean('cartIsLoading', true),
  },
})
