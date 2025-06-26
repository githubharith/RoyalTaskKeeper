import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { format } from 'date-fns';
import { Clock, Search, Filter, Activity } from 'lucide-react';
import { Log } from '../types';

const Logs: React.FC = () => {
  const { logs } = useTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState<Log['action'] | 'all'>('all');

  const getActionColor = (action: Log['action']) => {
    const colors = {
      created: 'text-royal-gold',
      completed: 'text-green-500',
      deleted: 'text-royal-crimson',
      edited: 'text-royal-blue',
      toggled: 'text-purple-400'
    };
    return colors[action];
  };

  const getActionIcon = (action: Log['action']) => {
    return <Activity className={`h-4 w-4 ${getActionColor(action)}`} />;
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.taskName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || log.action === filterAction;
    
    return matchesSearch && matchesAction;
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-royal-gold mb-2">Royal Activity Logs</h1>
        <p className="text-royal-brown-light">Track all your task activities and changes</p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-royal-brown-dark border-2 border-royal-gold rounded-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-royal-gold" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..."
              className="pl-10 w-full px-4 py-3 bg-royal-brown border border-royal-gold text-white placeholder-royal-brown-light rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold transition-all duration-200"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-royal-gold" />
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value as Log['action'] | 'all')}
              className="px-4 py-3 bg-royal-brown border border-royal-gold text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-gold transition-all duration-200"
            >
              <option value="all">All Actions</option>
              <option value="created">Created</option>
              <option value="completed">Completed</option>
              <option value="edited">Edited</option>
              <option value="toggled">Toggled</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {(['created', 'completed', 'edited', 'toggled', 'deleted'] as const).map((action) => {
          const count = logs.filter(log => log.action === action).length;
          return (
            <div key={action} className="bg-royal-brown-dark border-2 border-royal-gold rounded-lg p-4 text-center">
              <h3 className={`text-xl font-bold ${getActionColor(action)}`}>{count}</h3>
              <p className="text-white text-sm capitalize">{action}</p>
            </div>
          );
        })}
      </div>

      {/* Logs List */}
      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-royal-brown-light text-lg">
              {searchTerm || filterAction !== 'all' 
                ? 'No logs match your current filters.' 
                : 'No activity logs yet. Start creating tasks to see your activity history!'}
            </div>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-royal-brown-dark border border-royal-gold rounded-lg p-4 hover:border-royal-gold-light transition-colors duration-200 animate-slide-up"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getActionIcon(log.action)}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold capitalize ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                      {log.taskName && (
                        <>
                          <span className="text-royal-brown-light">task:</span>
                          <span className="text-white font-medium">"{log.taskName}"</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 mt-1 text-sm text-royal-brown-light">
                      <Clock className="h-4 w-4" />
                      <span>{format(log.timestamp, 'MMM dd, yyyy HH:mm:ss')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Logs;