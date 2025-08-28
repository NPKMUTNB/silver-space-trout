
# silver-space-trout (React + Redux + Vite)

## คำอธิบายโปรเจ็ค

โปรเจ็คนี้เป็นตัวอย่างแอปพลิเคชัน React ที่ใช้ Redux สำหรับการจัดการ state และพัฒนาโดยใช้ Vite เพื่อความรวดเร็วในการ build และพัฒนา เหมาะสำหรับผู้ที่ต้องการศึกษาหรือเริ่มต้นสร้างแอป React ที่มีการจัดการ state แบบสมัยใหม่

### ฟีเจอร์หลัก
- ตัวอย่างการใช้งาน Redux (counter, todo list)
- โครงสร้างโปรเจ็คแยกไฟล์ชัดเจน (components, store)
- ใช้ Vite สำหรับพัฒนาและ build
- ตัวอย่างการเขียนเทสด้วย React Testing Library

## วิธีเริ่มต้นใช้งาน

1. ติดตั้ง dependencies
	```bash
	npm install
	```
2. รันเซิร์ฟเวอร์สำหรับพัฒนา
	```bash
	npm run dev
	```
	เปิดเบราว์เซอร์ไปที่ [http://localhost:5173/](http://localhost:5173/)

3. รันเทส
	```bash
	npm test
	```

4. สร้างไฟล์สำหรับ production
	```bash
	npm run build
	```

## โครงสร้างโปรเจ็ค

- `src/` โค้ดหลักของแอปพลิเคชัน
  - `components/` คอมโพเนนต์ UI เช่น Counter, TodoList
  - `store/` การตั้งค่า Redux store และ slice ต่าง ๆ
- `public/` ไฟล์ static เช่น รูปภาพ favicon
- `index.html` หน้า HTML หลัก
- `package.json` ข้อมูล dependencies และ scripts

## เทคโนโลยีที่ใช้
- React
- Redux Toolkit
- Vite
- React Testing Library

## ข้อมูลเพิ่มเติม

- [React documentation](https://react.dev/)
- [Redux Toolkit documentation](https://redux-toolkit.js.org/)
- [Vite documentation](https://vitejs.dev/)

---
โปรเจ็คนี้เหมาะสำหรับการเรียนรู้และต่อยอดพัฒนาแอปพลิเคชัน React ที่มีการจัดการ state แบบมืออาชีพ

You can learn more in the [Vite documentation](https://vitejs.dev/guide/).

To learn Vitest, a Vite-native testing framework, go to [Vitest documentation](https://vitest.dev/guide/)

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://sambitsahoo.com/blog/vite-code-splitting-that-works.html](https://sambitsahoo.com/blog/vite-code-splitting-that-works.html)

### Analyzing the Bundle Size

This section has moved here: [https://github.com/btd/rollup-plugin-visualizer#rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer#rollup-plugin-visualizer)

### Making a Progressive Web App

This section has moved here: [https://dev.to/hamdankhan364/simplifying-progressive-web-app-pwa-development-with-vite-a-beginners-guide-38cf](https://dev.to/hamdankhan364/simplifying-progressive-web-app-pwa-development-with-vite-a-beginners-guide-38cf)

### Advanced Configuration

This section has moved here: [https://vitejs.dev/guide/build.html#advanced-base-options](https://vitejs.dev/guide/build.html#advanced-base-options)

### Deployment

This section has moved here: [https://vitejs.dev/guide/build.html](https://vitejs.dev/guide/build.html)

### Troubleshooting

This section has moved here: [https://vitejs.dev/guide/troubleshooting.html](https://vitejs.dev/guide/troubleshooting.html)
