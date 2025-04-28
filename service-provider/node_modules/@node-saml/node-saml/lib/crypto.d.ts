/// <reference types="node" />
export declare const keyToPEM: (key: string | Buffer) => string | Buffer;
export declare const certToPEM: (cert: string) => string;
export declare const generateUniqueId: () => string;
export declare const removeCertPEMHeaderAndFooter: (certificate: string) => string;
