import { bootstrap }    from '@angular/platform-browser-dynamic'
import { enableProdMode } from '@angular/core'
import { HTTP_PROVIDERS } from '@angular/http'
import { AppComponent } from './app/app.component'

import { ChromeService } from './chrome/chrome.service'

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [ChromeService, HTTP_PROVIDERS]);
