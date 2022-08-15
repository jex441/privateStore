const { Token, Repo } = require("../server/db");
const getContributorTokenAmount = require("./getContributorTokenAmount");

async function transferTokens(
  /*owner:*/ contributor_name,
  /*repo_id:*/ repo_id,
  /*from:*/ from,
  /*to:*/ to,
  /*amount:*/ amount
) {
  try {
    //Checks before performing transfer:
    //Is repo in voting:
    const repo = await Repo.findOne({ where: { repo_id: repo_id } });
    if (repo.pullrequestId) {
      return "Transfers are frozen while a vote is open. Please try again when voting has closed.";
    }

    //Is sender === recipient:
    if (to === from) {
      return 403;
    }

    //Get contributor's token amount
    const tokens = await getContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ repo_id,
      /*pr_id:*/ "",
      /*contributor:*/ from,
      /*side:*/ ""
    );

    //Does user have the tokens they are transfering:
    if (Number(tokens) < amount || Number(tokens) < 1) {
      return 403;
    }

    //If checks pass proceed with transfer and return 201
    await Token.create({
      from: from,
      to: to,
      repo_id: repo_id,
      amount: String(amount),
    });
    return 201;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = transferTokens;
