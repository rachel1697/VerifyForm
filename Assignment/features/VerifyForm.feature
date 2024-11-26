Feature: Verify Form

Description:
Verify that the text input element with xpath .//input[@name='my-disabled'] is disabled in the form
Verify that the text input with value 'Readonly input' is in readonly state by using 2 xpaths
Verify that the dropdown field to select color is having 8 elements using 2 xpaths
Verify that the submit button is disabled when no data is entered in Name field
Verify that the submit button enabled when both Name and Password field is entered
Verify that on submit of 'Submit' button the page shows 'Received' text
Verify that on submit of form all the data passed to the URL

@verifyform
Scenario: Create Objects for Classes
  Given Create objects for class

@verifyform
Scenario: Visit the webpage and verify disabled text input field
  Given Navigate to the form webpage
  Then Verify that the Disabled Input textbox is disabled
  
@verifyform
Scenario: Verify Read Only Input Text Field
  Given Verify that the Read Only Input textbox is Read Only

@verifyform
Scenario: Verify the Select Color Dropdown
  Given Verify that the Select Colour dropdown has 8 elements and verify color of each element

@verifyform
Scenario: Verify that the Submit button is diabled when Name input field is empty
  Given Verify that the Submit button is disabled when Name input field is empty

@verifyform
Scenario Outline: Verify that the Submit button is enabled when Name and Password input fields are filled
  Given Verify that the Submit button is enabled when Name <name> input field and Password <password> input field are filled
  Examples:
      | name | password  | 
      | name | password  | 

@verifyform
Scenario: Verify that on clicking submit, Received! text is displayed
  Given Verify that on clicking the submit button, Recieved! text is printed on screen

@verifyform
Scenario: Verify that the form data is passed to the URL
  Given Verify that form data is passed to the URL