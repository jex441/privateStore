const assert = require("assert");
const {
  postGetContributorTokenAmount,
  postTransferTokens,
} = require("../src/requests");

let snooze_ms = 5000;

describe("postTransferTokens should not function while a vote is taking place", function () {
  this.timeout(snooze_ms * 12);
  it("should return a message if transfering while vote is open, else transfer as normal", async function () {
    const josephTransfer = await postTransferTokens(
      /*owner*/ "joseph",
      /*repo_id*/ "joseph/demo",
      /*from*/ "0x0c0DDaD894E3436C34AecD5722F0798Da88Bc971",
      /*to*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*amount*/ "50000"
    );

    const michaelTransfer = await postTransferTokens(
      /*owner*/ "michael",
      /*repo_id*/ "michael/demo",
      /*from*/ "0x0c55D3B26A1229B9D707a4272F55E66103301858",
      /*to*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*amount*/ "50000"
    );

    const magda = await postGetContributorTokenAmount(
      /*owner:*/ "michael",
      /*repo:*/ "michael/demo",
      /*pr_id:*/ "",
      /*contributor_id:*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*side:*/ ""
    );

    const magdaTokenAmount = Number(magda);

    assert.equal(
      josephTransfer,
      "Transfers are frozen while a vote is open. Please try again when voting has closed.",
      "Failed to prevent a transfer while a vote is open"
    );

    assert.equal(
      michaelTransfer,
      "201",
      "Failed to transfer tokens even though there is no vote on michael/demo"
    );

    assert.equal(
      magdaTokenAmount,
      50_000,
      "Failed to transfer tokens to Magda"
    );
  });
});
