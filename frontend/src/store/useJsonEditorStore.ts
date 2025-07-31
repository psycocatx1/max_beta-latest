import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface JsonEditorState {
  expandedNodes: string[];
  editingPath: string | null;

  toggleNode: (path: string) => void;
  setEditingPath: (path: string | null) => void;
}

/**
 * Store для управления состоянием JsonEditor с персистентностью в localStorage
 */
export const useJsonEditorStore = create<JsonEditorState>()(
  persist(
    (set) => ({
      expandedNodes: [],
      editingPath: null,

      toggleNode: (path) =>
        set((state) => ({
          expandedNodes: state.expandedNodes.includes(path)
            ? state.expandedNodes.filter((p) => p !== path)
            : [...state.expandedNodes, path],
        })),

      setEditingPath: (path) =>
        set({
          editingPath: path,
        }),
    }),
    {
      name: 'json-editor-storage',
      partialize: (state) => ({
        expandedNodes: state.expandedNodes,
      }),
    }
  )
); 