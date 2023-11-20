import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/SuccessAndError/Success.js';
import '../src/SuccessAndError/Error.js';

describe('Success screen ', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<loan-success></loan-success>`);
    expect(el).to.not.be.undefined;
  });

  it('calls _toHome when the "Home" button is clicked', async () => {
    const el = await fixture(html`<loan-success></loan-success>`);
    const toHomeStub = stub(el, '_toHome');

    // Find the "Home" button and trigger a click event
    const homeButton = el.shadowRoot.querySelector('.home-btn');
    homeButton.click();

    // Assert that _toHome was called
    expect(toHomeStub.calledOnce).to.be.true;

    // Clean up the stub
    toHomeStub.restore();
  });
});

describe('error screen', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<loan-error></loan-error>`);
    expect(el).to.not.be.undefined;
  });

  it('calls _toHome when the "Home" button is clicked', async () => {
    const el = await fixture(html`<loan-error></loan-error>`);
    const toHomeStub = stub(el, '_toHome');

    // Find the "Home" button and trigger a click event
    const homeButton = el.shadowRoot.querySelector('.home-btn');
    homeButton.click();

    // Assert that _toHome was called
    expect(toHomeStub.calledOnce).to.be.true;

    // Clean up the stub
    toHomeStub.restore();
  });

  // Add more test cases based on your component's behavior
});
