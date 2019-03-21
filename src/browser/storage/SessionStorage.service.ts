import { BaseStorage } from './BaseStorage.service';

export class SessionStorageService extends BaseStorage {
  private static instance = null; // private the intance case
  /**
   * @description privalize the constructor in case multiple instance
   */
  private constructor(){
    super(window.sessionStorage);
  }
  /**
   * @description get the instance of SessionStorage
   */
  public static getInstance(): SessionStorageService {
    if (!this.instance) {
      this.instance = new SessionStorageService();
    }
    return this.instance;
  }
}