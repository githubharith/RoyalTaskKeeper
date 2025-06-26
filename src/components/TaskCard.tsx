import React from 'react';
import { Task } from '../types';
import { format, isPast, isAfter } from 'date-fns';
import { Trash2, Clock, CheckCircle, Circle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onToggleActive: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onToggleActive, onDelete }) => {
  const isOverdue = isPast(task.dueDate) && !task.isCompleted;
  const isCompletedOnTime = task.isCompleted && task.completedAt && isAfter(task.dueDate, task.completedAt);

  const getStatusColor = () => {
    if (task.isCompleted && isCompletedOnTime) return 'border-green-500 bg-green-500 bg-opacity-10';
    if (isOverdue) return 'border-royal-crimson bg-royal-crimson bg-opacity-10';
    return 'border-royal-gold bg-royal-gold bg-opacity-5';
  };

  const getStatusIcon = () => {
    if (task.isCompleted) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
    return <Circle className="h-5 w-5 text-royal-gold" />;
  };

  return (
    <div className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-lg animate-slide-up ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => onToggleComplete(task.id)}
            className="transition-colors duration-200 hover:scale-110"
          >
            {getStatusIcon()}
          </button>
          <div className="flex-1">
            <h3 className={`font-semibold text-white ${task.isCompleted ? 'line-through text-opacity-60' : ''}`}>
              {task.name}
            </h3>
            <div className="flex items-center space-x-4 mt-1 text-sm text-royal-brown-light">
              <span className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>Due: {format(task.dueDate, 'MMM dd, yyyy HH:mm')}</span>
              </span>
              <span>Created: {format(task.createdAt, 'MMM dd, yyyy')}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Active/Inactive Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={task.isActive}
              onChange={() => onToggleActive(task.id)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-royal-brown-dark peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-royal-gold rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-royal-gold after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-blue"></div>
          </label>
          
          {/* Delete Button */}
          <button
            onClick={() => onDelete(task.id)}
            className="text-royal-crimson hover:text-royal-crimson-light transition-colors duration-200 hover:scale-110"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Status Indicators */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full ${task.isActive ? 'bg-royal-blue text-white' : 'bg-gray-500 text-gray-200'}`}>
            {task.isActive ? 'Active' : 'Inactive'}
          </span>
          
          {task.isCompleted && isCompletedOnTime && (
            <span className="px-2 py-1 bg-green-500 text-white rounded-full">
              Completed On Time
            </span>
          )}
          
          {isOverdue && (
            <span className="px-2 py-1 bg-royal-crimson text-white rounded-full">
              Overdue
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;