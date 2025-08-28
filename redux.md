# Redux Examples - คู่มือการใช้งาน

## สารบัญ
1. [ภาพรวม Redux](#ภาพรวม-redux)
2. [โครงสร้างโปรเจค](#โครงสร้างโปรเจค)
3. [การตั้งค่า Redux Store](#การตั้งค่า-redux-store)
4. [Counter Example](#counter-example)
5. [Todo List Example](#todo-list-example)
6. [แนวคิดสำคัญของ Redux](#แนวคิดสำคัญของ-redux)
7. [Best Practices](#best-practices)

---

## ภาพรวม Redux

Redux เป็น state management library ที่ช่วยในการจัดการ state ของแอปพลิเคชันในที่เดียว ทำให้ข้อมูลมีความสอดคล้องและง่ายต่อการจัดการ

### ข้อดีของการใช้ Redux:
- **Predictable State Updates**: การเปลี่ยนแปลง state เกิดขึ้นผ่าน pure functions
- **Centralized State**: ข้อมูลทั้งหมดเก็บไว้ในที่เดียว
- **Time Travel Debugging**: สามารถติดตามการเปลี่ยนแปลงของ state ได้
- **Scalability**: เหมาะสำหรับแอปพลิเคชันขนาดใหญ่

---

## โครงสร้างโปรเจค

```
src/
├── components/
│   ├── Counter.jsx          # Component สำหรับการนับ
│   ├── Counter.css          # Styles สำหรับ Counter
│   ├── TodoList.jsx         # Component หลักของ Todo List
│   ├── TodoList.css         # Styles สำหรับ Todo List
│   ├── TodoItem.jsx         # Component สำหรับแต่ละ Todo Item
│   └── TodoItem.css         # Styles สำหรับ Todo Item
├── store/
│   ├── store.js             # การตั้งค่า Redux Store
│   ├── counterSlice.js      # Redux Slice สำหรับ Counter
│   └── todoSlice.js         # Redux Slice สำหรับ Todo List
├── App.jsx                  # Component หลัก
├── App.css                  # Styles หลัก
└── index.jsx                # Entry point พร้อม Provider
```

---

## การตั้งค่า Redux Store

### 1. ติดตั้ง Dependencies

```bash
npm install @reduxjs/toolkit react-redux
```

### 2. สร้าง Store (`store/store.js`)

```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todoReducer from './todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
  },
});
```

### 3. เชื่อมต่อ Provider (`index.jsx`)

```javascript
import { Provider } from 'react-redux';
import { store } from './store/store';

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

---

## Counter Example

### ฟีเจอร์ที่มี:
- ✅ เพิ่มค่า (+1)
- ✅ ลดค่า (-1)
- ✅ รีเซ็ตค่า (กลับเป็น 0)
- ✅ เพิ่มค่าตามจำนวนที่กำหนด

### Counter Slice (`store/counterSlice.js`)

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

### การใช้งานใน Component

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../store/counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}
```

---

## Todo List Example

### ฟีเจอร์ที่มี:
- ✅ เพิ่ม Todo ใหม่
- ✅ แก้ไข Todo (double-click หรือกดปุ่มแก้ไข)
- ✅ ลบ Todo
- ✅ ทำเครื่องหมายเสร็จ/ไม่เสร็จ
- ✅ กรองการแสดงผล (ทั้งหมด/ยังไม่เสร็จ/เสร็จแล้ว)
- ✅ ลบ Todo ที่เสร็จแล้วทั้งหมด

### Todo Slice (`store/todoSlice.js`)

```javascript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filter: 'all', // 'all', 'active', 'completed'
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // ... อื่นๆ
  },
});
```

### Selectors

```javascript
// Selectors สำหรับการเลือกข้อมูลจาก state
export const selectTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;
export const selectFilteredTodos = (state) => {
  const todos = selectTodos(state);
  const filter = selectFilter(state);
  
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
```

---

## แนวคิดสำคัญของ Redux

### 1. **Store**
- ที่เก็บ state ของแอปพลิเคชันทั้งหมด
- มีได้เพียงหนึ่งเดียวต่อแอปพลิเคชัน

### 2. **Actions**
- ออบเจคที่บอกว่าเกิดอะไรขึ้นในแอปพลิเคชัน
- ต้องมี `type` property

### 3. **Reducers**
- Pure functions ที่กำหนดว่า state จะเปลี่ยนแปลงอย่างไรตาม action
- ต้อง return state ใหม่ ไม่ใช่ mutate state เดิม

### 4. **Dispatch**
- วิธีการส่ง action ไปยัง store

### 5. **Selectors**
- Functions ที่ใช้ในการเลือกข้อมูลจาก state

---

## Redux Toolkit Benefits

### 1. **createSlice**
- ลดการเขียน boilerplate code
- สร้าง action creators โดยอัตโนมัติ
- ใช้ Immer ภายในทำให้เขียน "mutative" logic ได้

### 2. **configureStore**
- ตั้งค่า store พร้อม best practices
- รวม Redux DevTools Extension
- เพิ่ม middleware ที่จำเป็น

### 3. **createAsyncThunk** (ไม่ได้ใช้ในตัวอย่าง)
- จัดการ async operations
- Handle pending, fulfilled, rejected states

---

## การใช้งาน Hooks

### useSelector
```javascript
// เลือกข้อมูลจาก state
const count = useSelector((state) => state.counter.value);
const todos = useSelector(selectFilteredTodos);
```

### useDispatch
```javascript
// ส่ง action
const dispatch = useDispatch();
dispatch(increment());
dispatch(addTodo('งานใหม่'));
```

---

## Best Practices

### 1. **ตั้งชื่อ Actions ให้ชัดเจน**
```javascript
// ดี
increment, decrement, addTodo, toggleTodo

// ไม่ดี
add, remove, update
```

### 2. **ใช้ Selectors**
```javascript
// สร้าง reusable selectors
export const selectActiveTodos = (state) => 
  state.todos.items.filter(todo => !todo.completed);
```

### 3. **แบ่ง State ตาม Feature**
```javascript
{
  counter: { value: 0 },
  todos: { items: [], filter: 'all' },
  user: { profile: null, isLoggedIn: false }
}
```

### 4. **Normalize State Structure**
```javascript
// ดีสำหรับข้อมูลที่ซับซ้อน
{
  todos: {
    byId: {
      1: { id: 1, text: 'Todo 1' },
      2: { id: 2, text: 'Todo 2' }
    },
    allIds: [1, 2]
  }
}
```

### 5. **ใช้ TypeScript** (แนะนำ)
```typescript
interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};
```

---

## การ Debug

### 1. **Redux DevTools**
- ติดตั้ง Redux DevTools Extension
- ดู state changes แบบ real-time
- Time travel debugging

### 2. **Logging**
```javascript
// เพิ่ม console.log ใน reducers
toggleTodo: (state, action) => {
  console.log('Toggling todo:', action.payload);
  // ...
}
```

---

## ข้อควรระวัง

### 1. **ไม่ควร Mutate State โดยตรง**
```javascript
// ผิด (ใน vanilla Redux)
state.value++;

// ถูก (Redux Toolkit ใช้ Immer)
state.value += 1; // OK ใน createSlice
```

### 2. **ใช้ Redux เมื่อจำเป็น**
- ไม่ใช่ทุก state ต้องอยู่ใน Redux
- Local component state ยังมีประโยชน์

### 3. **ระวัง Performance**
```javascript
// ใช้ useSelector อย่างระมัดระวัง
const entireState = useSelector(state => state); // ไม่ดี
const specificValue = useSelector(state => state.counter.value); // ดี
```

---

## การรันโปรเจค

1. ติดตั้ง dependencies:
   ```bash
   npm install
   ```

2. รันแอปพลิเคชัน:
   ```bash
   npm start
   ```

3. เปิดเบราว์เซอร์ไปที่: `http://localhost:3000`

---

## สรุป

ตัวอย่างนี้แสดงให้เห็นการใช้งาน Redux ในระดับพื้นฐาน ครอบคลุม:

- ✅ การตั้งค่า Redux Store
- ✅ การสร้าง Slices
- ✅ การใช้ useSelector และ useDispatch
- ✅ การจัดการ state แบบ synchronous
- ✅ การใช้ Selectors
- ✅ การจัดระเบียบโครงสร้างโปรเจค

Redux เป็นเครื่องมือที่ทรงพลังสำหรับการจัดการ state ในแอปพลิเคชันขนาดใหญ่ แต่สำหรับโปรเจคเล็กๆ อาจใช้ Context API หรือ local state ก็เพียงพอแล้ว
