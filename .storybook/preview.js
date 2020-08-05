import '!style-loader!css-loader!sass-loader!./scss-loader.scss';
import { addParameters } from '@storybook/angular';

addParameters({
  options: {
    /**
     * display the top-level grouping as a "root" in the sidebar
     * @type {Boolean}
     */
    showRoots: true,
  },
});
