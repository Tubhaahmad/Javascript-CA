const APIURL = "https://v2.api.noroff.dev/rainy-days";
const ERROR_MESSAGE_DEFAULT = "Sumting Wong";
const CURRENCY = "kr";

const containerEl = document.querySelector("#js-products");

if (!containerEl) {
  console.error("JS cannot run!!!");
} else {
  setup();
}

function setup() {
  getProducts();
}

async function getProducts() {
  try {
    const response = await fetch(APIURL);
    const { data, meta } = await response.json();
    data.forEach((item) => {
      const newEl = productTemplate({
        id: item.id,
        title: item.title,
        image: item.image.url,
        imgAlt: item.image.alt,
        price: item.price,
        description: item.description,
      });
      containerEl.innerHTML += newEl;
    });
  } catch (error) {
    console.error(ERROR_MESSAGE_DEFAULT, error?.message);
  }
}

function productTemplate({ id, title, image, imgAlt, price, description }) {
  return `
   <title>Practice</title>
   <article class="product-container">
   <div class="products-list">
    <div class="product-image">
      <img src="${image}" alt=" ${imgAlt}" />
    </div>

    <div class="product-info">
      <h1 class="product-title">${title}</h1>
    
    <div class="product-price">${price} ${CURRENCY}</div>
    <div class="product-description">
      <p>${description}</p>
    </div>
    </div>
    <button class="add-to-cart" id="js-add-to-cart-${id}">Add to cart</button>
  </article>
  `;
}

export function createHTML(template) {
  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(template, "text/html");
  return parsedDocument.body.firstChild;
}
