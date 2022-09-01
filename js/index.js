const loadAllProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
}
const setAllMenu = async () => {
    const data = await loadAllProducts();
    const menu = document.getElementById('all-menu');
    const uniqueArray = [];
    for (const product of data) {

        if (uniqueArray.indexOf(product.category) === -1) {
            uniqueArray.push(product.category);
            // console.log(product.category);
            const li = document.createElement('li');
            li.innerHTML = `<a>${product.category}</a>`;
            menu.appendChild(li);

        }
        else { uniqueArray.push(product.category); }
    }
}
setAllMenu();
const searchField = document.getElementById('search-field');
searchField.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        // console.log(event.key);
        const searchValue = searchField.value;
        const allProducts = await loadAllProducts(searchValue);
        // console.log(allProducts);
        const foundProducts = allProducts.filter(product => product.category.includes(searchValue));
        // console.log(foundProducts);
        const productContainer = document.getElementById('products-container');
        productContainer.textContent = '';
        foundProducts.forEach(product => {
            const { image, title, category } = product;
            const div = document.createElement('div');
            div.innerHTML = `<div class="card card-compact full-width bg-base-100 shadow-xl">
  <figure><img src="${image}" alt="Shoes" class="h-60 w-full"/></figure>
  <div class="card-body">
    <h2 class="card-title">${title.length > 20 ? title.slice(0, 20) + "..." : title}</h2>
    <p>${category}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>`;
            productContainer.appendChild(div);
        });

    }
});