import { BaseStorage } from './BaseStorage';

export class LocalStorage extends BaseStorage {
  private static instance = null;
  private constructor(){
    super(window.localStorage);
  }
  public static getInstance() {
    if (!this.instance) {
      this.instance = new LocalStorage();
    }
    return this.instance;
  }
}