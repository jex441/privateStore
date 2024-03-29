const assert = require("assert");
const { createPullRequest } = require("../lib");

describe("createPullRequest", function () {
  it("create a pull request associated with the repo_id supplied", async function () {
    const issue_1 = await createPullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*fork_branch:*/ "pullRequest1",
      /*pr_id:*/ "issue_1",
      /*title:*/ "refactor: deploy with nix"
    );

    const issue_2 = await createPullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*fork_branch:*/ "pullRequest2",
      /*pr_id:*/ "issue_2",
      /*title:*/ "insert column FAVORITE_COLOR on table CONTRIBUTORS"
    );

    const issue_3 = await createPullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*fork_branch:*/ "pullRequest3",
      /*pr_id:*/ "issue_3",
      /*title:*/ "declare as type: module"
    );

    const issue_4 = await createPullRequest(
      /*owner:*/ "joseph",
      /*repo_id:*/ "joseph/demo",
      /*fork_branch:*/ "pullRequest4",
      /*pr_id:*/ "issue_4",
      /*title:*/ "implement feature: read receipt"
    );

    assert.equal(
      issue_1,
      "201",
      "Failed to create a pull request issue_1 in the database"
    );
    assert.equal(
      issue_2,
      "201",
      "Failed to create a pull request issue_2 in the database"
    );
    assert.equal(
      issue_3,
      "201",
      "Failed to create a pull request issue_3 in the database"
    );
    assert.equal(
      issue_4,
      "201",
      "Failed to create a pull request issue_4 in the database"
    );
  });
});
