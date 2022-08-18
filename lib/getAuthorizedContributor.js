const getContributorTokenAmount = require("./getContributorTokenAmount");

async function getAuthorizedContributor(
  /*contributor_id:*/ contributor_id,
  /*repo_id:*/ repo_id
) {
  let owner = repo_id.split("/")[0];
  let repo = repo_id.split("/")[1];
  let tokens = await getContributorTokenAmount(
    owner,
    repo,
    "",
    contributor_id,
    ""
  );
  if (Number(tokens) >= 1) {
    return true;
  } else {
    return false;
  }
}

module.exports = getAuthorizedContributor;
