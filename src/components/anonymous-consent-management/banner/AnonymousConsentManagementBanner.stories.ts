import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../../spartacusStorybookModuleMetadata'
import {
  AnonymousConsentManagementBannerComponent,
  AnonymousConsentsDialogModule,
} from '@spartacus/storefront'
import { AnonymousConsentsConfigProvider } from '../AnonymousConsentsConfigProvider'
import { AnonymousConsentsServiceProvider } from '../AnonymousConsentsServiceProvider'

export default {
  title: 'AnonymousConsentManagementBanner',
  decorators: [
    setupSpartacus(
      [AnonymousConsentsDialogModule],
      [AnonymousConsentsConfigProvider, AnonymousConsentsServiceProvider]
    ),
  ],
}

export const Default = (): IStory => ({
  component: AnonymousConsentManagementBannerComponent,
})
