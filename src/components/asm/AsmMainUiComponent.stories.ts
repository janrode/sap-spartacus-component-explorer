import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { AsmModule } from '@spartacus/storefront'

export default {
  title: 'AsmMainUi',
  decorators: [setupSpartacus([AsmModule])],
}

export const Default = (): IStory => ({
  template: `todo`,
})
