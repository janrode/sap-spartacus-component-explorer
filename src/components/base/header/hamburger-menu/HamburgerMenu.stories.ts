import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../../../spartacusStorybookModuleMetadata'
import {
  HamburgerMenuComponent,
  HamburgerMenuModule,
} from '@spartacus/storefront'

export default {
  title: 'Base/HamburgerMenu',
  decorators: [setupSpartacus([HamburgerMenuModule])],
  parameters: {
    backgrounds: [
      { name: 'default', value: 'rgba(69,69,69,0.66)', default: true },
    ],
  },
}

export const Default = (): IStory => ({
  component: HamburgerMenuComponent,
})
