import { IStory } from '@storybook/angular'
import { action } from '@storybook/addon-actions'
import { text, boolean, array } from '@storybook/addon-knobs'
import { setupSpartacus } from '../../../spartacusStorybookModuleMetadata'
import { CardComponent, CardModule, ICON_TYPE } from '@spartacus/storefront'

export default {
  title: 'Card',
  decorators: [setupSpartacus([CardModule])],
  component: CardComponent,
}

const template = `
<div style="width:600px">
  <cx-card
    (setDefaultCard)="click('setDefaultCard')($event)"
    (sendCard)="click('sendCard')($event)"
    (editCard)="click('editCard')($event)"
    (cancelCard)="click('cancelCard')($event)"
    (deleteCard)="click('deleteCard')($event)"
    [content]=content
    [border]="border"
    [fitToContainer]="fitToContainer"
    [isDefault]="isDefault"
    [editMode]="editMode"
  ></cx-card>
</div>`

const defaultProps = (): Record<string, unknown> => ({
  border: boolean('Border', true),
  fitToContainer: boolean('fitToContainer', false),
  isDefault: boolean('isDefault', false),
  editMode: boolean('editMode', false),
  click: action,
})

export const CreditCard = (): IStory => ({
  component: CardComponent,
  template,
  props: {
    ...defaultProps(),
    content: {
      header: text('Header', 'Selected'),
      deleteMsg: text('deleteMsg', 'Do you want to delete this?'),
      title: text('Title', 'Credit Card'),
      textBold: text('TextBold', 'Visa'),
      text: array('text', ['John Doe', '************1234', '01/2025']),
      img: ICON_TYPE.VISA,
      actions: [
        { link: '/test.html', name: 'Visit VISA' },
        { event: 'delete', name: 'Delete' },
        { event: 'default', name: 'Set as default' },
        { event: 'edit', name: 'Edit card' },
      ],
    },
  },
})

export const AddressCard = (): IStory => ({
  component: CardComponent,
  template,
  props: {
    ...defaultProps(),
    content: {
      header: text('Header', 'Selected'),
      deleteMsg: text('deleteMsg', 'Do you want to delete this?'),
      title: text('Title', 'Default Shipping Address,'),
      textBold: text('TextBold', 'Jane Doe'),
      text: array('text', ['xxxxx 10', 'Radolfzell, DE', '78315']),
      actions: [
        { event: 'default', name: 'Set as default' },
        { event: 'edit', name: 'Edit' },
        { event: 'delete', name: 'Delete' },
      ],
    },
  },
})
