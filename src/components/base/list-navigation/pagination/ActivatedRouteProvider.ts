import { ActivatedRoute } from '@angular/router'

export const ActivatedRouteProvider = {
  provide: ActivatedRoute,
  useClass: class ActivatedRouteMock {
    snapshot = { queryParams: {} }
  },
}
