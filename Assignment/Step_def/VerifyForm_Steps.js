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
const VerifyForm_page_1 = require("../pages/VerifyForm_page");
const cucumber_2 = require("@cucumber/cucumber");
let verifyform;
(0, cucumber_1.Given)(/^Create objects for class$/, () => __awaiter(void 0, void 0, void 0, function* () {
    verifyform = new VerifyForm_page_1.VerifyForm(cucumber_2.world.page);
}));
(0, cucumber_1.Given)(/^Navigate to the form webpage$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield verifyform.NavigateToWebPage();
}));
(0, cucumber_1.Then)(/^Verify that the Disabled Input textbox is disabled$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield verifyform.VerifyDisabledTextInput();
}));
(0, cucumber_1.Given)(/^Verify that the Read Only Input textbox is Read Only$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield verifyform.VerifyReadOnlyTextInput();
}));
(0, cucumber_1.Given)(/^Verify that the Select Colour dropdown has 8 elements and verify color of each element$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield verifyform.VerifyDropDownColours();
}));
(0, cucumber_1.Given)(/^Verify that the Submit button is disabled when Name input field is empty$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield verifyform.VerifySubmitDisabled();
}));
(0, cucumber_1.Given)(/^Verify that the Submit button is enabled when Name (.*) input field and Password (.*) input field are filled$/, (name, password) => __awaiter(void 0, void 0, void 0, function* () {
    yield verifyform.VerifySubmitEnabled(name, password);
}));
(0, cucumber_1.Given)(/^Verify that on clicking the submit button, Recieved! text is printed on screen$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield verifyform.VerifyMessageOnSubmit();
}));
(0, cucumber_1.Given)(/^Verify that form data is passed to the URL$/, () => __awaiter(void 0, void 0, void 0, function* () {
    yield verifyform.VerifyFormDataInURL();
}));
