export const getDeliveryPrice = ({
  store: {
    services = {},
  } = {},
  cart = {},
  deliveryMethod,
}) => {
  if (deliveryMethod == null && cart.deliveryMethod == null)
    return 0
  if (services[deliveryMethod || cart.deliveryMethod.productId] == null)
    return 0

  const price = services[deliveryMethod || cart.deliveryMethod.productId].price || 0
  const freeThreshold = services[deliveryMethod || cart.deliveryMethod.productId].freeThreshold || Infinity

  const partialPrice = getTotalPrice({ cart }) - ((cart.deliveryMethod || {}).price || 0)
  return partialPrice >= freeThreshold ? 0 : Number(price)
}

const getProductPrice = ({ cartProduct }) =>
  (cartProduct.variations || [])
    .reduce((price, variation) => price + Number(variation.price), cartProduct.price)

export const getTotalPrice = ({ cart }) =>
  Object.values(cart)
    .reduce((price, cartProduct) => {
      price += Number((getProductPrice({ cartProduct }) * (cartProduct.quantity || 1)).toFixed(2))
      return price
    }, 0)

export const uniteDuplicateProducts = cart => {
  for (let cartProductId in cart)
    for (let cartProductIdB in cart)
      if (cartProductId !== cartProductIdB) {
        const productA = cart[cartProductId]
        const productB = cart[cartProductIdB]
        if (productA.productId === productB.productId &&
            productA.notes === productB.notes &&
            (productA.variations || []).length === (productB.variations || []).length &&
            (productA.variations || []).filter(variation => !searchVariation({ variation, variations: productB.variations })).length === 0) {
          productA.quantity += productB.quantity
          delete cart[cartProductIdB]
        }
      }

  return cart
}

const searchVariation = ({ variation, variations = [] }) => {
  return variations.filter(variationB => variation.variationId === variationB.variationId).length > 0
}

export const checkCart = ({ cart, products }) => {
  const response = {}
  for (let cartProductId in cart) {
    const cartProduct = cart[cartProductId]
    if (products[cartProduct.productId] != null) { // Copy only existing products
      response[cartProductId] = {
        ...cartProduct,
        name: products[cartProduct.productId].name,
        price: products[cartProduct.productId].price,
      }
      response[cartProductId].variations = cartProduct.variations
        .map(variation => (products[cartProduct.productId].variations || {})[variation.variationId])
        .filter(variation => variation != null)
    }
  }
  return response
}
