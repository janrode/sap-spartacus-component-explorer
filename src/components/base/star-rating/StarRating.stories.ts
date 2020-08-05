import { IStory } from '@storybook/angular'
import { number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { setupSpartacus } from '../../../spartacusStorybookModuleMetadata'
import { StarRatingComponent, StarRatingModule } from '@spartacus/storefront'

export default {
  title: 'Base/StarRating',
  decorators: [setupSpartacus([StarRatingModule])],
}

export const Default = (): IStory => ({
  component: StarRatingComponent,
  props: {
    change: action('change'),
  },
})

export const Rating = (): IStory => ({
  component: StarRatingComponent,
  props: {
    rating: number('Rating', 3.3),
    change: action('change'),
  },
})

export const Disabled = (): IStory => ({
  component: StarRatingComponent,
  props: {
    disabled: true,
    rating: 4,
    change: action('change'),
  },
})
