import { Observable, of } from 'rxjs'
import { NavigationNode, NavigationService } from '@spartacus/storefront'

export const NavigationServiceProvider = {
  provide: NavigationService,
  useClass: class NavigationServiceMock {
    getNavigationNode(): Observable<NavigationNode> {
      return of({
        children: [
          {
            title: 'Get to Know Us',
            children: [
              { title: 'Careers', url: '/' },
              { title: 'Press Releases', url: '/' },
              { title: 'About us', url: '/' },
              { title: 'Blog', url: '/' },
            ],
          },
          {
            title: 'Payment Methods',
            children: [
              { title: 'Shop with points', url: '/' },
              { title: 'Credit Card', url: '/' },
              { title: 'Payment by Invoice', url: '/' },
              { title: 'Direct Debit', url: '/' },
            ],
          },
          {
            title: 'Let Us Help You',
            children: [
              { title: 'Track Packages or View Orders', url: '/' },
              { title: 'Customer Service', url: '/' },
              { title: 'Delivery Rates & Policies', url: '/' },
              { title: 'Returns & Replacements', url: '/' },
            ],
          },
        ],
        title: 'title',
      })
    }
  },
}
