describe('Helpers.js - Calculation Tests and DOM & Global Var Manipulation', () => {
  beforeAll(() => {
    billAmtInput.value = 249.99;
    tipAmtInput.value = 11;
    serverNameInput.value = 'Alice';
    submitPaymentInfo();
    submitServerInfo();
  })
  it('should calculate the aggregate tip amount on all payments through sumPaymentTotal())', () => {
    expect(sumPaymentTotal('tipAmt')).toEqual(11);
    expect(sumPaymentTotal('billAmt')).toEqual(249.99);
    expect(sumPaymentTotal('tipPercent')).toEqual(4);
  })

  it('should return the tip percentage based on bill and tip amount through calculateTipPercent()', () => {
    expect(calculateTipPercent(100, 10)).toEqual(10);
    expect(calculateTipPercent(1000, 123.99)).toEqual(12);
  })

  it('should remove a payment from the allPayments object on deleteFromGlobals()', () => {
    deleteFromGlobals(Object.keys(allPayments)[0]);
    expect(Object.keys(allPayments).length).toEqual(0);
  })
  it('should remove a server from the allServers object on deleteFromGlobals()', () => {
    deleteFromGlobals(Object.keys(allServers)[0]);
    expect(Object.keys(allServers).length).toEqual(0);
  })

  afterAll(() => {
    billAmtInput.value = '';
    tipAmtInput.value = '';
    allPayments = {};
    paymentId = 0;
    serverNameInput.value = '';
    allServers = {};
    serverTbody.innerHTML = '';
    serverId = 0;
    paymentTbody.innerHTML = '';
    for (td of summaryTds) {
      td.innerText = '';
    }
  })
})

describe('Helpers.js - HTML Element Creation Tests', () => {
  it('should append tds to a provided TR through appendTd()', () => {
    let testTR = document.createElement('tr');
    let testValues = ['', 'batman', '123', 12, true];

    for (value of testValues) {
      appendTd(testTR, value)
    }

    let testTDs = testTR.querySelectorAll('td');
    expect(testTDs.length).toEqual(testValues.length);
  })

  it('should append a tds w/ nested delete button to a provided TR through appendDeleteBtn()', () => {
    let testTR = document.createElement('tr');
    appendDeleteBtn(testTR);
    let testTrTd = testTR.querySelector('td');
    expect(testTrTd.innerText).toEqual('x');
    expect(testTrTd.childNodes[0].tagName).toEqual('BUTTON');
  })
})