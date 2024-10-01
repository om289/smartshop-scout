document.getElementById('fetch-button').addEventListener('click', async () => {
    const productName = document.getElementById('product').value; // Updated to match your input ID
    document.getElementById('loader').style.display = 'block'; // Show the loader

    try {
        const response = await fetch(`/fetch-prices?product=${encodeURIComponent(productName)}`);
        const data = await response.json();

        // Hide the loader
        document.getElementById('loader').style.display = 'none';

        // Display the results
        document.getElementById('flipkart-result').innerText = `Flipkart Price: ${data.flipkart.price} | Link: ${data.flipkart.link}`;
        document.getElementById('amazon-result').innerText = `Amazon Price: ${data.amazon.price} | Link: ${data.amazon.link}`;
        document.getElementById('croma-result').innerText = `Croma Price: ${data.croma.price} | Link: ${data.croma.link}`; // Display Croma result

    } catch (error) {
        document.getElementById('loader').style.display = 'none'; // Hide the loader on error
        console.error('Error fetching prices:', error);
    }
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

        async function fetchPrices() {
            const product = document.getElementById('product').value;
            const response = await fetch(`/fetch-prices?product=${product}`);
            const data = await response.json();
            
            const priceResultsDiv = document.getElementById('price-results');
            priceResultsDiv.innerHTML = `
                <div class="prices">
                    <div>
                        <h2>Flipkart</h2>
                        <p>Price: ${data.flipkart.price}</p>
                        <a href="${data.flipkart.link}" target="_blank">View on Flipkart</a>
                    </div>
                    <div>
                        <h2>Amazon</h2>
                        <p>Price: ${data.amazon.price}</p>
                        <a href="${data.amazon.link}" target="_blank">View on Amazon</a>
                    </div>
                </div>
                 <div>
                        <h2>Croma</h2>
                        <p>Price: ${data.croma.price}</p>
                        <a href="${data.croma.link}" target="_blank">View on Croma</a>
                    </div>
                </div>
            `;
        }


