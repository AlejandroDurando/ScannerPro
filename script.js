const cameraInput = document.getElementById('cameraInput');
const output = document.getElementById('output');
const resultContainer = document.getElementById('resultContainer');

cameraInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        // Crear una URL temporal para ver la imagen
        const imageUrl = URL.createObjectURL(file);
        output.src = imageUrl;
        resultContainer.style.display = 'block';
        
        // Opcional: Liberar memoria cuando la imagen cargue
        output.onload = () => {
            URL.revokeObjectURL(output.src);
        }
    }
});