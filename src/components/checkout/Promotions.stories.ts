import { setupSpartacus } from '../../spartacusStorybookModuleMetadata';
import { PromotionsComponent, PromotionsModule } from '@spartacus/storefront';
import { object } from '@storybook/addon-knobs';

export default {
  title: 'Checkout/Promotions',
  decorators: [setupSpartacus([PromotionsModule])],
};

export const Default = () => ({
  component: PromotionsComponent,
  props: {
    promotions: object('promotions', [
      { description: 'Buy over $100.00 get free shipping' },
      { description: 'Buy over $200.00 get $20.00 discount on cart' },
      { description: 'Buy over $100.00 get everything for free' },
    ]),
  },
});
