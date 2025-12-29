const video = document.getElementById('preview');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const captureBtn = document.getElementById('capture-btn');

// Iniciar cámara trasera automáticamente
async function initCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: "environment",
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }, 
            audio: false 
        });
        
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.style.border = "5px solid red";
        
        video.srcObject = stream;

        // IMPORTANTE: Forzar el play después de asignar el stream
        video.onloadedmetadata = () => {
            video.play().catch(e => console.error("Error al reproducir video:", e));
        };
        
    } catch (err) {
        alert("Error de cámara: " + err.name);
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