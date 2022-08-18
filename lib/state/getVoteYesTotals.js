const { Repo, Vote, PullRequest } = require("../../server/db");
async function getVoteYesTotals(
  /*owner:*/ owner,
  /*repo:*/ repo,
  /*pr_id:*/ pr_id,
  /*contributor:*/ contributor_id,
  /*side:*/ side
) {
  try {
    const repo_id = `${owner}/${repo}`;
    let pullRequest = await PullRequest.findOne({
      where: { pr_id: pr_id, repo_id: repo_id },
    });
    return pullRequest.yesTokenAmount;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = getVoteYesTotals;
