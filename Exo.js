//Pour me souvenir: Attendre que le DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionner le conteneur des produits et les éléments du panier
    const productsContainer = document.getElementById('products');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    let cart = []; // Initialiser un tableau pour stocker les produits du panier

    // Récupérer les produits de l'API Fake Store
    fetch('https://fakestoreapi.com/products?limit=30')
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(products => {
            // Parcourir chaque produit et créer des éléments HTML pour les afficher
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');

                // Ajouter le contenu HTML pour chaque produit
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <p>${product.price} €</p>
                    <button data-id="${product.id}" data-price="${product.price}">Ajouter au panier</button>
                `;

                // Ajouter l'élément produit au conteneur des produits
                productsContainer.appendChild(productElement);
            });

            // Ajouter des écouteurs d'événements aux boutons "Ajouter au panier"
            const buttons = document.querySelectorAll('.product button');
            buttons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.getAttribute('data-id');
                    const productPrice = parseFloat(event.target.getAttribute('data-price'));

                    // Ajouter le produit au panier
                    cart.push({ id: productId, price: productPrice });

                    // Mettre à jour le nombre de produits et le prix total dans le panier
                    cartCount.textContent = cart.length;
                    const totalPrice = cart.reduce((total, product) => total + product.price, 0);
                    cartTotal.textContent = totalPrice.toFixed(2);
                });
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des produits:', error);
        });
});
