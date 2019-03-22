"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseStorage_service_1 = require("./BaseStorage.service");
class SessionStorageService extends BaseStorage_service_1.BaseStorage {
    /**
     * @description privalize the constructor in case multiple instance
     */
    constructor() {
        super(window.sessionStorage);
    }
    /**
     * @description get the instance of SessionStorage
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new SessionStorageService();
        }
        return this.instance;
    }
}
SessionStorageService.instance = null; // private the intance case
exports.SessionStorageService = SessionStorageService;
