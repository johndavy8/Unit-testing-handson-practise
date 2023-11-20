import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/Customer/Customer-details.js';

describe('CustomerDetails', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<customer-details></customer-details>`);
    expect(el).to.not.be.undefined;
  });

  it('calls _toEmidetails when the "Next" button is clicked', async () => {
    const el = await fixture(html`<customer-details></customer-details>`);
    const toEmidetailsStub = stub(el, '_toEmidetails');

    // Find the "Next" button and trigger a click event
    const nextButton = el.shadowRoot.getElementById("nextButton")
    nextButton.click();

    // Assert that _toEmidetails was called
    expect(toEmidetailsStub.calledOnce).to.be.true;

    // Clean up the stub
    toEmidetailsStub.restore();
  });

  // Add more test cases based on your component's behavior
});