const video = document.getElementById('preview');
const canvas = document.getElementById('canvas');
const output = document.getElementById('output');
const captureBtn = document.getElementById('capture-btn');
const startBtn = document.getElementById('start-camera-btn');
const errorLog = document.getElementById('error-log');

// Función para mostrar errores en la pantalla del móvil
function logError(msg) {
    errorLog.style.display = 'block';
    errorLog.innerHTML += `<p>${msg}</p>`;
    console.error(msg);
}

async function initCamera() {
    try {
        // Pedimos permiso
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: "environment",
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }, 
            audio: false 
        });

        video.srcObject = stream;
        
        // Intentamos reproducir
        try {
            await video.play();
        } catch (playError) {
            logError("Autoplay bloqueado. Pulsa el botón verde.");
            startBtn.style.display = 'inline-block'; // Mostramos botón manual
        }

    } catch (err) {
        logError("Error de acceso: " + err.message + "<br>Revisa los permisos del navegador.");
        startBtn.style.display = 'inline-block';
    }
}

// Botón de respaldo para iniciar cámara manualmente (iOS a veces lo requiere)
startBtn.addEventListener('click', async () => {
    startBtn.style.display = 'none';
    errorLog.style.display = 'none'; // Limpiar errores previos
    errorLog.innerHTML = '';
    await initCamera();
});

captureBtn.addEventListener('click', () => {
    if (video.readyState === 0) {
        alert("La cámara aún no está lista.");
        return;
    }
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    output.src = canvas.toDataURL('image/jpeg');
});

// Iniciamos al cargar
initCamera();