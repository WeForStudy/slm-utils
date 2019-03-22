"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseStorage_service_1 = require("./BaseStorage.service");
class LocalStorageService extends BaseStorage_service_1.BaseStorage {
    /**
     * @description privalize the constructor in case multiple instance
     */
    constructor() {
        super(window.localStorage);
    }
    /**
     * @description get the instance of LocalStorage
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new LocalStorageService();
        }
        return this.instance;
    }
}
LocalStorageService.instance = null; // private the intance case
exports.LocalStorageService = LocalStorageService;
