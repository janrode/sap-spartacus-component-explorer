import { action } from '@storybook/addon-actions'
import { Observable, of } from 'rxjs'
import { ConsentTemplate, AnonymousConsent, ANONYMOUS_CONSENT_STATUS, AnonymousConsentsService } from '@spartacus/core'

class AnonymousConsentsServiceMock implements Partial<AnonymousConsentsService> {
  giveConsent = action('giveConsent')
  withdrawConsent = action('withdrawConsent')
  toggleBannerDismissed = action('AnonymousConsentsService.toggleBannerDismissed')
  isConsentGiven = (): boolean => true
  isConsentWithdrawn = (): boolean => false
  isBannerVisible = (): Observable<boolean> => of(true)
  getLoadTemplatesLoading = (): Observable<boolean> => of(false)

  giveAllConsents = (): Observable<ConsentTemplate[]> => {
    action('AnonymousConsentsService.giveAllConsents')()
    return this.getTemplates()
  }

  getTemplates(): Observable<ConsentTemplate[]> {
    return of([
      {
        description:
          'This is a sample marketing consent description that will need to be updated or replaced, based on the valid registration consent required.',
        id: 'MARKETING_NEWSLETTER',
        name: 'I approve to this sample MARKETING consent',
        version: 0,
      },
      {
        description:
          'We would like to store your browsing behaviour so that our website can dynamically present you with a personalised browsing experience and our customer support agents can provide you with contextual customer support.',
        id: 'PROFILE',
        name: 'Allow SAP Commerce Cloud, Context-Driven Services tracking',
        version: 0,
      },
      {
        description:
          'This is a sample store user information consent description that will need to be updated or replaced.',
        id: 'STORE_USER_INFORMATION',
        name: 'I approve to this sample STORE USER INFORMATION consent',
        version: 0,
      },
    ])
  }

  getConsents(): Observable<AnonymousConsent[]> {
    return of([
      {
        templateCode: 'MARKETING_NEWSLETTER',
        version: 0,
        consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
      },
      {
        templateCode: 'PROFILE',
        version: 0,
      },
      {
        templateCode: 'STORE_USER_INFORMATION',
        version: 0,
        consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
      },
    ])
  }
}

export const AnonymousConsentsServiceProvider = {
  provide: AnonymousConsentsService,
  useClass: AnonymousConsentsServiceMock,
}
