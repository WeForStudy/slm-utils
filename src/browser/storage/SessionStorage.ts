import { BaseStorage } from './BaseStorage';

export class SessionStorage extends BaseStorage {
  private static instance = null;
  private constructor(){
    super(window.sessionStorage);
  }
  public static getInstance() {
    if (!this.instance) {
      this.instance = new SessionStorage();
    }
    return this.instance;
  }
}