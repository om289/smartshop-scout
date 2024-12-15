document.getElementById("product-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let productName = document.getElementById("product-name").value;
    let resultsSection = document.getElementById("results-section");
    let resultsDiv = document.getElementById("results");
    let loader = document.getElementById("loader");

    resultsSection.style.display = "block";
    loader.style.display = "block";
    resultsDiv.innerHTML = "";

    setTimeout(() => {
        loader.style.display = "none";
        let sampleResults = [
            {
                name: productName + " on Amazon",
                price: "₹1,999",
                link: "https://www.amazon.in"
            },
            {
                name: productName + " on Flipkart",
                price: "₹1,850",
                link: "https://www.flipkart.com"
            },
            {
                name: productName + " on eBay",
                price: "₹2,050",
                link: "https://www.ebay.com"
            }
        ];

        sampleResults.forEach(product => {
            let productHtml = `
                <div class="product-card">
                    <h3>${product.name}</h3>
                    <p>Price: <strong>${product.price}</strong></p>
                    <a href="${product.link}" target="_blank">Buy Now</a>
                </div>
            `;
            resultsDiv.innerHTML += productHtml;
        });
    }, 1500);
});
// Slideshow script
let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

showSlides();

// Product Details Image Carousel (Added Dec 2024)
function initCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    let index = 0;
    const slides = carousel.querySelectorAll('.carousel-slide');
    setInterval(() => {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
    }, 4500);
}
