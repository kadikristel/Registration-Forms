beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_2.html");
});

describe("Section 1: Functional tests, created by: Kadi-Kristel", () => {
  it("User can use only same both first and validation passwords", () => {
    cy.get("#username").type("kadikristel");
    cy.get("#email").type("kadi@test.com");
    cy.get('[data-cy="name"]').type("Kadi");
    cy.get("#lastName").type("Koop");
    cy.get('[data-testid="phoneNumberTestId"]').type("555666777");
    cy.get("#password").type("Password123");

    cy.get("#confirm").type("Pass321");
    cy.get("h2").contains("Password").click();
    cy.get('[name="confirm"]').type("{enter}");
    cy.window().scrollTo("bottom");
    cy.get("#password_error_message")
      .should("be.visible")
      .should("contain", "Passwords do not match!");

    cy.get("#success_message").should("not.be.visible");
    cy.get("button.submit_button").should("not.be.enabled");
    cy.get('input[name="confirm"]').should(
      "have.attr",
      "title",
      "Both passwords should match"
    );
    cy.get("#confirm").clear().type("Password123");
    cy.get("h2").contains("Password").click();
    cy.get("#password_error_message").should("not.be.visible");
    cy.get("#success_message").should("not.be.visible");
    cy.get("button.submit_button").should("be.enabled");
    cy.get("button.submit_button").click();
    cy.get("#success_message")
      .should("be.visible")
      .should("contain", "User successfully submitted registration");
  });

  it("User can submit form with all fields added", () => {
    cy.get("#username").type("kadikristel");
    cy.get("#email").type("kadi@test.com");
    cy.get('[data-cy="name"]').type("Kadi");
    cy.get("#lastName").type("Koop");
    cy.get('[data-testid="phoneNumberTestId"]').type("555666777");
    cy.get('input[type="radio"]').eq(1).check().should("be.checked");
    cy.get('input[type="checkbox"]').eq(2).check().should("be.checked");
    cy.get("#cars").select(3);
    cy.get("#animal").select(1);
    cy.get("#password").type("Password123");
    cy.get("#confirm").type("Password123");

    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.enabled").click();

    cy.get("#password_error_message").should("not.be.visible");
    cy.get("#input_error_message").should("not.be.visible");
    cy.get("#success_message")
      .should("be.visible")
      .should("contain", "User successfully submitted registration");
  });

  it("User can submit form with valid data and only mandatory fields added", () => {
    inputValidData("kadikristel");
    cy.get("button.submit_button").should("be.enabled").click();
    cy.get("#input_error_message").should("not.be.visible");
    cy.get("#password_error_message").should("not.be.visible");
    cy.get("#success_message")
      .should("be.visible")
      .should("contain", "User successfully submitted registration");
  });

  it("User cannot submit the form when email is not added", () => {
    inputValidData("kadikristel");
    cy.get("#email").scrollIntoView();
    cy.get("#email").clear();
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.disabled");
    cy.get("#success_message").should("not.be.visible");
    cy.get("#input_error_message")
      .should("be.visible")
      .should("contain", "Mandatory input field is not valid or empty!");
  });
});

/*
Assignement 5: create more visual tests
*/

describe("Section 2: Visual tests, created by: Kadi-Kristel", () => {
  it("Check that Cerebrum Hub logo is correct and has correct size", () => {
    cy.log("Will check Cerebrum Hub logo source and size");
    cy.get("#logo")
      .should("have.attr", "src")
      .should("include", "cerebrum_hub_logo");

    cy.get("#logo")
      .invoke("height")
      .should("be.lessThan", 178)
      .and("be.greaterThan", 100);
  });

  it("Check that Cypress logo is correct and has correct size", () => {
    cy.log("Check Cypress logo source and size");
    cy.get('[data-cy="cypress_logo"]')
      .should("have.attr", "src")
      .should("include", "cypress_logo");
    cy.get('[data-cy="cypress_logo"]').invoke("height").should("equal", 88);
    cy.get('[data-cy="cypress_logo"]').invoke("width").should("equal", 116);
  });

  it("Check navigation part, registration form 1", () => {
    cy.get("nav").children().should("have.length", 2);

    // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
    cy.get("nav")
      .siblings("h1")
      .should("have.text", "Registration form number 2");

    // Get navigation element, find its first child, check the link content and click it
    cy.get("nav")
      .children()
      .eq(0)
      .should("be.visible")
      .and("have.attr", "href", "registration_form_1.html")
      .click();

    cy.url().should("contain", "/registration_form_1.html");

    cy.go("back");
    cy.log("Back again in registration form 2");
  });

  it("Check navigation part, registration form 3", () => {
    cy.get("nav").children().should("have.length", 2);

    cy.get("nav")
      .siblings("h1")
      .should("have.text", "Registration form number 2");

    cy.get("nav")
      .children()
      .eq(1)
      .should("be.visible")
      .and("have.attr", "href", "registration_form_3.html")
      .click();

    cy.url().should("contain", "/registration_form_3.html");

    cy.go("back");
    cy.log("Back again in Registration form 2");
  });

  it("Check that radio button list is correct", () => {
    cy.get('input[type="radio"]').should("have.length", 4);

    cy.get('input[type="radio"]').next().eq(0).should("have.text", "HTML");
    cy.get('input[type="radio"]').next().eq(1).should("have.text", "CSS");
    cy.get('input[type="radio"]')
      .next()
      .eq(2)
      .should("have.text", "JavaScript");
    cy.get('input[type="radio"]').next().eq(3).should("have.text", "PHP");

    cy.get('input[type="radio"]').eq(0).should("not.be.checked");
    cy.get('input[type="radio"]').eq(1).should("not.be.checked");
    cy.get('input[type="radio"]').eq(2).should("not.be.checked");
    cy.get('input[type="radio"]').eq(3).should("not.be.checked");

    cy.get('input[type="radio"]').eq(0).check().should("be.checked");
    cy.get('input[type="radio"]').eq(1).check().should("be.checked");
    cy.get('input[type="radio"]').eq(0).should("not.be.checked");
  });

  it("Check that checkbox list is correct", () => {
    cy.get('input[type="checkbox"]').should("have.length", 3);

    cy.get('input[type="checkbox"]')
      .next()
      .eq(0)
      .should("have.text", "I have a bike");
    cy.get('input[type="checkbox"]')
      .next()
      .eq(1)
      .should("have.text", "I have a car");
    cy.get('input[type="checkbox"]')
      .next()
      .eq(2)
      .should("have.text", "I have a boat");

    cy.get('input[type="checkbox"]').eq(0).should("not.be.checked");
    cy.get('input[type="checkbox"]').eq(1).should("not.be.checked");
    cy.get('input[type="checkbox"]').eq(2).should("not.be.checked");

    cy.get('input[type="checkbox"]').eq(0).check().should("be.checked");
    cy.get('input[type="checkbox"]').eq(1).check().should("be.checked");
    cy.get('input[type="checkbox"]').eq(0).should("be.checked");
    cy.get('input[type="checkbox"]').eq(1).should("be.checked");
    cy.get('input[type="checkbox"]').eq(2).should("not.be.checked");
  });

  it("Car dropdown is correct", () => {
    cy.get("#cars").select(1).screenshot("Cars drop-down");
    cy.screenshot("Full page screenshot");

    cy.get("#cars").find("option").should("have.length", 4);

    cy.get("#cars").find("option").eq(0).should("have.text", "Volvo");
    cy.get("#cars").find("option").eq(1).should("have.text", "Saab");
    cy.get("#cars").find("option").eq(2).should("have.text", "Opel");
    cy.get("#cars").find("option").eq(3).should("have.text", "Audi");

    // Advanced level how to check the content of the Cars dropdown
    cy.get("#cars")
      .find("option")
      .then((options) => {
        const actual = [...options].map((option) => option.value);
        expect(actual).to.deep.eq(["volvo", "saab", "opel", "audi"]);
      });
  });

  it("Animal dropdown is correct", () => {
    cy.get("#animal").select(1).screenshot("Animal drop-down");
    cy.screenshot("Full page screenshot");

    cy.get("#animal").find("option").should("have.length", 6);

    cy.get("#animal")
      .find("option")
      .then((options) => {
        const actual = [...options].map((option) => option.value);
        expect(actual).to.deep.eq([
          "dog",
          "cat",
          "snake",
          "hippo",
          "cow",
          "mouse",
        ]);
      });
  });
});

function inputValidData(username) {
  cy.log("Username will be filled");
  cy.get('input[data-testid="user"]').type(username);
  cy.get("#email").type("kadi@test.com");
  cy.get('[data-cy="name"]').type("Kadi");
  cy.get("#lastName").type("Koop");
  cy.get('[data-testid="phoneNumberTestId"]').type("555666777");
  cy.get("#password").type("MyPass");
  cy.get("#confirm").type("MyPass");
  cy.get("h2").contains("Password").click();
}
