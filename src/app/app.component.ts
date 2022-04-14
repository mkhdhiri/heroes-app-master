import { Component } from '@angular/core';
import { NullValidationHandler, OAuthService, AuthConfig } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  public claims: any;
  public hasValidAccessToken: boolean = false;
  constructor(private oauthService: OAuthService) {
    this.configure();
    //this.setupAutomaticSilentRefresh();
  }
  authConfig: AuthConfig = {
    issuer: 'http://localhost:8090/auth/realms/gainde',
    redirectUri: window.location.origin + "/heroes",
    clientId: 'gainde-client',
    dummyClientSecret: 'e72bd154-6fd9-4180-a988-bc4d39a0f616',
    //scope: 'openid profile email offline_access heroes',
    responseType: 'code',
    requireHttps: false,
    // at_hash is not present in JWT token
    disableAtHashCheck: true,
    //postLogoutRedirectUri: window.location.origin + "/heroes",
    showDebugInformation: true
  }
  
  public login() {
    this.oauthService.initLoginFlow();
  }
  
  public logoff() {
    this.oauthService.logOut();
  }
  
  private configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

//   private setupAutomaticSilentRefresh() {
//     this.oauthService.setupAutomaticSilentRefresh();
//   }

//   public name() {
//      this.claims = this.oauthService.getIdentityClaims();
//      console.log(this.claims);
//     if (!this.claims) return null;
//     return this.claims;
// }

// public validAccessToken() {
//     this.hasValidAccessToken = this.oauthService.hasValidAccessToken();
//     console.log(this.hasValidAccessToken);
// }
}
