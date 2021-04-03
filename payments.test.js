describe('payments.js unit testing', () => {
  beforeEach(() => {
    billAmtInput.value = 200;
    tipAmtInput.value = 50;
  })
  // --- submitPaymentInfo() --- 
  it('should add a new payment to the allPayments obj through submitPaymentInfo()', () => {
    submitPaymentInfo()

    expect(Object.keys(allPayments).length).toEqual(1);
  })

  it('should NOT add to allPayments Obj through submitPaymentInfo() if input is missing', () => {
    billAmtInput.value = '';
    tipAmtInput.value = '';
    submitPaymentInfo();
    expect(Object.keys(allPayments).length).toEqual(0);
  })
  it('should reset the payment input form through submitPaymentInfo()', () => {
    submitPaymentInfo();
    expect(billAmtInput.value).toEqual('');
    expect(tipAmtInput.value).toEqual('');
  })

  // --- createCurPayment() ---
  it('should return a payment object from createCurPayment()', () => {
    expect(createCurPayment()).toEqual({
      billAmt: '200',
      tipAmt: '50',
      tipPercent: 25
    })
  })
  it('should return undefined from createCurPayment() when negative input is provided', () => {
    tipAmtInput.value = -12;
    expect(createCurPayment()).toEqual(undefined);
  })
  it('should return undefined from createCurPayment() when an empty input is provided', () => {
    tipAmtInput.value = '';
    expect(createCurPayment()).toEqual(undefined);
  })
  it('should return a payment object from createCurPayment() even if the customer stiffs the waiter', () => {
    tipAmtInput.value = 0;
    expect(createCurPayment()).toEqual({
      billAmt: '200',
      tipAmt: '0',
      tipPercent: 0
    })
  })

  // appendPaymentTable()
  it('should append a new row to the paymentTable on appendPaymentTable()', () => {
    const curPayment = createCurPayment();
    appendPaymentTable(curPayment);

    const paymentTRs = paymentTbody.querySelectorAll('tr');
    const paymentTDs = paymentTRs[0].querySelectorAll('td');
    expect(paymentTRs.length).toEqual(1)
    expect(paymentTDs.length).toEqual(3);
    expect(paymentTDs[0].innerText).toEqual('$200');
    expect(paymentTDs[1].innerText).toEqual('$50');
    expect(paymentTDs[2].innerText).toEqual('25%');
  })

  // updateSummary()
  it('should add a tr to the shiftSummary table from updateSummary()', () => {
    submitPaymentInfo();
    expect(summaryTds.length).toEqual(3);
    expect(summaryTds[0].innerText).toEqual('$200');
    expect(summaryTds[1].innerText).toEqual('$50');
    expect(summaryTds[2].innerText).toEqual('25%');
  })

  afterEach(() => {
    allPayments = {};
    paymentTbody.innerHTML = '';
    paymentId = 0;
    for (td of summaryTds) {
      td.innerText = "";
    }
  })
})