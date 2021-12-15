const model = require('./productModel');

/**
 * Lay 1 product bang id <br>
 * Nho them await vao truoc ham tra ve neu khong ham tra ve Promise
 *
 * @param id
 * @returns {Promise<{product: model}|{mess: string}>}
 */
exports.get = async (id) => {
  try {
    const product = await model.findByPk(id);
    if (product === null) {
      return {mess: `Product id '${id}' not found`};
    }
    product.price = new Intl.NumberFormat('vn-VN').format(parseFloat(product.price));
    return product;
  } catch (err) {
    throw err;
  }
};

/**
 * Phan trang cac product, moi trang co toi da 5 product
 * @param page
 * @returns {Promise<*[]>}
 */
exports.paging = async (page) => {
  try {
    let perPage = 9; // số lượng sản phẩm xuất hiện trên 1 page
    page = page || 1;

    // Sản phẩm lấy lên từ database
    const products = await model
        .findAll({
          offset: (perPage * page) - perPage,
          limit: perPage
        });

    // reformat lại Object
    products.forEach(e => {
      e.price = new Intl.NumberFormat('vn-VN').format(parseFloat(e.price));
    })
    return products;
  } catch (err) {
    throw err;
  }
};

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
 * @param product
 * @returns {Promise<{product: model}>}
 */
exports.insert = async (product) => {
  const newProduct = await model.build(product);
  try {
    return await newProduct.save();
  } catch (err) {
    throw err;
  }
}