let errorData;

// โหลดไฟล์ JSON
fetch('errorCodes.json')
  .then(response => response.json())
  .then(data => {
    errorData = data.errors;
    populateDropdown();  // เติมข้อมูลใน dropdown
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

  // ใช้ Select2 เพื่อทำให้ dropdown ค้นหาได้
  $('#errorCodeDropdown').select2({
    placeholder: "กรุณาเลือก Error Code",
    allowClear: true
  });
}

// ฟังก์ชันการค้นหา Error Code จาก dropdown
function searchErrorCode() {
  const errorCode = document.getElementById("errorCodeDropdown").value;
  const currentError = errorData.find(e => e.code === errorCode);

  const descriptionSection = document.getElementById("descriptionSection");
  const questionSection = document.getElementById("questionSection");
  const answerSection = document.getElementById("answerSection");
  const imageSection = document.getElementById("imageSection");

  if (currentError) {
    // แสดงรายละเอียดของ Error Code
    descriptionSection.innerHTML = `<p>${currentError.description}</p>`;
    currentStep = currentError.steps[0];  // เริ่มที่คำถามแรก
    showCurrentStep();  // แสดงคำถามแรก
    answerSection.innerHTML = "";  // เคลียร์คำแนะนำเก่า
    imageSection.innerHTML = "";   // เคลียร์ภาพเก่า
  } else {
    descriptionSection.innerHTML = "<p>Error Code ไม่ถูกต้อง</p>";
    questionSection.innerHTML = "";
    answerSection.innerHTML = "";
    imageSection.innerHTML = "";
  }
}

function showCurrentStep() {
  const questionSection = document.getElementById("questionSection");
  const imageSection = document.getElementById("imageSection");

  // ถ้ามีคำถาม
  if (currentStep && currentStep.question) {
    const answers = Object.keys(currentStep.answers);
    questionSection.innerHTML = `
      <p>${currentStep.question}</p>
      ${answers.map(answer => `<button onclick="handleAnswer('${answer}')">${answer}</button>`).join('')}
    `;

    // แสดงรูปภาพในคำถาม
    if (currentStep.image) {
      imageSection.innerHTML = `<img src="${currentStep.image}" alt="Question Image">`;
    } else {
      imageSection.innerHTML = "";  // ถ้าไม่มีรูปภาพ ให้เคลียร์ภาพ
    }
  } else if (currentStep && currentStep.action) {
    questionSection.innerHTML = "<p>การตรวจสอบเสร็จสิ้น</p>";
    document.getElementById("answerSection").innerHTML = `<p>คำแนะนำ: ${currentStep.action}</p>`;
    
    // แสดงรูปภาพในคำแนะนำ
    if (currentStep.image) {
      imageSection.innerHTML = `<img src="${currentStep.image}" alt="Action Image">`;
    } else {
      imageSection.innerHTML = "";
    }
  }
}

function handleAnswer(selectedAnswer) {
  currentStep = currentStep.answers[selectedAnswer];  // ไปที่ขั้นถัดไปตามคำตอบ
  showCurrentStep();  // แสดงคำถามหรือคำแนะนำต่อไป
}
