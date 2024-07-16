document.getElementById('myform').addEventListener('submit', async (event) => {
    debugger;
    event.preventDefault();

    console.log('Form submit event triggered');

    const formData = new FormData(event.currentTarget);

    const formDataJson = {};

    formData.forEach((value, key) => {
        if (value === "") {
            alert('Please enter something');
        }
        formDataJson[key] = value;
    });

    console.log('Form data:', formDataJson);

    try {
        // Send POST request to store form data
        const postResponse = await fetch('http://localhost:3000/formsent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataJson),
        });

        if (!postResponse.ok) {
            throw new Error('Failed to submit form data');
        }

        // Send GET request to retrieve all stored values
        
    } catch (error) {
        console.error('Error:', error);
    }

    fetchDataAndRender();
});


// Function to fetch data and render it
async function fetchDataAndRender() {
    try {
        const getResponse = await fetch('http://localhost:3000/formsent');
        if (!getResponse.ok) {
            throw new Error('Failed to fetch stored data');
        }

        const data = await getResponse.json();
        console.log('Data received:', data);

        // Clear existing divs inside homer
        const homerDiv = document.getElementById('homer');
        homerDiv.innerHTML = '';

        // Create new div elements for each data item
        data.forEach(item => {
            const newDiv = document.createElement('div');
            newDiv.classList.add('task-item'); // Optionally, add a class for styling
            newDiv.innerHTML = `
                <button class="delbtn"> delete </button>
                <p>${item.word}</p>
            `;

            // Add event listener to the delete button inside each newDiv
            const deleteButton = newDiv.querySelector('.delbtn');
            deleteButton.addEventListener('click', () => {
                const word = item.word;
                 sendToBackend(word);
                
            });

            homerDiv.appendChild(newDiv);
        });
    } catch (error) {
        console.error('Error fetching or rendering data:', error);
    }
}

// Call fetchDataAndRender function when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchDataAndRender();
});

// Function to send delete request to backend
async function sendToBackend(word) {
    try {
        const response = await fetch('http://localhost:3000/del', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word: word }),
        });

        if (!response.ok) {
            throw new Error('Failed to register delete click');
        }

        // Optionally, fetch and render data again after deletion
        

    } catch (error) {
        console.log('Error : ', error);
    }

    fetchDataAndRender();

    
}







   




