const { PullRequest } = require("../../server/db");

async function getVoteTotals(
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

    const totalVotedTokens =
      Number(pullRequest.yesTokenAmount) + Number(pullRequest.noTokenAmount);

    return {
      totalVotedTokens: totalVotedTokens,
      yesTokenAmount: pullRequest.yesTokenAmount,
      noTokenAmount: pullRequest.noTokenAmount,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}
module.exports = getVoteTotals;
