const model = require('./customerModel');

exports.get = async (id) => {
  try {
    const customer = await model.findByPk(id);
    if (customer === null) {
      return { mess: `Customer id '${id}' not found` };
    }
    return customer;
  } catch (err) {
    throw err;
  }
};

exports.getAll = async () => {
  try {
    return await model.findAll();
  } catch (err) {
    throw err;
  }
};

exports.insert = async (newCustomer) => {
  const customer = model.build(newCustomer);
  try {
    return await customer.save();
  } catch (err) {
    throw err;
  }
}

/**
 * Cap nhat thong tin khach hang co trong database
 *
 * @param id
 * @param updateCustomer
 * @returns {Promise<[Model<TModelAttributes, TCreationAttributes>, boolean]>}
 */
exports.update = async (id, updateCustomer) => {
  try {
    delete updateCustomer.dob;
    delete updateCustomer.sex;

    await model.update(updateCustomer, {
      where: { id },
    });

    return await model.findOne( { where: { id }, raw: true } );
  } catch (err) {
    throw err;
  }
}

/**
 * Tim khach hang bang id xoa khoi database
 * @param id
 * @returns {Promise<*>}
 */
exports.delete = async (id) => {
  try {
    return await model.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
}