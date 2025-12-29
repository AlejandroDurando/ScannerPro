const video = document.getElementById('preview');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const captureBtn = document.getElementById('capture-btn');

// Iniciar cámara trasera automáticamente
async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: "environment" // Esto busca la cámara trasera
            }, 
            audio: false 
        });
        
        // Esta es la parte clave: asignar el stream al video
        const videoElement = document.getElementById('preview');
        videoElement.srcObject = stream;
        
        // Forzar el play por si el navegador lo pausa
        videoElement.play(); 
        
    } catch (err) {
        console.error("Error detallado:", err);
        alert("No se pudo acceder a la cámara. Revisa si estás en una pestaña independiente y con HTTPS.");
    }
}

captureBtn.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    
    // Ajustar resolución del canvas a la del video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Dibujar el frame actual en el canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convertir a imagen y mostrar
    const dataUrl = canvas.toDataURL('image/jpeg');
    output.src = dataUrl;
});

// Arrancar al cargar la página
initCamera();