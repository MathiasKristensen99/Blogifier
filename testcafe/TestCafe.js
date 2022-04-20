import { Selector, ClientFunction } from "testcafe"

fixture("Login test")

test.page("http://185.51.76.36:9888/admin/register")("RegisterWithNoInfo", async t => {
    let validationExists = await Selector(".validation-message").exists
    await t.expect(validationExists).notOk()
    await t.click("#app > div > form > button")

    validationExists = Selector(".validation-message").exists
    await t.expect(validationExists).ok()
})

test.page("http://185.51.76.36:9888/admin/register")("PasswordsDoesntMatch", async t => {
    await t
        .typeText("#registerEmail", "test@gmail.com")
        .typeText("#registerName", "TestAdmin")
        .typeText("#registerPassword", "123456")
        .typeText("#registerConfirmPassword", "654321")
        
    await t.click("#app > div > form > button")
    await t.expect(await Selector(".validation-message").withText("Passwords do not match").exists).ok()
})

test.page("http://185.51.76.36:9888/admin/register")("ItWorks", async t => {
    await t
        .typeText("#registerEmail", "test@gmail.com")
        .typeText("#registerName", "TestAdmin")
        .typeText("#registerPassword", "123456")
        .typeText("#registerConfirmPassword", "123456")
        
    await t.click("#app > div > form > button")
    
    const location = await ClientFunction(() => document.location.href)
    await t.expect(location()).contains("/admin/login")
})

test.page("http://185.51.76.36:9888/admin/login")("EmailDoesntExist", async t => {
    await t
        .typeText("#loginEmail", "test99@gmail.com")
        .typeText("#loginPassword", "123456")
        
    await t.click("#app > div > form > button")
    
    await t.expect(Selector(".account-message").exists).ok()
})

test.page("http://185.51.76.36:9888/admin/login")("PasswordDoesntExist", async t => {
    await t
        .typeText("#loginEmail", "test@gmail.com")
        .typeText("#loginPassword", "654321")
        
    await t.click("#app > div > form > button")
    
    await t.expect(Selector(".account-message").exists).ok()
})

test.page("http://185.51.76.36:9888/admin/login")("RedirectToDashboard", async t => {
    await t
        .typeText("#loginEmail", "test@gmail.com")
        .typeText("#loginPassword", "123456")
        
    await t.click("#app > div > form > button")
    
    const location = await ClientFunction(() => document.location.href)
    await t.expect(location()).contains("/admin/")
})


