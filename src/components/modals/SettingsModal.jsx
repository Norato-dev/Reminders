import { TONE_PRESETS } from "../../utils/audio";

export function SettingsModal({ settings, onUpdate, onClose, previewAlarm }) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-handle" />
        <div className="modal-title">Configuración ⚙️</div>

        {/* Dark mode */}
        <div className="settings-row">
          <div className="settings-row-label">
            <span className="settings-row-icon">🌙</span>
            <div>
              <div className="settings-row-title">Modo oscuro</div>
              <div className="settings-row-sub">Cambia la apariencia de la app</div>
            </div>
          </div>
          <button
            className={`toggle-switch ${settings.darkMode ? "on" : ""}`}
            onClick={() => onUpdate("darkMode", !settings.darkMode)}
            aria-label="Activar modo oscuro"
            type="button"
          />
        </div>

        {/* Tone */}
        <div className="form-group" style={{ marginTop: 20 }}>
          <label>Tono de notificación</label>
          <div className="tone-grid">
            {TONE_PRESETS.map((t) => (
              <button
                key={t.id}
                className={`tone-btn ${settings.tone === t.id ? "selected" : ""}`}
                onClick={() => onUpdate("tone", t.id)}
                type="button"
              >
                <span className="tone-emoji">{t.emoji}</span>
                <span className="tone-label">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Volume */}
        <div className="form-group">
          <label>Volumen · {Math.round(settings.volume * 100)}%</label>
          <div className="volume-row">
            <span style={{ fontSize: 16 }}>🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.volume}
              onChange={(e) => onUpdate("volume", parseFloat(e.target.value))}
              className="volume-slider"
            />
            <span style={{ fontSize: 16 }}>🔊</span>
          </div>
        </div>

        {/* Preview */}
        <button
          className="btn-ghost preview-btn"
          onClick={() => previewAlarm(settings.tone, settings.volume)}
          type="button"
        >
          ▶ Probar sonido
        </button>

        <div className="modal-actions" style={{ marginTop: 16 }}>
          <button
            className="btn-primary"
            style={{ flex: 1, justifyContent: "center" }}
            onClick={onClose}
            type="button"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
}
