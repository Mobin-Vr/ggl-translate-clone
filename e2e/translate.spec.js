import { expect, test } from "@playwright/test";

test.describe("Google Translate clone — main translation flow", () => {
  test("translates text when a target language is selected", async ({
    page,
  }) => {
    await page.goto("/");

    // Wait for the page to load — the source textarea is the editable one
    const sourceTextarea = page.locator("textarea:not([disabled])").first();
    await sourceTextarea.waitFor({ state: "visible" });

    // Type text into the source textarea
    await sourceTextarea.fill("Hello");

    // Open the target language dropdown and select a language
    await page.getByRole("combobox").click();
    await page.getByRole("option", { name: "French" }).click();

    // The app auto-translates after a 1s debounce — wait for the output
    // textarea (the disabled one) to contain a non-empty translation
    const outputTextarea = page.locator("textarea[disabled]").first();
    await expect(outputTextarea).not.toHaveValue("", { timeout: 15000 });

    // The translated text should be visible on screen
    const translatedValue = await outputTextarea.inputValue();
    expect(translatedValue.trim().length).toBeGreaterThan(0);
  });
});