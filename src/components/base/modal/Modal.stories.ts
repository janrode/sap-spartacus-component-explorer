import { IStory } from '@storybook/angular'
import { ModalService } from '@spartacus/storefront'
import { select, boolean, text } from '@storybook/addon-knobs'
import { Component, Input, NgModule } from '@angular/core'
import { setupSpartacus } from '../../../spartacusStorybookModuleMetadata'

@Component({
  template: `<div>
    <button (click)="dismissModal()">X</button>
    <p>{{ content }}</p>
  </div>`,
})
class ModalContentComponent {
  @Input()
  content: string

  constructor(protected modalService: ModalService) {}

  dismissModal(): void {
    this.modalService.dismissActiveModal('a')
  }
}

@Component({
  template: `<button (click)="openModal()">open modal</button>`,
})
class ModalHostComponent {
  @Input()
  size: string
  @Input()
  centered: boolean
  @Input()
  content: string

  constructor(protected modalService: ModalService) {
    this.openModal()
  }

  openModal(): void {
    const modalRef = this.modalService.open(ModalContentComponent, {
      centered: this.centered,
      size: this.size,
    })

    const modalInstance = modalRef.componentInstance as Record<string, unknown>
    modalInstance.content = this.content
  }
}

@NgModule({
  providers: [ModalService],
  declarations: [ModalHostComponent, ModalContentComponent],
  entryComponents: [ModalContentComponent],
})
class ModalHostModule {}

export default {
  title: 'Base/Modal',
  decorators: [setupSpartacus([ModalHostModule], [])],
}

export const Default = (): IStory => ({
  component: ModalHostComponent,
  props: {
    size: select('size', ['sm', 'lg', 'xl'], 'lg'),
    centered: boolean('centered', true),
    content: text('content', 'This is the modal content'),
  },
})
