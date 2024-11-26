import { Page } from "@playwright/test";

export class BaseClass{
    page:Page
    constructor(page:Page){
        this.page = page

    }
}