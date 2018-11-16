import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector, ComponentRef } from '@angular/core';

import { CallingContainer, DIALOG_DATA } from '../containers/calling';

@Injectable()
export class CallingOverlayService {
  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      height: '100vh',
      width: '100vw',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }

  private createInjector(config: any, overlayRef: OverlayRef): PortalInjector {
    // Instantiate new WeakMap for our custom injection tokens
    const injectionTokens = new WeakMap();

    // Set custom injection tokens
    injectionTokens.set(OverlayRef, overlayRef);
    injectionTokens.set(DIALOG_DATA, config);

    // Instantiate new PortalInjector
    return new PortalInjector(this.injector, injectionTokens);
  }

  // Inject overlay service
  constructor(private injector: Injector, private overlay: Overlay) {}

  open(config: any) {
    // Returns an OverlayConfig
    const overlayConfig = this.getOverlayConfig();

    // Returns an OverlayRef (which is a PortalHost)
    const overlayRef = this.overlay.create(overlayConfig);

    const injector = this.createInjector(config, overlayRef);
    // Create ComponentPortal that can be attached to a PortalHost
    const callingPortal = new ComponentPortal(CallingContainer, null, injector);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(callingPortal);
  }
}
