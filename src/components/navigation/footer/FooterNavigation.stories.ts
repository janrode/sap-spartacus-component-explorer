import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../../spartacusStorybookModuleMetadata'
import {
  FooterNavigationComponent,
  FooterNavigationModule,
  PageLayoutModule,
} from '@spartacus/storefront'
import { NavigationServiceProvider } from './NavigationServiceProvider'
import { CmsComponentProvider } from './CmsComponentProvider'

export default {
  title: 'FooterNavigation',
  decorators: [
    setupSpartacus(
      [FooterNavigationModule, PageLayoutModule],
      [CmsComponentProvider, NavigationServiceProvider]
    ),
  ],
  component: FooterNavigationComponent,
}

export const Default = (): IStory => ({
  component: FooterNavigationComponent,
  template: `
    <cx-page-layout section="footer" class="footer">
      <div class="Footer has-components">
         <cx-footer-navigation></cx-footer-navigation>
      </div>
    </cx-page-layout>
  `,
})
