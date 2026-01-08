import { useState } from 'react';
import { X, Dot } from 'lucide-react';
import { ThemeColors } from '../../types';

interface MyRitualProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeColors;
}

export const MyRitual = ({ isOpen, onClose, theme }: MyRitualProps) => {
  const [fields, setFields] = useState<string[]>(Array(10).fill(''));
  const [error, setError] = useState<string>('');

  const handleFieldChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
    setError(''); // Сбрасываем ошибку при изменении любого поля
  };

  const handleDeleteField = (index: number) => {
    // Позволяем удалить первое поле, только если оно заполнено
    if (index === 0 && fields[0].trim() === '') return;
    
    const newFields = [...fields];
    // Сдвигаем все поля снизу вверх
    for (let i = index; i < fields.length - 1; i++) {
      newFields[i] = newFields[i + 1];
    }
    newFields[fields.length - 1] = ''; // Очищаем последнее поле
    setFields(newFields);
    setError('');
  };

  const validateFields = (): boolean => {
    // Проверяем, что нет пустых полей посередине (все поля до последнего заполненного должны быть заполнены)
    let lastNonEmptyIndex = -1;
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].trim() !== '') {
        lastNonEmptyIndex = i;
      }
    }

    // Если есть пустые поля до последнего заполненного, это ошибка
    for (let i = 0; i <= lastNonEmptyIndex; i++) {
      if (fields[i].trim() === '') {
        setError('Пожалуйста, заполните все поля или удалите пустые поля');
        return false;
      }
    }

    return true;
  };

  const getVisibleFieldsCount = () => {
    // Находим индекс последнего непустого поля
    let lastNonEmptyIndex = -1;
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].trim() !== '') {
        lastNonEmptyIndex = i;
      }
    }
    
    // Если нет заполненных полей, показываем только первое
    if (lastNonEmptyIndex === -1) {
      return 1;
    }
    
    // Показываем все поля до последнего непустого + одно пустое поле для добавления
    return Math.min(lastNonEmptyIndex + 2, fields.length);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`absolute inset-0 ${theme.bg}/80 backdrop-blur-sm`}
      />
      
      <div 
        className={`relative w-full max-w-md ${theme.cardBg} rounded-2xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 ${theme.subtextColor} hover:${theme.textColor} transition-colors`}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-2xl">
            💎
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${theme.textColor}`}>Мои ритуалы</h2>
            <p className={`text-sm ${theme.subtextColor}`}>Редактирование ритуалов</p>
          </div>
        </div>

        <div className="space-y-3">
          {Array.from({ length: getVisibleFieldsCount() }).map((_, index) => {
            const visibleFieldsCount = getVisibleFieldsCount();
            const isLastVisible = index === visibleFieldsCount - 1;
            const isLastAndEmpty = isLastVisible && fields[index].trim() === '';
            
            return (
              <div key={index} className="relative">
                <input
                  type="text"
                  value={fields[index]}
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                  className={`w-full py-2 pl-10 ${isLastAndEmpty ? 'pr-3' : 'pr-10'} rounded-lg border ${theme.borderColor} ${theme.textColor} ${theme.cardBg} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all min-h-[40px]`}
                />
                <Dot className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                {!isLastAndEmpty && (index !== 0 || fields[index].trim() !== '') && (
                  <button
                    onClick={() => handleDeleteField(index)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={() => {
              if (validateFields()) {
                // TODO: Обработать отправку формы
                onClose();
              }
            }}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
};
