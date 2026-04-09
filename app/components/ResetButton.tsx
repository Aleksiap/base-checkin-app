'use client';

export function ResetButton() {
  const resetApp = () => {
    // Очищаем все данные приложения
    localStorage.clear();
    sessionStorage.clear();
    
    // Если есть IndexedDB
    if (window.indexedDB) {
      indexedDB.databases().then(dbs => {
        dbs.forEach(db => {
          if (db.name) indexedDB.deleteDatabase(db.name);
        });
      });
    }
    
    // Перезагружаем
    window.location.reload();
  };

  return (
    <button
      onClick={resetApp}
      className="fixed bottom-4 right-4 text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full"
      title="Reset app (if connection issues)"
    >
      Reset
    </button>
  );
}