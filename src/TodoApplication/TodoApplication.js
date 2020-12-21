import axios from 'axios';

const TODO_API_URL="http://localhost:8080/Todo"

export default {
  name: 'todo-application',
  components: {},
  props: [],
  data () {
    return {
      // todoAppList : [
      //   { id: 1, title: 'Hardcoded from Vue', description: 'Hardcoded from Vue', dueDate: '25-12-2020', status: 'Not Started' },
      //   { id: 2, title: 'Prepared from Vue component', description: 'Hardcoded from Vue component', dueDate: '20-12-2020', status: 'Not Started' }
      // ]
      todoAppList: [], 
      todoStatus: [],
      todoApp:[],
      isSingle : false,
      isEdit : false
    }
  },
  computed: {

  },
  mounted () {
    this.retrieveAll();
    this.retrieveStatus();
  },

  methods: {
    retrieveAll() {
      axios
      .get(TODO_API_URL+'/findAll')
      .then(response => (this.todoAppList = response.data))
    },

    retrieveStatus() {
      axios
        .get(TODO_API_URL+'/getStatus')
        .then(response => (this.todoStatus = response.data))
     },

    view(todoApp) {
      this.todoApp = todoApp;
      this.isSingle = true
    },

    edit(todoApp) {
      this.todoApp = todoApp;
      this.isSingle = true;
      this.isEdit = true;
    },

    create() {
      this.todoApp={id:0,title:'', description:'', dueDate: new Date(), status:''};
      this.isSingle = true;
      this.isEdit = true;
    },

    deleteById(todoApp) {
      axios
        .delete(TODO_API_URL+'/deleteById/'+todoApp.id)
      location.reload();
    },

    submit(todoApp) {
      axios
        .post(TODO_API_URL+'/create', todoApp)
      location.reload();
    }
  }
}