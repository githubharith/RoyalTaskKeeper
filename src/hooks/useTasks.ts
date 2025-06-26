import { useState, useEffect } from 'react';
import { Task, Log } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    if (user) {
      loadTasks();
      loadLogs();
    }
  }, [user]);

  const loadTasks = () => {
    if (!user) return;
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const userTasks = allTasks.filter((task: Task) => task.userId === user.id);
    setTasks(userTasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      dueDate: new Date(task.dueDate),
      completedAt: task.completedAt ? new Date(task.completedAt) : undefined
    })));
  };

  const loadLogs = () => {
    if (!user) return;
    const allLogs = JSON.parse(localStorage.getItem('logs') || '[]');
    const userLogs = allLogs.filter((log: Log) => log.userId === user.id);
    setLogs(userLogs.map((log: any) => ({
      ...log,
      timestamp: new Date(log.timestamp)
    })));
  };

  const addLog = (action: Log['action'], taskId?: string, taskName?: string) => {
    if (!user) return;
    
    const newLog: Log = {
      id: Date.now().toString(),
      userId: user.id,
      taskId,
      taskName,
      action,
      timestamp: new Date()
    };

    const allLogs = JSON.parse(localStorage.getItem('logs') || '[]');
    allLogs.push(newLog);
    localStorage.setItem('logs', JSON.stringify(allLogs));
    loadLogs();
  };

  const saveTasks = (updatedTasks: Task[]) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const otherUserTasks = allTasks.filter((task: Task) => task.userId !== user?.id);
    const newAllTasks = [...otherUserTasks, ...updatedTasks];
    localStorage.setItem('tasks', JSON.stringify(newAllTasks));
    setTasks(updatedTasks);
  };

  const createTask = (name: string, dueDate: Date) => {
    if (!user) return;

    const newTask: Task = {
      id: Date.now().toString(),
      userId: user.id,
      name,
      createdAt: new Date(),
      dueDate,
      isCompleted: false,
      isActive: true
    };

    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    addLog('created', newTask.id, newTask.name);
  };

  const toggleTaskComplete = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updated = {
          ...task,
          isCompleted: !task.isCompleted,
          completedAt: !task.isCompleted ? new Date() : undefined
        };
        addLog('completed', task.id, task.name);
        return updated;
      }
      return task;
    });
    saveTasks(updatedTasks);
  };

  const toggleTaskActive = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updated = { ...task, isActive: !task.isActive };
        addLog('toggled', task.id, task.name);
        return updated;
      }
      return task;
    });
    saveTasks(updatedTasks);
  };

  const deleteTask = (taskId: string) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    if (taskToDelete) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      saveTasks(updatedTasks);
      addLog('deleted', taskToDelete.id, taskToDelete.name);
    }
  };

  return {
    tasks,
    logs,
    createTask,
    toggleTaskComplete,
    toggleTaskActive,
    deleteTask
  };
};