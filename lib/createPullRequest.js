const { PullRequest, Repo } = require("../server/db");

async function createPullRequest(
  /*owner:*/ owner,
  /*repo_id:*/ repo,
  /*fork_branch:*/ fork_branch,
  /*pr_id:*/ pr_id,
  /*title:*/ title
) {
  try {
    const repo_id = `${owner}/${repo}`;
    await PullRequest.create({
      pr_id: pr_id,
      title: title,
      repo_id: repo_id,
    });
    return 201;
  } catch (error) {
    console.log(error);
    return error;
  }
}
module.exports = createPullRequest;
