import { createSlice } from "@reduxjs/toolkit";
import { addTodoAPI, deleteTodoApi, updateTodoApi,toggleTodoApi } from "./todoAction";
//1. khai báo khởi tạo state
const initialState = {
  listTodo: [] // chứa danh sách công việc
}
//2. thiết lập cho reducer và định nghĩa các action
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // làm việc với store cục bộ
    addTodo(state, action) {
      state.listTodo.push(action.payload);
    },
  },
  extraReducers: builder => {
    // sau khi gọi api ở action xong trong này mới hoạt động
    builder.addCase(deleteTodoApi.fulfilled, (state, action) => {
      // Xóa todo
      state.listTodo = state.listTodo.filter(row => row.id !== action.payload);

    }) .addCase(deleteTodoApi.rejected, (state, action) => {
      // Xử lý khi yêu cầu xóa todo bị từ chối hoặc xảy ra lỗi
      console.log('Delete todo rejected:', action.error.message);
    });

    builder.addCase(addTodoAPI.fulfilled, (state, action)=>{
      state.listTodo.push(action.payload);
    })
      .addCase(addTodoAPI.rejected, (state, action) => {
        // Xử lý khi yêu cầu thêm todo bị từ chối hoặc xảy ra lỗi
        console.log('Add todo rejected:', action.error.message);
      });

    builder.addCase(updateTodoApi.fulfilled, (state, action)=>{
      // lấy tham số truyền vào
      // console.log(action);
      const { id, ten_nha_hang_ph38422, mo_ta_ph38422, hinh_anh_ph38422, ngay_nhap_ph38422, gia_tien_ph38422 } = action.payload;
      // tìm bản ghi phù hợp với tham số truyền vào
      const todos = state.listTodo.find(row => row.id === id);
      // update
      if (todos ) {
        todos.ten_nha_hang_ph38422 = ten_nha_hang_ph38422; // gán giá trị
        todos.mo_ta_ph38422 = mo_ta_ph38422;
        todos.hinh_anh_ph38422= hinh_anh_ph38422;
        todos.ngay_nhap_ph38422 = ngay_nhap_ph38422;
        todos.gia_tien_ph38422 = gia_tien_ph38422;
      }
    })
      .addCase(updateTodoApi.rejected, (state, action) => {
        // Xử lý khi yêu cầu Sửa todo bị từ chối hoặc xảy ra lỗi
        console.log('Update todo rejected:', action.error.message);
      });

  },


})
// export các thành phần để bên screen có thể sử dụng
export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
