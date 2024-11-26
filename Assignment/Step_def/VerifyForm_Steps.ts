import { Given,Then } from "@cucumber/cucumber";
import { VerifyForm } from "../pages/VerifyForm_page";
import { world } from "@cucumber/cucumber";

let verifyform:VerifyForm

Given(/^Create objects for class$/,async()=>{
    verifyform = new VerifyForm(world.page)
})


Given(/^Navigate to the form webpage$/,async()=>{
    await verifyform.NavigateToWebPage()
    
})

Then(/^Verify that the Disabled Input textbox is disabled$/,async ()=>{
    await verifyform.VerifyDisabledTextInput()

})

Given(/^Verify that the Read Only Input textbox is Read Only$/,async ()=>{
    await verifyform.VerifyReadOnlyTextInput()

})

Given(/^Verify that the Select Colour dropdown has 8 elements and verify color of each element$/,async ()=>{
    await verifyform.VerifyDropDownColours()

})

Given(/^Verify that the Submit button is disabled when Name input field is empty$/,async ()=>{
    await verifyform.VerifySubmitDisabled()

})

Given(/^Verify that the Submit button is enabled when Name (.*) input field and Password (.*) input field are filled$/,async (name:string,password:string)=>{
    await verifyform.VerifySubmitEnabled(name,password)

})

Given(/^Verify that on clicking the submit button, Recieved! text is printed on screen$/,async ()=>{
    await verifyform.VerifyMessageOnSubmit()

})

Given(/^Verify that form data is passed to the URL$/,async()=>{
    await verifyform.VerifyFormDataInURL()

})
