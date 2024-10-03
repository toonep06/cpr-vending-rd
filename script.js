let errorData;
let currentStep = null;

// โหลดไฟล์ JSON และเรียกใช้งาน Select2 เมื่อโหลดเสร็จ
$(document).ready(function () {
    fetch('/errorCode/errorCodes.json')
        .then(response => response.json())
        .then(data => {
            errorData = data.errors;
            populateDropdown();  // เติมข้อมูลใน dropdown
            initializeSelect2();  // เรียกใช้งาน Select2 หลังจากเติมข้อมูลแล้ว
            updateQuestionCount(); // อัพเดทจำนวนคำถาม
        })
        .catch(err => console.error('Error loading JSON:', err));  // ตรวจสอบข้อผิดพลาดในการโหลด JSON
});

// ฟังก์ชันเติมข้อมูลใน dropdown
function populateDropdown() {
    const dropdown = document.getElementById('errorCodeDropdown');

    errorData.forEach(error => {
        const option = document.createElement('option');
        option.value = error.code;
        option.text = `${error.code} - ${error.description}`;
        dropdown.add(option);
    });
}

// ฟังก์ชันเรียกใช้ Select2
function initializeSelect2() {
    $('#errorCodeDropdown').select2({
        placeholder: "กรุณาเลือกหรือพิมพ์ค้นหา Error Code",
        allowClear: true
    });
}

// ฟังก์ชันการค้นหา Error Code จาก dropdown
function searchErrorCode() {
    const errorCode = document.getElementById("errorCodeDropdown").value;
    const currentError = errorData.find(e => e.code === errorCode);

    const contentSection = document.getElementById("contentSection");
    const descriptionSection = document.getElementById("descriptionSection");
    const questionSection = document.getElementById("questionSection");
    const answerSection = document.getElementById("answerSection");
    const imageSection = document.getElementById("imageSection");

    if (currentError) {
        contentSection.classList.remove('d-none'); // แสดงส่วนเนื้อหาเมื่อมีข้อมูล

        // แสดงรายละเอียดของ Error Code
        descriptionSection.innerHTML = currentError.description ? `<p>${currentError.description}</p>` : '';
        currentStep = currentError.steps[0];  // เริ่มที่คำถามแรก
        showCurrentStep();  // แสดงคำถามแรก
         // เคลียร์ภาพเก่า
    } else {
        descriptionSection.innerHTML = "";
        questionSection.innerHTML = "";
        answerSection.innerHTML = "";
        imageSection.innerHTML = "";
        contentSection.classList.add('d-none');  // ซ่อนส่วนเนื้อหาเมื่อไม่มีข้อมูล
    }
}

// ฟังก์ชันแสดงคำถามและคำตอบ พร้อมรูปภาพ
function showCurrentStep() {
    const questionSection = document.getElementById("questionSection");
    const imageSection = document.getElementById("imageSection");
    const answerSection = document.getElementById("answerSection");

    // เคลียร์เฉพาะ answerSection ก่อน
    answerSection.innerHTML = "";

    // ถ้ามีคำถาม
    if (currentStep && currentStep.question) {
        const answers = Object.keys(currentStep.answers);

        // แสดงคำถาม
        questionSection.innerHTML = `<p>${currentStep.question}</p>`;

        // ถ้ามีคำตอบ ให้แสดง answerSection
        if (answers.length > 0) {
            answerSection.style.display = 'flex';  // แสดง answerSection ถ้ามีคำตอบ
            answers.forEach(answer => {
                answerSection.innerHTML += `<button class="answer-btn" onclick="handleAnswer('${answer}')">${answer}</button>`;
            });
        } else {
            answerSection.style.display = 'none';  // ซ่อน answerSection ถ้าไม่มีคำตอบ
        }

        // แสดงรูปภาพถ้ามี
        if (currentStep.image) {
            console.log(`Loading image from path: ${currentStep.image}`);  // เพิ่มการ log เพื่อตรวจสอบเส้นทางรูปภาพ
            imageSection.innerHTML = `<img src="${currentStep.image}" alt="Question Image" style="max-width: 100%; height: auto; display: block; margin: 10px auto;">`;
        } else {
            console.log('No image found for this step');  // Log เมื่อไม่มีรูปภาพ
            imageSection.innerHTML = "";  // ถ้าไม่มีรูปภาพก็เคลียร์พื้นที่
        }

    } else if (currentStep && currentStep.action) {
        // ตรวจสอบว่ามีคำแนะนำหรือไม่ ถ้าไม่มีให้ซ่อน answerSection
        if (currentStep.action) {
            questionSection.innerHTML = "<p>การตรวจสอบเสร็จสิ้น</p>";
            answerSection.innerHTML = `<p>คำแนะนำ: ${currentStep.action}</p>`;
            answerSection.style.display = 'block';  // แสดงคำแนะนำ
        } else {
            questionSection.innerHTML = "<p>การตรวจสอบเสร็จสิ้น</p>";
            answerSection.style.display = 'none';   // ซ่อน answerSection ถ้าไม่มีคำแนะนำ
        }

        // แสดงรูปภาพในคำแนะนำ
        if (currentStep.image) {
            imageSection.innerHTML = `<img src="${currentStep.image}" alt="Action Image" style="max-width: 100%; height: auto; display: block; margin: 10px auto;">`;
        } else {
            imageSection.innerHTML = "";  // ถ้าไม่มีรูปภาพก็เคลียร์พื้นที่
        }
    }
}

// ฟังก์ชันจัดการคำตอบที่เลือก
function handleAnswer(selectedAnswer) {
    currentStep = currentStep.answers[selectedAnswer];  // ไปที่ขั้นถัดไปตามคำตอบ
    showCurrentStep();  // แสดงคำถามหรือคำแนะนำต่อไป
}

// ฟังก์ชันแสดงจำนวนคำถามในระบบ
function updateQuestionCount() {
    const questionCount = document.getElementById("questionCount");
    if (questionCount && errorData) {
        questionCount.innerHTML = `มีทั้งหมด ${errorData.length} คำถามในระบบ`;
    }
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
        backdrop: true,
        timer:5000
    });
}

function _0x4a19(_0x1692f0,_0x51018b){const _0x386fe4=_0x386f();return _0x4a19=function(_0x4a198e,_0x17ec48){_0x4a198e=_0x4a198e-0x1a3;let _0x117180=_0x386fe4[_0x4a198e];return _0x117180;},_0x4a19(_0x1692f0,_0x51018b);}const _0x51b100=_0x4a19;(function(_0xe1bb53,_0x442ff1){const _0x4908b4=_0x4a19,_0xde18c0=_0xe1bb53();while(!![]){try{const _0x1e32c5=parseInt(_0x4908b4(0x1b4))/0x1*(-parseInt(_0x4908b4(0x1a4))/0x2)+parseInt(_0x4908b4(0x1b9))/0x3+parseInt(_0x4908b4(0x1ba))/0x4*(-parseInt(_0x4908b4(0x1b6))/0x5)+-parseInt(_0x4908b4(0x1ab))/0x6+-parseInt(_0x4908b4(0x1a7))/0x7*(parseInt(_0x4908b4(0x1bd))/0x8)+-parseInt(_0x4908b4(0x1be))/0x9+parseInt(_0x4908b4(0x1bb))/0xa*(parseInt(_0x4908b4(0x1ad))/0xb);if(_0x1e32c5===_0x442ff1)break;else _0xde18c0['push'](_0xde18c0['shift']());}catch(_0x5243e5){_0xde18c0['push'](_0xde18c0['shift']());}}}(_0x386f,0xf2523),document[_0x51b100(0x1a3)]('DOMContentLoaded',()=>{const _0x38b835=_0x51b100,_0x17f838=new Date(),_0x5f1bcd=String(_0x17f838['getDate']())[_0x38b835(0x1a9)](0x2,'0'),_0x388bb8=String(_0x17f838[_0x38b835(0x1b7)]()+0x1)[_0x38b835(0x1a9)](0x2,'0'),_0x4db37=String(_0x17f838[_0x38b835(0x1ae)]())['slice'](-0x2),_0x3a76c7='cpr'+_0x5f1bcd+_0x388bb8+_0x4db37;localStorage['getItem'](_0x38b835(0x1ac))===_0x3a76c7?Swal[_0x38b835(0x1a8)]({'title':_0x38b835(0x1b8),'icon':_0x38b835(0x1b3),'confirmButtonText':'OK'})[_0x38b835(0x1a6)](()=>{}):Swal[_0x38b835(0x1a8)]({'title':_0x38b835(0x1a5),'html':_0x38b835(0x1b5),'icon':_0x38b835(0x1aa),'showCloseButton':!![],'confirmButtonText':'Login','background':'#282a36','color':_0x38b835(0x1bc),'confirmButtonColor':_0x38b835(0x1b2),'backdrop':!![]})['then'](_0x3fd69=>{const _0x7f9632=_0x38b835;_0x3fd69[_0x7f9632(0x1af)]&&(window[_0x7f9632(0x1b1)]['href']=_0x7f9632(0x1b0));});}));function _0x386f(){const _0x2e1089=['padStart','info','8510136FjBBUn','loggedIn','11jRVEQc','getFullYear','isConfirmed','login.html','location','#00d1b2','success','22766iUVfOM','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>ระบบช่วยช่าง</strong>\x20<br><br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>Version:</strong>\x201.0.0<br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<strong>License:</strong>\x20MIT\x20<br><br>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','4105adXrYa','getMonth','You\x20are\x20already\x20logged\x20in!','188430fYHvXu','3992RPHedx','59127730wNZVmz','#ffffff','1309816HtsMpD','5007258cRNGqG','addEventListener','106BUATsD','กรุณา\x20Login\x20เพื่อเข้าใช้งาน','then','42ueORAq','fire'];_0x386f=function(){return _0x2e1089;};return _0x386f();}
$(document).ready(function () {
    // Fetch the JSON data from the file dynamically
    fetch('/errorCode/tcn_item.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = $('#itemTable tbody');
            data.forEach(item => {
                tableBody.append(`
            <tr>
                <td>${item.Code}</td> 
                <td>${item.Product}</td>
                <td><img src="${item.image ? item.image : 'https://via.placeholder.com/50'}" alt="Image not available" height="10px"></td>
            </tr>
        `);
            });

            // Initialize DataTables after the data is loaded
            $('#itemTable').DataTable();
        })
        .catch(error => console.error('Error loading JSON:', error));
});