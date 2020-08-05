import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../../spartacusStorybookModuleMetadata'
import { SkipLinkComponent, SkipLinkModule } from '@spartacus/storefront'

export default {
  title: 'Base/SkipLink',
  decorators: [setupSpartacus([SkipLinkModule])],
}

export const Default = (): IStory => {
  return {
    component: SkipLinkComponent,
  }
}
