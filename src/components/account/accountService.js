const model = require('./accountModel');
const bcrypt = require('bcrypt');
const cloudinary = require('../../config/cloudinary.config');

/**
 * Lay 1 account len tu database bang id
 * @param id {@link mongoose.Types.ObjectId}
 * @returns {Promise<*|{mess: string}>}
 */
module.exports.getById = async (id) => {
  try {
    const account = await model.findByPk(id);
    if (account === null) {
      return { mess: `Account id '${id}' not found` };
    }
    return account;
  } catch (err) {
    throw err;
  }
};

/**
 * Lay 1 account len tu database bang username
 * @param username
 * @returns {Promise<*|{mess: string}>}
 */
module.exports.getByUsername = async (username) => {
  try {
    return await model.findOne({ where: { username }});
  } catch (err) {
    throw err;
  }
};

module.exports.validatePassword = async (user, password) => {
  return await bcrypt.compare(password, user.password);
}
/**
 * Them account moi vao database
 * @param newAccount
 * @returns {Promise<string>}
 */
module.exports.insert = async ({ _id, username, email, password }) => {
  try {
    const isExisted_username = await model.findOne({ where: { username } });

    if (isExisted_username) {
      return null;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      return await model.create({ _id, username, password: hashedPassword });
    }
  } catch (err) {
    throw err;
  }
}

/**
 * Cap nhat thong tin tai khoan co trong database
 *
 * @param id user's id
 * @param updateUser
 * @param file
 * @returns {Promise<[number, Model<TModelAttributes, TCreationAttributes>[]]>}
 */
exports.update = async (id, updateUser, file) => {
  try {
    // Upload avatar len cloudinary
    let result;
    if (file) {
      result = await cloudinary.uploader.upload(
          file.path,
          {
            public_id: id,
            folder: 'user_avatar',
            use_filename: true
          });
    }

    /*
     Lay avatar url
     Neu khong co avatar duoc up len, url bo trong
    */
    const { url } = result ?? "";
    // Update user's info
    updateUser.avatar_url = url;
    return await model.update(updateUser, { where: { id }});
  } catch (err) {
    throw err;
  }
}