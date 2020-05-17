import { Injectable } from '@angular/core';
import { EThree } from '@virgilsecurity/e3kit-browser';

@Injectable({
  providedIn: 'root'
})
export class VirgilService {
  eThree: EThree;
  constructor() { }

  async initializeVirgil(tokenCallback) {
    try {
      this.eThree = await EThree.initialize(tokenCallback);
      await this.registerUser();
    } catch (error) {
      console.log(error);
    }
  }
  registerUser() {
    // Register User here
    return this.eThree.register();
  }

  // Enter array of receivers with receiver ID
  async encryptData(recipients: string[]) {
    // Encrypt data here

    try {
      // Lookup user public keys
      const publicKeys = await this.eThree.findUsers(recipients);
      // Encrypt text using target user public keys
      const encryptedText = await this.eThree.encrypt('message', publicKeys);
      return encryptedText;
    } catch (error) {
      console.log(error);
      return null;
    }

  }

  async decryptData(sender: string, encryptedText: string) {
    // Decrypt data here
    try {
      // Lookup sender public key
      const publicKey = await this.eThree.findUsers(sender);

      // Decrypt text and ensure it was written by sender
      const decryptedText = await this.eThree.decrypt(encryptedText, publicKey);

      return decryptedText;
    } catch (error) {
      console.log(error);
      return null;
    }

  }
}
