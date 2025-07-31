import { useCallback } from 'react';
import { useJsonEditorStore } from '@/store/useJsonEditorStore';

export interface NestedRecord {
  [key: string]: string | NestedRecord;
}

interface UseJsonEditorOptions {
  data: NestedRecord;
  onChange: (data: NestedRecord) => void;
  readOnly?: boolean;
}

interface UseJsonEditorReturn {
  isNodeExpanded: (path: string) => boolean;
  isEditing: (path: string) => boolean;
  toggleNode: (path: string) => void;
  startEditing: (path: string) => void;
  stopEditing: () => void;
  updateValue: (path: string, newValue: string) => void;
  updateValueAndStopEditing: (path: string, newValue: string) => void;
  addTranslation: (parentPath: string, key: string, value: string) => void;
  deleteTranslation: (path: string) => void;
}

export const useJsonEditor = ({
  data,
  onChange,
  readOnly = false,
}: UseJsonEditorOptions): UseJsonEditorReturn => {
  const { expandedNodes, editingPath, toggleNode, setEditingPath } = useJsonEditorStore();

  const isNodeExpanded = useCallback(
    (path: string) => expandedNodes.includes(path),
    [expandedNodes]
  );

  const isEditing = useCallback(
    (path: string) => editingPath === path,
    [editingPath]
  );

  const startEditing = useCallback(
    (path: string) => {
      if (!readOnly) {
        setEditingPath(path);
      }
    },
    [readOnly, setEditingPath]
  );

  const stopEditing = useCallback(() => {
    setEditingPath(null);
  }, [setEditingPath]);

  const updateValue = useCallback(
    (path: string, newValue: string) => {
      if (readOnly) return;

      const updatedData = { ...data };
      let current: NestedRecord = updatedData;
      const pathArray = path.split('.');
      const lastKey = pathArray.pop()!;

      for (const segment of pathArray) {
        current = current[segment] as NestedRecord;
      }

      current[lastKey] = newValue;
      onChange(updatedData);
    },
    [data, onChange, readOnly]
  );

  const updateValueAndStopEditing = useCallback(
    (path: string, newValue: string) => {
      updateValue(path, newValue);
      stopEditing();
    },
    [updateValue, stopEditing]
  );

  const addTranslation = useCallback(
    (parentPath: string, key: string, value: string) => {
      if (readOnly || !key.trim()) return;

      const updatedData = { ...data };
      let current: NestedRecord = updatedData;

      if (parentPath) {
        const pathArray = parentPath.split('.');
        for (const segment of pathArray) {
          current = current[segment] as NestedRecord;
        }
      }

      current[key] = value;
      onChange(updatedData);
    },
    [data, onChange, readOnly]
  );

  const deleteTranslation = useCallback(
    (path: string) => {
      if (readOnly) return;

      const updatedData = { ...data };
      let current: NestedRecord = updatedData;
      const pathArray = path.split('.');
      const lastKey = pathArray.pop()!;

      for (const segment of pathArray) {
        current = current[segment] as NestedRecord;
      }

      delete current[lastKey];
      onChange(updatedData);
    },
    [data, onChange, readOnly]
  );

  return {
    isNodeExpanded,
    isEditing,
    toggleNode,
    startEditing,
    stopEditing,
    updateValue,
    updateValueAndStopEditing,
    addTranslation,
    deleteTranslation,
  };
};
