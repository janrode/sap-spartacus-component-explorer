import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../../spartacusStorybookModuleMetadata'
import {
  AnonymousConsentOpenDialogComponent,
  AnonymousConsentsDialogModule,
} from '@spartacus/storefront'
import { AnonymousConsentsServiceProvider } from '../AnonymousConsentsServiceProvider'

export default {
  title: 'AnonymousConsentOpenDialogButton',
  decorators: [
    setupSpartacus(
      [AnonymousConsentsDialogModule],
      [AnonymousConsentsServiceProvider]
    ),
  ],
  parameters: {
    backgrounds: [{ name: 'default', value: '#454545', default: true }],
  },
}

export const Default = (): IStory => ({
  component: AnonymousConsentOpenDialogComponent,
})
