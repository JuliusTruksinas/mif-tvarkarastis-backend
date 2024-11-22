export const transformMongoDbObjectId = (object: any) => ({
  id: object._id,
  ...object,
  _id: undefined,
});
