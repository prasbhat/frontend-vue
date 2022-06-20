import moment from 'moment'
import TodoDataService from './TodoDataService'

export default {
  name: 'todo-application',
  components: {},
  props: [],
  data () {
    return {
      todoApplication:[],
      todoApplicationNew: {systemTasksId:0,title:'', description:'', dueDate: null, status:''},
      todoStatus: [],
      isSingle : false,
      hasComments: false,
      isEdit : false,
      isCreate: false,
      showToggleCommentTable: false
    }
  },

  computed: {},

  mounted () {
    this.retrieveAll();
    this.retrieveStatus();
  },

  methods: {
    formatDate(date) {
      return moment(date, 'YYYY-MM-DD').format('DD-MMM-YYYY');
    },

    retrieveAll() {
      TodoDataService.getAll()
      .then(response => (
        this.todoApplication = response.data
      ))
    },

    retrieveStatus() {
      TodoDataService.getStatus()
      .then(response => (this.todoStatus = response.data))
    },

    view(todoApp) {
      this.todoApplication = todoApp
      if(todoApp.todoTaskCommentsSet.length > 0) this.hasComments = true
      this.isSingle = true
    },

    edit(todoApp) {
      this.todoApplication = todoApp;
      this.isSingle = true;
      this.isEdit = true;
      this.todoTaskComments = {todoTaskCommentsId:null, taskComments:'', creationDate: null};
    },

    create() {
      this.isCreate = true;
    },

    deleteById(todoApp) {
      TodoDataService.deleteById(todoApp.systemTasksId)
      location.reload();
    },

    submit(todoApplication, todoTaskComments) {
      var todoTaskCommentsArray= [];
      todoTaskCommentsArray.push(todoTaskComments);
      todoApplication.todoTaskCommentsSet=todoTaskCommentsArray;
      
      TodoDataService.update(todoApplication);
      location.reload();
    },

    createSubmit(data) {      
      TodoDataService.create(data);
      location.reload();
    },

    toggleCommentsTable(){
      this.showToggleCommentTable = !this.showToggleCommentTable;
    }
  }
}