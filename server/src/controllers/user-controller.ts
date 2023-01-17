import CAWorkerModel from "../models/user-models";

export async function createUser(userCreds: CAWorkerRef) {
  try {
    const user = new CAWorkerModel({ userCreds })
      .save()
      .then(doc => {
        return doc.toObject();
      })
      .catch(e => {
        throw e;
      });

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUsersWithFilter(name: string) {
  try {
    const results = await CAWorkerModel.find({
      name: { $regex: name },
    })
      .then(docs => {
        return docs.map(doc => doc.toObject());
      })
      .catch(e => {
        throw e;
      });

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}
