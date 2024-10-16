window.onload = () => {
    refreshCaptcha();
}

function refreshCaptcha(){
    fetch('http://localhost:5173/generate-captcha')
        .then(response => response.json())
        .then(data => {
            document.getElementById('captcha-image').src = data.image;
        })
        .catch(error => console.error('Error fetching CAPTCHA:', error));
}

document.getElementById('refresh-captcha').addEventListener('click', refreshCaptcha);

document.getElementById('mySubmit').addEventListener('click', function () {
    const userCaptcha = document.getElementById('captcha-input').value;

    fetch('http://localhost:5173/validate-captcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ captchaText: userCaptcha })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('CAPTCHA validation successful! Proceeding with sign-up...');
            // Include sign-up logic here if necessary
        } else {
            alert(data.message);
            refreshCaptcha();  // Refresh CAPTCHA if failed
        }
    })
    .catch(error => console.error('Error validating CAPTCHA:', error));
});
