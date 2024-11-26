import { expect } from "@playwright/test";
import { BaseClass } from "./BasePage";


export class VerifyForm extends BaseClass{

    disabledTextField = "//input[@name='my-disabled']"
    readonlyTextField = "//input[@value='Readonly input']"
    readonlyTextField_name = "//input[@name='my-readonly']"
    verifyDropdownColours_number = "//option[contains(@selectedvalue,'')]"
    clickdropdown = "//select[@name='my-select']"
    getDropdownColours = "//select[@name='my-select']//option"
    nameInputField = '//*[@id="my-name-id"]'
    SubmitButton = '//button[@id="submit-form"]'
    passwordInputField = '//input[@id="my-password-id"]'

    async NavigateToWebPage(){
        await this.page.goto('https://d3pv22lioo8876.cloudfront.net/tiptop/')  //Navigates to webpage
    }

    async VerifyDisabledTextInput(){
        let checkDisabledtextField = this.page.locator(this.disabledTextField)
        await expect(checkDisabledtextField).toBeDisabled() //verifies that disabled i/p field is disabled

    }

    async VerifyReadOnlyTextInput(){
        let checkReadolyField = await this.page.locator(this.readonlyTextField)
        let getValueofReadonlyField = await this.page.locator(this.readonlyTextField_name).getAttribute('value')
        expect(checkReadolyField).not.toBeEditable()
        expect(getValueofReadonlyField).toBe('Readonly input')  //verifies that readonly i/p field is not editable and also reads the value
        
    }

    async VerifyDropDownColours(){
        let colour_count = await this.page.locator(this.verifyDropdownColours_number).count()
        expect(colour_count).toBe(8)  //verifies the number of drowpdown colours
        let colours = ['white','violet','indigo','blue','green','yellow','orange','red']
        let colours_fromwebpage:any = []
        let xpath_count = await this.page.locator(this.getDropdownColours).count()
        for(let i=0;i<xpath_count;i++){
            let colour:any = await this.page.locator(this.getDropdownColours).nth(i).getAttribute('value')
            colours_fromwebpage.push(colour)
            
        }
        let flag = true
        for(let i=0;i<colours.length;i++){
            if(colours_fromwebpage[i]==colours[i]){
                continue
            }
            else{
                console.log(colours_fromwebpage[i])
                console.log(colours[i])
                flag = false
                break
            }
        }
        expect(flag).toBe(true)     // validates if all the colours mentioned in array are present in the dropdown

    }

    async VerifySubmitDisabled(){
        let getInputValue = await this.page.inputValue(this.nameInputField)
        if(getInputValue=''){
            let submitbutton_disabled = await this.page.locator(this.SubmitButton)
           expect(submitbutton_disabled).toBeDisabled()    //Verifies that submit button is disabled when name i/p field is empty string

        }
        
    }

    async VerifySubmitEnabled(name:string,password:string){
        let flag = true
        await this.page.locator(this.nameInputField).fill(name)
        await this.page.locator(this.passwordInputField).fill(password)
        let name_getinputvalue = await this.page.inputValue(this.nameInputField)
        let password_getinputvalue = await this.page.inputValue(this.passwordInputField)
        if(name_getinputvalue==name && password_getinputvalue==password){
            let submitbutton_disabled = await this.page.locator(this.SubmitButton)
            await expect(submitbutton_disabled).toBeEnabled()   //verifies that submit is enabled when name and password are not empty
        }
        else{
            flag = false

        }
        expect(flag).toBe(true)

    }

    async VerifyMessageOnSubmit(){
        let flag = false
        let messageRecieved_event = this.page.waitForSelector('#message')
        await this.page.locator(this.SubmitButton).click()
        let messageRecieved = await messageRecieved_event
        if(await messageRecieved.textContent()=='Received!'){
            flag = true


        }
        expect(flag).toBe(true)    //verifies the 'Received! text 
       
        
    }

    async VerifyFormDataInURL(){
        let flag = false
        await this.NavigateToWebPage()
        let entername = 'new_name',password='new_password',colour='blue'
        await this.page.locator(this.nameInputField).fill(entername)
        await this.page.locator(this.passwordInputField).fill(password)
        await this.page.locator(this.clickdropdown).click()
        await this.page.selectOption('.form-select',colour)
        await this.page.locator(this.SubmitButton).click()
        let getFormData = await this.page.url()
        console.log(getFormData)
        if(await getFormData.includes(entername) && getFormData.includes(password) && getFormData.includes(colour)){
            flag=true
        }
        expect(flag).toBe(true)  //Verifies the URL data

        
    }


}