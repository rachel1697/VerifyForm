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
exports.VerifyForm = void 0;
const test_1 = require("@playwright/test");
const BasePage_1 = require("./BasePage");
class VerifyForm extends BasePage_1.BaseClass {
    constructor() {
        super(...arguments);
        this.disabledTextField = "//input[@name='my-disabled']";
        this.readonlyTextField = "//input[@value='Readonly input']";
        this.readonlyTextField_name = "//input[@name='my-readonly']";
        this.verifyDropdownColours_number = "//option[contains(@selectedvalue,'')]";
        this.clickdropdown = "//select[@name='my-select']";
        this.getDropdownColours = "//select[@name='my-select']//option";
        this.nameInputField = '//*[@id="my-name-id"]';
        this.SubmitButton = '//button[@id="submit-form"]';
        this.passwordInputField = '//input[@id="my-password-id"]';
    }
    NavigateToWebPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.goto('https://d3pv22lioo8876.cloudfront.net/tiptop/'); //Navigates to webpage
        });
    }
    VerifyDisabledTextInput() {
        return __awaiter(this, void 0, void 0, function* () {
            let checkDisabledtextField = this.page.locator(this.disabledTextField);
            yield (0, test_1.expect)(checkDisabledtextField).toBeDisabled(); //verifies that disabled i/p field is disabled
        });
    }
    VerifyReadOnlyTextInput() {
        return __awaiter(this, void 0, void 0, function* () {
            let checkReadolyField = yield this.page.locator(this.readonlyTextField);
            let getValueofReadonlyField = yield this.page.locator(this.readonlyTextField_name).getAttribute('value');
            (0, test_1.expect)(checkReadolyField).not.toBeEditable();
            (0, test_1.expect)(getValueofReadonlyField).toBe('Readonly input'); //verifies that readonly i/p field is not editable and also reads the value
        });
    }
    VerifyDropDownColours() {
        return __awaiter(this, void 0, void 0, function* () {
            let colour_count = yield this.page.locator(this.verifyDropdownColours_number).count();
            (0, test_1.expect)(colour_count).toBe(8); //verifies the number of drowpdown colours
            let colours = ['white', 'violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'];
            let colours_fromwebpage = [];
            let xpath_count = yield this.page.locator(this.getDropdownColours).count();
            for (let i = 0; i < xpath_count; i++) {
                let colour = yield this.page.locator(this.getDropdownColours).nth(i).getAttribute('value');
                colours_fromwebpage.push(colour);
            }
            let flag = true;
            for (let i = 0; i < colours.length; i++) {
                if (colours_fromwebpage[i] == colours[i]) {
                    continue;
                }
                else {
                    console.log(colours_fromwebpage[i]);
                    console.log(colours[i]);
                    flag = false;
                    break;
                }
            }
            (0, test_1.expect)(flag).toBe(true); // validates if all the colours mentioned in array are present in the dropdown
        });
    }
    VerifySubmitDisabled() {
        return __awaiter(this, void 0, void 0, function* () {
            let getInputValue = yield this.page.inputValue(this.nameInputField);
            if (getInputValue = '') {
                let submitbutton_disabled = yield this.page.locator(this.SubmitButton);
                (0, test_1.expect)(submitbutton_disabled).toBeDisabled(); //Verifies that submit button is disabled when name i/p field is empty string
            }
        });
    }
    VerifySubmitEnabled(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let flag = true;
            yield this.page.locator(this.nameInputField).fill(name);
            yield this.page.locator(this.passwordInputField).fill(password);
            let name_getinputvalue = yield this.page.inputValue(this.nameInputField);
            let password_getinputvalue = yield this.page.inputValue(this.passwordInputField);
            if (name_getinputvalue == name && password_getinputvalue == password) {
                let submitbutton_disabled = yield this.page.locator(this.SubmitButton);
                yield (0, test_1.expect)(submitbutton_disabled).toBeEnabled(); //verifies that submit is enabled when name and password are not empty
            }
            else {
                flag = false;
            }
            (0, test_1.expect)(flag).toBe(true);
        });
    }
    VerifyMessageOnSubmit() {
        return __awaiter(this, void 0, void 0, function* () {
            let flag = false;
            let messageRecieved_event = this.page.waitForSelector('#message');
            yield this.page.locator(this.SubmitButton).click();
            let messageRecieved = yield messageRecieved_event;
            if ((yield messageRecieved.textContent()) == 'Received!') {
                flag = true;
            }
            (0, test_1.expect)(flag).toBe(true); //verifies the 'Received! text 
        });
    }
    VerifyFormDataInURL() {
        return __awaiter(this, void 0, void 0, function* () {
            let flag = false;
            yield this.NavigateToWebPage();
            let entername = 'new_name', password = 'new_password', colour = 'blue';
            yield this.page.locator(this.nameInputField).fill(entername);
            yield this.page.locator(this.passwordInputField).fill(password);
            yield this.page.locator(this.clickdropdown).click();
            yield this.page.selectOption('.form-select', colour);
            yield this.page.locator(this.SubmitButton).click();
            let getFormData = yield this.page.url();
            console.log(getFormData);
            if ((yield getFormData.includes(entername)) && getFormData.includes(password) && getFormData.includes(colour)) {
                flag = true;
            }
            (0, test_1.expect)(flag).toBe(true); //Verifies the URL data
        });
    }
}
exports.VerifyForm = VerifyForm;
