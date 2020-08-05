import { CmsComponentData } from '@spartacus/storefront'
import { of } from 'rxjs'

export const CmsComponentProvider = {
  provide: CmsComponentData,
  useClass: class CmsComponentDataMock {
    data$ = of({
      styleClass: 'styleClass',
    })
  },
}
