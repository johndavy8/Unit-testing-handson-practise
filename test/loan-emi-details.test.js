import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/LoanEMIDetails/LoanEMIDetails.js';

describe('Loan EMI details', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    expect(el).to.not.be.undefined;
  });

  it('displays EMI details correctly after connectedCallback', async () => {
    const emiData = {
      interestRate: 5,
      monthlyEMI: 1000,
      principal: 5000,
      interest: 1000,
      totalAmount: 6000,
    };

    // Stub localStorage.getItem to return the mock EMI data
    const localStorageStub = stub(window.localStorage, 'getItem');
    localStorageStub.withArgs('emi').returns(JSON.stringify(emiData));

    const el = await fixture(html`<loanemi-details></loanemi-details>`);

    // Assert that EMI details are displayed correctly
    expect(el.shadowRoot.querySelector('span').textContent).to.equal('5 %');
    // Add similar assertions for other properties

    // Clean up the stub
    localStorageStub.restore();
  });

  it('calls _toBasicDetails when "Cancel" button is clicked', async () => {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    const toBasicDetailsStub = stub(el, '_toBasicDetails');

    // Find the "Cancel" button and trigger a click event
    const cancelButton = el.shadowRoot.querySelector('.cancel-btn');
    cancelButton.click();

    // Assert that _toBasicDetails was called
    expect(toBasicDetailsStub.calledOnce).to.be.true;

    // Clean up the stub
    toBasicDetailsStub.restore();
  });

  it('calls _toCustomer when "Continue" button is clicked', async () => {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    const toCustomerStub = stub(el, '_toCustomer');

    // Find the "Continue" button and trigger a click event
    const continueButton = el.shadowRoot.querySelector('.continue-btn');
    continueButton.click();

    // Assert that _toCustomer was called
    expect(toCustomerStub.calledOnce).to.be.true;

    // Clean up the stub
    toCustomerStub.restore();
  });

});
