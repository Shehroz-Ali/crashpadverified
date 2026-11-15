import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Crewzi (Crashpad Verified) Production Suite", () => {
  it("Homepage loads — search bar and 'Find a crashpad near your base' visible", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://getcrewzi.com" });

    // Dismiss cookie banner if present
    const cookieBtn = await testdriver.find("'Accept all' button in the cookie banner").catch(() => null);
    if (cookieBtn) {
      await cookieBtn.click();
    }

    const assertResult = await testdriver.assert(
      "the heading 'Find a crashpad near your base' and the airport search bar are visible"
    );
    expect(assertResult).toBeTruthy();
  });

  it("Navigate to Community — base selector and guest check-in CTA", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://getcrewzi.com" });

    // Dismiss cookie banner if present
    const cookieBtn = await testdriver.find("'Accept all' button in the cookie banner").catch(() => null);
    if (cookieBtn) {
      await cookieBtn.click();
    }

    const crewBoardLink = await testdriver.find("'Crew Board' link in the top header");
    await crewBoardLink.click();

    const assertCommunity = await testdriver.assert(
      "the community page is visible with base selector pills such as Los Angeles (LAX)"
    );
    expect(assertCommunity).toBeTruthy();

    const laxPill = await testdriver.find("'Los Angeles (LAX)' base pill button");
    await laxPill.click();

    const assertCheckIn = await testdriver.assert(
      "the community board shows the selected base and guest notice to sign in to check in and see local crew"
    );
    expect(assertCheckIn).toBeTruthy();
  });

  it("Open Find a Roommate — filter UI renders", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://getcrewzi.com/roommate-match" });

    const assertPage = await testdriver.assert(
      "the heading 'Find your crew match' and base search input are visible"
    );
    expect(assertPage).toBeTruthy();

    const searchInput = await testdriver.find("search input for base");
    await searchInput.click();
    await testdriver.type("LAX");

    const searchBtn = await testdriver.find("'Search' button next to the base input");
    await searchBtn.click();

    const assertFilters = await testdriver.assert(
      "the roommate filter UI displays role, airline, frequency, and schedule filters"
    );
    expect(assertFilters).toBeTruthy();
  });
});
