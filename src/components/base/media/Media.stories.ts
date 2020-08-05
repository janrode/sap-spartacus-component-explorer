import { IStory } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { object, select, text } from '@storybook/addon-knobs'
import { setupSpartacus } from '../../../spartacusStorybookModuleMetadata'
import { MediaComponent, MediaModule } from '@spartacus/storefront'

export default {
  title: 'Base/Media',
  decorators: [setupSpartacus([MediaModule])],
}

const mediaContainer = {
  tablet: {
    altText: 'tablet',
    url: 'https://placehold.jp/250x250.png?text=tablet',
  },
  desktop: {
    altText: 'desktop',
    url: 'https://placehold.jp/500x250.png?text=desktop',
  },
  widescreen: {
    altText: 'widescreen',
    url: 'https://placehold.jp/750x250.png?text=widescreen',
  },
}

export const Default = (): IStory => ({
  component: MediaComponent,
  props: {
    alt: text('alt', 'alt text'),
    format: select('format', ['tablet', 'desktop', 'widescreen'], 'tablet'),
    loaded: action('loaded'),
    container: object('MediaContainer', mediaContainer),
  },
})
