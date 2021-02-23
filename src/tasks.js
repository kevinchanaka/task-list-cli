const {axios} = require('../config');
const taskSchema = require('./schema/task');

/**
 * Class that implements methods to interact with API
 */
function Tasks() {
  return;
}

Tasks.prototype.errorHandler = function(error) {
  throw new Error(error.message);
};

Tasks.prototype.getTasks = async function() {
  let retVal;
  try {
    retVal = (await axios.get('/tasks')).data;
  } catch (error) {
    this.errorHandler(error);
  }
  return retVal;
};

Tasks.prototype.getTask = async function(data) {
  let retVal;
  try {
    retVal = (await axios.get(`/tasks/${data.id}`)).data;
  } catch (error) {
    if (error.response) {
      retVal = error.response.data;
    } else {
      this.errorHandler(error);
    }
  }
  return retVal;
};

Tasks.prototype.addTask = async function(task) {
  let retVal;
  try {
    const validate = taskSchema.validate(task);
    if (validate.error) {
      retVal = {'error': validate.error.details[0].message};
    } else {
      retVal = (await axios.post('/tasks', data=task)).data;
    }
  } catch (error) {
    this.errorHandler(error);
  }
  return retVal;
};

Tasks.prototype.modifyTask = async function(task) {
  let retVal;
  try {
    const taskId = task.id;
    delete task.id;
    const validate = taskSchema.validate(task);
    if (validate.error) {
      retVal = {'error': validate.error.details[0].message};
    } else {
      retVal = (await axios.put(`/tasks/${taskId}`, data=task)).data;
    }
  } catch (error) {
    this.errorHandler(error);
  }
  return retVal;
};

Tasks.prototype.deleteTask = async function(data) {
  let retVal;
  try {
    retVal = (await axios.delete(`/tasks/${data.id}`)).data;
  } catch (error) {
    this.errorHandler(error);
  }
  return retVal;
};

module.exports = Tasks;
