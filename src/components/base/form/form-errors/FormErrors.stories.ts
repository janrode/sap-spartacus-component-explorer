import { IStory } from '@storybook/angular'
import { FormControl } from '@angular/forms'
import { FormErrorsComponent, FormErrorsModule } from '@spartacus/storefront'
import { setupSpartacus } from '../../../../spartacusStorybookModuleMetadata'

const control = new FormControl('exampleControl')
control.markAsDirty()
control.setErrors({
  globalMessage: true,
  required: true,
  cxInvalidEmail: true,
  cxInvalidPassword: true,
  cxPasswordsMustMatch: true,
  cxEmailsMustMatch: true,
  cxStarRatingEmpty: true,
  cxNoSelectedItemToCancel: true,
})

export default {
  title: 'Base/FormErrors',
  decorators: [setupSpartacus([FormErrorsModule])],
  component: FormErrorsComponent,
}

export const Default = (): IStory => ({
  component: FormErrorsComponent,
  props: {
    control,
  },
})
