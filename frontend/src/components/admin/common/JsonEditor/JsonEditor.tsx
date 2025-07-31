'use client';

import { FC, useState, KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { NestedRecord, useJsonEditor } from './useJsonEditor';
import styles from './JsonEditor.module.scss';
import { ChevronRight, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface JsonEditorProps {
  data: NestedRecord;
  onChange: (data: NestedRecord) => void;
  readOnly?: boolean;
}

export const JsonEditor: FC<JsonEditorProps> = ({ data, onChange, readOnly = false }) => {
  const tJsonEditor = useTranslations('admin.common.json_editor');
  const tCommon = useTranslations('common');
  const {
    isNodeExpanded,
    isEditing,
    toggleNode,
    startEditing,
    stopEditing,
    updateValue,
    updateValueAndStopEditing,
    addTranslation,
    deleteTranslation,
  } = useJsonEditor({ data, onChange, readOnly });

  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [addingToPath, setAddingToPath] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, callback: () => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      callback();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setAddingToPath(null);
      setNewKey('');
      setNewValue('');
    }
  };

  const handleEditingKeyDown = (e: KeyboardEvent<HTMLInputElement>, path: string, originalValue: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleFinishEditing(path);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setEditingValue(originalValue);
      updateValue(path, originalValue);
      stopEditing();
    }
  };

  const startAdding = (path: string) => {
    if (!isNodeExpanded(path)) {
      toggleNode(path);
    }
    setAddingToPath(path);
    setNewKey('');
    setNewValue('');
  };

  const handleAdd = () => {
    if (addingToPath !== null && newKey && newValue) {
      addTranslation(addingToPath, newKey, newValue);
      setAddingToPath(null);
      setNewKey('');
      setNewValue('');
    }
  };

  const handleStartEditing = (path: string, currentValue: string) => {
    setEditingValue(currentValue);
    startEditing(path);
  };

  const handleValueChange = (path: string, newValue: string) => {
    setEditingValue(newValue);
    updateValue(path, newValue);
  };

  const handleFinishEditing = (path: string) => {
    updateValueAndStopEditing(path, editingValue);
  };

  const renderNode = (path: string, key: string, value: string | NestedRecord) => {
    const fullPath = path ? `${path}.${key}` : key;
    const isObject = typeof value === 'object' && value !== null;
    const isExpanded = isNodeExpanded(fullPath);
    const editing = isEditing(fullPath);

    return (
      <div key={fullPath} className={styles.editor_node}>
        <div className={styles.editor_row}>
          {isObject && (
            <button
              className={`${styles.editor_expand} ${isExpanded ? styles.editor_expand_expanded : ''}`}
              onClick={() => toggleNode(fullPath)}
              data-intl-default-key="admin.common.json_editor.expand"
            >
              <ChevronRight size={24} />
            </button>
          )}

          <div className={styles.editor_content}>
            <div className={styles.editor_key_value}>
              <span className={styles.editor_key}>{key}</span>
              {!isObject && (
                <>
                  {editing ? (
                    <input
                      className={styles.editor_input}
                      value={editingValue}
                      onChange={(e) => handleValueChange(fullPath, e.target.value)}
                      onKeyDown={(e) => handleEditingKeyDown(e, fullPath, value as string)}
                      autoFocus
                      data-intl-placeholder-key="admin.common.json_editor.edit_value"
                    />
                  ) : (
                    <span className={styles.editor_value}>{value}</span>
                  )}
                </>
              )}
            </div>

            {!readOnly && (
              <div className={styles.editor_actions}>
                {isObject && (
                  <button
                    className={styles.editor_button}
                    onClick={() => startAdding(fullPath)}
                    title={tJsonEditor('add_translation')}
                    data-intl-default-key="admin.common.json_editor.add_translation"
                  >
                    <Plus size={20} />
                  </button>
                )}
                {!isObject && (
                  <>
                    <button
                      className={styles.editor_button}
                      onClick={() => handleStartEditing(fullPath, value as string)}
                      title={tJsonEditor('edit_value')}
                      data-intl-default-key="admin.common.json_editor.edit_value"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      className={`${styles.editor_button} ${styles.editor_button_danger}`}
                      onClick={() => deleteTranslation(fullPath)}
                      title={tJsonEditor('delete_translation')}
                      data-intl-default-key="admin.common.json_editor.delete_translation"
                    >
                      <Trash2 size={20} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {isObject && isExpanded && (
          <div className={styles.editor_children}>
            {Object.entries(value).map(([childKey, childValue]) =>
              renderNode(fullPath, childKey, childValue)
            )}
            {addingToPath === fullPath && (
              <div className={styles.editor_new_node}>
                <div className={styles.editor_row}>
                  <div className={styles.editor_content}>
                    <div className={styles.editor_key_value}>
                      <input
                        className={styles.editor_input}
                        value={newKey}
                        onChange={(e) => setNewKey(e.target.value)}
                        placeholder={tJsonEditor('enter_key_placeholder')}
                        onKeyDown={(e) => handleKeyDown(e, handleAdd)}
                        autoFocus
                        data-intl-placeholder-key="admin.json_editor.enter_key_placeholder"
                      />
                      <input
                        className={styles.editor_input}
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder={tJsonEditor('enter_value_placeholder')}
                        onKeyDown={(e) => handleKeyDown(e, handleAdd)}
                        data-intl-placeholder-key="admin.json_editor.enter_value_placeholder"
                      />
                    </div>
                    <div className={styles.editor_actions}>
                      <button
                        className={`${styles.editor_button} ${styles.editor_button_primary}`}
                        onClick={handleAdd}
                        title={tCommon('save')}
                        data-intl-default-key="common.save"
                      >
                        <Save size={20} />
                      </button>
                      <button
                        className={styles.editor_button}
                        onClick={() => {
                          setAddingToPath(null);
                          setNewKey('');
                          setNewValue('');
                        }}
                        title={tCommon('cancel')}
                        data-intl-default-key="common.cancel"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.editor_container}>
      {Object.entries(data).map(([key, value]) => renderNode('', key, value))}
    </div>
  );
}; 