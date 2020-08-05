import logo from './assets/spartacus-blue.png'
import { addons } from '@storybook/addons'
import { themes } from '@storybook/theming'
import { create } from '@storybook/theming/create'

const theme = create({
  base: 'light',

  colorPrimary: '#f46d00',
  colorSecondary: '#4472c4',

  brandTitle: 'Spartacus Component Explorer',
  brandImage: logo,
})

addons.setConfig({
  theme,
})
