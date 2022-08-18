const { PullRequest } = require("../../server/db");
async function getVoteNoTotals(
  /*owner:*/ owner,
  /*repo:*/ repo,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  const repo_id = `${owner}/${repo}`;
  try {
    let pullRequest = await PullRequest.findOne({
      where: { pr_id: pr_id, repo_id: repo_id },
    });
    return pullRequest.noTokenAmount;
  } catch (error) {
    console.log(error);
    return error;
  }
}
module.exports = getVoteNoTotals;
