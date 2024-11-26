import { BeforeAll,Before,After,AfterAll, world, setDefaultTimeout, AfterStep, Status } from "@cucumber/cucumber";
import {Browser, BrowserContext,chromium,Page} from "@playwright/test"

setDefaultTimeout(60*3000)

let browser:Browser
let context:BrowserContext
let page:Page

BeforeAll(async()=>{                   //Hook used to launch browser, create a context and a new page from the context
    browser = await chromium.launch(
        {headless: false, slowMo:500}
    )
    context = await browser.newContext()
    page = await context.newPage()
    
})

Before(async()=>{             //world used to maintain the shared state or context and page before each scenario
    world.context = context
    world.page = page
})

After(async(scenario)=>{     //used to take screenshot of webpage after each scenario 
    let image = await world.page.screenshot({path:`./screenshots/${scenario.pickle.id}.png`})
    world.attach(image,'image/png')

})

AfterStep(async(scenario)=>{  //used to take screenshot of webpage after each step in the scenario in case of failure 
    if(scenario.result.status=== Status.FAILED){
        let image = await world.page.screenshot({path:`./screenshots/${scenario.pickle.id}.png`})
        world.attach(image,'image/png')


    }
})
AfterAll(async()=>{     //closes the browser
    await browser.close()

})