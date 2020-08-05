import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../../spartacusStorybookModuleMetadata'
import { BreadcrumbComponent, BreadcrumbModule } from '@spartacus/storefront'
import { PageMetaServiceProvider } from './PageMetaServiceProvider'
import { CmsComponentProvider } from './CmsComponentProvider'

export default {
  title: 'Breadcrumb',
  decorators: [setupSpartacus([BreadcrumbModule], [CmsComponentProvider, PageMetaServiceProvider])],
  component: BreadcrumbComponent,
}

export const Default = (): IStory => ({
  component: BreadcrumbComponent,
})
