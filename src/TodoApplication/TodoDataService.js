import http from "../http-common";

class TodoDataService {
  getAll() {
    return http.get();
  }

  getStatus() {
    return http.get("/status");
  }

  deleteById(id){
    return http.delete(`/${id}`);
  }

  create(data){
    return http.post('',data);
  }

  update(data){
    return http.put('',data);
  }
}
export default new TodoDataService();