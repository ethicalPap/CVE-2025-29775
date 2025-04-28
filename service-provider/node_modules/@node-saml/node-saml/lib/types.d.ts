/// <reference types="node" />
export declare type SignatureAlgorithm = "sha1" | "sha256" | "sha512";
export interface SamlSigningOptions {
    privateKey: string | Buffer;
    signatureAlgorithm?: SignatureAlgorithm;
    xmlSignatureTransforms?: string[];
    digestAlgorithm?: string;
}
export declare const isValidSamlSigningOptions: (options: Partial<SamlSigningOptions>) => options is SamlSigningOptions;
export interface AudienceRestrictionXML {
    Audience?: XMLObject[];
}
export interface CacheItem {
    value: string;
    createdAt: number;
}
export interface CacheProvider {
    saveAsync(key: string, value: string): Promise<CacheItem | null>;
    getAsync(key: string): Promise<string | null>;
    removeAsync(key: string | null): Promise<string | null>;
}
export declare type XMLValue = string | number | boolean | null | XMLObject | XMLValue[];
export declare type XMLObject = {
    [key: string]: XMLValue;
};
export declare type XMLInput = XMLObject;
export declare type XMLOutput = Record<string, any>;
export declare type AuthorizeRequestXML = {
    "samlp:AuthnRequest": XMLInput;
};
export declare type XmlJsObject = {
    [key: string]: string | XmlJsObject | XmlJsObject[] | undefined;
    $?: {
        Value: string;
    };
    _?: string;
};
export declare type SamlResponseXmlJs = XmlJsObject & {
    Response?: SamlAssertionXmlJs | SamlStatusXmlJs;
    LogoutResponse?: unknown;
};
export declare type SamlRequestXmlJs = {
    Request: unknown;
};
export declare type SamlAssertionXmlJs = {
    Assertion: unknown;
};
export declare type SamlStatusXmlJs = {
    Status: [
        {
            StatusCode: [XmlJsObject & {
                StatusCode: [XmlJsObject];
            }];
            StatusMessage: [XmlJsObject];
        }
    ];
};
export declare type CertCallback = (callback: (err: Error | null, cert?: string | string[]) => void) => void;
/**
 * These are SAML options that must be provided to construct a new SAML Strategy
 */
export interface MandatorySamlOptions {
    cert: string | string[] | CertCallback;
    issuer: string;
}
export interface SamlIDPListConfig {
    entries: SamlIDPEntryConfig[];
    getComplete?: string;
}
export interface SamlIDPEntryConfig {
    providerId: string;
    name?: string;
    loc?: string;
}
export declare type LogoutRequestXML = {
    "samlp:LogoutRequest": {
        "saml:NameID": XMLInput;
        [key: string]: XMLValue;
    };
};
export declare type ServiceMetadataXML = {
    EntityDescriptor: {
        [key: string]: XMLValue;
        SPSSODescriptor: XMLObject;
    };
};
export interface NameID {
    value: string | null;
    format: string | null;
}
export interface XmlSignatureLocation {
    reference: string;
    action: "append" | "prepend" | "before" | "after";
}
export declare type RacComparision = "exact" | "minimum" | "maximum" | "better";
interface SamlScopingConfig {
    idpList?: SamlIDPListConfig[];
    proxyCount?: number;
    requesterId?: string[] | string;
}
export declare enum ValidateInResponseTo {
    never = "never",
    ifPresent = "ifPresent",
    always = "always"
}
/**
 * The options required to use a SAML strategy
 * These may be provided by means of defaults specified in the constructor
 */
export interface SamlOptions extends Partial<SamlSigningOptions>, MandatorySamlOptions {
    callbackUrl?: string;
    path: string;
    protocol?: string;
    host: string;
    entryPoint?: string;
    decryptionPvk?: string | Buffer;
    additionalParams: Record<string, string>;
    additionalAuthorizeParams: Record<string, string>;
    identifierFormat: string | null;
    allowCreate: boolean;
    spNameQualifier?: string | null;
    acceptedClockSkewMs: number;
    attributeConsumingServiceIndex?: string;
    disableRequestedAuthnContext: boolean;
    authnContext: string[];
    forceAuthn: boolean;
    skipRequestCompression: boolean;
    authnRequestBinding?: string;
    racComparison: RacComparision;
    providerName?: string;
    passive: boolean;
    idpIssuer?: string;
    audience: string | false;
    scoping?: SamlScopingConfig;
    wantAssertionsSigned: boolean;
    wantAuthnResponseSigned: boolean;
    maxAssertionAgeMs: number;
    generateUniqueId: () => string;
    signMetadata: boolean;
    validateInResponseTo: ValidateInResponseTo;
    requestIdExpirationPeriodMs: number;
    cacheProvider: CacheProvider;
    logoutUrl: string;
    additionalLogoutParams: Record<string, string>;
    logoutCallbackUrl?: string;
    disableRequestAcsUrl: boolean;
    samlAuthnRequestExtensions?: Record<string, unknown>;
    samlLogoutRequestExtensions?: Record<string, unknown>;
    metadataContactPerson?: {
        "@contactType": "technical" | "support" | "administrative" | "billing" | "other";
        Extensions?: string;
        Company?: string;
        GivenName?: string;
        SurName?: string;
        EmailAddress?: [string];
        TelephoneNumber?: [string];
    }[];
    metadataOrganization?: {
        OrganizationName: {
            "@xml:lang": string;
            "#text": string;
        }[];
        OrganizationDisplayName: {
            "@xml:lang": string;
            "#text": string;
        }[];
        OrganizationURL: {
            "@xml:lang": string;
            "#text": string;
        }[];
    };
}
export interface GenerateServiceProviderMetadataParams {
    decryptionCert?: string | null;
    signingCerts?: string | string[] | null;
    issuer: SamlOptions["issuer"];
    callbackUrl: SamlOptions["callbackUrl"];
    logoutCallbackUrl?: SamlOptions["logoutCallbackUrl"];
    identifierFormat?: SamlOptions["identifierFormat"];
    wantAssertionsSigned: SamlOptions["wantAssertionsSigned"];
    decryptionPvk?: SamlOptions["decryptionPvk"];
    privateKey?: SamlOptions["privateKey"];
    signatureAlgorithm?: SamlOptions["signatureAlgorithm"];
    xmlSignatureTransforms?: SamlOptions["xmlSignatureTransforms"];
    digestAlgorithm?: SamlOptions["digestAlgorithm"];
    signMetadata?: SamlOptions["signMetadata"];
    metadataContactPerson?: SamlOptions["metadataContactPerson"];
    metadataOrganization?: SamlOptions["metadataOrganization"];
    generateUniqueId: SamlOptions["generateUniqueId"];
}
export interface StrategyOptions {
    name?: string;
    passReqToCallback?: boolean;
}
/**
 * These options are availble for configuring a SAML strategy
 */
export declare type SamlConfig = Partial<SamlOptions> & StrategyOptions & MandatorySamlOptions;
export interface Profile {
    issuer: string;
    sessionIndex?: string;
    nameID: string;
    nameIDFormat: string;
    nameQualifier?: string;
    spNameQualifier?: string;
    ID?: string;
    mail?: string;
    email?: string;
    ["urn:oid:0.9.2342.19200300.100.1.3"]?: string;
    getAssertionXml?(): string;
    getAssertion?(): Record<string, unknown>;
    getSamlResponseXml?(): string;
    [attributeName: string]: unknown;
}
export declare class ErrorWithXmlStatus extends Error {
    readonly xmlStatus: string;
    constructor(message: string, xmlStatus: string);
}
export {};
