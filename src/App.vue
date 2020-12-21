<template>
  <div style="text-align:center">
    <h1>Todo Tracker Application</h1>
    <TodoApplication/>
  </div>
</template>

<script>
import TodoApplication from './TodoApplication/index.vue'

export default {
  name: 'App',
  components: {
    TodoApplication
  }
}
</script>

