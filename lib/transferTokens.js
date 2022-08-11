const { Token } = require("../server/db");
const postGetContributorTokenAmount = require("../src/requests");

async function transferTokens(
  /*owner:*/ contributor_name,
  /*repo_id:*/ repo_id,
  /*from:*/ from,
  /*to:*/ to,
  /*amount:*/ amount
) {
  const tokens = await postGetContributorTokenAmount(
    "",
    repo_id,
    "",
    contributor_id,
    ""
  );

  if (Number(tokens) > amount || Number(tokens) < 1) {
    return 403;
  }

  try {
    await Token.create({
      from: from,
      to: to,
      repo_id: repo_id,
      amount: String(amount),
    });
    return 201;
  } catch (error) {
    return error;
  }
}

module.exports = transferTokens;
