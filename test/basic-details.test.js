import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/LoanBasicDetails/BasicDetails.js';
// Import your class here


describe('Basic details', () => {
  let basicDetails;
  let fetchStub;

  beforeEach(async () => {
    basicDetails = await fixture(html`<basic-details></basic-details>`);
    // Create a stub for the fetch function using Sinon.
    fetchStub = stub(window, 'fetch');
  });

  afterEach(() => {
    // Restore the original fetch function after each test.
    fetchStub.restore();
  });
  it('should capture and process user details correctly', async () => {
    // Mock user input by setting values directly on elements.
    basicDetails.shadowRoot.querySelector('.type').value = 'TestType';
    basicDetails.shadowRoot.querySelector('.amount').value = '15000';
    basicDetails.shadowRoot.querySelector('.period').value = '5';

    // Mock the response from the fetch request.
    const mockResponse = 0;
    fetchStub.resolves({ json: () => mockResponse });

    await basicDetails._captureDetails();

    // Expect that the fetchStub was called with the expected parameters.
    expect(fetchStub.calledOnce).to.be.true;
    expect(fetchStub.firstCall.args[0]).to.equal('https://loanfeapi.herokuapp.com/calculate-emi');
    expect(fetchStub.firstCall.args[1].method).to.equal('POST');
    // You can also add more specific expectations on the fetchStub if needed.

    // Here, you can add expectations to check if the data is processed correctly based on the mock response.
    expect(basicDetails.emiCalc).to.deep.equal(mockResponse);
  });

  it('should handle invalid amount input gracefully', async () => {
    // Mock an input with an amount less than 10,000.
    basicDetails.shadowRoot.querySelector('.amount').value = '5000';

    await basicDetails._captureDetails();

    // Expect that the element's class was modified as expected.
    expect(basicDetails.shadowRoot.querySelector('.amount').classList.contains('e-handle')).to.be.true;
  });

  it('should handle valid amount input correctly', async () => {
    // Mock an input with a valid amount.
    basicDetails.shadowRoot.querySelector('.amount').value = '15000';

    // Mock the response from the fetch request.
    const mockResponse = { emi: 1234.56 };
    fetchStub.resolves({ json: () => mockResponse });

    await basicDetails._captureDetails();

    // Expect that the element's class was not modified.
    expect(basicDetails.shadowRoot.querySelector('.amount').classList.contains('e-handle')).to.be.false;
  });

  it('should correctly convert the amount to words', async () => {
    // Set a specific amount value for testing.
    basicDetails.shadowRoot.querySelector('.amount').value = '12345';

    await basicDetails._numToWord();

    // Expect that the #word element contains the expected text.
    expect(basicDetails.shadowRoot.querySelector('#word').textContent).to.equal('twelve thousand three hundred and forty five only ');
  });

  it('should set the default type', () => {
    // You can test whether the default type is set as expected.
    expect(basicDetails.type).to.equal(null);
  });
  
  // Add more test cases for other methods and interactions as needed.
});

