import { IStory } from '@storybook/angular'
import { of } from 'rxjs'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import { CarouselComponent, CarouselModule } from '@spartacus/storefront'

export default {
  title: 'Carousel',
  decorators: [setupSpartacus([CarouselModule])],
  component: CarouselComponent,
}

export const Default = (): IStory => ({
  component: CarouselComponent,
  template: `
    <cx-carousel
    [items]="items"
    [title]="title"
    [template]="template"
    itemWidth="250px"></cx-carousel>
    <ng-template #template let-item="item"><img [src]="item.url"/></ng-template>
  `,
  props: {
    title: 'Top 10 most beautiful chairs',
    items: [
      of({ url: 'http://placehold.jp/250x250.png?text=product1' }),
      of({ url: 'http://placehold.jp/250x250.png?text=product2' }),
      of({ url: 'http://placehold.jp/250x250.png?text=product3' }),
      of({ url: 'http://placehold.jp/250x250.png?text=product4' }),
      of({ url: 'http://placehold.jp/250x250.png?text=product5' }),
      of({ url: 'http://placehold.jp/250x250.png?text=product6' }),
      of({ url: 'http://placehold.jp/250x250.png?text=product7' }),
      of({ url: 'http://placehold.jp/250x250.png?text=product8' }),
      of({ url: 'http://placehold.jp/250x250.png?text=product9' }),
      of({ url: 'http://placehold.jp/250x250.png?text=product10' }),
    ],
  },
})
