/// <reference types="node" />
/// <reference types="node" />
import * as crypto from "crypto";
import * as querystring from "querystring";
import { ParsedQs } from "qs";
import { AudienceRestrictionXML, CacheProvider, Profile, SamlOptions, SamlConfig, XMLOutput } from "./types";
import { AuthenticateOptions, AuthorizeOptions } from "./passport-saml-types";
declare class SAML {
    /**
     * Note that some methods in SAML are not yet marked as protected as they are used in testing.
     * Those methods start with an underscore, e.g. _generateLogoutRequest
     */
    options: SamlOptions;
    cacheProvider: CacheProvider;
    constructor(ctorOptions: SamlConfig);
    initialize(ctorOptions: SamlConfig): SamlOptions;
    protected getCallbackUrl(host?: string | undefined): string;
    protected signRequest(samlMessage: querystring.ParsedUrlQueryInput): void;
    protected generateAuthorizeRequestAsync(this: SAML, isPassive: boolean, isHttpPostBinding: boolean, host: string | undefined): Promise<string>;
    _generateLogoutRequest(this: SAML, user: Profile): Promise<string>;
    _generateLogoutResponse(this: SAML, logoutRequest: Profile, success: boolean): string;
    _requestToUrlAsync(request: string | null | undefined, response: string | null, operation: string, additionalParameters: querystring.ParsedUrlQuery): Promise<string>;
    _getAdditionalParams(relayState: string, operation: "authorize" | "logout", overrideParams?: querystring.ParsedUrlQuery): querystring.ParsedUrlQuery;
    getAuthorizeUrlAsync(RelayState: string, host: string | undefined, options: AuthorizeOptions): Promise<string>;
    getAuthorizeFormAsync(RelayState: string, host?: string): Promise<string>;
    getLogoutUrlAsync(user: Profile, RelayState: string, options: AuthenticateOptions & AuthorizeOptions): Promise<string>;
    getLogoutResponseUrl(samlLogoutRequest: Profile, RelayState: string, options: AuthenticateOptions & AuthorizeOptions, success: boolean, callback: (err: Error | null, url?: string) => void): void;
    getLogoutResponseUrlAsync(samlLogoutRequest: Profile, RelayState: string, options: AuthenticateOptions & AuthorizeOptions, success: boolean): Promise<string>;
    protected certsToCheck(): Promise<string[]>;
    validatePostResponseAsync(container: Record<string, string>): Promise<{
        profile: Profile | null;
        loggedOut: boolean;
    }>;
    protected validateInResponseTo(inResponseTo: string | null): Promise<void>;
    validateRedirectAsync(container: ParsedQs, originalQuery: string): Promise<{
        profile: Profile | null;
        loggedOut: boolean;
    }>;
    protected hasValidSignatureForRedirect(container: ParsedQs, originalQuery: string): Promise<boolean | void>;
    protected validateSignatureForRedirect(urlString: crypto.BinaryLike, signature: string, alg: string, cert: string): boolean;
    protected verifyLogoutRequest(doc: XMLOutput): void;
    protected verifyLogoutResponse(doc: XMLOutput): Promise<void>;
    protected verifyIssuer(samlMessage: XMLOutput): void;
    protected processValidlySignedAssertionAsync(this: SAML, xml: string, samlResponseXml: string, inResponseTo: string | null): Promise<{
        profile: Profile;
        loggedOut: boolean;
    }>;
    protected checkTimestampsValidityError(nowMs: number, notBefore: string, notOnOrAfter: string, maxTimeLimitMs?: number): Error | null;
    protected checkAudienceValidityError(expectedAudience: string, audienceRestrictions: AudienceRestrictionXML[]): Error | null;
    validatePostRequestAsync(container: Record<string, string>): Promise<{
        profile: Profile;
        loggedOut: boolean;
    }>;
    protected processValidlySignedPostRequestAsync(this: SAML, doc: XMLOutput, dom: Document): Promise<{
        profile: Profile;
        loggedOut: boolean;
    }>;
    protected processValidlySignedSamlLogoutAsync(this: SAML, doc: XMLOutput, dom: Document): Promise<{
        profile: Profile | null;
        loggedOut: boolean;
    }>;
    generateServiceProviderMetadata(this: SAML, decryptionCert: string | null, signingCerts?: string | string[] | null): string;
    /**
     * Process max age assertion and use it if it is more restrictive than the NotOnOrAfter age
     * assertion received in the SAMLResponse.
     *
     * @param maxAssertionAgeMs Max time after IssueInstant that we will accept assertion, in Ms.
     * @param notOnOrAfter Expiration provided in response.
     * @param issueInstant Time when response was issued.
     * @returns {*} The expiration time to be used, in Ms.
     */
    protected calcMaxAgeAssertionTime(maxAssertionAgeMs: number, notOnOrAfter: string, issueInstant: string): number;
    protected mustValidateInResponseTo(hasInResponseTo: boolean): boolean;
}
export { SAML };
