const model = require("./productModel");

/**
 * Lay 1 product bang id <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @param id {@link String}
 * @returns {Promise<{product: model}|{mess: string}>}
 */
exports.get = async (id) => {
  try {
    const product = await model.findByPk(id);
    if (product === null) {
      return { mess: `Product id '${id}' not found` };
    }
    return product;
  } catch (err) {
    throw err;
  }
};

/**
 * Phan trang cac product, moi trang co toi da 5 product
 * @param page
 * @returns {Promise<void>}
 */
// exports.paging = async (page) => {
//   try {
//     let perPage = 9; // số lượng sản phẩm xuất hiện trên 1 page
//     page = page || 1;
//
//     return await model
//       .find() // find tất cả các data
//       .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
//       .limit(perPage);
//   } catch (err) {
//     throw err;
//   }
// };

/**
 * Lay list cac san pham <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @returns {Promise<Model<TModelAttributes, TCreationAttributes>[]>}
 */
exports.getAll = async () => {
  try {
    return await model.findAll();
  } catch (err) {
    throw err;
  }
};

/**
 * Them san pham moi vao database va tra ve ket qua san pham da them <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @returns {Promise<{product: model}>}
 * @param product
 */
exports.insert = async (product) => {
  try {
    const currProduct = await model.findByPk(product._id);
    if (currProduct) {
      await model.update(
        { stock: currProduct.stock + parseInt(product.stock) },
        { where: { _id: product._id } }
      );
    } else {
      await model.create(product);
    }
  } catch (err) {
    throw err;
  }
};

/**
 * Tim san pham bang id, update thong tin san pham ton tai trong database
 *
 * @param id
 * @param updateProduct
 * @returns {Promise<{product: model}>}
 */
exports.update = async (id, updateProduct) => {
  try {
    await model.update(updateProduct, { where: { _id: id } });
  } catch (err) {
    throw err;
  }
};

/**
 * Xoa san pham dang co trong database bang id
 *
 * @param id
 * @returns {Promise<number>}
 */
exports.delete = async (id) => {
  try {
    return await model.destroy({ where: { _id: id } });
  } catch (err) {
    throw err;
  }
};
