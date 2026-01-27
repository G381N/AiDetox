/* eslint-disable no-unused-vars */
// import api from '../../services/api' // Commented out for mock implementation
import { EventBus, EVENTS } from '../../bus/eventBus'

const state = {
  projects: [],
  activeProject: null
}

const mutations = {
  SET_PROJECTS(state, projects) {
    state.projects = projects
  },
  SET_ACTIVE_PROJECT(state, project) {
    state.activeProject = project
  },
  ADD_PROJECT(state, project) {
    state.projects.push(project)
  },
  UPDATE_PROJECT(state, updatedProject) {
    const index = state.projects.findIndex(p => p.id === updatedProject.id)
    if (index !== -1) {
      state.projects.splice(index, 1, updatedProject)
    }
  },
  DELETE_PROJECT(state, projectId) {
    state.projects = state.projects.filter(p => p.id !== projectId)
  },
  ADD_TASK_TO_PROJECT(state, { projectId, task }) {
    const project = state.projects.find(p => p.id === projectId)
    if (project) {
      if (!project.tasks) {
        project.tasks = []
      }
      project.tasks.push(task)
    }
    if (state.activeProject && state.activeProject.id === projectId) {
      if (!state.activeProject.tasks) {
        state.activeProject.tasks = []
      }
      state.activeProject.tasks.push(task)
    }
  },
  UPDATE_TASK_IN_PROJECT(state, { projectId, task }) {
    const project = state.projects.find(p => p.id === projectId)
    if (project && project.tasks) {
      const index = project.tasks.findIndex(t => t.id === task.id)
      if (index !== -1) {
        project.tasks.splice(index, 1, task)
      }
    }
    if (state.activeProject && state.activeProject.id === projectId && state.activeProject.tasks) {
      const index = state.activeProject.tasks.findIndex(t => t.id === task.id)
      if (index !== -1) {
        state.activeProject.tasks.splice(index, 1, task)
      }
    }
  },
  DELETE_TASK_FROM_PROJECT(state, { projectId, taskId }) {
    const project = state.projects.find(p => p.id === projectId)
    if (project && project.tasks) {
      project.tasks = project.tasks.filter(t => t.id !== taskId)
    }
    if (state.activeProject && state.activeProject.id === projectId && state.activeProject.tasks) {
      state.activeProject.tasks = state.activeProject.tasks.filter(t => t.id !== taskId)
    }
  }
}

const actions = {
  async fetchProjects({ commit }) {
    try {
      // Mock data - in production, use: const response = await api.get('/projects')
      const mockProjects = [
        {
          id: 1,
          title: 'Website Redesign',
          description: 'Redesign company website with modern UI',
          status: 'In Progress',
          dueDate: '2026-03-15',
          tasks: [
            { id: 101, title: 'Create wireframes', status: 'Done', priority: 'High' },
            { id: 102, title: 'Design mockups', status: 'In Progress', priority: 'High' },
            { id: 103, title: 'Develop frontend', status: 'Todo', priority: 'Medium' }
          ]
        },
        {
          id: 2,
          title: 'Mobile App Development',
          description: 'Build cross-platform mobile application',
          status: 'Planning',
          dueDate: '2026-05-20',
          tasks: [
            { id: 201, title: 'Research frameworks', status: 'Done', priority: 'High' },
            { id: 202, title: 'Setup project', status: 'Todo', priority: 'High' }
          ]
        },
        {
          id: 3,
          title: 'API Integration',
          description: 'Integrate third-party APIs for payment processing',
          status: 'Todo',
          dueDate: '2026-04-10',
          tasks: []
        }
      ]
      commit('SET_PROJECTS', mockProjects)
      return mockProjects
    } catch (error) {
      console.error('Error fetching projects:', error)
      throw error
    }
  },

  async createProject({ commit }, projectData) {
    try {
      // Mock create - in production: const response = await api.post('/projects', projectData)
      const newProject = {
        id: Date.now(),
        ...projectData,
        tasks: []
      }
      commit('ADD_PROJECT', newProject)
      EventBus.$emit(EVENTS.PROJECT_CREATED, newProject)
      return newProject
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  },

  async updateProject({ commit }, project) {
    try {
      // Mock update - in production: await api.put(`/projects/${project.id}`, project)
      commit('UPDATE_PROJECT', project)
      EventBus.$emit(EVENTS.PROJECT_UPDATED, project)
      return project
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  },

  async deleteProject({ commit }, projectId) {
    try {
      // Mock delete - in production: await api.delete(`/projects/${projectId}`)
      commit('DELETE_PROJECT', projectId)
      EventBus.$emit(EVENTS.PROJECT_DELETED, { id: projectId })
      return projectId
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  },

  setActiveProject({ commit }, project) {
    commit('SET_ACTIVE_PROJECT', project)
  },

  async createTask({ commit }, { projectId, task }) {
    try {
      const newTask = {
        id: Date.now(),
        ...task
      }
      commit('ADD_TASK_TO_PROJECT', { projectId, task: newTask })
      EventBus.$emit(EVENTS.TASK_CREATED, newTask)
      return newTask
    } catch (error) {
      console.error('Error creating task:', error)
      throw error
    }
  },

  async updateTask({ commit }, { projectId, task }) {
    try {
      commit('UPDATE_TASK_IN_PROJECT', { projectId, task })
      EventBus.$emit(EVENTS.TASK_UPDATED, task)
      return task
    } catch (error) {
      console.error('Error updating task:', error)
      throw error
    }
  },

  async updateTaskStatus({ commit }, { projectId, task, oldStatus }) {
    try {
      commit('UPDATE_TASK_IN_PROJECT', { projectId, task })
      EventBus.$emit(EVENTS.TASK_STATUS_CHANGED, { task, oldStatus })
      return task
    } catch (error) {
      console.error('Error updating task status:', error)
      throw error
    }
  },

  async deleteTask({ commit }, { projectId, taskId }) {
    try {
      commit('DELETE_TASK_FROM_PROJECT', { projectId, taskId })
      EventBus.$emit(EVENTS.TASK_DELETED, { id: taskId })
      return taskId
    } catch (error) {
      console.error('Error deleting task:', error)
      throw error
    }
  }
}

const getters = {
  projectCount: state => state.projects.length,
  completedTaskCount: state => {
    let count = 0
    state.projects.forEach(project => {
      if (project.tasks) {
        count += project.tasks.filter(t => t.status === 'Done').length
      }
    })
    return count
  },
  totalTaskCount: state => {
    let count = 0
    state.projects.forEach(project => {
      if (project.tasks) {
        count += project.tasks.length
      }
    })
    return count
  },
  projectsByStatus: state => status => {
    return state.projects.filter(p => p.status === status)
  },
  activeProjectTasks: state => {
    return state.activeProject?.tasks || []
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

