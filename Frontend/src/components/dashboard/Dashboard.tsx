import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HDIcon from '../../assets/icon.png'; 

import Spinner from '../common/Spinner';
import CreateNoteModal from './CreateNoteModal';
import { apiService } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import type { Note } from '../../types';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    loadNotes();
  }, [user, navigate]);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      const notesData = await apiService.getNotes();
      setNotes(notesData);
    } catch (error) {
      setError('Failed to load notes');
      console.error('Error loading notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = async (title: string, content: string) => {
    try {
      const newNote = await apiService.createNote(title, content);
      setNotes(prev => [newNote, ...prev]);
      setIsCreateModalOpen(false);
    } catch (error) {
      setError('Failed to create note');
      console.error('Error creating note:', error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await apiService.deleteNote(noteId);
      setNotes(prev => prev.filter(note => note.id !== noteId));
    } catch (error) {
      setError('Failed to delete note');
      console.error('Error deleting note:', error);
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/signin');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="dashboard-nav">
            <div className="logo">
              <img src={HDIcon} alt="HD Icon" className="logo-image" />
                <span className="logo-text">HD</span>
              </div>
            <h1 className="dashboard-title">Dashboard</h1>
            <button 
              onClick={handleSignOut}
              className="sign-out-btn"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-card">
            <h2 className="welcome-title">Welcome, {user.name}!</h2>
            <p className="welcome-email">Email: {user.email}</p>
          </div>
        </div>

        {/* Create Note Button */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn btn-primary create-note-btn"
        >
          Create Note
        </button>

        {/* Notes Section */}
        <div className="notes-section">
          <h3 className="notes-title">Notes</h3>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="loading-container">
              <Spinner size="lg" />
            </div>
          ) : notes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Create your first note!</p>
            </div>
          ) : (
            <div className="notes-list">
              {notes.map((note) => (
                <div key={note.id} className="note-item">
                  <div className="note-content">
                    <h4 className="note-title">{note.title}</h4>
                    <p className="note-preview">{note.content.substring(0, 100)}...</p>
                    <span className="note-date">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="delete-btn"
                    aria-label="Delete note"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Note Modal */}
        {isCreateModalOpen && (
          <CreateNoteModal
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateNote}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;