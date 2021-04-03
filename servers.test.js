describe("Servers test (with setup and tear-down)", () => {
  beforeEach(() => {
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', () => {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should not work if server name is empty "", when submitServerInfo() is called', () => {
    serverNameInput.value = "";
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(0);
  })

  it('should add a new TR to the serverTable on UpdateServerTable()', () => {
    submitServerInfo(); // updateServerTable() is called within submitServerInfo

    const serverRowNodes = serverTbody.querySelectorAll('tr');
    expect(serverRowNodes.length).toEqual(1);

    const serverRowCols = serverRowNodes[0].querySelectorAll('td');
    expect(serverRowCols.length).toEqual(3);
    expect(serverRowCols[0].innerText).toEqual('Alice');
    expect(serverRowCols[1].innerText).toEqual('$0.00');
    expect(serverRowCols[2].innerText).toEqual('x');
  })

  afterEach(() => {
    serverNameInput.value = '';
    allServers = {};
    serverTbody.innerHTML = '';
    serverId = 0;
  });
});
