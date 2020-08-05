import { IStory } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { object, text } from '@storybook/addon-knobs'
import { setupSpartacus } from '../../../../spartacusStorybookModuleMetadata'
import { SortingComponent } from '@spartacus/storefront'

export default {
  title: 'Base/Sorting',
  decorators: [setupSpartacus([])],
}

export const Default = (): IStory => ({
  component: SortingComponent,
  props: {
    sortOptions: object('sortOptions', [
      { code: '1', selected: false },
      { code: '2', selected: false },
      { code: '3', name: 'Three', selected: true },
      { code: '4', name: 'Four', selected: false },
      { code: '5', name: 'Five', selected: false },
    ]),
    selectedOption: '3',
    placeholder: text('placeholder', 'Placeholder'),
    sortLabels: {
      1: 'One',
      2: 'Two',
    },
    sortListEvent: action('sortListEvent'),
  },
})

export const NoPreselection = (): IStory => ({
  component: SortingComponent,
  props: {
    sortOptions: object('sortOptions', [
      { code: '1', name: 'One', selected: false },
      { code: '2', name: 'Two', selected: false },
    ]),
    placeholder: text('placeholder', 'Placeholder'),
  },
})

export const Empty = (): IStory => ({
  component: SortingComponent,
  props: {
    sortOptions: object('sortOptions', []),
    placeholder: text('placeholder', 'Placeholder'),
  },
})
