import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import {
  BannerComponent,
  BannerModule,
  CmsComponentData,
} from '@spartacus/storefront'
import { of } from 'rxjs'

const mediaContainer = {
  tablet: {
    altText: 'tablet',
    url: 'https://placehold.jp/250x250.png?text=tablet',
  },
  desktop: {
    altText: 'desktop',
    url: 'https://placehold.jp/500x250.png?text=desktop',
  },
  widescreen: {
    altText: 'widescreen',
    url: 'https://placehold.jp/750x250.png?text=widescreen',
  },
}

let data
const CmsBannerComponentProvider = {
  provide: CmsComponentData,
  useClass: class CmsBannerComponentMock {
    data$ = of(data)
  },
}

export default {
  title: 'Content/Banner',
  decorators: [setupSpartacus([BannerModule], [CmsBannerComponentProvider])],
}

export const Default = (): IStory => {
  data = {
    headline: 'headline',
    content: 'content',
    urlLink: 'urlLink',
    external: true,
    media: mediaContainer,
  }
  return {
    component: BannerComponent,
  }
}

export const NoTextOverlays = (): IStory => {
  data = {
    urlLink: 'urlLink',
    external: true,
    media: mediaContainer,
  }
  return {
    component: BannerComponent,
  }
}
