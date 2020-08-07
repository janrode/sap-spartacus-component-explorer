import { IStory } from '@storybook/angular'
import { setupSpartacus } from '../../spartacusStorybookModuleMetadata'
import {
  AddToHomeScreenBannerComponent,
  PwaModule,
} from '@spartacus/storefront'
/*
import { AddToHomeScreenService } from '@spartacus/storefront';

const AddToHomeScreenServiceProvider = {
  provide: AddToHomeScreenService,
  useClass: class AddToHomeScreenServiceMock {
    canPrompt$ = of(true);
  },
};*/

export default {
  title: 'AddToHomeScreenBanner',
  decorators: [setupSpartacus([PwaModule], [])],
}

export const Default = (): IStory => ({
  component: AddToHomeScreenBannerComponent,
})
