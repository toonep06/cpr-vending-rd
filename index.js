function showMore() {
    Swal.fire({
        title: 'Learn More',
        html: `
        <h6>ระบบช่วยแนะนำวิธีการซ่อมเครื่อง</h6> <br><br>
        <strong>Version:</strong> 1.0.0<br>
        <strong>License:</strong> MIT <br><br>
      `,
        icon: 'info',
        showCloseButton: true,
        confirmButtonText: 'Close',
        color: 'black',
        confirmButtonColor: '#00d1b2',
        backdrop: true
    });
}

function showAbout() {
    Swal.fire({
        title: 'About the Creator',
        html: `
        <strong>Toon Tony</strong> <br><br>
        <a href="https://line.me/R/ti/p/makkunchon" target="_blank">
        <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/320px-LINE_logo.svg.png?20220419085336" alt="Line"  width="100" height="100" style="display: block; margin: 0 auto;">
        </a><br>
        <strong>Version:</strong> 1.0.0<br>
        <strong>License:</strong> MIT <br><br>
      `,
        icon: 'info',
        showCloseButton: true,
        confirmButtonText: 'Close',
        background: '#282a36',
        color: '#ffffff',
        confirmButtonColor: '#00d1b2',
        backdrop: true
    });
}