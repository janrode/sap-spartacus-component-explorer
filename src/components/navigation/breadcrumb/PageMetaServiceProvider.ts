import { text } from '@storybook/addon-knobs'
import { Observable, of } from 'rxjs'
import { PageMeta, PageMetaService } from '@spartacus/core'

export const PageMetaServiceProvider = {
  provide: PageMetaService,
  useClass: class PageMetaServiceMock {
    getMeta(): Observable<PageMeta> {
      return of({
        breadcrumbs: [
          { label: 'Home', link: '/1' },
          { label: 'Sports & Outdoors', link: '/2' },
          { label: 'Clothing', link: '/3' },
          { label: 'Trousers', link: '/4' },
        ],
        heading: text('heading', 'VAUDE'),
        title: 'VAUDE',
      })
    }
  },
}
