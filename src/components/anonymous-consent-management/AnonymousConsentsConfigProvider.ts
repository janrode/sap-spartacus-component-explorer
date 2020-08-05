import { AnonymousConsentsConfig } from '@spartacus/core'

export const anonymousConsentsConfig = {
  showLegalDescriptionInDialog: true,
  requiredConsents: ['STORE_USER_INFORMATION'],
}

export const AnonymousConsentsConfigProvider = {
  provide: AnonymousConsentsConfig,
  useClass: class AnonymousConsentsConfigMock {
    anonymousConsents = anonymousConsentsConfig
  },
}
