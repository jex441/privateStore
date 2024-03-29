const assert = require("assert");
const {
  postGetPRStatus,
  postSetVote,
  postGetVoteYesTotals,
  postGetVoteNoTotals,
} = require("../src/requests");

let snooze_ms = 5000;

describe("Duplicate voting should result in a 403 error", function () {
  this.timeout(snooze_ms * 12);
  it("Should check if a vote with the contributor's id and pullrequest's id has been created. If so, return 403.", async function () {
    const gabrielVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest3",
      /*contributor_id:*/ "0x0cf39Fb66C908A8aAb733F52BaDbf1ED58036983",
      /*side:*/ "yes"
    );

    const magdaVote = await postSetVote(
      /*owner:*/ "joseph",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "pullRequest3",
      /*contributor_id:*/ "0x0cBA86ac2Cd45DfA9bA798e86b24dCb074E92925",
      /*side:*/ "yes"
    );

    assert.equal(gabrielVote, "403");
    assert.equal(magdaVote, "201");
  });
});
