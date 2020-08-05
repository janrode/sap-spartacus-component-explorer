import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../../spartacusStorybookModuleMetadata'
import { SpinnerComponent, SpinnerModule } from '@spartacus/storefront'

export default {
  title: 'Base/Spinner',
  decorators: [setupSpartacus([SpinnerModule])],
}

export const Default = (): IStory => ({
  component: SpinnerComponent,
})
