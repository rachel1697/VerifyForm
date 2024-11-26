"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
(0, cucumber_1.setDefaultTimeout)(60 * 3000);
let browser;
let context;
let page;
(0, cucumber_1.BeforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    browser = yield test_1.chromium.launch({ headless: false, slowMo: 500 });
    context = yield browser.newContext();
    page = yield context.newPage();
}));
(0, cucumber_1.Before)(() => __awaiter(void 0, void 0, void 0, function* () {
    cucumber_1.world.context = context;
    cucumber_1.world.page = page;
}));
(0, cucumber_1.After)((scenario) => __awaiter(void 0, void 0, void 0, function* () {
    let image = yield cucumber_1.world.page.screenshot({ path: `./screenshots/${scenario.pickle.id}.png` });
    cucumber_1.world.attach(image, 'image/png');
}));
(0, cucumber_1.AfterStep)((scenario) => __awaiter(void 0, void 0, void 0, function* () {
    if (scenario.result.status === cucumber_1.Status.FAILED) {
        let image = yield cucumber_1.world.page.screenshot({ path: `./screenshots/${scenario.pickle.id}.png` });
        cucumber_1.world.attach(image, 'image/png');
    }
}));
(0, cucumber_1.AfterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield browser.close();
}));
