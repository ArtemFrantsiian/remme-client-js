/// <reference types="node-forge" />
import * as forge from "node-forge";
/**
 * @hidden
 */
declare module "node-forge" {
    /**
     * @hidden
     */
    namespace pki {
        interface Certificate {
            privateKey: Key;
        }
        function certificationRequestToPem(cert: Certificate, maxline?: number): PEM;
        function certificationRequestFromPem(pem: PEM, computeHash?: boolean, strict?: boolean): Certificate;
        function createCertificationRequest(): Certificate;
        function publicKeyToAsn1(publicKey: Key): any;
        function publicKeyToRSAPublicKey(publicKey: Key): any;
        namespace rsa {
            function setPublicKey(n: any, e: any): any;
        }
        /**
         * @hidden
         */
        namespace ed25519 {
            function generateKeyPair(obj?: any): any;
            function sign(obj: any): any;
            function verify(obj: any): any;
            function publicKeyFromPrivateKey(obj: any): any;
        }
    }
    /**
     * @hidden
     */
    namespace md {
        namespace sha512 {
            function create(): MessageDigest;
        }
    }
    /**
     * @hidden
     */
    namespace pss {
        function create(any: any): any;
    }
    /**
     * @hidden
     */
    namespace mgf {
        namespace mgf1 {
            function create(any: any): any;
        }
    }
    /**
     * @hidden
     */
    namespace util {
        function ByteBuffer(obj: any, str: string): void;
    }
}
export { forge };
export * from "./models";
export * from "./functions";
export * from "./constants";
