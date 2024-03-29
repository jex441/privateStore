const assert = require("assert");
const { postGetContributorSignature } = require("../src/requests");

describe("postGetContributorSignature", function () {
  it("should return a contributor's signature (ethereum key) based on their name (github login)", async function () {
    let contributorSignature = await postGetContributorSignature(
      "",
      "",
      "",
      "michael"
    );

    assert.equal(
      contributorSignature,
      "968c746475645747da5dfdf939a7b34f4316e52f2a6c383a3c1076d157b15377",
      "Failed to get a contributor's signature based on their name"
    );
  });
});
