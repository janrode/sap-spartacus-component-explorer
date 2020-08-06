import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../../spartacusStorybookModuleMetadata'
import {
  AnonymousConsentDialogComponent,
  AnonymousConsentsDialogModule,
} from '@spartacus/storefront'
import { AnonymousConsentsServiceProvider } from '../AnonymousConsentsServiceProvider'
import {
  anonymousConsentsConfig,
  AnonymousConsentsConfigProvider,
} from '../AnonymousConsentsConfigProvider'
import { LaunchDialogServiceProvider } from '../LaunchDialogServiceProvider'

export default {
  title: 'AnonymousConsentDialog',
  decorators: [
    setupSpartacus(
      [AnonymousConsentsDialogModule],
      [
        AnonymousConsentsConfigProvider,
        AnonymousConsentsServiceProvider,
        LaunchDialogServiceProvider,
      ]
    ),
  ],
  component: AnonymousConsentDialogComponent,
}

export const Default = (): IStory => {
  anonymousConsentsConfig.showLegalDescriptionInDialog = true
  return {
    component: AnonymousConsentDialogComponent,
  }
}

export const NoLegalDescription = (): IStory => {
  anonymousConsentsConfig.showLegalDescriptionInDialog = false
  return {
    component: AnonymousConsentDialogComponent,
  }
}
