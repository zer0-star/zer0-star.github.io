describe("test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("oh", () => {
    cy.contains("h1", "zer0-star");
  });

  it("navigates to /aaa", () => {
    cy.get("nav a").contains("aaa").click();
    cy.url().should("include", "/aaa");
  });

  it("navigates to /bbb", () => {
    cy.get("nav a").contains("bbb").click();
    cy.url().should("include", "/bbb");
  });
});
