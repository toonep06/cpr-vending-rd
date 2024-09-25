let errorData;
let currentStep = null;

// โหลดไฟล์ JSON และเรียกใช้งาน Select2 เมื่อโหลดเสร็จ
$(document).ready(function () {
    fetch('errorCodesVdm.json')
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
        backdrop: true
    });
}
