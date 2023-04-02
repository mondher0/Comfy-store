export const getProducts = async (productUrl) => {
    try {
        const response = await fetch(productUrl);
        let products = await response.json();
        return products;
    } catch (error) {
        console.log(error);
    }
}