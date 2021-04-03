describe("Helpers.js test", () => {
  beforeAll(() => {
    billAmtInput.value = 249.99;
    tipAmtInput.value = 11;
    submitPaymentInfo();
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

  it('should append tds to a provided TR through appendTd()', () => {
    let testTR = document.createElement('tr');
    let testValues = ['', 'batman', '123', 12, true];

    for (value of testValues) {
      appendTd(testTR, value)
    }

    let testTDs = testTR.querySelectorAll('td');
    expect(testTDs.length).toEqual(testValues.length);
  })
})