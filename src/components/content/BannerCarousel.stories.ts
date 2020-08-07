import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import {
  BannerCarouselComponent,
  BannerCarouselModule,
  CmsComponentData,
} from '@spartacus/storefront'
import {
  CmsBannerCarouselComponent,
  CmsBannerCarouselEffect,
  CmsComponent,
  CmsService,
  Page,
} from '@spartacus/core'
import { Observable, of } from 'rxjs'

const createBanner = (id: string) => ({
  uid: id,
  typeCode: 'SimpleResponsiveBannerComponent',
  urlLink: 'urlLink',
  media: {
    desktop: {
      altText: 'tablet',
      url: 'https://placehold.jp/006699/cccc00/1550x250.png?text=' + id,
    },
  },
})

const CmsServiceProvider = {
  provide: CmsService,
  useClass: class CmsServiceMock implements Partial<CmsService> {
    getComponentData = <T extends CmsComponent>(id: string): Observable<T> => {
      return of((createBanner(id) as unknown) as T)
    }
    getCurrentPage = (): Observable<Page> => of({})
  },
}

const componentData: CmsBannerCarouselComponent = {
  uid: 'Component',
  typeCode: 'SimpleBannerCarouselComponent',
  name: 'Component',
  effect: CmsBannerCarouselEffect.FADE,
  banners: 'Banner1 Banner2 Banner3 Banner4 Banner5 Banner6 Banner7',
}

const CmsComponentDataProvider = {
  provide: CmsComponentData,
  useValue: <CmsComponentData<CmsComponent>>{
    data$: of(componentData),
    uid: 'test',
  },
}

export default {
  title: 'Content/BannerCarousel',
  decorators: [
    setupSpartacus(
      [BannerCarouselModule],
      [CmsComponentDataProvider, CmsServiceProvider]
    ),
  ],
}

export const Default = (): IStory => ({
  component: BannerCarouselComponent,
})
