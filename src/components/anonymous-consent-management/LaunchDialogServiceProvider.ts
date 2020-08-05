import { LaunchDialogService } from '@spartacus/storefront'
import { action } from '@storybook/addon-actions'

export const LaunchDialogServiceProvider = {
  provide: LaunchDialogService,
  useClass: class LaunchDialogServiceMock {
    closeDialog = action('closeDialog')
  },
}
