import { Provider } from '@angular/core'
import { CommonModule, APP_BASE_HREF } from '@angular/common'
import { RouterModule } from '@angular/router'
import { B2cStorefrontModule } from '@spartacus/storefront'
import { translationChunksConfig, translations } from '@spartacus/assets'
import { IStory, moduleMetadata } from '@storybook/angular'
import { StoryFn } from '@storybook/addons'

export function setupSpartacus(
  modules: CommonModule[],
  providers: Provider[] = []
): (storyFn: StoryFn<IStory>) => unknown {
  return moduleMetadata({
    imports: [
      RouterModule.forRoot([], {
        initialNavigation: 'disabled',
      }),
      B2cStorefrontModule.withConfig({
        backend: {
          occ: {
            baseUrl: process.env.STORYBOOK_OCC_BASEURL,
            prefix: '/rest/v2/',
          },
        },
        context: {
          baseSite: ['electronics-spa'],
        },
        i18n: {
          resources: translations,
          chunks: translationChunksConfig,
          fallbackLang: 'en',
        },
        pwa: {
          enabled: true,
          addToHomeScreen: true,
        },
      }),
      ...modules,
    ],
    providers: [
      {
        provide: APP_BASE_HREF,
        useValue: '/',
      },
      ...providers,
    ],
  })
}
