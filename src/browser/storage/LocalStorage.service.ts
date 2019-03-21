import { BaseStorage } from './BaseStorage.service';

export class LocalStorageService extends BaseStorage {
  private static instance = null; // private the intance case

  /**
   * @description privalize the constructor in case multiple instance
   */
  private constructor() {
    super(window.localStorage);
  }

  /**
   * @description get the instance of LocalStorage
   */
  public static getInstance(): LocalStorageService {
    if (!this.instance) {
      this.instance = new LocalStorageService();
    }
    return this.instance;
  }
}