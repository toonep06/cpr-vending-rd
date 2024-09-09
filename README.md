
# TechSolve

TechSolve เป็นระบบช่วยช่างในการซ่อมเครื่อง Vending Machine โดยสามารถค้นหา Error Code และคำแนะนำในการแก้ไขปัญหาต่างๆ ที่เกี่ยวข้อง พร้อมแสดงรูปภาพประกอบการแก้ไขปัญหา

## Features

- ค้นหา Error Code พร้อมคำอธิบายและขั้นตอนการแก้ไขปัญหา
- แสดงรูปภาพประกอบในแต่ละขั้นตอน
- ใช้ Select2 สำหรับการค้นหา Error Code ที่ง่ายขึ้น
- ใช้ Bootstrap สำหรับการจัดการรูปแบบของหน้าเว็บ
- ปรับปรุง UI ด้วยปุ่มค้นหาและปุ่ม About สำหรับแสดงข้อมูลผู้พัฒนา

## Installation

1. Clone โปรเจกต์นี้ลงในเครื่องของคุณ:
    ```bash
    git clone https://github.com/[USERNAME]/[REPOSITORY_NAME].git
    ```

2. เปิดไฟล์ `index.html` ในเบราว์เซอร์ของคุณเพื่อเริ่มใช้งานโปรแกรม.

## Dependencies

- [Bootstrap 5](https://getbootstrap.com/)
- [Select2](https://select2.org/)
- [SweetAlert2](https://sweetalert2.github.io/)

คุณสามารถติดตั้งไลบรารีเพิ่มเติมผ่าน CDN ได้โดยเพิ่มลิงก์ลงใน `index.html`:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
```

## Usage

1. เปิดหน้าเว็บ `index.html`
2. เลือกหรือพิมพ์ Error Code ที่ต้องการค้นหา
3. ระบบจะแสดงรายละเอียดของ Error Code พร้อมคำถาม, คำตอบ และรูปภาพประกอบการแก้ไขปัญหา

## How it Works

- ไฟล์ `errorCodes.json` เก็บข้อมูล Error Code คำอธิบาย และขั้นตอนการแก้ไขปัญหาต่างๆ
- เมื่อผู้ใช้ค้นหา Error Code ระบบจะโหลดข้อมูลจากไฟล์ JSON และแสดงคำถามและรูปภาพที่เกี่ยวข้องในหน้าเว็บ

```json
{
    "errors": [
        {
            "code": "255",
            "description": "มอเตอร์ไม่หมุน",
            "steps": [
                {
                    "question": "สายขาดหรือไม่?",
                    "image": "assets/pic1.jpg",
                    "answers": {
                        "ขาด": { "question": "ต่อสายไฟ" },
                        "ไม่ขาด": { "question": "ตรวจสอบคาปาซิเตอร์ เสียหรือไม่" }
                    }
                }
            ]
        }
    ]
}
```

## MIT License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Toon Tony** - [Contact via Line](https://line.me/R/ti/p/makkunchon)
