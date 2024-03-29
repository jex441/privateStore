const { Contributor } = require("../server/db");

async function getContributorSignature(owner, repo, pr_id, contributor_name) {
  try {
    const contributor = await Contributor.findOne({
      where: { contributor_name: contributor_name },
    });
    return contributor.contributor_signature;
  } catch (error) {
    return `There was an error: ${error}`;
  }
}

module.exports = getContributorSignature;
