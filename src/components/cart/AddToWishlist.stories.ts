import { IStory } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { Observable, of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { Cart, Product, AuthService, WishListService } from '@spartacus/core'
import {
  AddToWishListComponent,
  AddToWishListModule,
  CurrentProductService,
} from '@spartacus/storefront'

let isUserLoggedIn: Observable<boolean>
let wishlistLoading: Observable<boolean>
let productAlreadyInWishlist: boolean

const WishListServiceProvider = {
  provide: WishListService,
  useClass: class WishListServiceMock implements Partial<WishListService> {
    addEntry = action('addEntry')
    removeEntry = action('removeEntry')
    getWishList = (): Observable<Cart> =>
      of({
        entries: [
          { product: { code: productAlreadyInWishlist ? '123' : '456' } },
        ],
      })
    getWishListLoading = (): Observable<boolean> => wishlistLoading
  },
}

const CurrentProductServiceProvider = {
  provide: CurrentProductService,
  useClass: class CurrentProductServiceMock
    implements Partial<CurrentProductService> {
    getProduct = (): Observable<Product | null> =>
      of({
        code: '123',
        stock: {
          stockLevelStatus: 'inStock',
          stockLevel: 12,
        },
      })
  },
}

const AuthServiceProvider = {
  provide: AuthService,
  useClass: class AuthServiceMock implements Partial<AuthService> {
    getOccUserId = (): Observable<string> => of('id')
    isUserLoggedIn = (): Observable<boolean> => isUserLoggedIn
  },
}

export default {
  title: 'Cart/AddToWishlist',
  decorators: [
    setupSpartacus(
      [AddToWishListModule],
      [
        WishListServiceProvider,
        CurrentProductServiceProvider,
        AuthServiceProvider,
      ]
    ),
  ],
}

export const Default = (): IStory => {
  wishlistLoading = of(false)
  isUserLoggedIn = of(true)
  productAlreadyInWishlist = false

  return { component: AddToWishListComponent }
}

export const AlreadyInWishlist = (): IStory => {
  wishlistLoading = of(false)
  isUserLoggedIn = of(true)
  productAlreadyInWishlist = true

  return { component: AddToWishListComponent }
}

export const WishlistLoading = (): IStory => {
  wishlistLoading = of(true)
  isUserLoggedIn = of(true)
  productAlreadyInWishlist = false

  return { component: AddToWishListComponent }
}

export const UserNotLoggedIn = (): IStory => {
  wishlistLoading = of(false)
  isUserLoggedIn = of(false)
  productAlreadyInWishlist = false

  return { component: AddToWishListComponent }
}
