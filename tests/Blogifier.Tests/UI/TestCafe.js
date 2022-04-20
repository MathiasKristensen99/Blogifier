import { Selector } from "testcafe"

fixture("Login test")

test.page("http://localhost:5000/admin/register")("RegisterWithNoInfo", async t => {
    let validationExists = await Selector(".validation-message").exists
    await t.expect(validationExists).notOk()
    await t.click("#app > div > form > button")

    validationExists = Selector(".validation-message").exists
    await t.expect(validationExists).ok()
})

test.page("http://localhost:5000/admin/register")("PasswordsDoesntMatch", async t => {
    await t
        .typeText("#registerEmail", "test@gmail.com")
        .typeText("#registerName", "TestAdmin")
        .typeText("#registerPassword", "123456")
        .typeText("#registerConfirmPassword", "654321")
        
    await t.click("#app > div > form > button")
    await t.expect(await Selector(".validation-message").withText("Passwords do not match").exists).ok()
})