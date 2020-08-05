import { CmsComponentData } from '@spartacus/storefront'

export const CmsComponentProvider = {
  provide: CmsComponentData,
  useClass: class CmsComponentDataMock {},
}
