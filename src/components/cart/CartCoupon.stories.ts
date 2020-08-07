import { IStory } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import {
  Cart,
  Voucher,
  CustomerCouponSearchResult,
  ActiveCartService,
  CartVoucherService,
  CustomerCouponService,
} from '@spartacus/core'
import { CartCouponComponent, CartCouponModule } from '@spartacus/storefront'

let customerCoupons: CustomerCouponSearchResult
const defaultCustomerCoupons = {
  coupons: [
    {
      couponId: '25%SummerSale',
      name: '25% Summer Sale',
    },
    {
      couponId: '100%BankruptUs',
      name: '100% Bankrupt us',
    },
  ],
}
const CustomerCouponServiceProvider = {
  provide: CustomerCouponService,
  useClass: class CustomerCouponServiceMock
    implements Partial<CustomerCouponService> {
    loadCustomerCoupons = (): void => {}
    getCustomerCoupons = (): Observable<CustomerCouponSearchResult> =>
      of(customerCoupons)
  },
}

let appliedVouchers: Voucher[]
const defaultAppliedVouchers1 = [
  { code: '1', voucherCode: '3%WinterSale' },
  { code: '2', voucherCode: '25%SummerSale' },
  { code: '3', voucherCode: '10%ForSpecialSnowflakes' },
]
const ActiveCartServiceProvider = {
  provide: ActiveCartService,
  useClass: class ActiveCartServiceMock implements Partial<ActiveCartService> {
    getActiveCartId = (): Observable<string> => of('id')
    getActive = (): Observable<Cart> =>
      of({
        appliedVouchers,
      })
    isStable = (): Observable<boolean> => of(true)
  },
}

const CartVoucherServiceProvider = {
  provide: CartVoucherService,
  useClass: class CartVoucherServiceMock
    implements Partial<CartVoucherService> {
    addVoucher = action('addVoucher')
    removeVoucher = action('removeVoucher')
    resetAddVoucherProcessingState = (): void => {}
    getAddVoucherResultSuccess = (): Observable<boolean> => of(true)
    getAddVoucherResultError = (): Observable<boolean> => of(false)
  },
}

export default {
  title: 'Cart/CartCoupon',
  decorators: [
    setupSpartacus(
      [CartCouponModule],
      [
        CustomerCouponServiceProvider,
        ActiveCartServiceProvider,
        CartVoucherServiceProvider,
      ]
    ),
  ],
}

export const Default = (): IStory => {
  appliedVouchers = defaultAppliedVouchers1
  customerCoupons = defaultCustomerCoupons
  return {
    component: CartCouponComponent,
  }
}

export const NoAppliedVouchers = (): IStory => {
  appliedVouchers = []
  customerCoupons = defaultCustomerCoupons
  return {
    component: CartCouponComponent,
  }
}

export const NoAvailableCoupons = (): IStory => {
  appliedVouchers = defaultAppliedVouchers1
  customerCoupons = { coupons: [] }
  return {
    component: CartCouponComponent,
  }
}

export const Empty = (): IStory => {
  appliedVouchers = []
  customerCoupons = { coupons: [] }
  return {
    component: CartCouponComponent,
  }
}
