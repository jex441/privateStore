const { PullRequest, Repo } = require("../server/db");

async function createPullRequest(
  /*owner:*/ owner,
  /*repo_id:*/ repo_id,
  /*fork_branch:*/ fork_branch,
  /*pr_id:*/ pr_id,
  /*title:*/ title
) {
  try {
    let pr = await PullRequest.create({
      pr_id: pr_id,
      title: title,
      repo_id: repo_id,
    });
    console.log(Object.keys(Repo.prototype));
    return 201;
  } catch (error) {
    return error;
  }
}
module.exports = createPullRequest;
