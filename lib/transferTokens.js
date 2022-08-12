const { Token, Repo } = require("../server/db");
const { postGetContributorTokenAmount } = require("../src/requests");

async function transferTokens(
  /*owner:*/ contributor_name,
  /*repo_id:*/ repo_id,
  /*from:*/ from,
  /*to:*/ to,
  /*amount:*/ amount
) {
  try {
    //Repo is in voting
    const repo = await Repo.findOne({ where: { repo_id: repo_id } });
    if (repo.pullrequestId !== null) {
      return "Transfers are frozen while a vote is open. Please try again when voting has closed.";
    }

    //Transfer tokens to self: return 403
    if (to === from) {
      return 403;
    }

    //Get contributor's token amount
    const tokens = await postGetContributorTokenAmount(
      /*owner:*/ "",
      /*repo:*/ "joseph/demo",
      /*pr_id:*/ "",
      /*contributor:*/ from,
      /*side:*/ ""
    );

    //Do not have tokens or transfering in excess of balance: return 403
    if (Number(tokens) < amount || Number(tokens) < 1) {
      return 403;
    }

    //Else proceed with transfer and return 201
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
