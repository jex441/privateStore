const assert = require("assert");
const { getRepoTokenAmount, createRepo } = require("../lib");

describe("getRepoTokenAmount", function () {
  it("should return the amount of tokens belonging to a repo", async function () {
    await createRepo(
      /*owner:*/ "john",
      /*repo:*/ "john/demo",
      /*pr_id:*/ "",
      /*contributor:*/ "222",
      /*side:*/ ""
    );

    let resTokenAmount = await getRepoTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "john/demo",
      /*pr_id:*/ "",
      /*contributor:*/ "",
      /*side:*/ ""
    );

    let tokenAmount = Number(resTokenAmount);

    assert.equal(tokenAmount, 1_000_000, "Failed to get repo token amount");
  });
});
