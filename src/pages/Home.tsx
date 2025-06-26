import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import { Plus, Calendar, Search } from 'lucide-react';
import { format } from 'date-fns';

const Home: React.FC = () => {
  const { tasks, createTask, toggleTaskComplete, toggleTaskActive, deleteTask } = useTasks();
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim() || !dueDate || !dueTime) return;

    const dueDatetime = new Date(`${dueDate}T${dueTime}`);
    createTask(taskName.trim(), dueDatetime);
    setTaskName('');
    setDueDate('');
    setDueTime('');
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = 
      filterStatus === 'all' ||
      (filterStatus === 'active' && task.isActive && !task.isCompleted) ||
      (filterStatus === 'completed' && task.isCompleted);
    
    return matchesSearch && matchesStatus;
  });

  const activeTasks = tasks.filter(task => task.isActive && !task.isCompleted).length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#965a23] border-2 border-royal-gold rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-royal-gold">{tasks.length}</h3>
          <p className="text-white">Total Tasks</p>
        </div>
        <div className="bg-[#965a23] border-2 border-royal-blue rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-royal-blue">{activeTasks}</h3>
          <p className="text-white">Active Tasks</p>
        </div>
        <div className="bg-[#965a23] border-2 border-green-500 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-green-500">{completedTasks}</h3>
          <p className="text-white">Completed Tasks</p>
        </div>
      </div>

      {/* Task Creation Form */}
      <div className="bg-[#965a23] border-2 border-royal-gold rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-royal-gold mb-4 flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Create New Task
        </h2>
        
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name..."
                className="w-full px-4 py-3 bg-[#5E3A3A] border border-royal-gold text-white placeholder-royal-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-royal-gold" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pl-10 w-full px-4 py-3 bg-[#5E3A3A] border border-royal-gold text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold transition-all duration-200"
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
                className="flex-1 px-4 py-3 bg-[#5E3A3A] border border-royal-gold text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold transition-all duration-200"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-royal-gold hover:bg-royal-gold-light text-royal-brown font-semibold rounded-lg transition-all duration-200 hover:scale-105"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-[#965a23] border-2 border-royal-gold rounded-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-royal-gold" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks..."
              className="pl-10 w-full px-4 py-3 bg-[#5E3A3A] border border-royal-gold text-white placeholder-royal-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold transition-all duration-200"
            />
          </div>
          
          <div className="flex space-x-2">
            {(['all', 'active', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  filterStatus === status
                    ? 'bg-royal-gold text-royal-brown'
                    : 'bg-[#5E3A3A]  border border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-brown'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-royal-brown-light text-lg">
              {searchTerm || filterStatus !== 'all' 
                ? 'No tasks match your current filters.' 
                : 'No tasks yet. Create your first royal task above!'}
            </div>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={toggleTaskComplete}
              onToggleActive={toggleTaskActive}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;